"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "editProfile",
  setup(__props) {
    common_vendor.ref(0);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((...args) => _ctx.editBanner && _ctx.editBanner(...args)),
        b: common_assets._imports_0,
        c: common_vendor.o(_ctx.input),
        d: common_vendor.p({
          placeholder: "请输入内容"
        }),
        e: common_vendor.p({
          label: "昵称",
          required: true
        }),
        f: common_vendor.o(_ctx.input),
        g: common_vendor.p({
          placeholder: "请输入内容"
        }),
        h: common_vendor.p({
          label: "标签",
          required: true
        }),
        i: common_vendor.o(_ctx.input),
        j: common_vendor.p({
          placeholder: "简单介绍一下自己吧"
        }),
        k: common_vendor.p({
          label: "简介",
          required: true
        }),
        l: common_vendor.sr("baseForm", "e5f35076-0"),
        m: common_vendor.p({
          ["label-position"]: "top"
        }),
        n: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
        o: common_vendor.sr("popup", "e5f35076-7"),
        p: common_vendor.o(_ctx.change),
        q: common_vendor.p({
          ["background-color"]: "#fff"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e5f35076"]]);
wx.createPage(MiniProgramPage);
