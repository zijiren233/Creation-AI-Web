import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: Layout,
      meta: { title: "Creation AI" },
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/Home/index.vue"),
          meta: { title: "Creation AI - Home" },
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/Login/index.vue"),
          meta: { title: "Creation AI - Login" },
        },
        {
          path: "waterfall",
          name: "waterfall",
          component: () => import("@/views/Waterfall/index.vue"),
          meta: { title: "Creation AI - Waterfall" },
        },
        {
          path: "docs",
          name: "docs",
          component: () => import("@/views/Docs/index.vue"),
          meta: { title: "Creation AI - Docs" },
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
    };
  },
});

router.beforeEach((to: any, from: any, next) => {
  window.document.title = to.meta.title;
  next();
});

export default router;
