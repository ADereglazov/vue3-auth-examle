import { defineStore } from "pinia";
import router from "@/router";
import { fetchWrapper } from "@/helpers";

const baseUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
    pending: false,
  }),
  actions: {
    async login(username, password) {
      this.pending = true;
      const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {
        username,
        password,
      });
      this.pending = false;

      user.authdata = window.btoa(username + ":" + password);
      this.user = user;

      localStorage.setItem("user", JSON.stringify(user));

      await router.push(this.returnUrl || "/profile");
    },
    async logout() {
      this.user = null;
      localStorage.removeItem("user");
      await router.push("/");
    },
  },
});
