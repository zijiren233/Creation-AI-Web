<script setup lang="ts">
import { useShowImagesStore } from "@/stores/showImages.js";

const ShowImagesStore = useShowImagesStore();
</script>

<template>
  <el-carousel :interval="10000" type="card" height="400px">
    <el-carousel-item v-for="(item, index) in ShowImagesStore.imgData" :key="index">
      <el-image style="width: 100%; height: 100%" :src="item" fit="contain" loading="lazy" preview-teleported
        :preview-src-list="ShowImagesStore.imgData" :initial-index="index" hide-on-click-modal></el-image>
    </el-carousel-item>
    <el-carousel-item v-if="ShowImagesStore.imgData.length === 0">
      <el-skeleton style="width: 100%">
        <template #template>
          <el-skeleton-item variant="image" style="width: 100%; height: 400px" />
        </template>
      </el-skeleton>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

img {
  height: 100%;
  display: block;
  margin: auto;
}
</style>
