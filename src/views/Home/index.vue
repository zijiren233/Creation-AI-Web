<script setup lang="ts">
import { ref } from "vue";
import Config from "@/views/Home/components/Config.vue";
import ShowImages from "@/views/Home/components/ShowImages.vue";

const imgData = ref<string[]>([]);
function pushImg(data: string[]) {
  imgData.value.unshift(...data.map((item) => "data:image/png;base64," + item));
}
</script>

<template>
  <el-container>
    <el-aside width="800px"><Config @pushImg="pushImg"></Config></el-aside>
    <el-main width="512px"
      ><ShowImages :imgData="imgData"></ShowImages
    ></el-main>
  </el-container>
</template>

<style scoped></style>
