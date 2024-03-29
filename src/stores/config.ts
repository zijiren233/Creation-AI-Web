import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import {
  getModes,
  getModels,
  getExtraModelGroups,
  getExtraModelsWithGroup,
  getCtrlPreprocess,
  getCtrlProcess,
} from "@/apis/config";
import type { UploadUserFile } from "element-plus";

interface extraModelsData {
  Name: string;
  Preview: string;
  Type: string;
  TriggerWords: string[];
  Group: string[];
}

interface extraModelsWithGroupInterface {
  [key: string]: extraModelsData[];
}

export interface config {
  tag?: string;
  mode?: string;
  steps?: number;
  seed?: number;
  scale?: number;
  width?: number;
  height?: number;
  model?: string;
  uc?: string;
  strength?: number;
  control_preprocess?: string;
  control_process?: string;
}

interface configWithPhotoData extends config {
  num: number;
  pre_photo: string;
  control_photo: string;
}

export const useConfigStore = defineStore("config", () => {
  const modes = ref([]);

  const models = ref([]);
  const PreProcess = ref([]);
  const Process = ref([]);

  const extraModelGroups = ref<string[]>([]);
  const extraModelsWithGroup = reactive<extraModelsWithGroupInterface>({});
  const prePhoto_UploadUserFile = ref<UploadUserFile[]>();
  const controlPhoto_UploadUserFile = ref<UploadUserFile[]>();
  const loading = ref(false);

  const lockRatio = ref(false);

  const config = reactive<configWithPhotoData>({
    tag: "masterpiece, best quality",
    uc: "lowres, (worst detail:1.4),(low detail:1.4),(normal detail:1.1),(worst quality:1.4),(low quality:1.4),(monochrome:1.1),(normal quality:1.1),bad anatomy, bad hands, text, error, missing fingers, (extra digit:1.4), fewer digits, cropped, bad artist, outlines,jpeg artifacts, signature, watermark, username, blurry",
    seed: 0,
    steps: 20,
    scale: 9,
    num: 1,
    width: 512,
    height: 768,
    mode: "",
    model: "",
    pre_photo: "",
    strength: 0.6,
    control_photo: "",
    control_preprocess: "",
    control_process: "",
  });

  const creatStatus = ref<number>(0);

  const getAllModes = async () => {
    const res = await getModes();
    modes.value = res.data;
    config.mode = modes.value.at(0)!;
  };

  const getAllPreProcess = async () => {
    const res = await getCtrlPreprocess();
    PreProcess.value = res.data;
    config.control_preprocess = PreProcess.value.at(0)!;
  };

  const getAllProcess = async () => {
    const res = await getCtrlProcess();
    Process.value = res.data;
    config.control_process = Process.value.at(0)!;
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
    PreProcess,
    Process,
    loading,
    config,
    extraModelGroups,
    extraModelsWithGroup,
    lockRatio,
    prePhoto_UploadUserFile,
    controlPhoto_UploadUserFile,
    creatStatus,
    getAllModes,
    getAllModels,
    getAllPreProcess,
    getAllProcess,
    getAllExtraModelGroups,
    getAllExtraModelsWithGroup,
  };
});
