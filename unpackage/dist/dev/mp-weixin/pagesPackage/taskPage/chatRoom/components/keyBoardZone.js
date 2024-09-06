"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
const utils_date = require("../../../../utils/date.js");
require("../../../../pinia/index.js");
const pinia_modules_chat = require("../../../../pinia/modules/chat.js");
const _sfc_main = {
  __name: "keyBoardZone",
  setup(__props) {
    const chatStore = pinia_modules_chat.useChatStore();
    let keyBoardZoneExtendHeight = common_vendor.computed(() => chatStore.keyBoardZoneExtendHeight);
    let disabled = common_vendor.computed(() => chatStore.disabled);
    let holdKeyboard = common_vendor.ref(false);
    const linechange = (e) => {
      if (e.detail.height < 20)
        return keyBoardZoneExtendHeight.value = 0;
      chatStore.updateKeyBoardZoneExtendHeight(e.detail.height);
    };
    common_vendor.onMounted(async () => {
      await common_vendor.nextTick$1();
      common_vendor.index.hideKeyboard();
      common_vendor.index.onKeyboardHeightChange((res) => {
        chatStore.updateChatContainerHeight(res.height + 75);
      });
    });
    let ask = common_vendor.ref("");
    const askSparkModel = () => {
      holdKeyboard.value = true;
      if (ask.value.trim() == "")
        return;
      chatStore.updateMessage({
        date: utils_date.date(),
        loading: false,
        type: "myself",
        content: ask.value
      });
      ask.value = "";
      this.chatStore.updateKeyBoardZoneExtendHeight(0);
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$3,
        b: common_assets._imports_1$1,
        c: common_vendor.o((...args) => _ctx.bindTextAreaBlur && _ctx.bindTextAreaBlur(...args)),
        d: common_vendor.o(linechange),
        e: common_vendor.unref(holdKeyboard),
        f: common_vendor.unref(ask),
        g: common_vendor.o(($event) => common_vendor.isRef(ask) ? ask.value = $event.detail.value : ask = $event.detail.value),
        h: common_vendor.o(askSparkModel),
        i: common_vendor.unref(disabled),
        j: 50 + common_vendor.unref(keyBoardZoneExtendHeight) + "px"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5adfde9c"]]);
wx.createComponent(Component);
