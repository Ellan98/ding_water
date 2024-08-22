"use strict";
const common_vendor = require("../common/vendor.js");
const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    handleRequest(options, resolve, reject);
  });
};
const BASEURL = "https://ellan.online/api/v2";
const handleRequest = (options, resolve, reject) => {
  common_vendor.index.showLoading({
    title: "加载中..."
  });
  common_vendor.index.request({
    // url: BASEURL + ':' + options.port + options.url,
    url: `${BASEURL}${options.url}`,
    method: options.method,
    data: options.data,
    success: (response) => {
      if (response.statusCode == 401) {
        common_vendor.index.showToast({
          icon: "error",
          position: "top",
          title: "请尝试登录"
        });
        return;
      }
      resolve(response);
    },
    fail: (err) => {
      console.log("error", err);
      reject(err);
    },
    complete: () => {
      common_vendor.index.hideLoading();
    }
  });
};
exports.request = request;
