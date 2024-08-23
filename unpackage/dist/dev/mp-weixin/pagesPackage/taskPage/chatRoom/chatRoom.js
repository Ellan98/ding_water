"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const utils_date = require("../../../utils/date.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_list_item2 + _easycom_uni_transition2 + _easycom_uni_section2 + _easycom_uni_icons2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_transition = () => "../../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_transition + _easycom_uni_section + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "chatRoom",
  setup(__props) {
    let height = common_vendor.ref(75);
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
    let questions = common_vendor.ref("");
    let scrollIntoView = common_vendor.ref("");
    let disabled = common_vendor.ref(false);
    let list = common_vendor.ref([]);
    const questionsSparkModel = () => {
      disabled.value = true;
      list.value.push({
        date: utils_date.date(),
        type: "myself",
        content: questions.value
      });
      const eventSource = new EventSource(`/api-dev/spark/conversation?content=${questions.value.trim()}`);
      eventSource.onmessage = (e) => {
        e.data.content;
        console.log(JSON.parse(e.data));
        if (e.data == "[DONE]") {
          console.log("响应结束");
          disabled.value = false;
          eventSource.close();
        }
      };
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (msg, k0, i0) => {
          return common_vendor.e({
            a: msg.type == "other"
          }, msg.type == "other" ? {
            b: common_assets._imports_0$3
          } : {}, {
            c: common_vendor.t(msg.content),
            d: common_vendor.s(msg.type == "myself" ? {
              float: "right"
            } : {
              float: "left"
            }),
            e: msg.type == "myself"
          }, msg.type == "myself" ? {
            f: common_assets._imports_0$3
          } : {}, {
            g: "70f386d9-2-" + i0 + "," + ("70f386d9-1-" + i0),
            h: "70f386d9-1-" + i0 + "," + ("70f386d9-0-" + i0),
            i: "70f386d9-0-" + i0,
            j: common_vendor.p({
              title: msg.date,
              type: "line"
            })
          });
        }),
        b: common_vendor.p({
          ["mode-class"]: "fade",
          show: true
        }),
        c: _ctx.scrollTop,
        d: common_vendor.o((...args) => _ctx.upper && _ctx.upper(...args)),
        e: common_vendor.o((...args) => _ctx.lower && _ctx.lower(...args)),
        f: common_vendor.o((...args) => _ctx.scroll && _ctx.scroll(...args)),
        g: "message-" + common_vendor.unref(scrollIntoView),
        h: common_vendor.s(`height:calc(100vh - ${common_vendor.unref(height)}px)`),
        i: common_vendor.p({
          type: "plusempty",
          size: 30
        }),
        j: common_vendor.p({
          type: "bars",
          size: 30
        }),
        k: common_vendor.o((...args) => _ctx.bindTextAreaBlur && _ctx.bindTextAreaBlur(...args)),
        l: common_vendor.o(linechange),
        m: common_vendor.unref(questions),
        n: common_vendor.o(($event) => common_vendor.isRef(questions) ? questions.value = $event.detail.value : questions = $event.detail.value),
        o: common_vendor.o(questionsSparkModel),
        p: common_vendor.unref(disabled)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70f386d9"]]);
wx.createPage(MiniProgramPage);
