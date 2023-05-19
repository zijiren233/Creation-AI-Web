<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notification.js";
const AuthStore = useAuthStore();
const NotificationStore = useNotificationStore();
</script>

<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    unique-opened
    router
    :ellipsis="false"
  >
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item index="/waterfall">Waterfall</el-menu-item>
    <el-menu-item index="/docs">Docs</el-menu-item>

    <div class="flex-grow" />
    <template
      v-if="AuthStore.auth.password === '' || AuthStore.auth.username === ''"
    >
      <el-menu-item index="/login">Log in</el-menu-item>

      <a target="_blank" href="https://t.me/NovelAIDraw_bot?start=start"
        ><el-menu-item>Sign up</el-menu-item></a
      >
    </template>
    <template v-else>
      <el-menu-item
        index="/login"
        @click="
          () => {
            AuthStore.signout();
            NotificationStore.success('Sign out success!', 3000);
          }
        "
        v-show="
          AuthStore.auth.password !== '' && AuthStore.auth.username !== ''
        "
        >Sign out</el-menu-item
      >
    </template>
  </el-menu>
</template>

<style lang="scss">
.flex-grow {
  flex-grow: 1;
}
</style>
