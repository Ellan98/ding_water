import { defineStore } from "pinia"

const useAppStore = defineStore("app",{
	state: () => ({
		tipsStatus:false,
		protectUrl:["/auth/login",],//不经过拦截的 url
		
		}),
	getters:{
		
	},
	actions:{
		
	}
})


export default useAppStore;