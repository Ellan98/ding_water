"use strict";
const utils_request = require("../../utils/request.js");
function getTaskList() {
  return utils_request.request({
    url: "/task/list",
    method: "get",
    data: {
      userId: "525942275105096080"
    }
  });
}
exports.getTaskList = getTaskList;
