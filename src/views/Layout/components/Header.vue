<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notification.js";
const AuthStore = useAuthStore();
const NotificationStore = useNotificationStore();
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" unique-opened router>
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item index="/waterfall">Waterfall</el-menu-item>

    <div class="flex-grow" />
    <el-menu-item
      index="/login"
      v-show="AuthStore.auth.password === '' || AuthStore.auth.username === ''"
      >Log in</el-menu-item
    >
    <el-menu-item
      index="/login"
      @click="
        () => {
          AuthStore.remove();
          NotificationStore.success('Sign out success!', 3000);
        }
      "
      v-show="AuthStore.auth.password !== '' && AuthStore.auth.username !== ''"
      >Sign out</el-menu-item
    >
  </el-menu>
</template>

<style lang="scss">
.flex-grow {
  flex-grow: 1;
}
</style>
