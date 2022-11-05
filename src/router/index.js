import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "sign-in",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/UserProfile.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/PageNotFound.vue"),
    },
  ],
});

export default router;
