<template>

	<view class="list-container" :style="`height:calc(100vh - ${height}px)`">

		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="container" @scrolltoupper="upper"
			@scrolltolower="lower" @scroll="scroll" :scroll-with-animation="true"
			:scroll-into-view=" 'message-' + scrollIntoView">
			<!-- <uni-list :border="true"> -->
			<template v-for="msg in list">
				<!-- 右侧带角标 -->
				<uni-section :title="msg.date" type="line">
					<uni-transition mode-class="fade" :show="true">
						<uni-list-item class="list-item-container">
							<template v-slot:header v-if='msg.type == "other"'>
								<view class="list-item-container-header">
									<image class="slot-image" src="/static/robot.png" mode="widthFix"></image>
								</view>
							</template>
							<template v-slot:body>
								<view class="list-item-container-body">
									<text
										:style="msg.type == 'myself'? {float:'right'} : {float:'left'} ">{{msg.content}}</text>
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

	// spark model module

	let questions = ref("")


	let scrollIntoView = ref('')

	let disabled = ref(false)
	// 消息 列表
	let list = ref([])
	const questionsSparkModel = () => {

		disabled.value = true
		list.value.push({
			date: date(),
			type: 'myself',
			content: questions.value
		})




		// 关闭之前的连接


		const eventSource = new EventSource(`/api-dev/spark/conversation?content=${questions.value.trim()}`);
		eventSource.onmessage = (e) => {



			const newMessage = e.data.content;
			console.log( JSON.parse(e.data))
			// showTypingEffect(newMessage);


			if (e.data == '[DONE]') {
				console.log("响应结束")
				disabled.value = false
				eventSource.close()
			}
		};

		const showTypingEffect = (text) => {
			let index = 0;
			const interval = setInterval(() => {
				if (index < text.length) {
						let messages = ''
					messages += text[ index++ ];
					list.value.push({
						date: date(),
						type: 'other',
						content: messages
					})

				} else {
					clearInterval(interval);
				}
			}, 50); // 50ms 控制文字显示速度
		};



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
		border: 1px solid red;
		height: 100%;
		padding: 0;
	}



	.list-item-container {
		border: 1px solid black;
	}

	.list-item-container-header {
		border: 1px solid green;
	}

	.list-item-container-header image {
		border-radius: 10rpx;
		height: 80rpx;
		margin: 10rpx;
		width: 80rpx;
	}


	.list-item-container-body {
		border: 1px solid blue;
		height: 100%;
		margin: 30rpx 10rpx;
		width: calc(100% - 100rpx);
		/* padding: 10rpx; */
		text-wrap: wrap;
	}

	.list-item-container-body .content {
		float: right;
	}
</style>