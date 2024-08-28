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
    url: `${BASEURL}${options.url}`,
    method: options.method,
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
    complete: () => {
      common_vendor.index.hideLoading();
    }
  });
};
exports.request = request;
