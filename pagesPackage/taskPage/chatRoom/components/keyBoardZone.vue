<template>
	<view class="keyBoardZone" :style="{ height: 50 + keyBoardZoneExtendHeight + 'px'}">
		<view>
			<image src="/static/animal/duck.png" class="image-increase" />
		</view>

		<view>
			<image src="/static/icon/more.png" class="image-more" />
		</view>


		<textarea class="textarea-container" ref="textarea" @blur="bindTextAreaBlur" maxlength="300"
			@linechange="linechange" :auto-height="true" :show-confirm-bar="false" :adjust-position="false"
			v-model="ask" :confirm-hold="true" :auto-focus="holdKeyboard" />

		<button type="primary" class="content-button" @click="askSparkModel" :disabled="disabled">发送</button>


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
	} from "@/api/spark_model/index.js"
	import {
		date
	} from "@/utils/date.js"
	import {
		useChatStore
	} from "@/pinia/index.js"


	// 创建聊天仓库
	const chatStore = useChatStore()
	// 键盘扩增高度 
	let keyBoardZoneExtendHeight = computed(() => chatStore.keyBoardZoneExtendHeight)
	//ai 回答过程中 禁止 提问		
	let disabled = computed(() => chatStore.disabled)

	// 焦点控制键盘收起
	let holdKeyboard = ref(false)
	const goTop = function(e) {
		// 解决view层不同步的问题
		this.scrollTop = this.old.scrollTop
		this.$nextTick(function() {
			0
			this.scrollTop = 0
		});
		uni.showToast({
			icon: "none",
			title: "纵向滚动 scrollTop 值已被修改为 0"
		})
	}

	// 监听换行事件
	const linechange = (e) => {
		if (e.detail.height < 20) return keyBoardZoneExtendHeight.value = 0;
		chatStore.updateKeyBoardZoneExtendHeight(e.detail.height)
	}


	onMounted(async () => {
		await nextTick()
		uni.hideKeyboard()
		// 监听 键盘高度变化 动态修改
		uni.onKeyboardHeightChange(res => {
			chatStore.updateChatContainerHeight(res.height + 75)
		})
	})




	// spark model module
	let ask = ref("")
	const askSparkModel = () => {
		holdKeyboard.value = true;
		if (ask.value.trim() == '') return;
		// disabled.value = true
		chatStore.updateMessage({
			date: date(),
			loading: false,
			type: 'myself',
			content: ask.value
		})
		// 清空提问数据
		ask.value = ""
		// 重置扩展 高度
		this.chatStore.updateKeyBoardZoneExtendHeight(0)

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
		left: 50%;
		height: 60rpx;
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
</style>