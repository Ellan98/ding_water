"use strict";
const common_vendor = require("../../common/vendor.js");
const api_home_index = require("../../api/home/index.js");
require("../../pinia/index.js");
const pinia_modules_auth = require("../../pinia/modules/auth.js");
const _sfc_main = {
  components: {},
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
  computed: {
    ...common_vendor.mapState(pinia_modules_auth.useAuthStore, {
      userId: (store) => store.userId
      // 你也可以写一个函数来获得对 store 的访问权
    })
  },
  onReady() {
  },
  created() {
    this.taksList();
  },
  async mounted() {
    await common_vendor.nextTick$1();
  },
  methods: {
    async taksList() {
      pinia_modules_auth.useAuthStore();
      let respData = await api_home_index.getTaskList({
        userId: "528978096703930768"
      });
      this.list = respData.data;
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
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_calendar2 + _easycom_uni_list_item2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2)();
}
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_calendar + _easycom_uni_list_item + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (task, k0, i0) => {
      return {
        a: "4978fed5-4-" + i0 + "," + ("4978fed5-3-" + i0),
        b: common_vendor.p({
          title: task.title,
          note: task.Descript,
          showArrow: true,
          ["thumb-size"]: "sm",
          rightText: "小图"
        }),
        c: "4978fed5-3-" + i0 + ",4978fed5-2",
        d: task.userId
      };
    }),
    b: common_vendor.p({
      ["right-options"]: _ctx.options2,
      show: "none",
      ["auto-close"]: false
    }),
    c: common_vendor.p({
      title: "列表",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4978fed5"]]);
wx.createPage(MiniProgramPage);
