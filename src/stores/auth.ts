import { ref, reactive } from "vue";
import { defineStore } from "pinia";

interface Auth {
  username: string;
  password: string;
}

export const useAuthStore = defineStore(
  "auth",
  () => {
    const auth = ref<Auth>({
      username: "",
      password: "",
    });
    function login(username: string, password: string) {
      auth.value.username = username;
      auth.value.password = password;
    }
    function signout() {
      auth.value.username = "";
      auth.value.password = "";
    }
    return {
      auth,
      login,
      signout,
    };
  },
  {
    persist: true,
  }
);
