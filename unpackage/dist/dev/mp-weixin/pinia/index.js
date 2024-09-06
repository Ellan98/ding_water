"use strict";
const common_vendor = require("../common/vendor.js");
require("./modules/auth.js");
require("./modules/chat.js");
const pinia = common_vendor.createPinia();
exports.pinia = pinia;
