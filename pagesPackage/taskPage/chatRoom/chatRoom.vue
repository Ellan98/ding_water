<template>

	<view class="list-container" :style="`height:calc(100vh - ${height}px)`">

		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="container" @scrolltoupper="upper"
			@scrolltolower="lower" @scroll="scroll">
			<uni-list :border="true">
				<template v-for="msg in list">
					<!-- 右侧带角标 -->
					<uni-section title="2024/8/22 18:07" type="line">
						<uni-list-item title="spark" class="itemContainer" :note="msg.data">
							<template v-slot:header>
								<view class="slot-box">
									<image class="slot-image" src="/static/login.png" mode="widthFix"></image>
								</view>
							</template>
						</uni-list-item>
					</uni-section>
				</template>
			</uni-list>
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
			<button type="primary" @click="questionsSparkModel">发送</button>
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

	let height = ref(75)
	let triggered = ref(false)


	const onLoad = () => {
		_freshing = false;
		setTimeout(() => {
			triggered.value = true;
		}, 1000)
	}


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


	// 消息 列表
	let list = ref([])
	const questionsSparkModel = async () => {
		let responseData = await sparkModelQuestions({
			content: questions.value
		})

		list.value.push(responseData)
		// list.value.push({
		// 	data: questions.value
		// })
		questions.value = ''
		console.log("响应数据", responseData)
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



	.slot-box image {
		border-radius: 10rpx;
		height: 80rpx;
		margin: 10rpx;
		width: 80rpx;
	}
</style>