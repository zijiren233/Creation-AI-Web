<script setup lang="ts">
import copyText from "@/utile/copyText";
import { useWaterfallStore } from "@/stores/waterfall";
import { stringify } from "yaml";

const WaterfallStore = useWaterfallStore();
</script>

<template>
  <el-dialog
    v-model="WaterfallStore.imgModal"
    title="Preview"
    align-center
    width="90%"
    append-to-body
  >
    <el-row :gutter="30" :style="{ margin: '-20px 0 0 0' }">
      <el-col :md="8" :sm="10">
        <el-image
          :style="{
            padding: '0 0 20px 0',
          }"
          :src="WaterfallStore.currentClickData!.image"
          fit="contain"
          loading="lazy"
        ></el-image>
        <br />
        <br />
      </el-col>
      <el-col :md="16" :sm="14">
        <el-form scroll-to-error hide-required-asterisk status-icon>
          <el-form-item prop="tag" label="Tag:">
            <el-input
              v-model="WaterfallStore.currentClickData!.cfg.tag"
              class="textarea_infoblock"
              type="textarea"
            />
          </el-form-item>
          <el-form-item label="Uc:">
            <el-input
              v-model="WaterfallStore.currentClickData!.cfg.uc"
              class="textarea_infoblock"
              type="textarea"
            />
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item class="label_infoblock" label="Steps:">
                ><el-input
                  v-model="WaterfallStore.currentClickData!.cfg.steps"
                />
              </el-form-item>

              <el-form-item class="label_infoblock" label="Scale:">
                <el-input
                  v-model="WaterfallStore.currentClickData!.cfg.scale"
                />
              </el-form-item>

              <el-form-item class="label_infoblock" label="Mode:">
                <el-input v-model="WaterfallStore.currentClickData!.cfg.mode" />
              </el-form-item>

              <el-form-item
                v-if="WaterfallStore.currentClickData!.cfg.control_photo_id !==
                undefined
                "
                class="label_infoblock"
                label="Control Photo Id:"
              >
                <el-input
                  v-model="WaterfallStore.currentClickData!.cfg.control_photo_id"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="size" class="label_infoblock" label="Width:">
                <el-input
                  v-model="WaterfallStore.currentClickData!.cfg.width"
                />
              </el-form-item>

              <el-form-item class="label_infoblock" label="Height:">
                <el-input
                  v-model="WaterfallStore.currentClickData!.cfg.height"
                />
              </el-form-item>

              <el-form-item required class="label_infoblock" label="Model:">
                <el-input
                  v-model="WaterfallStore.currentClickData!.cfg.model"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="label_infoblock" label="Seed:">
            <el-input
              v-model.number="WaterfallStore.currentClickData!.cfg.seed"
              :controls="false"
              :min="0"
              :max="4294967295"
              :step="1"
              step-strictly
            />
          </el-form-item>
          <el-form-item
            v-if="WaterfallStore.currentClickData!.cfg.pre_photo_id !== undefined
            "
            class="label_infoblock"
            label="Pre Photo Id:"
          >
            <el-input
              v-model="WaterfallStore.currentClickData!.cfg.pre_photo_id"
            />
          </el-form-item>
          <el-form-item
            v-if="WaterfallStore.currentClickData!.cfg.strength !== undefined
            "
            class="label_infoblock"
            label="Strength:"
          >
            <el-input v-model="WaterfallStore.currentClickData!.cfg.strength" />
          </el-form-item>
          <el-form-item
            v-if="WaterfallStore.currentClickData!.cfg.control_preprocess !==
            undefined
            "
            class="label_infoblock"
            label="Control Preprocess:"
          >
            <el-input
              v-model="WaterfallStore.currentClickData!.cfg.control_preprocess"
            />
          </el-form-item>
          <el-form-item
            v-if="WaterfallStore.currentClickData!.cfg.control_process !==
            undefined
            "
            class="label_infoblock"
            label="Control Process:"
          >
            <el-input
              v-model="WaterfallStore.currentClickData!.cfg.control_process"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="copyText(stringify(WaterfallStore.currentClickData!.cfg!))"
          >Copy Config</el-button
        >
        <el-button type="primary" @click="WaterfallStore.imgModal = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
:deep(.el-input) {
  margin: 0 5px 0 0;
}

@media (max-width: 770px) {
  :deep(.el-form-item__label) {
    width: 94px;
  }
}

@media (max-width: 425px) {
  .el-col-12 {
    max-width: 100%;
  }

  :deep(.el-form-item__label) {
    width: 50px;
    display: flex;
    justify-content: flex-start;
  }

  :deep(.el-button) {
    font-size: 13px;
  }

  :deep(.el-row) {
    display: flex;
    flex-direction: column;
  }
}
</style>
