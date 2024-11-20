import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    user: {
      id: "",
      username: "",
      email: "",
      avatar: "",
      nickname: "",
    }
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: any) {
      this.user = user;
    },
    reset() {
      this.token = "";
      this.user = {
        id: "",
        username: "",
        email: "",
        avatar: "",
        nickname: "",
      };
    },
  },
});