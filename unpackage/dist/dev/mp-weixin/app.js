"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const pinia_index = require("./pinia/index.js");
if (!Math) {
  "./pages/login/index.js";
  "./pages/home/index.js";
  "./pages/profile/index.js";
  "./pages/task/index.js";
  "./pagesPackage/loginPage/account/account.js";
  "./pagesPackage/homePage/newTask/newTask.js";
  "./pagesPackage/profilePage/editProfile/editProfile.js";
  "./pagesPackage/taskPage/chatRoom/chatRoom.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(pinia_index.pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
