<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue";
import { useConfigStore } from "@/stores/config.js";
import { useNotificationStore } from "@/stores/notification.js";
import { useShowImagesStore } from "@/stores/showImages.js";
import ExtraModelSelecter from "@/views/Home/components/ExtraModelSelecter.vue";
import PrePhoto from "@/views/Home/components/PrePhoto.vue";
import ControlPhoto from "@/views/Home/components/ControlPhoto.vue";
import { drawPost, drawGet } from "@/apis/config.js";
import type { FormInstance, FormRules } from "element-plus";
import type { config } from "@/stores/config";
import { inItems } from "@/utile/utils";
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
  } else {
    modesLoading.value = false;
  }
};

const getModels = () => {
  if (ConfigStore.models.length === 0) {
    (async () => {
      await ConfigStore.getAllModels();
      modelsLoading.value = false;
    })();
  } else {
    modelsLoading.value = false;
  }
};

let ratio = ref<number>(ConfigStore.config.height! / ConfigStore.config.width!);

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

const code = ref<string>("success");

const dontReplace = <string[]>["seed"];

async function Create() {
  formRef.value?.validate((valid) => {
    if (valid) {
      ConfigStore.creatStatus = 0.01;
      code.value = "success";
      ConfigStore.loading = true;
      drawPost(JSON.stringify(ConfigStore.config))
        .then((res) => {
          Object.keys(res.data.config as config).forEach((key) => {
            if (
              !inItems(dontReplace, (val: string) => {
                return key === val;
              })
            ) {
              (ConfigStore.config as { [key: string]: any })[key] =
                res.data.config[key];
            }
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

const ShowImagesStore = useShowImagesStore();

async function getDraw() {
  const res = await drawGet();
  if (res.err === "re long polling") {
    ConfigStore.creatStatus = res.data;
    getDraw();
    return;
  } else if (res.err !== undefined) {
    code.value = "exception";
    NotificationStore.error(res.err, 3000);
  } else {
    ConfigStore.creatStatus = 0;
    ShowImagesStore.pushImg(res.data);
    NotificationStore.success("Success", 3000);
  }
  ConfigStore.loading = false;
}
</script>

<template>
  <div class="config_position_progress">
    <div class="demo-progress">
      <el-progress
        v-show="ConfigStore.creatStatus"
        :text-inside="true"
        :stroke-width="24"
        :class="{
          status: code,
        }"
        :style="{ 'margin-bottom': '20px' }"
        :percentage="ConfigStore.creatStatus * 100"
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
      <el-form-item prop="tag">
        <label class="el-form-item__label">Tag</label>
        <el-input v-model="ConfigStore.config.tag" type="textarea" />
      </el-form-item>
      <el-form-item>
        <label class="el-form-item__label">Uc</label>
        <el-input v-model="ConfigStore.config.uc" type="textarea" />
      </el-form-item>
      <el-form-item required>
        <label class="el-form-item__label">Mode</label>
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
      <el-form-item required>
        <label class="el-form-item__label">Model</label>
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
      <el-form-item>
        <label class="el-form-item__label">Num</label>
        <el-input-number
          v-model.number="ConfigStore.config.num"
          :min="1"
          :max="3"
          :step="1"
          step-strictly
        />
      </el-form-item>
      <el-form-item>
        <label class="el-form-item__label">Steps</label>
        <el-input-number
          v-model.number="ConfigStore.config.steps"
          :min="1"
          :max="50"
          :step="1"
          step-strictly
        />
      </el-form-item>
      <el-form-item>
        <label class="el-form-item__label">Scale</label>
        <el-input-number
          v-model.number="ConfigStore.config.scale"
          :min="1"
          :max="30"
          :step="1"
          step-strictly
        />
      </el-form-item>
      <el-form-item class="config_radio-fix-size">
        <label class="el-form-item__label">Lock Ratio</label>
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
      <el-form-item prop="size">
        <label class="el-form-item__label">Width</label>
        <el-slider
          v-model.number="ConfigStore.config.width"
          :step="8"
          :min="64"
          :max="2048"
          show-input
        />
      </el-form-item>
      <el-form-item :prop="ConfigStore.lockRatio ? '' : 'size'">
        <label class="el-form-item__label">Height</label>
        <el-slider
          v-model.number="ConfigStore.config.height"
          :step="8"
          :min="64"
          :max="2048"
          show-input
          :disabled="ConfigStore.lockRatio"
        />
      </el-form-item>
      <el-form-item>
        <label class="el-form-item__label">Seed</label>
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
      <ControlPhoto></ControlPhoto>
      <ExtraModelSelecter></ExtraModelSelecter>
      <el-form-item class="button_config" style="margin-left: 120px">
        <el-button type="primary" @click="Create">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.el-scrollbar__view {
  width: 100px;
}

.el-form-item__label {
  width: 120px;
}

.button_config {
  margin-left: 0;
}

@media (max-width: 770px) {
  .config_position_progress {
    display: flex;
    flex-direction: column-reverse;
  }
}

@media (max-width: 425px) {
  .el-form-item__label {
    width: 64px;
    display: flex;
    justify-content: flex-start;
  }
  .button_config {
    margin-left: 64px !important;
  }
}

@media (max-width: 330px) {
  .el-slider__input {
    flex-shrink: 0;
    width: 140px;
    margin: 0px 0 0 -25px;
  }
}
</style>
