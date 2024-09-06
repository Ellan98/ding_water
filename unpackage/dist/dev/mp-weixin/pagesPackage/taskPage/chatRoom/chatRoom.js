"use strict";
if (!Math) {
  (ChatContainer + KeyBoardZone)();
}
const ChatContainer = () => "./components/chatContainer.js";
const KeyBoardZone = () => "./components/keyBoardZone.js";
const _sfc_main = {
  __name: "chatRoom",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
wx.createPage(_sfc_main);
