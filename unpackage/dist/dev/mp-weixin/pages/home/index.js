"use strict";
const common_vendor = require("../../common/vendor.js");
const api_home_index = require("../../api/home/index.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  components: {},
  data() {
    return {};
  },
  onReady() {
  },
  async mounted() {
    await common_vendor.nextTick$1();
  },
  methods: {
    async taskListData() {
      let data = (await api_home_index.getTaskList()).data;
      this.taskList = data.data;
    },
    change(e) {
      console.log("change 返回:", e);
      if (this.info.selected.length > 5)
        return;
      this.info.selected.push({
        date: e.fulldate,
        info: "打卡"
      });
    },
    confirm(e) {
      console.log("confirm 返回:", e);
    },
    monthSwitch(e) {
      console.log("monthSwitchs 返回:", e);
    },
    task() {
      common_vendor.index.navigateTo({
        url: "/pagesPackage/homePage/newTask/newTask",
        animationType: "zoom-fade-out",
        animationDuration: 200
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  (_easycom_uni_section2 + _easycom_uni_calendar2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_calendar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "规划",
      type: "line"
    }),
    b: common_vendor.o($options.change),
    c: common_vendor.o($options.monthSwitch),
    d: common_vendor.p({
      selected: _ctx.info.selected
    }),
    e: common_assets._imports_0$1,
    f: common_vendor.o((...args) => $options.task && $options.task(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4978fed5"]]);
wx.createPage(MiniProgramPage);
