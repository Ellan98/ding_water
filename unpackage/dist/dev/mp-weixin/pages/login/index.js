"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const LabelTitle = () => "./components/label-title/label-title.js";
const _sfc_main = {
  data() {
    return {
      userProfileInfo: {
        avatar: "",
        nickName: ""
      }
    };
  },
  onLoad() {
  },
  onShow() {
  },
  onHide() {
  },
  created() {
  },
  components: {
    LabelTitle
  },
  watch: {},
  mounted() {
  },
  destroyed() {
  },
  methods: {
    selectLogin() {
      this.$refs.popup.open("bottom");
    },
    // 获取用户头像
    getUserAvatar(res) {
      console.log("用户头像信息", res);
    },
    // 微信登录
    wechatLogin() {
      this.$refs.popup.close();
      common_vendor.index.login({
        provider: "weixin",
        //使用微信登录
        success: function(loginRes) {
          console.log("11", loginRes);
        }
      });
    }
  }
};
if (!Array) {
  const _component_LabelTitle = common_vendor.resolveComponent("LabelTitle");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_component_LabelTitle + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2 + _easycom_uni_popup2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section + _easycom_uni_popup + _easycom_uni_popup_message)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.o(($event) => $options.selectLogin()),
    c: common_vendor.o($options.wechatLogin),
    d: common_vendor.p({
      title: "微信登录",
      showArrow: true,
      thumb: "/static/icon/wechat.png",
      ["thumb-size"]: "lg",
      link: "switchTab"
    }),
    e: common_vendor.p({
      title: "账户密码登录",
      showArrow: true,
      thumb: "/static/icon/plane.png",
      ["thumb-size"]: "lg",
      link: "navigateTo",
      to: "/pagesPackage/loginPage/account/account"
    }),
    f: common_vendor.p({
      border: true,
      clickable: true
    }),
    g: common_vendor.p({
      title: "登录方式",
      type: "line"
    }),
    h: common_vendor.sr("popup", "d08ef7d4-1"),
    i: common_vendor.p({
      ["background-color"]: "#fff",
      ["border-radius"]: "10px 10px 0 0"
    }),
    j: common_vendor.o((...args) => $options.getUserAvatar && $options.getUserAvatar(...args)),
    k: $data.userProfileInfo.nickName,
    l: common_vendor.p({
      border: true,
      clickable: true
    }),
    m: common_vendor.p({
      title: "用户信息",
      type: "line"
    }),
    n: common_vendor.sr("wechatProfilePopup", "d08ef7d4-6"),
    o: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    p: common_vendor.p({
      type: "error",
      message: "请使用账号密码登录",
      duration: 2e3
    }),
    q: common_vendor.sr("tips", "d08ef7d4-12"),
    r: common_vendor.p({
      type: "message"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d08ef7d4"]]);
wx.createPage(MiniProgramPage);
