"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
function getDate(date, AddDayCount = 0) {
  if (!date) {
    date = /* @__PURE__ */ new Date();
  }
  if (typeof date !== "object") {
    date = date.replace(/-/g, "/");
  }
  const dd = new Date(date);
  dd.setDate(dd.getDate() + AddDayCount);
  const y = dd.getFullYear();
  const m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return {
    fullDate: y + "-" + m + "-" + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay()
  };
}
const _sfc_main = {
  components: {},
  data() {
    return {
      info: {
        lunar: true,
        range: true,
        insert: false,
        selected: []
      },
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#007AFF",
        iconColor: "#fff"
      }
    };
  },
  onReady() {
    this.$nextTick(() => {
      this.showCalendar = true;
    });
    setTimeout(() => {
      this.info.date = getDate(/* @__PURE__ */ new Date(), -30).fullDate;
      this.info.startDate = getDate(/* @__PURE__ */ new Date(), -60).fullDate;
      this.info.endDate = getDate(/* @__PURE__ */ new Date(), 30).fullDate;
      this.info.selected = [
        {
          date: getDate(/* @__PURE__ */ new Date(), -3).fullDate,
          info: "打卡"
        },
        {
          date: getDate(/* @__PURE__ */ new Date(), -2).fullDate,
          info: "签到",
          data: {
            custom: "自定义信息",
            name: "自定义消息头"
          }
        },
        {
          date: getDate(/* @__PURE__ */ new Date(), -1).fullDate,
          info: "已打卡"
        }
      ];
    }, 2e3);
  },
  methods: {
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
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  (_easycom_uni_section2 + _easycom_uni_calendar2 + _easycom_uni_group2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
const _easycom_uni_group = () => "../../uni_modules/uni-group/components/uni-group/uni-group.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_calendar + _easycom_uni_group)();
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
      selected: $data.info.selected
    }),
    e: common_vendor.p({
      title: "分组1"
    }),
    f: common_vendor.p({
      title: "分组1",
      top: "20"
    }),
    g: common_vendor.p({
      title: "分组1",
      top: "20"
    }),
    h: common_vendor.p({
      title: "分组1",
      top: "20"
    }),
    i: common_vendor.p({
      title: "分组1",
      top: "20"
    }),
    j: common_vendor.p({
      title: "任务",
      type: "line",
      top: "20"
    }),
    k: common_assets._imports_0$1,
    l: common_vendor.o((...args) => $options.task && $options.task(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4978fed5"]]);
wx.createPage(MiniProgramPage);
