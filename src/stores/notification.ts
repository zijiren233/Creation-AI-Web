import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { ElNotification } from "element-plus"

export const useNotificationStore = defineStore("notification", () => {
  function notification(title: string, message: string, duration: number) {
    ElNotification({
      title,
      message,
      duration,
    });
  }

  function success(message: string, duration: number) {
    ElNotification({
      title: "Success",
      message,
      duration,
      type: "success",
    });
  }

  function warning(message: string, duration: number) {
    ElNotification({
      title: "Warning",
      message,
      duration,
      type: "warning",
    });
  }

  function info(message: string, duration: number) {
    ElNotification({
      title: "Info",
      message,
      duration,
      type: "info",
    });
  }

  function error(message: string, duration: number) {
    ElNotification({
      title: "Error",
      message,
      duration,
      type: "error",
    });
  }

  return {
    notification,
    success,
    warning,
    info,
    error,
  };
});
