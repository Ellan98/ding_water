"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_spark_model_index = require("../../../api/spark_model/index.js");
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
            a: common_vendor.t(msg.data)
          };
        }),
        b: _ctx.scrollTop,
        c: common_vendor.o((...args) => _ctx.upper && _ctx.upper(...args)),
        d: common_vendor.o((...args) => _ctx.lower && _ctx.lower(...args)),
        e: common_vendor.o((...args) => _ctx.scroll && _ctx.scroll(...args)),
        f: common_vendor.s(`height:calc(100vh - ${common_vendor.unref(height)}px)`),
        g: common_vendor.p({
          type: "bars",
          size: "30"
        }),
        h: common_vendor.o((...args) => _ctx.bindTextAreaBlur && _ctx.bindTextAreaBlur(...args)),
        i: common_vendor.o(linechange),
        j: common_vendor.unref(questions),
        k: common_vendor.o(($event) => common_vendor.isRef(questions) ? questions.value = $event.detail.value : questions = $event.detail.value),
        l: common_vendor.o(questionsSparkModel)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70f386d9"]]);
wx.createPage(MiniProgramPage);
