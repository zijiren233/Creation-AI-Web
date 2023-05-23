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
    <el-row class="dialog_body" :gutter="30" :style="{ margin: '-20px 0 0 0' }">
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
          <el-form-item prop="tag">
            <label class="el-form-item__label">Tag:</label>
            <el-input
              v-model="WaterfallStore.currentClickData!.cfg.tag"
              class="textarea_infoblock"
              type="textarea"
            />
          </el-form-item>
          <el-form-item>
            <label class="el-form-item__label">Uc:</label>
            <el-input
              v-model="WaterfallStore.currentClickData!.cfg.uc"
              class="textarea_infoblock"
              type="textarea"
            />
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item class="label_infoblock">
                <label class="el-form-item__label width">Steps:</label>{{
                WaterfallStore.currentClickData!.cfg.steps
              }}</el-form-item>
              <el-form-item class="label_infoblock">
                <label class="el-form-item__label width">Scale:</label>{{
                WaterfallStore.currentClickData!.cfg.scale
              }}</el-form-item>

              <el-form-item class="label_infoblock">
                <label class="el-form-item__label width">Mode:</label>{{
                WaterfallStore.currentClickData!.cfg.mode
              }}</el-form-item>
              <el-form-item
                v-if="
                  WaterfallStore.currentClickData!.cfg.pre_photo_id !== undefined
                "
                
                class="label_infoblock"
                >
                <label class="el-form-item__label hei">Pre Photo Id:</label>{{
                  WaterfallStore.currentClickData!.cfg.pre_photo_id
                }}</el-form-item
              >
              <el-form-item
                v-if="
                  WaterfallStore.currentClickData!.cfg.control_photo_id !==
                  undefined
                "
               
                class="label_infoblock"
                ><label class="el-form-item__label">Control Photo Id:</label>{{
                  WaterfallStore.currentClickData!.cfg.control_photo_id
                }}</el-form-item
              >
            </el-col>
            <el-col :span="12">
              <el-form-item
                
                prop="size"
                class="label_infoblock"
                > <label class="el-form-item__label width">Width:</label>
                {{ WaterfallStore.currentClickData!.cfg.width }}</el-form-item
              >
              <el-form-item class="label_infoblock">
                <label class="el-form-item__label width">Height:</label>{{
                WaterfallStore.currentClickData!.cfg.height
              }}</el-form-item>

              <el-form-item required  class="label_infoblock">
                <label class="el-form-item__label width">Model:</label>{{
                WaterfallStore.currentClickData!.cfg.model
              }}</el-form-item>
            
            </el-col>
          </el-row>

          <el-form-item
                v-if="
                  WaterfallStore.currentClickData!.cfg.strength !== undefined
                "
               
                class="label_infoblock"
                ><label class="el-form-item__label width2">Strength:</label>{{
                  WaterfallStore.currentClickData!.cfg.strength
                }}</el-form-item
              >
              <el-form-item
                v-if="
                  WaterfallStore.currentClickData!.cfg.control_preprocess !==
                  undefined
                "
                
                class="label_infoblock"
                ><label class="el-form-item__label">Control Preprocess:</label>{{
                  WaterfallStore.currentClickData!.cfg.control_preprocess
                }}</el-form-item
              >
              <el-form-item
                v-if="
                  WaterfallStore.currentClickData!.cfg.control_process !==
                  undefined
                "
               
                class="label_infoblock"
                > <label class="el-form-item__label">Control Process:</label>{{
                  WaterfallStore.currentClickData!.cfg.control_process
                }}</el-form-item
              >

          <el-form-item  class="label_infoblock">
            <label class="el-form-item__label width">Seed:</label>
            <el-input-number
              v-model.number="WaterfallStore.currentClickData!.cfg.seed"
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


.el-form-item__label {
  width: 100px;
}

.dialog_body {
    margin: -5px 0 -30px 0px;
}

@media (max-width: 425px) {
  .hei{line-height: 15px;}
  .width{width: 42px!important;}
  .width2{width: 62px!important;}
   .el-form-item__label {
    width: 120px;
  }
    .dialog_body {
        margin: -30px -15px -30px -15px !important;
    }
    .el-form-item__label {
  width: 35px;
  display: flex;
  justify-content: flex-start;
  
  }

}

</style>