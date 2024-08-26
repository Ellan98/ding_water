<template>

	<view class="list-container" :style="`height:calc(100vh - ${height}px)`">

		<scroll-view :scroll-top="scrollTop" :style="`height:calc(100vh - ${height}px)`" scroll-y="true"
			class="container" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll"
			:scroll-with-animation="true" :scroll-into-view=" 'content' + scrollIntoView">
			<!-- <uni-list :border="true"> -->
			<template v-for="msg in list">
				<!-- 右侧带角标 -->
				<uni-section :title="msg.date" type="line" :id="'content' + msg.id">
					<uni-transition mode-class="fade" :show="true">
						<uni-list-item class="list-item-container">
							<template v-slot:header v-if='msg.type == "other"'>
								<view class="list-item-container-header">
									<image class="slot-image" src="/static/robot.png" mode="widthFix"></image>
								</view>
							</template>
							<template v-slot:body>
								<view class="list-item-container-body">
									<view class="content-Container"
										:style="msg.type == 'myself'? {float:'right'} : {float:'left'} ">
										{{msg.content}}
									</view>
								</view>
							</template>
							<template v-slot:footer v-if='msg.type == "myself"'>
								<view class="list-item-container-header">
									<image class="slot-image" src="/static/robot.png" mode="widthFix"></image>
								</view>
							</template>
						</uni-list-item>
					</uni-transition>
				</uni-section>
			</template>
			<!-- </uni-list> -->
		</scroll-view>


	</view>
	<view class="keyBoardZone">
		<view class="zone">
			<uni-icons type="plusempty" :size="30"></uni-icons>
			<uni-icons type="bars" :size="30"></uni-icons>

			<view class="textarea-container">
				<textarea class="inputContainer" @blur="bindTextAreaBlur" maxlength="300" @linechange="linechange"
					:auto-height="true" :show-confirm-bar="false" :adjust-position="false" v-model="questions" />
			</view>
			<button type="primary" @click="questionsSparkModel" :disabled="disabled">发送</button>
		</view>

	</view>


</template>

<script setup>
	import {
		onMounted,
		nextTick,
		ref,
		computed,
		watch
	} from 'vue'
	import {
		sparkModelQuestions
	} from "/api/spark_model/index.js"
	import {
		date
	} from "/utils/date.js"

	import EventSource from "/utils/eventSource.js"

	let height = ref(75)


	const goTop = function(e) {
		// 解决view层不同步的问题
		this.scrollTop = this.old.scrollTop
		this.$nextTick(function() {
			this.scrollTop = 0
		});
		uni.showToast({
			icon: "none",
			title: "纵向滚动 scrollTop 值已被修改为 0"
		})
	}

	const linechange = (e) => {
		console.log("---", e)
	}


	onMounted(async () => {
		await nextTick()
		uni.hideKeyboard()
		uni.onKeyboardHeightChange(res => {
			height.value = res.height + 75;
			console.log(res.height)
		})
	})


	const gradually = () => {
		let index = 0;
		if (list.value.length === 0) return;

		let currentMessage = '';

		const intervalId = setInterval(() => {
			if (index < list.value[list.value.length - 1].fullText.length) {
				currentMessage += list.value[list.value.length - 1].fullText[index];
				list.value[list.value.length - 1].content = currentMessage;
				index++;
			} else {
				clearInterval(intervalId);

			}
		}, 50); // 每50毫秒更新一次
	}





	// spark model module

	let questions = ref("")


	let scrollIntoView = ref('')

	let disabled = ref(false)
	// 消息 列表
	let list = ref([])
	let index = ref(1)
	//h5端
	/*#ifdef H5*/
	const BASEURL = "/api-dev";
	/*#endif*/

	//微信小程序端
	/*#ifdef MP*/
	const BASEURL = "https://ellan.online/api/v2";
	/*#endif*/

	const questionsSparkModel = async () => {

		disabled.value = true


		list.value.push({
			id: index.value,
			date: date(),
			type: 'myself',
			content: questions.value,
		})



		// 关闭之前的连接
		const eventSource = new EventSource(`${BASEURL}/spark/conversation?content=${questions.value.trim()}`);
		// 消息 容器
		let fullText = ""

		// 监听消息事件
		eventSource.addEventListener('message', (e) => {

			fullText += JSON.parse(e.data)["choices"][0]["delta"]["content"]

			console.log("data", JSON.parse(e.data))




			if (JSON.parse(e.data)["usage"]) {
				console.log("响应结束")
				list.value.push({
					id: index.value,
					date: date(),
					type: 'other',
					content: '',
					fullText: fullText
				})

				gradually()
				disabled.value = false
				questions.value = ""
				eventSource.close()
			}


		});




		//  eventSource.onmessage = (e) => {

		//    fullText += JSON.parse(e.data)["choices"][0]["delta"]["content"] 

		//    console.log("data", JSON.parse(e.data))




		//    if (JSON.parse(e.data)["usage"] ) {
		//      console.log("响应结束")
		//   list.value.push({
		//     id: index.value,
		//     date: date(),
		//     type: 'other',
		//     content: '',
		//     fullText: fullText
		//   })

		//     gradually()
		//      disabled.value = false
		//   questions.value=""
		//      eventSource.close()
		//    }

		//  }



		await nextTick()


		scrollIntoView.value = index.value
		index.value++
	}




	// keyboardFocus
</script>

<style scoped>
	.list-container {
		border: 1px solid red;
		width: 99%;
	}

	.container {
		height: 100%;
		margin: 0 auto;
		width: 100%;
	}

	/* ================== begin input style ==================*/

	.keyBoardZone {
		border: 1px solid black;
		height: 120rpx;
		position: relative;
		width: 99%;
	}

	.zone {
		display: flex;
		justify-content: space-around;
		height: 100%;
		left: 50%;
		position: absolute;
		transform: translateX(-50%);
		top: 20rpx;
		width: 96%;
	}


	.textarea-container {
		height: 100rpx;
		margin: 0 10rpx;
		overflow-y: scroll;
		overflow-x: hidden;
		padding: 6rpx 20rpx;
		text-wrap: wrap;
		width: 70%;
	}

	.textarea-container .inputContainer {
		border: 1px solid #353535;
		border-radius: 10rpx;
		min-heigth: 70rpx;
		padding: 6rpx 0;
		width: 99%;
	}

	.zone button {
		font-size: 28rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		text-wrap: nowrap;
		width: 120rpx;
	}

	/* ================== end input style ==================*/

	.chatContainer .uni-list-item__container {
		height: 100%;
		padding: 0;
	}



	.list-item-container {}

	.list-item-container-header {}

	.list-item-container-header image {
		border-radius: 10rpx;
		height: 80rpx;
		margin: 10rpx;
		width: 80rpx;
	}


	.list-item-container-body {
		height: 100%;
		margin: 30rpx 10rpx;
		width: calc(100% - 100rpx);
		padding: 10rpx;
		text-wrap: wrap;
	}

	.list-item-container-body .content {
		float: right;
	}

	.content-Container {
		height: 100%;
		text-wrap: wrap;
		word-wrap: break-word;
		/* 允许单词在容器边界处换行 */
		word-break: break-all;
		/* 强制在任何字符之间进行断行 */
		overflow-wrap: break-word;
		/* 类似于 word-wrap，旧名称 */
	}
</style>