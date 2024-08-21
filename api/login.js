import request from "/utils/request"


export function login (data) {
return 	request({
<<<<<<< HEAD
		port:3000,
		url:"/auth/login",
=======
		url:"/api/v2/auth/login",
>>>>>>> 0d855a2fbe841c47ea50356c6c8c5ac660db3253
		method:'post',
		data
	})
}



export function  everyday() {
return 	new Promise((resolve,reject) => {
	uni.request({
<<<<<<< HEAD
	    url: 'http://v1.hitokoto.cn/?c=i', 	    
=======
	    url: 'https://v1.hitokoto.cn/?c=i', 	    
>>>>>>> 0d855a2fbe841c47ea50356c6c8c5ac660db3253
	    success: (res) => {
			resolve(res)
	    }
	});
})
}  

  