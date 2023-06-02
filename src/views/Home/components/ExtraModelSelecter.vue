<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useConfigStore } from "@/stores/config.js";
const ConfigStore = useConfigStore();
const itemLoading = ref(true);
const groupLoading = ref(true);
const showExtraModelGroups = ref(false);

const getExtraModelGroup = async () => {
  if (ConfigStore.extraModelGroups.length === 0) {
    await ConfigStore.getAllExtraModelGroups();
    groupLoading.value = false;
  } else {
    groupLoading.value = false;
  }
};
const currentGroup = ref("");
async function select(group: string) {
  currentGroup.value = group;
  if (
    ConfigStore.extraModelsWithGroup[group] === undefined ||
    ConfigStore.extraModelsWithGroup[group].length === 0
  ) {
    await ConfigStore.getAllExtraModelsWithGroup(group);
    itemLoading.value = false;
  } else {
    itemLoading.value = false;
  }
}
</script>

<template>
  <el-form-item label="Extra Model">
    <el-switch v-model="showExtraModelGroups"></el-switch>
  </el-form-item>
  <el-form-item label="Extra Models" v-show="showExtraModelGroups">
    <el-select
      v-model="currentGroup"
      class="select"
      placeholder="Select"
      size="large"
      :loading="groupLoading"
      @focus="getExtraModelGroup"
    >
      <el-option
        v-for="item in ConfigStore.extraModelGroups"
        :key="item"
        :value="item"
        @click="select(item)"
      />
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-scrollbar
      height="55vh"
      style="margin-left: 120px; width: 80%; display: 'flex'"
      v-if="!itemLoading"
    >
      <el-card
        style="width: 200px; display: 'flex'"
        v-for="item in ConfigStore.extraModelsWithGroup[currentGroup]"
        :key="item.Name"
      >
        <img :src="item.Preview" style="width: 100%" />
        <div style="padding: 14px">{{ item.Name }}</div>
      </el-card>
    </el-scrollbar>
  </el-form-item>
</template>

<style scoped></style>
