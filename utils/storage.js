export function setLocalStorage(key, data) {
	uni.setStorage({
		key: key,
		data: data
	})
}

export function getLocalStorage(key) {
	return  uni.getStorageSync(key)
		
	
}


export function removeLocalStorage(key) {
	uni.removeStorage({
		key: key,
		success: function(res) {
			return res.data
		}
	})
}


export function clearLocalStorage() {
	uni.clearStorage()
}