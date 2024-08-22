"use strict";
const utils_request = require("../../utils/request.js");
function sparkModelQuestions(data) {
  return utils_request.request({
    url: "/spark/send",
    method: "post",
    data
  });
}
exports.sparkModelQuestions = sparkModelQuestions;
