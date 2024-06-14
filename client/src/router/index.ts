import {
  createRouter,
  createWebHistory,
  RouterOptions,
  Router,
  RouteRecordRaw,
} from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/order",
    name: "Order",
    component: () => import("@/pages/FollowOrder.vue"),
  },
  {
    path: "/group",
    name: "Group",
    component: () => import("@/pages/CreateGroup.vue"),
  },
  {
    path: "/mygroup",
    name: "CheckGroup",
    component: () => import("@/pages/CheckGroup.vue"),
  },
  { path: "/", name: "Home", component: () => import("@/pages/index.vue") },
];

const options: RouterOptions = {
  history: createWebHistory(),
  routes,
};

// Router是路由对象类型
const router: Router = createRouter(options);

export default router;
