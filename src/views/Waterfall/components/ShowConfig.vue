<script setup lang="ts">
import copyText from "@/utile/copyText";
import { watch, ref } from "vue";
import { useWaterfallStore } from "@/stores/waterfall";

const WaterfallStore = useWaterfallStore();
</script>

<template >
  <el-dialog
    v-model="WaterfallStore.imgModal"
    title="Preview"
    align-center
    width="90%"
    destroy-on-close
    append-to-body
  >
    <el-row class="dialog_body" :gutter="30" :style="{ margin: '-20px 0 0 0' }" >
      <el-col :md="8" :sm="10">
        <el-image
          :style="{
            padding: '0 0 20px 0',
          }"
          :src="WaterfallStore.imgData.image"
          fit="contain"
          loading="lazy"
        ></el-image>
        <br />
        <br />
      </el-col>
      <el-col :md="16" :sm="14" >
        <el-form scroll-to-error hide-required-asterisk status-icon>
          <el-form-item  prop="tag">
            <label class="el-form-item__label">Tag:</label>
            <el-input
              v-model="WaterfallStore.imgData.tag"
              class="textarea_infoblock"
              type="textarea"
            />
          </el-form-item>
          <el-form-item >
            <label class="el-form-item__label">Uc:</label>
            <el-input
              v-model="WaterfallStore.imgData.uc"
              class="textarea_infoblock"
              type="textarea"
            />
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Steps:" class="label_infoblock">{{
                WaterfallStore.imgData.steps
              }}</el-form-item>
              <el-form-item label="Scale:" class="label_infoblock">{{
                WaterfallStore.imgData.scale
              }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="Width:"
                prop="size"
                class="label_infoblock"
                >{{ WaterfallStore.imgData.width_ }}</el-form-item
              >
              <el-form-item label="Height:" class="label_infoblock">{{
                WaterfallStore.imgData.height_
              }}</el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Mode:" class="label_infoblock">{{
            WaterfallStore.imgData.mode
          }}</el-form-item>
          <el-form-item required label="Model:" class="label_infoblock">{{
            WaterfallStore.imgData.model
          }}</el-form-item>
          <el-form-item label="Seed:" class="label_infoblock">
            <el-input-number
              v-model.number="WaterfallStore.imgData.seed"
              :controls="false"
              :min="0"
              :max="4294967295"
              :step="1"
              step-strictly
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="copyText(WaterfallStore.imgData.cfg)"
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


.el-form-item__label {
  width: 50px;
}

.dialog_body {
    margin: -5px 0 -30px 0px;
}

@media (max-width: 425px) {
   .el-form-item__label {
    width: 120px;
  }
    .dialog_body {
        margin: -30px 0 -30px 0px !important;
    }
    .el-form-item__label {
  width: 35px;
  display: flex;
  justify-content: flex-start;
  }

}

</style>
