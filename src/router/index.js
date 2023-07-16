import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store";

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

router.beforeEach(async (to) => {
  const profilePages = ["/profile"];
  const pathAuthRequired = profilePages.includes(to.path);
  const auth = useAuthStore();
  const authorized = auth.user;

  if (pathAuthRequired && !authorized) {
    auth.returnUrl = to.fullPath;
    return "/";
  } else if ((to.path === "/" || to.path === "/login") && authorized) {
    return "/profile";
  }
});

export default router;
