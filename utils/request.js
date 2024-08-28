import {
	getLocalStorage
} from "./storage.js"

// 请求工具
const request = (options = {}) => {
	return new Promise((resolve, reject) => {
		handleRequest(options, resolve, reject);
	});
};


//h5端
/*#ifdef H5*/
const BASEURL = "/api-dev";
/*#endif*/

//微信小程序端
/*#ifdef MP*/
const BASEURL = "https://ellan.online/api/v2";
/*#endif*/

// 发起请求
const handleRequest = (options, resolve, reject) => {
	uni.showLoading({
		title: "加载中..."
	});

	uni.request({
		url: `${BASEURL}${options.url}`,
		method: options.method,
		data: options.data,
		success: (response) => {
			if (response.statusCode == 401) {
				uni.showLoading({
					title: "即将跳转到登录页面",
					success: () => {
						uni.switchTab({
							url: "/pages/home/index"
						})
					}
				});
				return;
			}

			resolve(response.data); // 修正此处，移除 return 以确保正确解析 Promise
		},
		fail: (err) => {
			reject(err); // 修正此处，移除 return 以确保正确解析 Promise
		},
		complete: () => {
			uni.hideLoading();
		}
	});
};




export default request;