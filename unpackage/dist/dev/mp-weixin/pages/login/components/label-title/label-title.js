"use strict";
const api_login = require("../../../../api/login.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      fullText: "",
      // 从请求获取的全文
      displayText: "",
      // 当前显示的文本
      index: 0,
      // 当前显示的字符索引
      intervalTextAnimation: null,
      // 定时器 ID
      isDeleting: false,
      // 是否在删除动画中
      status: true
    };
  },
  onShow() {
    this.status = true;
  },
  onHide() {
    clearTimeout(this.intervalTextAnimation);
  },
  async created() {
    await this.getFullText();
    this.startTyping();
  },
  beforeDestroy() {
    clearTimeout(this.intervalTextAnimation);
  },
  methods: {
    async getFullText() {
      try {
        const responseData = (await api_login.everyday()).data;
        this.fullText = responseData ? `${responseData.hitokoto} ${responseData.from_who ?? ""} -《${responseData.from ?? ""}》` : " 落叶别树，飘零随风。客无所托，悲与此同。";
      } catch (error) {
        console.error("Error fetching new text:", error);
        this.fullText = " 落叶别树，飘零随风。客无所托，悲与此同。";
      }
    },
    startTyping() {
      this.index = 0;
      this.displayText = "";
      this.isDeleting = false;
      this.type();
    },
    type() {
      this.intervalTextAnimation = setTimeout(() => {
        if (!this.isDeleting) {
          if (this.index < this.fullText.length) {
            this.displayText += this.fullText[this.index];
            this.index++;
            this.type();
          } else {
            setTimeout(() => {
              this.isDeleting = true;
              this.type();
            }, 2e3);
          }
        } else {
          if (this.index > 0) {
            this.displayText = this.displayText.slice(0, -1);
            this.index--;
            this.type();
          } else {
            this.isDeleting = false;
            if (this.status) {
              this.getFullText().then(() => {
                this.startTyping();
              });
            }
          }
        }
      }, 100);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.displayText),
    b: !$data.isDeleting
  }, !$data.isDeleting ? {} : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7c0a3a60"]]);
wx.createComponent(Component);
