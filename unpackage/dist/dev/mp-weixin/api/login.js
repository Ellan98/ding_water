"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
function login(data) {
  return utils_request.request({
    port: 3e3,
    url: "/api/v2/auth/login",
    method: "post",
    data
  });
}
function everyday() {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: "https://v1.hitokoto.cn/?c=i",
      success: (res) => {
        resolve(res);
      }
    });
  });
}
exports.everyday = everyday;
exports.login = login;
