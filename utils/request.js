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
// const BASEURL = "http://127.0.0.1:3030/api/v2";
/*#endif*/

// 发起请求
const handleRequest = (options, resolve, reject) => {
	// uni.showLoading({
	// 	title: "加载中..."
	// });
	
	
	uni.request({
		url: `${BASEURL}${options.url}`,
		method: options.method,
		header: [],
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
		complete: (args) => {
			// uni.hideLoading();
			console.log("开始请求", args)
		}
	});
};


uni.addInterceptor('request', {
	async invoke(args) {
		console.log("---------------------")


		// 是否需要携带token 默认为false
		let protect = false;
		["/auth/login", ].findIndex(el => args.url.substring(8, args.url.length) == el) != -1 ? protect =
			false : protect = true;

		// args.url = BASEURL + args.url
		if (protect) {
			let token = getLocalStorage("token")
			if (!token.token) {
				uni.showToast({
					title: "登录失效",
					icon: "loading",
					duration: 2000,
					success: () => {
						uni.navigateTo({
							url: "/pages/login/index",
							animationType: 'pop-in',
							animationDuration: 200
						})
					},
				});
			} else {
				args.header.authorization = token.token
			}

		}


		// protectUrl
		console.log("触发前", args)
	},
	success(args) {
		// 请求成功后，修改code值为1
		// args.data.code = 1
		console.log("请求成功后", args)
	},
	fail(err) {
		console.log('interceptor-fail', err)
	},
	complete(res) {
		console.log('interceptor-complete', res)
	}
})

// uni.addInterceptor({
// 	returnValue(args) {
// 		// 只返回 data 字段
// 		return args.data
// 	}
// })





export default request;