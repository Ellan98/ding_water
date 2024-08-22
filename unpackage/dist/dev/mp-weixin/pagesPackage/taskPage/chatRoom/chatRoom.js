"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const api_spark_model_index = require("../../../api/spark_model/index.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_list_item2 + _easycom_uni_section2 + _easycom_uni_list2 + _easycom_uni_icons2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_section + _easycom_uni_list + _easycom_uni_icons)();
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
    let questions = common_vendor.ref("");
    let list = common_vendor.ref([]);
    const questionsSparkModel = async () => {
      let responseData = await api_spark_model_index.sparkModelQuestions({
        content: questions.value
      });
      list.value.push(responseData);
      questions.value = "";
      console.log("响应数据", responseData);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (msg, k0, i0) => {
          return {
            a: "70f386d9-2-" + i0 + "," + ("70f386d9-1-" + i0),
            b: common_vendor.p({
              title: "spark",
              note: msg.data
            }),
            c: "70f386d9-1-" + i0 + ",70f386d9-0"
          };
        }),
        b: common_assets._imports_0,
        c: common_vendor.p({
          title: "2024/8/22 18:07",
          type: "line"
        }),
        d: common_vendor.p({
          border: true
        }),
        e: _ctx.scrollTop,
        f: common_vendor.o((...args) => _ctx.upper && _ctx.upper(...args)),
        g: common_vendor.o((...args) => _ctx.lower && _ctx.lower(...args)),
        h: common_vendor.o((...args) => _ctx.scroll && _ctx.scroll(...args)),
        i: common_vendor.s(`height:calc(100vh - ${common_vendor.unref(height)}px)`),
        j: common_vendor.p({
          type: "plusempty",
          size: 30
        }),
        k: common_vendor.p({
          type: "bars",
          size: 30
        }),
        l: common_vendor.o((...args) => _ctx.bindTextAreaBlur && _ctx.bindTextAreaBlur(...args)),
        m: common_vendor.o(linechange),
        n: common_vendor.unref(questions),
        o: common_vendor.o(($event) => common_vendor.isRef(questions) ? questions.value = $event.detail.value : questions = $event.detail.value),
        p: common_vendor.o(questionsSparkModel)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70f386d9"]]);
wx.createPage(MiniProgramPage);
