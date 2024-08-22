<template>

	<view class="list-container" :style="`height:calc(100vh - ${height}px)`">

		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="container" @scrolltoupper="upper"
			@scrolltolower="lower" @scroll="scroll">
			<template v-for="msg in list">
				<view id="demo" class="scroll-view-item uni-bg-red">{{msg.data}}</view>
				
			</template>
		</scroll-view>


	</view>
	<view class="zone">

		<uni-icons type="bars" size="30"></uni-icons>
		<view class="textarea-container">
			<textarea @blur="bindTextAreaBlur" maxlength="120" @linechange="linechange" :auto-height="true"
				:show-confirm-bar="false" :adjust-position="false" v-model="questions" />
		</view>

		<button @click="questionsSparkModel">提问</button>




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
		width: 95%;
	}

	.zone {
		align-items: center;
		border: 1px solid black;
		display: flex;
		height: 150rpx;
		justify-content: space-around;
		width: 99%;
	}


	.scroll-view-item {
		border-bottom: 1px solid red;
		height: 100%;
		text-align: center;
		font-size: 36rpx;
		width: 100%;
		
	}

	/* 	.textarea-container:deep(".tex") {
		border: 2rpx solid #e0e0e0;
		height: 60rpx;
		max-height: 120rpx;
	} */
</style>