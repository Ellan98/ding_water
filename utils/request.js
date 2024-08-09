// 请求工具
const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    handleRequest(options, resolve, reject);
  });
};

// const BASEURL = "http://127.0.0.1";

// 发起请求
const handleRequest = (options, resolve, reject) => {
  uni.showLoading({
    title: "加载中..."
  });

  uni.request({
    // url: BASEURL + ':' + options.port + options.url,
	
	  url:`/api-dev${options.url}`,
    method: options.method,
    data: options.data ,
    success: (response) => {
      if (response.statusCode == 401) {
        uni.showToast({
          icon: 'error',
          position: 'top',
          title: "请尝试登录"
        });
        return;
      }
      resolve(response);  // 修正此处，移除 return 以确保正确解析 Promise
    },
    fail: (err) => {
      console.log('error', err);
      reject(err);  // 修正此处，移除 return 以确保正确解析 Promise
    },
    complete: () => {
      uni.hideLoading();
    }
  });
};

export default request;
