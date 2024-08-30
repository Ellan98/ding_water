"use strict";
const utils_request = require("../../utils/request.js");
function getTaskList(data) {
  return utils_request.request({
    url: "/task/list",
    method: "get",
    data
  });
}
exports.getTaskList = getTaskList;
