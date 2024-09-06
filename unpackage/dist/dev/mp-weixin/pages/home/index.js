"use strict";
const common_vendor = require("../../common/vendor.js");
const CalendarContainer = () => "./components/calendarContainer.js";
const TaskList = () => "./components/taskList.js";
const VisualZone = () => "./components/visualZone.js";
const _sfc_main = {
  components: {
    CalendarContainer,
    TaskList,
    VisualZone
  },
  data() {
    return {
      optiosn2: [
        {
          text: "取消",
          style: {
            backgroundColor: "#007aff"
          }
        },
        {
          text: "确认",
          style: {
            backgroundColor: "#F56C6C"
          }
        }
      ],
      list: []
    };
  },
  onReady() {
  },
  created() {
  },
  async mounted() {
    await common_vendor.nextTick$1();
  },
  methods: {
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
  const _component_CalendarContainer = common_vendor.resolveComponent("CalendarContainer");
  const _component_VisualZone = common_vendor.resolveComponent("VisualZone");
  const _component_TaskList = common_vendor.resolveComponent("TaskList");
  (_component_CalendarContainer + _component_VisualZone + _component_TaskList)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4978fed5"]]);
wx.createPage(MiniProgramPage);
