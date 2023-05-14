import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notification";
import axios from "axios";
import router from '@/router'

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
        const NotificationStore = useNotificationStore()
        if (e.response.status === 401) {
            NotificationStore.error("Auth Error", 3000)
            const authStore = useAuthStore()
            authStore.signout()
            router.push({
                name: "login"
            })
        }
        return Promise.reject(e);
    }
);

export default httpInstanse;
