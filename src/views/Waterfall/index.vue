<script setup lang="ts">
import { ref, onMounted, watch, reactive } from "vue";
import { search } from "@/apis/images";
import router from "@/router";
import { onBeforeRouteUpdate } from "vue-router";
import { stringToNumber } from "@/utile/utils";
import { parse } from "yaml";
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
const imgModal = ref(false);
let imgData: {
  id: string;
  image: string;
  width: number;
  height: number;
  cfg: string;
  [propName: string]: any;
};

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
onBeforeRouteUpdate((to) => {
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
      page: currentPage.value,
    },
  });
}
function changeTag() {
  datas.value = [];
  router.push({
    path: "/waterfall",
    query: {
      tag: input.value,
      page: 1,
    },
  });
}

function openImgModal(data: any) {
  const cfg = parse(data.cfg);

  imgModal.value = true;
  imgData = {
    id: data.id,
    image: data.image,
    width: data.width,
    height: data.height,
    cfg: data.cfg,
    tag: cfg.tag,
    mode: cfg.mode,
    steps: cfg.steps,
    seed: cfg.seed,
    scale: cfg.scale,
    width_: cfg.width,
    height_: cfg.height,
    model: cfg.model,
    uc: cfg.uc,
  };
}
</script>

<template>
  <div>
    <el-row :style="{ 'display': 'flex', 'justify-content':'center', 'flex-wrap':'nowrap','margin':'0 auto 10px' }">
      <el-input
        @keyup.enter="changeTag"
        v-model="input"
        :style="{
          width: '230px',
          'margin-right': '20px'
        }"
        placeholder="Search tag"
      />
      <el-button type="primary" @click="changeTag" round>Search</el-button>
    </el-row>
    <div class="demo-image">
      <div v-for="(item, index) in datas" :key="item.id" class="block">
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
      'display':'flex',
      'justify-content':'center'
    }"
      v-show="maxCount > 20"
      :page-size="20"
      :pager-count="4"
      v-model:current-page="currentPage"
      @current-change="changePage"
      layout="prev, pager, next"
      :total="maxCount"
    />
    <el-dialog 
      v-model="imgModal"
      title="Preview"
      align-center
      width="90%"
      destroy-on-close
    >
      <el-row :gutter="30" :style="{'margin':'-20px 0 0 0'}">
        <el-col :md="8" :sm="10">
          <el-image
          :style="{
        'padding':'0 0 20px 0'}"
            :src="imgData.image"
            fit="contain"
            loading="lazy"
          ></el-image>
          <br />
          <br />
        </el-col>
        <el-col :md="16" :sm="14">
          <el-form scroll-to-error hide-required-asterisk status-icon>
            <el-form-item label="Tag:" prop="tag">
              <el-input v-model="imgData.tag" class="textarea_infoblock"  type="textarea" />
            </el-form-item>
            <el-form-item label="Uc:">
              <el-input v-model="imgData.uc" class="textarea_infoblock"  type="textarea" />
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="Steps:" class="label_infoblock">{{ imgData.steps }}</el-form-item>
                <el-form-item label="Scale:" class="label_infoblock">{{ imgData.scale }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Width:" prop="size" class="label_infoblock">{{
                  imgData.width_
                }}</el-form-item>
                <el-form-item label="Height:" class="label_infoblock">{{
                  imgData.height_
                }}</el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="Mode:" class="label_infoblock">{{ imgData.mode }}</el-form-item>
            <el-form-item required label="Model:" class="label_infoblock">{{
              imgData.model
            }}</el-form-item>
            <el-form-item label="Seed:" class="label_infoblock">
              <el-input-number
                v-model.number="imgData.seed"
                :controls="false"
                :min="0"
                :max="4294967295"
                :step="1"
                step-strictly
              />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="imgModal = false">Cancel</el-button>
          <el-button type="primary" @click="imgModal = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
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

@media (max-width: 960px) {
  .img {
    width: calc(100vw - 65vw);
  }
  .demo-image .block {
    padding: 8px;
  }
}
</style>
