<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useNotificationStore } from "@/stores/notification.js";
import router from "@/router";
import { ElForm } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
const NotificationStore = useNotificationStore();
const AuthStore = useAuthStore();
const userAuth = reactive({
  username: <string>"",
  password: <string>"",
});

const rules = reactive<FormRules>({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
    { min: 6, max: 14, message: "username should be 6 to 14", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
    { min: 6, max: 14, message: "password should be 6 to 14", trigger: "blur" },
  ],
});

const formRef = ref<FormInstance>();

function Save() {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      AuthStore.login(userAuth.username, userAuth.password);
      NotificationStore.success("Save Success!", 3000);
      router.replace({
        name: "home",
      });
    }
  });
}
</script>

<template>
  <div>
    <el-form :rules="rules" ref="formRef" :model="userAuth">
      <el-form-item
        prop="username"
        style="margin: 20px auto; max-width: 300px"
        label="Username"
      >
        <el-input
          v-model="userAuth.username"
          placeholder="Please input username"
          :style="{ 'max-width': '158px' }"
        />
      </el-form-item>
      <el-form-item
        prop="password"
        style="margin: 20px auto; max-width: 300px"
        label="Password"
        ><el-input
          :style="{ 'max-width': '158px' }"
          v-model="userAuth.password"
          type="password"
          placeholder="Please input password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin: 0 auto" @click="Save"
          >Save</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
