<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notification.js";
const AuthStore = useAuthStore();
const NotificationStore = useNotificationStore();
const signup = () => {
  window.open("https://t.me/NovelAIDraw_bot?start=start", "_blank");
};
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
      <el-sub-menu index="/login">
        <template #title>Auth</template>
        <el-menu-item index="/login">Log in</el-menu-item>
        <el-menu-item index="/login" @click="signup">Sign up</el-menu-item>
      </el-sub-menu>
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
@media (max-width: 375px) {
    .el-menu-item {
        padding: 0 10px;
    }
  }

  @media (max-width: 330px) {
    .el-slider__runway.show-input,
    .config_radio-fix-size {
        display: none;
    }
  }

  @media (max-width: 315px) {
    .el-menu-item {
        padding: 0 6px;
        font-size: 13px;
    }
    .el-sub-menu__title {
        padding: 0 10px;
        padding-right: calc(30px + 7px);
    }
}

.flex-grow {
  flex-grow: 1;
}
</style>
