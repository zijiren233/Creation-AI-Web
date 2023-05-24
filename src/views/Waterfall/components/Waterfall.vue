<script setup lang="ts">
import { ref, onMounted, watch, reactive } from "vue";
import router from "@/router";
import { onBeforeRouteUpdate } from "vue-router";
import { stringToNumber } from "@/utile/utils";
import ShowConfig from "@/views/Waterfall/components/ShowConfig.vue";
import { useWaterfallStore } from "@/stores/waterfall";

const WaterfallStore = useWaterfallStore();
const route = router.currentRoute.value;
WaterfallStore.input = route.query.tag?.toString() || "";
WaterfallStore.currentPage = stringToNumber(route.query.page?.toString());

onMounted(() => {
  WaterfallStore.load();
});

onBeforeRouteUpdate((to) => {
  WaterfallStore.input = to.query.tag?.toString()!;
  WaterfallStore.currentPage = stringToNumber(to.query.page?.toString());
  WaterfallStore.load();
});

function changePage() {
  WaterfallStore.datas = [];
  router.push({
    path: "/waterfall",
    query: {
      tag: route.query.tag?.toString()!,
      page: WaterfallStore.currentPage,
    },
  });
}
function changeTag() {
  WaterfallStore.datas = [];
  router.push({
    path: "/waterfall",
    query: {
      tag: WaterfallStore.input,
      page: 1,
    },
  });
}

function openImgModal(data: any) {
  WaterfallStore.currentClickData = data;

  WaterfallStore.imgModal = true;
}
</script>

<template>
  <div>
    <el-row
      :style="{
        display: 'flex',
        'justify-content': 'center',
        'flex-wrap': 'nowrap',
        margin: '0 auto 10px',
      }"
    >
      <el-input
        @keyup.enter="changeTag"
        v-model="WaterfallStore.input"
        :style="{
          width: '230px',
          'margin-right': '20px',
        }"
        placeholder="Search tag"
      />
      <el-button type="primary" @click="changeTag" round>Search</el-button>
    </el-row>
    <div class="demo-image">
      <div
        v-for="(item, index) in WaterfallStore.datas"
        :key="item.id"
        class="block"
      >
        <el-image
          @click="openImgModal(item)"
          :src="item.image"
          class="img"
          :initial-index="index"
          fit="contain"
          loading="lazy"
        ></el-image>
      </div>
    </div>
    <el-pagination
      :style="{
        display: 'flex',
        'justify-content': 'center',
      }"
      v-show="WaterfallStore.maxCount > 20"
      :page-size="20"
      v-model:current-page="WaterfallStore.currentPage"
      @current-change="changePage"
      layout="prev, pager, next"
      :total="WaterfallStore.maxCount"
    />
    <ShowConfig></ShowConfig>
  </div>
</template>

<style scoped>



.demo-image {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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

.footer_list{
font-size: 12px;
}

@media (max-width: 960px) {
  .img {
    width: calc(100vw - 65vw);
  }
  .demo-image .block {
    padding: 8px;
  }
}
</style>