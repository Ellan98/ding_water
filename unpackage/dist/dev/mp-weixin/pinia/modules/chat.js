"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_date = require("../../utils/date.js");
const utils_eventSource = require("../../utils/eventSource.js");
const BASEURL = "https://ellan.online/api/v2";
const useChatStore = common_vendor.defineStore("chatStore", {
  state: () => ({
    chatContainerHeight: 75,
    message: void 0,
    //消息提
    list: [],
    //消息列表
    currentIndex: 0,
    //当前消息索引
    keyBoardZoneExtendHeight: 0,
    //输入框高度
    disabled: false,
    // 提问  状态
    modelMessage: void 0
    //模型回答
  }),
  getters: {},
  actions: {
    // 更新消息内容
    updateMessage(message) {
      this.message = message;
      this.updateList();
      this.modelAnswer();
    },
    // 
    updateChatContainerHeight(containerHeight) {
      this.chatContainerHeight = containerHeight;
    },
    //模型回答
    modelAnswer() {
      this.updateDisabled(true);
      this.modelMessage = {
        date: utils_date.date(),
        loading: true,
        type: "other",
        content: "",
        fullText: ""
      };
      this.list.push(this.modelMessage);
      const eventSource = new utils_eventSource.EventSource(
        `${BASEURL}/spark/conversation?content=${this.message.content}`
      );
      eventSource.addEventListener("message", (e) => {
        this.list[this.list.length - 1].fullText += JSON.parse(e.data)["choices"][0]["delta"]["content"];
        if (JSON.parse(e.data)["usage"]) {
          this.gradually();
          eventSource.close();
        }
      });
      this.updateDisabled(false);
    },
    // 打字机效果
    gradually() {
      let index = 0;
      if (this.list.length === 0)
        return;
      this.list[this.list.length - 1].loading = false;
      let currentMessage = "";
      const intervalId = setInterval(() => {
        if (index < this.list[this.list.length - 1].fullText.length) {
          currentMessage += this.list[this.list.length - 1].fullText[index];
          this.list[this.list.length - 1].content = currentMessage;
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 50);
    },
    // 更新  键盘区域 高度
    updateKeyBoardZoneExtendHeight(keyBoardZoneHeight) {
      this.keyBoardZoneExtendHeight = keyBoardZoneHeight;
    },
    // 初始化 消息列表
    setList(list) {
      this.list = list;
    },
    // 更新消息列表
    updateList() {
      this.list.push(this.message);
    },
    // 更新 提问 状态
    updateDisabled(status) {
      this.disabled = status;
    }
  }
});
exports.useChatStore = useChatStore;
