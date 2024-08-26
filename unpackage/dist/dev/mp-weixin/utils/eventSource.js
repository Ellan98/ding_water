"use strict";
const common_vendor = require("../common/vendor.js");
class EventSource {
  constructor(url, retryTime = 0) {
    this.url = url;
    this.retryTime = retryTime;
    this.listeners = {};
    this.requestTask = null;
    this.connect();
  }
  connect() {
    this.requestTask = common_vendor.wx$1.request({
      url: this.url,
      enableChunked: true,
      responseType: "text",
      method: "GET",
      timeout: 3e5,
      success: (res) => {
        this.emit("success", res);
        if (this.retryTime > 0) {
          setTimeout(() => {
            this.connect();
          }, this.retryTime);
        }
      },
      fail: () => {
      }
    });
    this.requestTask.onHeadersReceived((res) => {
      this.emit("open", res);
    });
    this.requestTask.onChunkReceived((res) => this.handleChunk(res));
  }
  handleChunk(res) {
    const arrayBuffer = res.data;
    const uint8Array = new Uint8Array(arrayBuffer);
    let data = common_vendor.index.arrayBufferToBase64(uint8Array);
    data = new Buffer(data, "base64");
    data = data.toString("utf8");
    const lines = data.split("\n\n");
    lines.forEach((line) => {
      if (!line.trim()) {
        return;
      }
      const [key, value] = line.trim().split(":");
      if (key === "data") {
        const data2 = line.substring(5).trim();
        try {
          const json = JSON.parse(data2);
          this.emit("message", {
            data: JSON.stringify(json)
          });
        } catch (e) {
          this.emit("error", "Api.EventSource.ParseError:" + e);
        }
      } else {
        this.emit("error", "Api.EventSource.ParseFail:" + line);
      }
    });
  }
  addEventListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => {
        callback(data);
      });
    }
  }
  close() {
    if (this.requestTask) {
      this.requestTask.abort();
    }
  }
}
exports.EventSource = EventSource;
