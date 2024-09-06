import {
	defineStore
} from "pinia"
import {
	date
} from "@/utils/date.js"

//微信小程序端
/*#ifdef MP*/
import EventSource from "/utils/eventSource.js"
/*#endif*/

//h5端
/*#ifdef H5*/
const BASEURL = "/api-dev";
/*#endif*/

//微信小程序端
/*#ifdef MP*/
const BASEURL = "https://ellan.online/api/v2";
// const BASEURL = "http://127.0.0.1:3030/api/v2"; 
/*#endif*/

const useChatStore = defineStore("chatStore", {
	state: () => ({
		chatContainerHeight: 75,
		message: undefined, //消息提
		list: [], //消息列表
		currentIndex: 0, //当前消息索引
		keyBoardZoneExtendHeight: 0, //输入框高度
		disabled: false, // 提问  状态
		modelMessage: undefined, //模型回答


	}),
	getters: {

	},
	actions: {
		// 更新消息内容
		updateMessage(message) {
			this.message = message
			this.updateList()
			// 模型 回复
			this.modelAnswer()
		},
		// 
		updateChatContainerHeight(containerHeight) {
			this.chatContainerHeight = containerHeight;
		},
		//模型回答
		modelAnswer() {
			// 禁止 回复 
			this.updateDisabled(true)
			this.modelMessage = {
				date: date(),
				loading: true,
				type: 'other',
				content: "",
				fullText: ""
			}
			// 后续根据 发送按钮状态 确定  
			this.list.push(this.modelMessage)
			// 消息 容器
			// let fullText = ""
			const eventSource = new EventSource(
				`${BASEURL}/spark/conversation?content=${this.message.content}`);
			//h5端
			/*#ifdef H5*/
			eventSource.onmessage = async (e) => {
				this.list[this.list.length - 1].fullText += JSON.parse(e.data)["choices"][0]["delta"]["content"]
				if (JSON.parse(e.data)["usage"]) {
					this.gradually()
					eventSource.close()
				}
			}
			/*#endif*/


			//微信小程序端
			/*#ifdef MP*/
			eventSource.addEventListener('message', (e) => {
				this.list[this.list.length - 1].fullText += JSON.parse(e.data)["choices"][0]["delta"]["content"]
				if (JSON.parse(e.data)["usage"]) {
					this.gradually()
					eventSource.close()
				}
			});
			/*#endif*/
			this.updateDisabled(false)

		},
		// 打字机效果
		gradually() {
			let index = 0;
			if (this.list.length === 0) return;
			this.list[this.list.length - 1].loading = false;
			let currentMessage = '';
			const intervalId = setInterval(() => {
				if (index < this.list[this.list.length - 1].fullText.length) {
					currentMessage += this.list[this.list.length - 1].fullText[index];
					this.list[this.list.length - 1].content = currentMessage;
					index++;
				} else {
					clearInterval(intervalId);
				}
			}, 50); // 每50毫秒更新一次
		},

		// 更新  键盘区域 高度
		updateKeyBoardZoneExtendHeight(keyBoardZoneHeight) {
			this.keyBoardZoneExtendHeight = keyBoardZoneHeight
		},
		// 初始化 消息列表
		setList(list) {
			this.list = list
		},
		// 更新消息列表
		updateList() {
			this.list.push(this.message)
		},
		// 更新 提问 状态
		updateDisabled(status) {
			this.disabled = status
		}

	}
})

export default useChatStore;



// 打印机效果
const gradually = (list) => {


}