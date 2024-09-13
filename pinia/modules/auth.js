import {
	defineStore
} from 'pinia'
import {
	setLocalStorage
} from '../../utils/storage.js'
import {
	login
} from "@/api/login"

const useAuthStore = defineStore('auth', {
	state: () => ({
		userName: "",
		avatar: "",
		email: "",
		gender: "",
		id: undefined,
		phone: "",
		token: "",
		userId: undefined,
	}),
	getters: {

	},
	actions: {
		async setAuthProfile(info) {
			// uni.showLoading({
			// 	title: "登录中",
			// });
			try {
				let respData = (await login(info)).data
				this.userName = respData.name
				this.avatar = respData.avatar
				this.email = respData.email
				this.gender = respData.gender
				this.id = respData.id
				this.phone = respData.phone
				this.token = respData.token
				this.userId = respData.userId
				setLocalStorage("token", respData)
				return true
			} catch (error) {
				// uni.showToast({
				// 	title: "失败",
				// })
				console.error('Error during login:', error);
				return false
			}

		},

	}
})


export default useAuthStore;