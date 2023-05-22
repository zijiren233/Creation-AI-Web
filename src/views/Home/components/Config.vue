<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue";
import { useConfigStore } from "@/stores/config.js";
import { useNotificationStore } from "@/stores/notification.js";
import ExtraModelSelecter from "@/views/Home/components/ExtraModelSelecter.vue";
import PrePhoto from "@/views/Home/components/PrePhoto.vue";
import { drawPost, drawGet } from "@/apis/config.js";
import type { FormInstance, FormRules } from "element-plus";
import type { config } from "@/stores/config";
const ConfigStore = useConfigStore();
const NotificationStore = useNotificationStore();

const modesLoading = ref(true);
const modelsLoading = ref(true);

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
  ConfigStore.config.width! -= ConfigStore.config.width! % 8;
  if (ConfigStore.lockRatio) {
    ConfigStore.config.height = ConfigStore.config.width! * ratio.value;
  }
  ConfigStore.config.height! -= ConfigStore.config.height! % 8;
  if (ConfigStore.config.width! * ConfigStore.config.height! > 1478656) {
    callback(new Error("Total Size: H*W must <= 1478656"));
  } else {
    callback();
  }
}

watch(
  () => ConfigStore.lockRatio,
  (v) => {
    if (v) {
      ratio.value = ConfigStore.config.height! / ConfigStore.config.width!;
    }
  }
);

watch(ratio, () => {
  ConfigStore.config.height = ConfigStore.config.width! * ratio.value;
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

const status = ref<number>(0);
const code = ref<string>("success");

async function Create() {
  formRef.value?.validate((valid) => {
    if (valid) {
      status.value = 0.01;
      code.value = "success";
      ConfigStore.loading = true;
      drawPost(JSON.stringify(ConfigStore.config))
        .then((res) => {
          Object.keys(res.data.config as config).forEach((key) => {
            (ConfigStore.config as { [key: string]: any })[key] =
              res.data.config[key];
          });
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
          }
          code.value = "exception";
          NotificationStore.error(error.response.data.err, 3000);
          ConfigStore.loading = false;
        });
    }
  });
}

const emits = defineEmits(["pushImg"]);

async function getDraw() {
  const res = await drawGet();
  if (res.err === "re long polling") {
    status.value = res.data;
    getDraw();
    return;
  } else if (res.err !== undefined) {
    code.value = "exception";
    NotificationStore.error(res.err, 3000);
  } else {
    status.value = 1;
    emits("pushImg", res.data);
    NotificationStore.success("Success", 3000);
  }
  ConfigStore.loading = false;
}
</script>

<template>
  <div class="demo-progress">
    <el-progress
      v-show="status"
      :text-inside="true"
      :stroke-width="24"
      :class="{
        status: code,
      }"
      :style="{ 'margin-bottom': '20px' }"
      :percentage="status * 100"
    />
  </div>
  <el-form
    ref="formRef"
    :model="ConfigStore.config"
    :rules="rules"
    scroll-to-error
    hide-required-asterisk
    status-icon
    v-loading="ConfigStore.loading"
    @submit.prevent
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
    <el-form-item label="Lock Ratio" class="config_radio-fix-size">
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
    <PrePhoto></PrePhoto>
    <ExtraModelSelecter></ExtraModelSelecter>
    <el-form-item class="button_config" style="margin-left: 120px">
      <el-button type="primary" @click="Create">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
