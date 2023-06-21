<script setup lang="ts">
import SwaggerUI from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";
import { Buffer } from "buffer";
import router from "@/router";
import { useNotificationStore } from "@/stores/notification";

onMounted(() => {
  SwaggerUI({
    url: "/docs/doc.json",
    dom_id: "#Docs",
    deepLinking: true,
    displayOperationId: true,
    displayRequestDuration: true,
    syntaxHighlight: { activate: true },
    requestInterceptor: (req) => {
      const authStore = useAuthStore();
      const token = Buffer.from(
        `${authStore.auth.username}:${authStore.auth.password}`,
        "utf-8"
      ).toString("base64");
      req.headers.Authorization = `Basic ${token}`;
      return req;
    },
    responseInterceptor: (resp) => {
      if (resp.status === 401) {
        const NotificationStore = useNotificationStore();
        NotificationStore.error("Auth Error", 3000);
        const authStore = useAuthStore();
        authStore.signout();
        router.replace({
          name: "login",
        });
      }
      return resp;
    },
    validatorUrl: undefined,
  });
});
</script>

<template>
  <div id="Docs"></div>
</template>
