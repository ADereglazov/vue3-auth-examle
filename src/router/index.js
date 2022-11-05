import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../views/SignIn.vue";
import PageNotFound from "../views/PageNotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "sign-in",
      component: SignIn,
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/UserProfile.vue"),
    },
    { path: "/:pathMatch(.*)*", component: PageNotFound },
  ],
});

export default router;
