<template>
	<scroll-view class="scrollViewContainer" :scroll-top="scrollTop"
		:style="`height:calc(100vh - ${height + keyBoardZoneExtendHeight }px)`" scroll-y="true" @scrolltoupper="upper"
		@scrolltolower="lower" @scroll="scroll" :scroll-with-animation="true"
		:scroll-into-view=" 'content' + scrollIntoView" @click="holdKeyboard = false">
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
									<view class="load-content" v-if="msg.loading">
										<text></text>
										<text></text>
										<text></text>
										<text></text>
									</view>
									<view v-else>
										{{msg.content}}
									</view>

								</view>
							</view>
						</template>
						<template v-slot:footer v-if='msg.type == "myself"'>
							<view class="list-item-container-header">
								<image class="slot-image" src="/static/cat.jpg" mode="widthFix"></image>
							</view>
						</template>
					</uni-list-item>
				</uni-transition>
			</uni-section>
		</template>
		<!-- </uni-list> -->
	</scroll-view>



	<view class="keyBoardZone" :style="{ height: 50 + keyBoardZoneExtendHeight + 'px'}">
		<view>
			<image src="/static/animal/duck.png" class="image-increase" />
		</view>

		<view>
			<image src="/static/icon/more.png" class="image-more" />
		</view>


		<textarea class="textarea-container" ref="textarea" @blur="bindTextAreaBlur" maxlength="300"
			@linechange="linechange" :auto-height="true" :show-confirm-bar="false" :adjust-position="false"
			v-model="questions" :confirm-hold="true" :auto-focus="holdKeyboard" />

		<button type="primary" class="content-button" @click="questionsSparkModel" :disabled="disabled">发送</button>


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
	//微信小程序端
	/*#ifdef MP*/
	import EventSource from "/utils/eventSource.js"
	/*#endif*/

	let height = ref(75)

	// 输入区 高度
	let keyBoardZoneExtendHeight = ref(0)

	// 焦点控制键盘收起
	let holdKeyboard = ref(false)



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

	// 监听换行事件
	const linechange = (e) => {
		keyBoardZoneExtendHeight.value = e.detail.height
		console.log("当前高度", e.detail.height)
	}


	onMounted(async () => {
		await nextTick()
		uni.hideKeyboard()
		uni.onKeyboardHeightChange(res => {
			height.value = res.height + 75;
			console.log(res.height)
		})
	})






	// 打印机效果
	const gradually = () => {
		let index = 0;
		if (list.value.length === 0) return;
		list.value[list.value.length - 1].loading = false;
		let currentMessage = '';
		// list.value[list.value.length - 1].loading = false
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
	// 后续改为 雪花算法
	let index = ref(1)
	//h5端
	/*#ifdef H5*/
	const BASEURL = "/api-dev";
	/*#endif*/

	//微信小程序端
	/*#ifdef MP*/
	const BASEURL = "https://ellan.online/api/v2";
	// const BASEURL = "http://127.0.0.1:3030/api/v2"; 
	/*#endif*/
	const questionsSparkModel = () => {
		holdKeyboard.value = true;
		if (questions.value.trim() == '') return;

		disabled.value = true
		list.value.push({
			id: index.value,
			date: date(),
			type: 'myself',
			loading: false,
			content: questions.value,
		})
		// 消息 容器
		let fullText = ""
		const eventSource = new EventSource(`${BASEURL}/spark/conversation?content=${questions.value.trim()}`);

		list.value.push({
			id: index.value,
			date: date(),
			loading: true,
			type: 'other',
			content: '',
			fullText: fullText
		})

		//h5端
		/*#ifdef H5*/
		eventSource.onmessage = async (e) => {
			fullText += JSON.parse(e.data)["choices"][0]["delta"]["content"]
			if (JSON.parse(e.data)["usage"]) {

				list.value[list.value.length - 1].fullText = fullText
				eventSource.close()
				gradually()
				disabled.value = false
				await nextTick()
				scrollIntoView.value = index.value
				index.value++
			}
		}
		/*#endif*/

		//微信小程序端
		/*#ifdef MP*/
		eventSource.addEventListener('message', async (e) => {
			fullText += JSON.parse(e.data)["choices"][0]["delta"]["content"]
			if (JSON.parse(e.data)["usage"]) {
				list.value[list.value.length - 1].fullText = fullText

				gradually()
				eventSource.close()
				disabled.value = false
				await nextTick()
				scrollIntoView.value = index.value
				index.value++
			}
		});
		/*#endif*/

		// 清空提问数据
		questions.value = ""

	}
</script>

<style scoped>
	.scrollViewContainer {
		transition: height 0.5s ease-in-out, transform 0.5s ease-in-out;
		width: 99%;
	}

	/* ================== begin input style ==================*/

	.keyBoardZone {
		background-color: #f4f7fc;
		border-top: 1px solid aliceblue;
		position: relative;
		transition: height 0.5s ease-in-out, transform 0.5s ease-in-out;
		width: 99%;
	}

	.keyBoardZone image {
		height: 60rpx;
		position: absolute;
		bottom: 40rpx;
		width: 60rpx;
	}

	.keyBoardZone .image-increase {
		left: 20rpx;
	}

	.keyBoardZone .image-more {
		left: 100rpx;
	}




	/* 消息发送按钮样式 */
	.keyBoardZone .content-button {
		bottom: 40rpx;
		font-size: 28rpx;
		height: 60rpx;
		line-height: 60rpx;
		position: absolute;
		text-align: center;
		text-wrap: nowrap;
		right: 20rpx;
		width: 120rpx;
	}


	/* 输入框样式 */
	.keyBoardZone .textarea-container {
		background-color: #ebedef;
		bottom: 40rpx;
		border-radius: 10rpx;
		left: 50%;
		/* 强制在任何字符之间进行断行 */
		overflow-wrap: break-word;
		padding: 10rpx;
		position: absolute;
		text-wrap: wrap;
		transform: translateX(-50%);
		word-wrap: break-word;
		/* 允许单词在容器边界处换行 */
		word-break: break-all;
		/* 类似于 word-wrap，旧名称 */
		width: 50%;
	}


	/* ================== end input style ==================*/



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



	.content-Container {
		background-color: aliceblue;
		border-radius: 10rpx;
		height: 100%;
		padding: 20rpx;
		text-wrap: wrap;
		word-wrap: break-word;
		/* 允许单词在容器边界处换行 */
		word-break: break-all;
		/* 强制在任何字符之间进行断行 */
		overflow-wrap: break-word;
		/* 类似于 word-wrap，旧名称 */
	}


	/* From Uiverse.io by terenceodonoghue */
	.load-content {
		border-radius: 50%;
		height: 48rpx;
		width: 48rpx;
		animation: rotate_3922 1.2s linear infinite;
		background-color: #9b59b6;
		background-image: linear-gradient(#9b59b6, #84cdfa, #5ad1cd);
	}

	.load-content text {
		position: absolute;
		border-radius: 50%;
		height: 100%;
		width: 100%;
		background-color: #9b59b6;
		background-image: linear-gradient(#9b59b6, #84cdfa, #5ad1cd);
	}

	.load-content text:nth-of-type(1) {
		filter: blur(5rpx);
	}

	.load-content text:nth-of-type(2) {
		filter: blur(10rpx);
	}

	.load-content text:nth-of-type(3) {
		filter: blur(25rpx);
	}

	.load-content text:nth-of-type(4) {
		filter: blur(50rpx);
	}

	.load-content::after {
		content: "";
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		right: 10rpx;
		bottom: 10rpx;
		background-color: #fff;
		border: solid 5rpx #ffffff;
		border-radius: 50%;
	}

	@keyframes rotate_3922 {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}

		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}
</style>