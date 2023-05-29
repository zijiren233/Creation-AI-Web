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
  <el-form-item>
    <label class="el-form-item__label">Extra Model</label>

    <el-switch v-model="showExtraModelGroups"></el-switch>
  </el-form-item>
  <el-form-item v-show="showExtraModelGroups" class="extra_models_content">
    <label class="el-form-item__label"></label>
    <el-select v-model="currentGroup" class="select" placeholder="Select" size="large" :loading="groupLoading"
      @focus="getExtraModelGroup">
      <el-option v-for="item in ConfigStore.extraModelGroups" :key="item" :value="item" @click="select(item)" />
    </el-select>
    <el-scrollbar height="55vh" v-if="!itemLoading">
      <div class="scrollbar">
        <el-card class="box-card" :body-style="{ padding: '0px' }"
          v-for="item in ConfigStore.extraModelsWithGroup[currentGroup]" :key="item.Name">
          <img :src="item.Preview" style="width: 100%" />
          <div style="padding: 14px" class="text_name_exm">{{ item.Name }}</div>
        </el-card>
      </div>
    </el-scrollbar>
  </el-form-item>
</template>

<style scoped>
.scrollbar {
  margin-left: 120px;
  display: flex;
  flex-wrap: wrap;
}

.el-form-item__label {
  width: 120px;
  line-height: 12px;
}

.text_name_exm {
  text-align: center;
  line-height: 20px;
  padding: 2px 10px 7px 10px !important;
}

@media (max-width: 425px) {
  .scrollbar {
    margin-left: 0px;
  }

  .el-form-item__label {
    width: 64px;
    display: flex;
    justify-content: flex-start;
  }
}

.box-card {
  width: 17%;
  display: block;
  margin: 5px;
}

.a {
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 1100px) {
  .box-card {
    width: 28%;
  }
}

@media (max-width: 453px) {
  .box-card {
    width: 43%;
  }
}
</style>