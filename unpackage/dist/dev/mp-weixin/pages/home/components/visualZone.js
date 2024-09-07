"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  _easycom_uni_segmented_control2();
}
const _easycom_uni_segmented_control = () => "../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
if (!Math) {
  _easycom_uni_segmented_control();
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
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-622968a8"]]);
wx.createComponent(Component);
