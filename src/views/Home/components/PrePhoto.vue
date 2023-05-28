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

const upload = ref<UploadInstance>();
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  file2Base64(uploadFile.raw!).then((base64) => {
    ConfigStore.config.pre_photo = base64;
  });
};

const handleRemove = (file: UploadFile) => {
  upload.value!.clearFiles();
  ConfigStore.config.pre_photo = "";
};
const dialogVisible = ref(false);

const prePhoto = computed(() => {
  return "data:image/png;base64," + ConfigStore.config.pre_photo;
});
</script>

<template>
  <el-form-item>
    <label class="el-form-item__label">Pre Photo</label>
    <el-upload
      ref="upload"
      class="upload-demo"
      accept="image/png,image/jpg,image/jpeg"
      action="#"
      drag
      :auto-upload="false"
      list-type="picture-card"
      v-model:file-list="ConfigStore.prePhoto_UploadUserFile"
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
          <img class="el-upload-list__item-thumbnail" :src="prePhoto" alt="" />
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
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
  </el-form-item>
  <el-form-item v-show="ConfigStore.config.pre_photo! !== ''">
    <label class="el-form-item__label">Strength</label>
    <el-input-number
      v-model.number="ConfigStore.config.strength"
      :controls="true"
      :min="0"
      :max="1"
      :step="0.05"
      step-strictly
    />
  </el-form-item>
  <el-dialog v-model="dialogVisible" align-center width="70%" append-to-body>
    <el-image
      fit="contain"
      w-full
      :src="prePhoto"
      alt="Preview Pre Photo"
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
