"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
require("../../../pinia/index.js");
const pinia_modules_auth = require("../../../pinia/modules/auth.js");
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_popup_message = () => "../../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "account",
  setup(__props) {
    const authStore = pinia_modules_auth.useAuthStore();
    const loginForm = common_vendor.reactive({
      account: "Ellan",
      password: "Ellan"
    });
    const rules = {
      account: {
        // name 字段的校验规则
        rules: [
          // 校验 name 不能为空
          {
            required: true,
            errorMessage: "请输入账号"
          }
        ]
      },
      password: {
        // name 字段的校验规则
        rules: [
          // 校验 name 不能为空
          {
            required: true,
            errorMessage: "请输入密码"
          }
        ]
      }
    };
    let form = common_vendor.ref(null);
    let tips = common_vendor.ref(null);
    let tipsText = common_vendor.ref("");
    let tipsType = common_vendor.ref("success");
    const submit = () => {
      form.value.validate().then(async (res) => {
        const isLoading = await authStore.setAuthProfile(res);
        if (isLoading) {
          tipsText.value = "登陆成功";
          tipsType.value = "success";
          common_vendor.index.switchTab({
            url: "/pages/home/index"
          });
        } else {
          tipsText.value = "登陆失败";
          tipsType.value = "error";
        }
        tips.value.open();
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: common_vendor.unref(tipsType),
          message: common_vendor.unref(tipsText),
          duration: 2e3
        }),
        b: common_vendor.sr(tips, "9779f61b-0", {
          "k": "tips"
        }),
        c: common_vendor.p({
          type: "message"
        }),
        d: common_assets._imports_0$2,
        e: common_vendor.o(($event) => loginForm.account = $event),
        f: common_vendor.p({
          placeholder: "请输入账号",
          modelValue: loginForm.account
        }),
        g: common_vendor.p({
          label: "账号",
          name: "account"
        }),
        h: common_vendor.o(($event) => loginForm.password = $event),
        i: common_vendor.p({
          type: "password",
          placeholder: "请输入账号",
          modelValue: loginForm.password
        }),
        j: common_vendor.p({
          label: "密码",
          name: "password"
        }),
        k: common_vendor.sr(form, "9779f61b-2", {
          "k": "form"
        }),
        l: common_vendor.p({
          modelValue: loginForm,
          ["label-position"]: "top",
          rules
        }),
        m: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9779f61b"]]);
wx.createPage(MiniProgramPage);
