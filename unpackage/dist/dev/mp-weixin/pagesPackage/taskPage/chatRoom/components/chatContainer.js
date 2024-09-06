"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
require("../../../../pinia/index.js");
const pinia_modules_chat = require("../../../../pinia/modules/chat.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_list_item2 + _easycom_uni_transition2 + _easycom_uni_section2)();
}
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_transition = () => "../../../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
const _easycom_uni_section = () => "../../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_transition + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "chatContainer",
  setup(__props) {
    const chatStore = pinia_modules_chat.useChatStore();
    let list = common_vendor.computed(() => {
      return chatStore.list;
    });
    let height = common_vendor.computed(() => chatStore.chatContainerHeight);
    let keyBoardZoneExtendHeight = common_vendor.computed(() => chatStore.keyBoardZoneExtendHeight);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (msg, k0, i0) => {
          return common_vendor.e({
            a: msg.type == "other"
          }, msg.type == "other" ? {
            b: common_assets._imports_0$2
          } : {}, {
            c: msg.loading
          }, msg.loading ? {} : {
            d: common_vendor.t(msg.content),
            e: common_vendor.s(msg.type == "myself" ? {
              float: "right"
            } : {
              float: "left"
            })
          }, {
            f: msg.type == "myself"
          }, msg.type == "myself" ? {
            g: common_assets._imports_1
          } : {}, {
            h: "f8104c5c-2-" + i0 + "," + ("f8104c5c-1-" + i0),
            i: "f8104c5c-1-" + i0 + "," + ("f8104c5c-0-" + i0),
            j: "content" + msg.id,
            k: "f8104c5c-0-" + i0,
            l: common_vendor.p({
              title: msg.date,
              type: "line",
              id: "content" + msg.id
            })
          });
        }),
        b: common_vendor.p({
          ["mode-class"]: "fade",
          show: true
        }),
        c: _ctx.scrollTop,
        d: common_vendor.s(`height:calc(100vh - ${common_vendor.unref(height) + common_vendor.unref(keyBoardZoneExtendHeight)}px)`),
        e: common_vendor.o((...args) => _ctx.upper && _ctx.upper(...args)),
        f: common_vendor.o((...args) => _ctx.lower && _ctx.lower(...args)),
        g: common_vendor.o((...args) => _ctx.scroll && _ctx.scroll(...args)),
        h: "content" + _ctx.scrollIntoView,
        i: common_vendor.o(($event) => _ctx.holdKeyboard = false)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f8104c5c"]]);
wx.createComponent(Component);
