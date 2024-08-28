"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_storage = require("../../utils/storage.js");
const api_login = require("../../api/login.js");
const useAuthStore = common_vendor.defineStore("auth", {
  state: () => ({
    userName: "",
    avatar: "",
    email: "",
    gender: "",
    id: void 0,
    phone: "",
    token: "",
    userId: void 0
  }),
  getters: {},
  actions: {
    async setAuthProfile(info) {
      common_vendor.index.showLoading({
        title: "登录中"
      });
      try {
        let respData = (await api_login.login(info)).data;
        this.userName = respData.name;
        this.avatar = respData.avatar;
        this.email = respData.email;
        this.gender = respData.gender;
        this.id = respData.id;
        this.phone = respData.phone;
        this.token = respData.token;
        this.userId = respData.userId;
        utils_storage.setLocalStorage("token", this.token);
        return true;
      } catch (error) {
        common_vendor.index.showToast({
          title: "失败"
        });
        console.error("Error during login:", error);
        return false;
      }
    }
  }
});
exports.useAuthStore = useAuthStore;
