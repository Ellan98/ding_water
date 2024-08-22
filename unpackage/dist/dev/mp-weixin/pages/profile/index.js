"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    editBanner() {
      console.log("执行");
      this.$refs.popup.open("bottom");
    },
    change(e) {
      console.log("当前模式：" + e.type + ",状态：" + e.show);
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.editBanner && $options.editBanner(...args)),
    b: common_assets._imports_0,
    c: common_vendor.p({
      title: "编辑资料",
      ["show-extra-icon"]: true,
      ["extra-icon"]: {
        color: "#4e5058",
        size: "30",
        type: "compose"
      },
      link: "navigateTo",
      to: "/pagesPackage/profilePage/editProfile/editProfile"
    }),
    d: common_vendor.p({
      title: "分类归档",
      ["show-extra-icon"]: true,
      ["extra-icon"]: {
        color: "#4e5058",
        size: "30",
        type: "paperclip"
      },
      link: true
    }),
    e: common_vendor.p({
      title: "存储",
      ["show-extra-icon"]: true,
      ["extra-icon"]: {
        color: "#4e5058",
        size: "30",
        type: "map"
      },
      link: true
    }),
    f: common_vendor.p({
      border: true,
      clickable: true
    }),
    g: common_vendor.p({
      title: "设置",
      ["show-extra-icon"]: true,
      ["extra-icon"]: {
        color: "#4e5058",
        size: "30",
        type: "settings"
      },
      link: true
    }),
    h: common_vendor.p({
      title: "关于",
      ["show-extra-icon"]: true,
      ["extra-icon"]: {
        color: "#4e5058",
        size: "30",
        type: "info"
      },
      link: true
    }),
    i: common_vendor.p({
      border: true,
      clickable: true
    }),
    j: common_vendor.p({
      title: "放松一下",
      ["show-extra-icon"]: true,
      ["extra-icon"]: {
        color: "#4e5058",
        size: "30",
        type: "map-pin-ellipse"
      },
      link: true
    }),
    k: common_vendor.p({
      border: true,
      clickable: true
    }),
    l: common_vendor.p({
      title: "登出",
      ["show-extra-icon"]: true,
      ["extra-icon"]: {
        color: "#4e5058",
        size: "30",
        type: "cloud-download"
      },
      link: true
    }),
    m: common_vendor.p({
      border: true,
      clickable: true
    }),
    n: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    o: common_vendor.sr("popup", "201c0da5-11"),
    p: common_vendor.o($options.change),
    q: common_vendor.p({
      ["background-color"]: "#fff"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-201c0da5"]]);
wx.createPage(MiniProgramPage);
