import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { search } from "@/apis/images";

export const useWaterfallStore = defineStore("waterfall", () => {
    const datas = ref<
        {
            id: string;
            image: string;
            width: number;
            height: number;
            cfg: string;
        }[]
    >([]);
    const input = ref<string>("");
    const currentPage = ref<number>(1);
    const maxCount = ref<number>(0);
    const imgModal = ref<boolean>(false);
    const imgData = ref<{
        [propName: string]: any;
    }>({});
    const now = new Date().getTime();
    const load = async (tag: string = input.value, page: number = currentPage.value, time: number = now) => {
        const res = await search(tag, "latest", page, time);
        maxCount.value = res.data.maxcount;
        datas.value = res.data.resoult;
    };

    return {
        datas,
        input,
        currentPage,
        maxCount,
        imgModal,
        imgData,
        load
    };
});
