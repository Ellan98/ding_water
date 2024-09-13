"use strict";
const common_vendor = require("../common/vendor.js");
const utils_storage = require("./storage.js");
const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    handleRequest(options, resolve, reject);
  });
};
const BASEURL = "https://ellan.online/api/v2";
const handleRequest = (options, resolve, reject) => {
  common_vendor.index.request({
    url: `${BASEURL}${options.url}`,
    method: options.method,
    header: [],
    data: options.data,
    success: (response) => {
      if (response.statusCode == 401) {
        common_vendor.index.showLoading({
          title: "即将跳转到登录页面",
          success: () => {
            common_vendor.index.switchTab({
              url: "/pages/home/index"
            });
          }
        });
        return;
      }
      resolve(response.data);
    },
    fail: (err) => {
      reject(err);
    },
    complete: (args) => {
      console.log("开始请求", args);
    }
  });
};
common_vendor.index.addInterceptor("request", {
  async invoke(args) {
    console.log("---------------------");
    let protect = false;
    ["/auth/login"].findIndex((el) => args.url.substring(8, args.url.length) == el) != -1 ? protect = false : protect = true;
    if (protect) {
      let token = utils_storage.getLocalStorage("token");
      if (!token.token) {
        common_vendor.index.showToast({
          title: "登录失效",
          icon: "loading",
          duration: 2e3,
          success: () => {
            common_vendor.index.navigateTo({
              url: "/pages/login/index",
              animationType: "pop-in",
              animationDuration: 200
            });
          }
        });
      } else {
        args.header.authorization = token.token;
      }
    }
    console.log("触发前", args);
  },
  success(args) {
    console.log("请求成功后", args);
  },
  fail(err) {
    console.log("interceptor-fail", err);
  },
  complete(res) {
    console.log("interceptor-complete", res);
  }
});
exports.request = request;
