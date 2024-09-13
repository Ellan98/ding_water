"use strict";
const common_vendor = require("../../common/vendor.js");
common_vendor.defineStore("app", {
  state: () => ({
    tipsStatus: false,
    protectUrl: ["/auth/login"]
    //不经过拦截的 url
  }),
  getters: {},
  actions: {}
});
