"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_segmented_control2 + _easycom_uni_section2)();
}
const _easycom_uni_segmented_control = () => "../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "visualZone",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    const segmentedItem = ["日", "周", "月", "年"];
    let current = common_vendor.ref(0);
    common_vendor.onMounted(async () => {
      await common_vendor.nextTick$1();
      await createChart();
    });
    const queryNode = async (nodeName) => {
      return new Promise((resolve, reject) => {
        const query = common_vendor.index.createSelectorQuery().in(instance);
        query.select(nodeName).fields({
          node: true,
          size: true
        }).exec((barStyle) => {
          setTimeout(() => {
            console.log("barStyle", barStyle);
          }, 500);
          const systemInfo = common_vendor.index.getSystemInfoSync();
          const pixelRatio = systemInfo.pixelRatio;
          barStyle[0].width * pixelRatio;
          barStyle[0].height * pixelRatio;
        });
      });
    };
    const createChart = async () => {
      await queryNode("#barChart");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          current: common_vendor.unref(current),
          values: segmentedItem,
          ["style-type"]: "button",
          ["active-color"]: "#01cc70",
          inActiveColor: "#f1f5f8"
        }),
        b: common_vendor.p({
          title: "可视化",
          type: "line"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-622968a8"]]);
wx.createComponent(Component);
