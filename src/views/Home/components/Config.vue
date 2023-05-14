<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue";
import { useConfigStore } from "@/stores/config.js";
import { useNotificationStore } from "@/stores/notification.js";
import ExtraModelSelecter from "@/views/Home/components/ExtraModelSelecter.vue";
import { drawPost, drawGet } from "@/apis/config.js";
import { useAuthStore } from "@/stores/auth.js";
import type { FormInstance, FormRules } from "element-plus";
const ConfigStore = useConfigStore();
const NotificationStore = useNotificationStore();
const AuthStore = useAuthStore();

const modesLoading = ref(true);
const modelsLoading = ref(true);
const extraModelSwitch = ref(false);

const getModes = () => {
  if (ConfigStore.modes.length === 0) {
    (async () => {
      await ConfigStore.getAllModes();
      modesLoading.value = false;
    })();
  }
};

const getModels = () => {
  if (ConfigStore.models.length === 0) {
    (async () => {
      await ConfigStore.getAllModels();
      modelsLoading.value = false;
    })();
  }
};

let ratio = ref(0);

function checkSize(rule: any, value: any, callback: any) {
  ConfigStore.config.width -= ConfigStore.config.width % 8;
  if (ConfigStore.lockRatio) {
    ConfigStore.config.height = ConfigStore.config.width * ratio.value;
  }
  ConfigStore.config.height -= ConfigStore.config.height % 8;
  if (ConfigStore.config.width * ConfigStore.config.height > 1478656) {
    callback(new Error("Total Size: H*W must <= 1478656"));
  } else {
    callback();
  }
}

watch(
  () => ConfigStore.lockRatio,
  (v) => {
    if (v) {
      ratio.value = ConfigStore.config.height / ConfigStore.config.width;
    }
  }
);

watch(ratio, () => {
  ConfigStore.config.height = ConfigStore.config.width * ratio.value;
});

function checkTag(rule: any, value: any, callback: any) {
  if (ConfigStore.config.tag === "") {
    callback(new Error("Tag cannot be empty!"));
  } else {
    callback();
  }
}

const rules: FormRules = {
  size: [{ validator: checkSize }],
  tag: [{ validator: checkTag }],
};

const formRef = ref<FormInstance>();

async function Create() {
  formRef.value?.validate((valid) => {
    if (valid) {
      ConfigStore.loading = true;
      drawPost(JSON.stringify(ConfigStore.config))
        .then((res) => {
          ConfigStore.config.tag = res.data.config.tag;
          ConfigStore.config.uc = res.data.config.uc;
          ConfigStore.config.num = res.data.config.num;
          ConfigStore.config.mode = res.data.config.mode;
          ConfigStore.config.model = res.data.config.model;
          ConfigStore.config.width = res.data.config.width;
          ConfigStore.config.height = res.data.config.height;
          ConfigStore.config.scale = res.data.config.scale;
          ConfigStore.config.steps = res.data.config.steps;
          getDraw();
        })
        .catch((error) => {
          if (error.response.data.err === "task already exists") {
            NotificationStore.info(
              "Fetching the results of the previous task. . .",
              3000
            );
            getDraw();
            return;
          } else {
            NotificationStore.error(error.response.data.err, 3000);
          }
          ConfigStore.loading = false;
        });
    }
  });
}

const emits = defineEmits(["pushImg"]);

async function getDraw() {
  const res = await drawGet();
  if (res.err === "re long polling") {
    getDraw();
    return;
  } else if (res.err !== undefined) {
    NotificationStore.error(res.err, 3000);
  } else {
    emits("pushImg", res.data);
    NotificationStore.success("Success", 3000);
  }
  ConfigStore.loading = false;
}
</script>

<template>
  <el-form
    ref="formRef"
    :model="ConfigStore.config"
    label-width="120px"
    :rules="rules"
    scroll-to-error
    hide-required-asterisk
    status-icon
    v-loading="ConfigStore.loading"
  >
    <el-form-item label="Tag" prop="tag">
      <el-input v-model="ConfigStore.config.tag" type="textarea" />
    </el-form-item>
    <el-form-item label="Uc">
      <el-input v-model="ConfigStore.config.uc" type="textarea" />
    </el-form-item>
    <el-form-item required label="Mode">
      <el-select
        @focus="getModes"
        :loading="modesLoading"
        v-model="ConfigStore.config.mode"
        class="m-2"
        placeholder="Mode"
        size="large"
      >
        <el-option
          v-for="(item, index) in ConfigStore.modes"
          :key="index"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item required label="Model">
      <el-select
        @focus="getModels"
        :loading="modelsLoading"
        v-model="ConfigStore.config.model"
        class="m-2"
        placeholder="Model"
        size="large"
      >
        <el-option
          v-for="(item, index) in ConfigStore.models"
          :key="index"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Num">
      <el-input-number
        v-model.number="ConfigStore.config.num"
        :min="1"
        :max="3"
        :step="1"
        step-strictly
      />
    </el-form-item>
    <el-form-item label="Steps">
      <el-input-number
        v-model.number="ConfigStore.config.steps"
        :min="1"
        :max="50"
        :step="1"
        step-strictly
      />
    </el-form-item>
    <el-form-item label="Scale">
      <el-input-number
        v-model.number="ConfigStore.config.scale"
        :min="1"
        :max="30"
        :step="1"
        step-strictly
      />
    </el-form-item>
    <el-form-item label="Lock Ratio">
      <el-switch
        v-model="ConfigStore.lockRatio"
        :style="{
          'margin-right': '20px',
        }"
      />
      <el-input-number
        v-show="ConfigStore.lockRatio"
        v-model.number="ratio"
        :precision="2"
        :step="0.1"
      />
    </el-form-item>
    <el-form-item label="Width" prop="size">
      <el-slider
        v-model.number="ConfigStore.config.width"
        :step="8"
        :min="64"
        :max="2048"
        show-input
      />
    </el-form-item>
    <el-form-item label="Height" :prop="ConfigStore.lockRatio ? '' : 'size'">
      <el-slider
        v-model.number="ConfigStore.config.height"
        :step="8"
        :min="64"
        :max="2048"
        show-input
        :disabled="ConfigStore.lockRatio"
      />
    </el-form-item>
    <el-form-item label="Seed">
      <el-input-number
        v-model.number="ConfigStore.config.seed"
        :controls="false"
        :min="0"
        :max="4294967295"
        :step="1"
        step-strictly
      />
    </el-form-item>
    <el-form-item label="Extra Model">
      <el-switch v-model="extraModelSwitch" />
    </el-form-item>
    <ExtraModelSelecter v-if="extraModelSwitch"></ExtraModelSelecter>
    <el-form-item>
      <el-button type="primary" @click="Create">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
