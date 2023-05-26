<script setup lang="ts">
import Config from "@/views/Home/components/Config.vue";
import ShowImages from "@/views/Home/components/ShowImages.vue";
</script>

<template>
  <el-row :gutter="10">
    <el-col :md="16" :sm="14">
      <Config></Config>
    </el-col>
    <el-col :md="8" :sm="10">
      <ShowImages></ShowImages>
    </el-col>
  </el-row>
</template>

<style scoped></style>
