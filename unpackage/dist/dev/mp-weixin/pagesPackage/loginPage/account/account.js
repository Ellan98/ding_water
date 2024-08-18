"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
require("../../../pinia/index.js");
const api_login = require("../../../api/login.js");
const pinia_modules_auth = require("../../../pinia/modules/auth.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "account",
  setup(__props) {
    pinia_modules_auth.useAuthStore();
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
    const submit = () => {
      form.value.validate().then(async (res) => {
        res.code = "000";
        const data = await api_login.login(res);
        console.log("data", data);
      }).catch((err) => {
        console.log("err", err);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.o(($event) => loginForm.account = $event),
        c: common_vendor.p({
          placeholder: "请输入账号",
          modelValue: loginForm.account
        }),
        d: common_vendor.p({
          label: "账号",
          name: "account"
        }),
        e: common_vendor.o(($event) => loginForm.password = $event),
        f: common_vendor.p({
          type: "password",
          placeholder: "请输入账号",
          modelValue: loginForm.password
        }),
        g: common_vendor.p({
          label: "密码",
          name: "password"
        }),
        h: common_vendor.sr(form, "9779f61b-0", {
          "k": "form"
        }),
        i: common_vendor.p({
          modelValue: loginForm,
          ["label-position"]: "top",
          rules
        }),
        j: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9779f61b"]]);
wx.createPage(MiniProgramPage);
