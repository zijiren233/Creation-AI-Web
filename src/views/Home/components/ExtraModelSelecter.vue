<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useConfigStore } from "@/stores/config.js";
const ConfigStore = useConfigStore();
onMounted(() => {
  if (ConfigStore.extraModelGroups.length === 0) {
    ConfigStore.getAllExtraModelGroups();
  }
});
const loading = ref(false);
const currentGroup = ref("");
async function select(node: any) {
  loading.value = false;
  const group = node;
  if (
    ConfigStore.extraModelsWithGroup[group] === undefined ||
    ConfigStore.extraModelsWithGroup[group].length === 0
  ) {
    await ConfigStore.getAllExtraModelsWithGroup(group);
  }
  currentGroup.value = group;
  loading.value = true;
}
</script>

<template>
  <div>
    <el-form-item>
      <el-select
        v-model="currentGroup"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="item in ConfigStore.extraModelGroups"
          :key="item"
          :value="item"
          @click="select(item)"
        />
      </el-select>
    </el-form-item>
    <el-scrollbar height="55vh" v-if="loading">
      <div class="a">
        <el-card
          class="box-card"
          :body-style="{ padding: '0px' }"
          v-for="item in ConfigStore.extraModelsWithGroup[currentGroup]"
          :key="item.Name"
        >
          <img :src="item.Preview" style="width: 100%" />
          <div style="padding: 14px">{{ item.Name }}</div>
        </el-card>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.box-card {
  width: 18%;
  display: block;
  margin: 10px;
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
