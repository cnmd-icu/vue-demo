import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import NProgress from "@/config/nprogress";
import { HOME_URL } from "@/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "/",
    redirect: HOME_URL,
    component: () => import("@/layout/index.vue"),
    meta: {
      noCache: true
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue")
      },
      {
        path: "/demo",
        name: "demo",
        component: () => import("@/views/demo/index.vue")
      }, {
        path: "/read",
        name: "read",
        component:()=>import("@/views/read/index.vue")
      },
      {
        path: "/testEchartsDemo",
        name: "echartsDemo",
        component: () => import("@/test/echartsDemo/index.vue")
      }
    ]
  }
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

// 路由加载后
router.afterEach(() => {
  NProgress.done();
});
export default router;
