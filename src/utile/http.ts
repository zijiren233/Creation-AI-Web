import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const httpInstanse = axios.create({
    baseURL: "https://creation.pyhdxy.top/api",
    timeout: 60000,
});

declare module "axios" {
    interface AxiosResponse<T = any> {
        err: string;
        time: number
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}

httpInstanse.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore()
        const token = btoa(`${authStore.auth.username}:${authStore.auth.password}`)
        if (token) {
            config.headers.Authorization = `Basic ${token}`
        }
        return config;
    },
    (e) => Promise.reject(e)
);

httpInstanse.interceptors.response.use(
    (res) => res.data,
    (e) => {
        return Promise.reject(e);
    }
);

export default httpInstanse;
