import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import {
  getModes,
  getModels,
  getExtraModelGroups,
  getExtraModelsWithGroup,
} from "@/apis/config";
import type { UploadRawFile } from "element-plus";

interface extraModelsWithGroupInterface {
  [key: string]: extraModelsData[]
}


interface extraModelsData {
  Name: string,
  Preview: string,
  Type: string,
  TriggerWords: string[],
  Group: string[]
}

export interface config {
  tag: string,
  uc: string,
  seed: number,
  num: number,
  steps: number,
  scale: number,
  width: number,
  height: number,
  mode: string,
  model: string,
  pre_photo: string,
}

export const useConfigStore = defineStore("config", () => {
  const modes = ref([]);

  const models = ref([]);

  const extraModelGroups = ref([]);
  const extraModelsWithGroup = reactive<extraModelsWithGroupInterface>({});
  const prePhoto_UploadRawFile = ref<UploadRawFile>();
  const loading = ref(false);

  const lockRatio = ref(false);

  const config = reactive<config>({
    tag: "masterpiece, best quality",
    uc: "lowres, (worst detail:1.4),(low detail:1.4),(normal detail:1.1),(worst quality:1.4),(low quality:1.4),(monochrome:1.1),(normal quality:1.1),bad anatomy, bad hands, text, error, missing fingers, (extra digit:1.4), fewer digits, cropped, bad artist, outlines,jpeg artifacts, signature, watermark, username, blurry",
    seed: 0,
    num: 1,
    steps: 20,
    scale: 9,
    width: 512,
    height: 768,
    mode: "",
    model: "",
    pre_photo: "",
  });

  const getAllModes = async () => {
    const res = await getModes();
    modes.value = res.data;
    config.mode = modes.value.at(0)!;
  };

  const getAllModels = async () => {
    const res = await getModels();
    models.value = res.data;
    config.model = models.value.at(0)!;
  };

  const getAllExtraModelsWithGroup = async (group: string) => {
    const res = await getExtraModelsWithGroup(group);
    extraModelsWithGroup[group] = res.data;
  };

  const getAllExtraModelGroups = async () => {
    const res = await getExtraModelGroups();
    extraModelGroups.value = res.data;
  };

  return {
    modes,
    models,
    loading,
    config,
    extraModelGroups,
    extraModelsWithGroup,
    lockRatio,
    prePhoto_UploadRawFile,
    getAllModes,
    getAllModels,
    getAllExtraModelGroups,
    getAllExtraModelsWithGroup,
  };
});
