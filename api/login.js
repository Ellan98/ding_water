import request from "/utils/request"


export function login (data) {
return 	request({
		port:3000,
		url:"/auth/login",
		method:'post',
		data
	})
}



export function  everyday() {
return 	new Promise((resolve,reject) => {
	uni.request({
	    url: 'http://v1.hitokoto.cn/?c=i', 	    
	    success: (res) => {
			resolve(res)
	    }
	});
})
}  

  