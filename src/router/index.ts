import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import { start, close } from "@/utile/nprogress";

const Base_Title = "Creation AI";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: Layout,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/Home/index.vue"),
          meta: { title: "Home" },
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/Login/index.vue"),
          meta: { title: "Login", transition: "animate__fadeIn" },
        },
        {
          path: "waterfall",
          name: "waterfall",
          component: () => import("@/views/Waterfall/index.vue"),
          meta: { title: "Waterfall" },
        },
        {
          path: "docs",
          name: "docs",
          component: () => import("@/views/Docs/index.vue"),
          meta: { title: "Docs" },
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
  start();
  window.document.title = Base_Title + " - " + to.meta.title;
  next();
});

router.afterEach(() => {
  close();
});

export default router;
