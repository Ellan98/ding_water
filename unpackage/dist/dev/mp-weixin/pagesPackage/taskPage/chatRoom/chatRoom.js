"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const utils_date = require("../../../utils/date.js");
const utils_eventSource = require("../../../utils/eventSource.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_list_item2 + _easycom_uni_transition2 + _easycom_uni_section2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_transition = () => "../../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_transition + _easycom_uni_section)();
}
const BASEURL = "https://ellan.online/api/v2";
const _sfc_main = {
  __name: "chatRoom",
  setup(__props) {
    let height = common_vendor.ref(75);
    let keyBoardZoneExtendHeight = common_vendor.ref(0);
    let holdKeyboard = common_vendor.ref(false);
    const linechange = (e) => {
      keyBoardZoneExtendHeight.value = e.detail.height;
      console.log("当前高度", e.detail.height);
    };
    common_vendor.onMounted(async () => {
      await common_vendor.nextTick$1();
      common_vendor.index.hideKeyboard();
      common_vendor.index.onKeyboardHeightChange((res) => {
        height.value = res.height + 75;
        console.log(res.height);
      });
    });
    const gradually = () => {
      let index2 = 0;
      if (list.value.length === 0)
        return;
      list.value[list.value.length - 1].loading = false;
      let currentMessage = "";
      const intervalId = setInterval(() => {
        if (index2 < list.value[list.value.length - 1].fullText.length) {
          currentMessage += list.value[list.value.length - 1].fullText[index2];
          list.value[list.value.length - 1].content = currentMessage;
          index2++;
        } else {
          clearInterval(intervalId);
        }
      }, 50);
    };
    let questions = common_vendor.ref("");
    let scrollIntoView = common_vendor.ref("");
    let disabled = common_vendor.ref(false);
    let list = common_vendor.ref([]);
    let index = common_vendor.ref(1);
    const questionsSparkModel = () => {
      holdKeyboard.value = true;
      if (questions.value.trim() == "")
        return;
      disabled.value = true;
      list.value.push({
        id: index.value,
        date: utils_date.date(),
        type: "myself",
        loading: false,
        content: questions.value
      });
      let fullText = "";
      const eventSource = new utils_eventSource.EventSource(`${BASEURL}/spark/conversation?content=${questions.value.trim()}`);
      list.value.push({
        id: index.value,
        date: utils_date.date(),
        loading: true,
        type: "other",
        content: "",
        fullText
      });
      eventSource.addEventListener("message", async (e) => {
        fullText += JSON.parse(e.data)["choices"][0]["delta"]["content"];
        if (JSON.parse(e.data)["usage"]) {
          list.value[list.value.length - 1].fullText = fullText;
          gradually();
          eventSource.close();
          disabled.value = false;
          await common_vendor.nextTick$1();
          scrollIntoView.value = index.value;
          index.value++;
        }
      });
      questions.value = "";
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (msg, k0, i0) => {
          return common_vendor.e({
            a: msg.type == "other"
          }, msg.type == "other" ? {
            b: common_assets._imports_0$3
          } : {}, {
            c: msg.loading
          }, msg.loading ? {} : {
            d: common_vendor.t(msg.content)
          }, {
            e: common_vendor.s(msg.type == "myself" ? {
              float: "right"
            } : {
              float: "left"
            }),
            f: msg.type == "myself"
          }, msg.type == "myself" ? {
            g: common_assets._imports_1
          } : {}, {
            h: "70f386d9-2-" + i0 + "," + ("70f386d9-1-" + i0),
            i: "70f386d9-1-" + i0 + "," + ("70f386d9-0-" + i0),
            j: "content" + msg.id,
            k: "70f386d9-0-" + i0,
            l: common_vendor.p({
              title: msg.date,
              type: "line",
              id: "content" + msg.id
            })
          });
        }),
        b: common_vendor.p({
          ["mode-class"]: "fade",
          show: true
        }),
        c: _ctx.scrollTop,
        d: common_vendor.s(`height:calc(100vh - ${common_vendor.unref(height) + common_vendor.unref(keyBoardZoneExtendHeight)}px)`),
        e: common_vendor.o((...args) => _ctx.upper && _ctx.upper(...args)),
        f: common_vendor.o((...args) => _ctx.lower && _ctx.lower(...args)),
        g: common_vendor.o((...args) => _ctx.scroll && _ctx.scroll(...args)),
        h: "content" + common_vendor.unref(scrollIntoView),
        i: common_vendor.o(($event) => common_vendor.isRef(holdKeyboard) ? holdKeyboard.value = false : holdKeyboard = false),
        j: common_assets._imports_2,
        k: common_assets._imports_3,
        l: common_vendor.o((...args) => _ctx.bindTextAreaBlur && _ctx.bindTextAreaBlur(...args)),
        m: common_vendor.o(linechange),
        n: common_vendor.unref(holdKeyboard),
        o: common_vendor.unref(questions),
        p: common_vendor.o(($event) => common_vendor.isRef(questions) ? questions.value = $event.detail.value : questions = $event.detail.value),
        q: common_vendor.o(questionsSparkModel),
        r: common_vendor.unref(disabled),
        s: 50 + common_vendor.unref(keyBoardZoneExtendHeight) + "px"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70f386d9"]]);
wx.createPage(MiniProgramPage);
