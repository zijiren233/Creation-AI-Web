<script setup lang="ts">
import { ref } from "vue";
import Config from "@/views/Home/components/Config.vue";
import ShowImages from "@/views/Home/components/ShowImages.vue";

const imgData = ref<string[]>([]);
function pushImg(data: string[]) {
  imgData.value.unshift(...data.map(item => "data:image/png;base64," + item));
}
</script>

<template>
  <el-row :gutter="10">
    <el-col :md="16" :sm="14">
      <Config @pushImg="pushImg"></Config>
    </el-col>
    <el-col :md="8" :sm="10">
      <ShowImages :imgData="imgData"></ShowImages>
    </el-col>
  </el-row>
</template>

<style scoped></style>
