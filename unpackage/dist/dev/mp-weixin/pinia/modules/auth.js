"use strict";
const common_vendor = require("../../common/vendor.js");
const useAuthStore = common_vendor.defineStore("auth", {
  state: () => ({
    name: "ellan"
  }),
  getters: {},
  actions: {}
});
exports.useAuthStore = useAuthStore;
