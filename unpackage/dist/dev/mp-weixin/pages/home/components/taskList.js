"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../pinia/index.js");
const api_home_index = require("../../../api/home/index.js");
const pinia_modules_auth = require("../../../pinia/modules/auth.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_list_item2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_swipe_action_item = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "taskList",
  setup(__props) {
    const auth = pinia_modules_auth.useAuthStore();
    let list = common_vendor.ref([]);
    common_vendor.computed(() => auth.userId);
    common_vendor.onMounted(() => {
      common_vendor.nextTick$1();
      taksList();
    });
    const taksList = async () => {
      let respData = await api_home_index.getTaskList({
        userId: "528978096703930750"
      });
      list.value = respData.data;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (task, k0, i0) => {
          return {
            a: "22955ed1-3-" + i0 + "," + ("22955ed1-2-" + i0),
            b: common_vendor.p({
              title: task.title,
              note: task.Descript,
              showArrow: true,
              ["thumb-size"]: "sm",
              rightText: "小图"
            }),
            c: "22955ed1-2-" + i0 + ",22955ed1-1",
            d: task.userId
          };
        }),
        b: common_vendor.p({
          ["right-options"]: _ctx.options2,
          show: "none",
          ["auto-close"]: false
        }),
        c: common_vendor.p({
          title: "列表",
          type: "line"
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
