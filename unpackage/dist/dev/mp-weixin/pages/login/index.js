"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
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
  async mounted() {
    await this.$nextTick();
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
      this.$refs.wechatProfilePopup.open("bottom");
    },
    onChooseAvatar(e) {
      this.userProfileInfo.avatar = e.detail.avatarUrl;
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2 + _easycom_uni_popup2 + _easycom_uni_icons2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section + _easycom_uni_popup + _easycom_uni_icons + _easycom_uni_popup_message)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
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
    h: common_vendor.sr("popup", "d08ef7d4-0"),
    i: common_vendor.p({
      ["background-color"]: "#fff",
      ["border-radius"]: "10px 10px 0 0"
    }),
    j: common_assets._imports_0,
    k: $data.userProfileInfo.avatar != ""
  }, $data.userProfileInfo.avatar != "" ? {
    l: $data.userProfileInfo.avatar
  } : {
    m: common_vendor.p({
      type: "camera-filled",
      size: "40"
    })
  }, {
    n: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    o: $data.userProfileInfo.nickName,
    p: common_vendor.sr("wechatProfilePopup", "d08ef7d4-5"),
    q: common_vendor.p({
      ["background-color"]: "#ededed",
      ["border-radius"]: "6px 6px 0 0"
    }),
    r: common_vendor.p({
      type: "error",
      message: "请使用账号密码登录",
      duration: 2e3
    }),
    s: common_vendor.sr("tips", "d08ef7d4-7"),
    t: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d08ef7d4"]]);
wx.createPage(MiniProgramPage);
