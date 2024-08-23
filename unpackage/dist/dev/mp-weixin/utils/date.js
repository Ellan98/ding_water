"use strict";
function date() {
  let date2 = /* @__PURE__ */ new Date();
  let year = date2.getFullYear();
  let month = date2.getMonth() + 1;
  let day = date2.getDate();
  let hour = date2.getHours();
  let minute = date2.getMinutes();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  return `${year}/${month}/${day}  ${hour}:${minute}`;
}
exports.date = date;
