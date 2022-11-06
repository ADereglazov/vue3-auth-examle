import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import router from "@/router";

const baseUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {
        username,
        password,
      });

      // update pinia state with user object + basic auth data
      user.authdata = window.btoa(username + ":" + password);
      this.user = user;

      // store user details and basic auth data in local storage
      // to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      // redirect
      router.push(this.returnUrl || "/profile");
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/");
    },
  },
});
