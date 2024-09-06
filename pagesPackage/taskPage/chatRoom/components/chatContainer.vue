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
								<view class="load-content" v-if="msg.loading">
									<text></text>
									<text></text>
									<text></text>
									<text></text>
								</view>
								<view class="content-Container"
									:style="msg.type == 'myself'? {float:'right'} : {float:'left'} " v-else>

									<text :selectable="true" :user-select="true">{{msg.content}} </text>

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
</template>

<script setup>
	import {
		useChatStore
	} from "@/pinia/index.js"
	import {
		computed
	} from "vue"
	// 
	const chatStore = useChatStore()
	let list = computed(() => {
		return chatStore.list
	})
	//消息 列表 容器 高度
	let height = computed(() => chatStore.chatContainerHeight);
	// 键盘高度变化
	let keyBoardZoneExtendHeight = computed(() => chatStore.keyBoardZoneExtendHeight)
	
	
	
	
	
	
	
	
	
</script>

<style scoped>
	.scrollViewContainer {
		transition: height 0.5s ease-in-out, transform 0.5s ease-in-out;
		width: 99%;
	}


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

	/* load 文字效果 */
	.load-content {
		animation: rotate_3922 1.2s linear infinite;
		background-color: #9b59b6;
		background-image: linear-gradient(#9b59b6, #84cdfa, #5ad1cd);
		border-radius: 50%;
		height: 48rpx;
		margin-left: 20rpx;
		width: 48rpx;
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