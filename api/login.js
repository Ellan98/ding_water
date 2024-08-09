import request from "/utils/request"


export function login (data) {
return 	request({
		url:"/api/v2/auth/login",
		method:'post',
		data
	})
}



export function  everyday() {
return 	new Promise((resolve,reject) => {
	uni.request({
	    url: 'https://v1.hitokoto.cn/?c=i', 	    
	    success: (res) => {
			resolve(res)
	    }
	});
})
}  

  