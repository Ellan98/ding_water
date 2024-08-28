"use strict";
const common_vendor = require("../common/vendor.js");
function setLocalStorage(key, data) {
  common_vendor.index.setStorage({
    key,
    data
  });
}
exports.setLocalStorage = setLocalStorage;
