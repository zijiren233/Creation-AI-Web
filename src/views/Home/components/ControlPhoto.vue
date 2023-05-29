<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { genFileId } from "element-plus";
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadFile,
} from "element-plus";
import { UploadFilled, ZoomIn, Delete } from "@element-plus/icons-vue";
import { useConfigStore } from "@/stores/config.js";
import { file2Base64 } from "@/utile/utils";
const ConfigStore = useConfigStore();

const preProcessLoading = ref(true);
const processLoading = ref(true);

const getPreProcess = () => {
  if (ConfigStore.PreProcess.length === 0) {
    (async () => {
      await ConfigStore.getAllPreProcess();
      preProcessLoading.value = false;
    })();
  } else {
    preProcessLoading.value = false;
  }
};

const getProcess = () => {
  if (ConfigStore.Process.length === 0) {
    (async () => {
      await ConfigStore.getAllProcess();
      processLoading.value = false;
    })();
  } else {
    processLoading.value = false;
  }
};

const upload = ref<UploadInstance>();
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  file2Base64(uploadFile.raw!).then((base64) => {
    ConfigStore.config.control_photo = base64;
  });
};

const handleRemove = (file: UploadFile) => {
  upload.value!.clearFiles();
  ConfigStore.config.control_photo = "";
};
const dialogVisible = ref(false);

const controlPhoto = computed(() => {
  return "data:image/png;base64," + ConfigStore.config.control_photo;
});
</script>

<template>
  <el-form-item>
    <label class="el-form-item__label">Control Photo</label>
    <el-upload
      ref="upload"
      class="upload-demo"
      accept="image/png,image/jpg,image/jpeg"
      action="#"
      drag
      :auto-upload="false"
      list-type="picture-card"
      v-model:file-list="ConfigStore.controlPhoto_UploadUserFile"
      :limit="1"
      :on-exceed="handleExceed"
      :on-change="handleChange"
    >
      <el-icon :size="30" class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 3Mb
        </div>
      </template>
      <template #file="{ file }">
        <div>
          <img
            class="el-upload-list__item-thumbnail"
            :src="controlPhoto"
            alt=""
          />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="dialogVisible = true"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <el-icon>
                <Delete />
              </el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
  </el-form-item>
  <el-form-item required v-show="ConfigStore.config.control_photo! !== ''">
    <label class="el-form-item__label">Pre Process</label>
    <el-select
      @focus="getPreProcess"
      :loading="preProcessLoading"
      v-model="ConfigStore.config.control_preprocess"
      class="m-2"
      placeholder="Pre Process"
      size="large"
    >
      <el-option
        v-for="(item, index) in ConfigStore.PreProcess"
        :key="index"
        :value="item"
      />
    </el-select>
  </el-form-item>
  <el-form-item required v-show="ConfigStore.config.control_photo! !== ''">
    <label class="el-form-item__label">Process</label>
    <el-select
      @focus="getProcess"
      :loading="processLoading"
      v-model="ConfigStore.config.control_process"
      class="m-2"
      placeholder="Process"
      size="large"
    >
      <el-option
        v-for="(item, index) in ConfigStore.Process"
        :key="index"
        :value="item"
      />
    </el-select>
  </el-form-item>
  <el-dialog v-model="dialogVisible" align-center width="70%" append-to-body>
    <el-image
      fit="contain"
      w-full
      :src="controlPhoto"
      alt="Preview Control Photo"
    ></el-image>
  </el-dialog>
</template>

<style scoped>
.el-form-item__label {
  width: 120px;
}

@media (max-width: 425px) {
  .el-form-item__label {
    width: 64px;
    display: flex;
    justify-content: flex-start;
  }
}
</style>
