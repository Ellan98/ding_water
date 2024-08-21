"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
function login(data) {
  return utils_request.request({
    port: 3e3,
<<<<<<< HEAD
    url: "/auth/login",
=======
    url: "/api/v2/auth/login",
>>>>>>> 0d855a2fbe841c47ea50356c6c8c5ac660db3253
    method: "post",
    data
  });
}
function everyday() {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
<<<<<<< HEAD
      url: "http://v1.hitokoto.cn/?c=i",
=======
      url: "https://v1.hitokoto.cn/?c=i",
>>>>>>> 0d855a2fbe841c47ea50356c6c8c5ac660db3253
      success: (res) => {
        resolve(res);
      }
    });
  });
}
exports.everyday = everyday;
exports.login = login;
