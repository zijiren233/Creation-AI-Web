<script setup lang="ts">
import { ref, onMounted, watch, reactive } from "vue";
import { search } from "@/apis/images";
import router from "@/router";
import { onBeforeRouteUpdate } from "vue-router";
import { stringToNumber } from "@/utile/utils";
let now = new Date().getTime();
const datas = ref<
  {
    id: string;
    image: string;
    width: number;
    height: number;
    cfg: string;
  }[]
>([]);

const route = router.currentRoute.value;

const input = ref<string>(route.query.tag?.toString() || "");
const currentPage = ref<number>(stringToNumber(route.query.page?.toString()));
const maxCount = ref<number>(0);
const load = async (tag: string = "", page: number = 1) => {
  const res = await search(tag, "latest", page, now);
  maxCount.value = res.data.maxcount;
  datas.value = res.data.resoult;
};
onMounted(() => {
  load(
    route.query.tag?.toString()!,
    stringToNumber(route.query.page?.toString())
  );
});
onBeforeRouteUpdate(to => {
  input.value = to.query.tag?.toString()!;
  currentPage.value = stringToNumber(to.query.page?.toString());
  load(to.query.tag?.toString()!, stringToNumber(to.query.page?.toString()!));
});

function changePage() {
  datas.value = [];
  router.push({
    path: "/waterfall",
    query: {
      tag: route.query.tag?.toString()!,
      page: currentPage.value
    }
  });
}
function changeTag() {
  datas.value = [];
  router.push({
    path: "/waterfall",
    query: {
      tag: input.value,
      page: 1
    }
  });
}
</script>

<template>
  <el-row>
    <el-input
      @keyup.enter="changeTag"
      v-model="input"
      :style="{
        width: '230px',
        'margin-right': '20px',
      }"
      placeholder="Search tag"
    />
    <el-button type="primary" @click="changeTag" round>Search</el-button>
  </el-row>
  <div class="demo-image">
    <div v-for="(item, index) in datas" :key="item.id" class="block">
      <el-image
        :src="item.image"
        class="img"
        :preview-src-list="datas.map((item) => item.image)"
        :initial-index="index"
        fit="contain"
        loading="lazy"
        preview-teleported
        hide-on-click-modal
      ></el-image>
    </div>
  </div>
  <el-pagination
    v-show="maxCount > 20"
    :page-size="20"
    :pager-count="11"
    v-model:current-page="currentPage"
    @current-change="changePage"
    layout="prev, pager, next"
    :total="maxCount"
  />
</template>

<style scoped>
.demo-image__error .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__error .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.demo-image__error .el-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 200px;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image .block {
  padding: 15px;
  text-align: center;
  display: inline-block;
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
.img {
  width: 230px;
  transition: all 0.4s;
}
.img:hover {
  box-shadow: var(--el-box-shadow-light);
}
</style>
