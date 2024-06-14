import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null, // Store user information (initially null)
  }),
  actions: {
    setUserInfo(user) {
      this.userInfo = user;
    },
    clearUserInfo() {
      this.userInfo = null;
    },
    getUserData() {
      return this.userInfo;
    },
  },
});
