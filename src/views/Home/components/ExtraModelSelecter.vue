<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useConfigStore } from "@/stores/config.js";
const ConfigStore = useConfigStore();
onMounted(() => {
  if (ConfigStore.extraModelGroups.length === 0) {
    ConfigStore.getAllExtraModelGroups();
  }
});
const currentGroup = ref("");
async function select(node: any) {
  const group = node.index;
  if (
    ConfigStore.extraModelsWithGroup[group] === undefined ||
    ConfigStore.extraModelsWithGroup[group].length === 0
  ) {
    await ConfigStore.getAllExtraModelsWithGroup(group);
  }
  currentGroup.value = group;
}
</script>

<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item-group>
            <el-menu-item
              v-for="item in ConfigStore.extraModelGroups"
              :index="item"
              @click="select"
              >{{ item }}</el-menu-item
            >
          </el-menu-item-group>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <el-scrollbar>
        <div class="demo-image">
          <div
            v-for="item in ConfigStore.extraModelsWithGroup[currentGroup]"
            :key="item.Name"
            class="block"
          >
            <span class="demonstration">{{ item.Name }}</span>
            <el-image
              style="width: 100px; height: 100px"
              :src="item.Preview"
              fit="contain"
              loading="lazy"
            />
          </div>
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<style scoped>
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
