"use strict";
const common_vendor = require("../common/vendor.js");
function setLocalStorage(key, data) {
  common_vendor.index.setStorage({
    key,
    data
  });
}
function getLocalStorage(key) {
  return common_vendor.index.getStorageSync(key);
}
exports.getLocalStorage = getLocalStorage;
exports.setLocalStorage = setLocalStorage;
