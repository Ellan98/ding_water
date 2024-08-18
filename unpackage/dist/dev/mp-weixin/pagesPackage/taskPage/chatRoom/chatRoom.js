"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "chatRoom",
  setup(__props) {
    let height = common_vendor.ref(75);
    common_vendor.ref(false);
    const linechange = (e) => {
      console.log("---", e);
    };
    common_vendor.onMounted(async () => {
      await common_vendor.nextTick$1();
      common_vendor.index.hideKeyboard();
      common_vendor.index.onKeyboardHeightChange((res) => {
        height.value = res.height + 75;
        console.log(res.height);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: _ctx.scrollTop,
        b: common_vendor.o((...args) => _ctx.upper && _ctx.upper(...args)),
        c: common_vendor.o((...args) => _ctx.lower && _ctx.lower(...args)),
        d: common_vendor.o((...args) => _ctx.scroll && _ctx.scroll(...args)),
        e: common_vendor.s(`height:calc(100vh - ${common_vendor.unref(height)}px)`),
        f: common_vendor.p({
          type: "plusempty",
          size: 30
        }),
        g: common_vendor.p({
          type: "bars",
          size: 30
        }),
        h: common_vendor.o((...args) => _ctx.bindTextAreaBlur && _ctx.bindTextAreaBlur(...args)),
        i: common_vendor.o(linechange)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70f386d9"]]);
wx.createPage(MiniProgramPage);
