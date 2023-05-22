import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { search } from "@/apis/images";
import type { config } from "@/stores/config";

interface configWithPhotoID extends config {
  pre_photo_id?: string;
  control_photo_id?: string;
}

interface searchData {
  cfg: configWithPhotoID;
  id: string;
  image: string;
  //   width: number;
  //   height: number;
}

export const useWaterfallStore = defineStore("waterfall", () => {
  const datas = ref<searchData[]>([]);
  const input = ref<string>("");
  const currentPage = ref<number>(1);
  const maxCount = ref<number>(0);
  const imgModal = ref<boolean>(false);
  const now = new Date().getTime();
  const load = async (
    tag: string = input.value,
    page: number = currentPage.value,
    time: number = now
  ) => {
    const res = await search(tag, "latest", page, time);
    maxCount.value = res.data.maxcount;
    datas.value = res.data.resoult;
  };
  const currentClickData = ref<searchData>({
    cfg: <configWithPhotoID>{},
    id: "",
    image: "",
  });
  return {
    datas,
    input,
    currentPage,
    maxCount,
    imgModal,
    currentClickData,
    load,
  };
});
