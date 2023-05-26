import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useShowImagesStore = defineStore("showImages", () => {
  const imgData = ref<string[]>([]);
  function pushImg(data: string[]) {
    imgData.value.unshift(
      ...data.map((item) => "data:image/png;base64," + item)
    );
  }
  return {
    imgData,
    pushImg,
  };
});
