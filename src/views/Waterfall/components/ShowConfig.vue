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
    width="70%"
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
          <el-form-item label="Tag:" prop="tag">
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
              <el-form-item label="Steps:" class="label_infoblock">{{
                WaterfallStore.currentClickData!.cfg.steps
              }}</el-form-item>
              <el-form-item label="Scale:" class="label_infoblock">{{
                WaterfallStore.currentClickData!.cfg.scale
              }}</el-form-item>

              <el-form-item label="Mode:" class="label_infoblock">{{
                WaterfallStore.currentClickData!.cfg.mode
              }}</el-form-item>
              <el-form-item
                v-if="
                  WaterfallStore.currentClickData!.cfg.pre_photo !== undefined
                "
                label="Prefer Photo:"
                class="label_infoblock"
                >{{
                  WaterfallStore.currentClickData!.cfg.pre_photo
                }}</el-form-item
              >
              <el-form-item
                v-if="
                  WaterfallStore.currentClickData!.cfg.control_photo !==
                  undefined
                "
                label="Control Photo:"
                class="label_infoblock"
                >{{
                  WaterfallStore.currentClickData!.cfg.control_photo
                }}</el-form-item
              >
              <el-form-item
                v-if="
                  WaterfallStore.currentClickData!.cfg.control_process !==
                  undefined
                "
                label="Control Process:"
                class="label_infoblock"
                >{{
                  WaterfallStore.currentClickData!.cfg.control_process
                }}</el-form-item
              >
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="Width:"
                prop="size"
                class="label_infoblock"
                >{{ WaterfallStore.currentClickData!.cfg.width }}</el-form-item
              >
              <el-form-item label="Height:" class="label_infoblock">{{
                WaterfallStore.currentClickData!.cfg.height
              }}</el-form-item>

              <el-form-item required label="Model:" class="label_infoblock">{{
                WaterfallStore.currentClickData!.cfg.model
              }}</el-form-item>
              <el-form-item
                v-if="
                  WaterfallStore.currentClickData!.cfg.strength !== undefined
                "
                label="Strength:"
                class="label_infoblock"
                >{{
                  WaterfallStore.currentClickData!.cfg.strength
                }}</el-form-item
              >
              <el-form-item
                v-if="
                  WaterfallStore.currentClickData!.cfg.control_preprocess !==
                  undefined
                "
                label="Control Preprocess:"
                class="label_infoblock"
                >{{
                  WaterfallStore.currentClickData!.cfg.control_preprocess
                }}</el-form-item
              >
            </el-col>
          </el-row>

          <el-form-item label="Seed:" class="label_infoblock">
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

<style scoped></style>
