<template>

	<view class="list-container" :style="`height:calc(100vh - ${height}px)`">

		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="container" @scrolltoupper="upper"
			@scrolltolower="lower" @scroll="scroll">
			<view id="demo1" class="scroll-view-item uni-bg-red">A</view>
			<view id="demo2" class="scroll-view-item uni-bg-green">B</view>
			<view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
		</scroll-view>


	</view>
<<<<<<< HEAD
	<view class="keyBoardZone">
		<view class="zone">
			<uni-icons type="plusempty" :size="30"></uni-icons>
			<uni-icons type="bars" :size="30"></uni-icons>

			<view class="textarea-container">
				<textarea class="inputContainer" @blur="bindTextAreaBlur" maxlength="120" @linechange="linechange" :auto-height="true"
					:show-confirm-bar="false" :adjust-position="false" />
			</view>
			<button type="primary">发送</button>
		</view>

=======
	<view class="zone">

		<uni-icons type="bars" size="30"></uni-icons>
		<view class="textarea-container">
			<textarea @blur="bindTextAreaBlur" maxlength="120" @linechange="linechange" :auto-height="true"
				:show-confirm-bar="false" :adjust-position="false" />
		</view>
>>>>>>> 0d855a2fbe841c47ea50356c6c8c5ac660db3253




	</view>


</template>

<script setup>
	import {
		onMounted,
		nextTick,
		ref,
		computed
	} from 'vue'

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

<<<<<<< HEAD
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
		height:100%;
		left: 50%;
		position: absolute;
		transform: translateX(-50%);
		top: 20rpx;
		width: 96%;
	}


	.textarea-container {
		height: 100rpx;
		margin:0 10rpx;
		overflow-y: scroll;
		overflow-x:hidden;
		padding:6rpx 20rpx;
		text-wrap: wrap;
		width: 70%;
	}
	.textarea-container  .inputContainer {
		border: 1px solid #353535;
		border-radius:10rpx;
		min-heigth:70rpx;
		padding:6rpx 0;
		width:99%;
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

=======
	.zone {
		align-items: center;
		border: 1px solid black;
		display: flex;
		height: 150rpx;
		justify-content: space-around;
		width: 99%;
	}


	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

/* 	.textarea-container:deep(".tex") {
		border: 2rpx solid #e0e0e0;
		height: 60rpx;
		max-height: 120rpx;
	} */
>>>>>>> 0d855a2fbe841c47ea50356c6c8c5ac660db3253
</style>