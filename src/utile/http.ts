import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notification";
import axios from "axios";
import router from "@/router";
import { Buffer } from "buffer";

const httpInstanse = axios.create({
  baseURL: "https://creation.pyhdxy.top/api",
  timeout: 60000,
});

declare module "axios" {
  interface AxiosResponse<T = any> {
    err: string;
    time: number;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

httpInstanse.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.auth.username && authStore.auth.password) {
      const token = Buffer.from(
        `${authStore.auth.username}:${authStore.auth.password}`,
        "utf-8"
      ).toString("base64");
      config.headers.Authorization = `Basic ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

httpInstanse.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const NotificationStore = useNotificationStore();
    if (e.response.status === 401) {
      NotificationStore.error("Auth Error", 3000);
      const authStore = useAuthStore();
      authStore.signout();
      router.replace({
        name: "login",
      });
    }
    return Promise.reject(e);
  }
);

export default httpInstanse;
