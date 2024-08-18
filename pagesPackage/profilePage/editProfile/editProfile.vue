<template>
	
	<view class="header">
		<!-- 个人写 -->
		<!-- <view class="check-auth-setting">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType"
				:active-color="activeColor" @clickItem="onClickItem" />
		</view> -->
		<view class="banner" @click="editBanner"></view>
		<view class="avatar-container">
			<image src="/static/login.png"></image>
		</view>
		</view>
	<view>






	</view>

	<view class="container">
		<view class="decript">
			<text>Ellan</text>
			<br />
			<text>ellan980809@gmail.com</text>
		</view>
	</view>

	<view class="zone">
		<!-- 基础用法，不包含校验规则 -->
		<uni-forms ref="baseForm" label-position="top">
			<uni-forms-item label="昵称" required>

				<uni-easyinput   placeholder="请输入内容" @input="input"></uni-easyinput>
			</uni-forms-item>

			<uni-forms-item label="标签" required>
				<uni-easyinput   placeholder="请输入内容" @input="input"></uni-easyinput>
			</uni-forms-item>

			<uni-forms-item label="简介" required>
				<uni-easyinput   placeholder="简单介绍一下自己吧" @input="input"></uni-easyinput>
			</uni-forms-item>
		</uni-forms>


	</view>




	<view class="zone">
		<button>
			保存
		</button>
	</view>


	<!-- 提示信息弹窗 -->
	<uni-popup ref="popup" background-color="#fff" @change="change">
		<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }"><text
				class="text">popup 内容</text></view>
	</uni-popup>
</template>

<script setup>
	import {
		ref
	} from "vue"
	let items = ['个人', '面具']
	let current = ref(0)
	const onClickItem = (e) => {
		if (current.value !== e.currentIndex) {
			current.value = e.currentIndex
		}
	}
</script>

<style scoped>
	
	.header {
		height: 100%;
		position: relative;
	}
	/* 选项卡 style */
	.check-auth-setting {
		background-color: #e0e0e0;
		left:50%;
		position: absolute;
		top:20rpx;
		transform: translate(-50%);
		width:90%;
		z-indx:5;
	}

	.banner {
		background-color: #98942f;
		height: 300rpx;
		z-index: 4;
	}

	.avatar-container {
		height: 240rpx;
		left: 50%;
		position: absolute;
		top: 140rpx;
		transform: translateX(-50%);
		width: 90%;
		z-index: 1;
	}

	.avatar-container image {
		border-radius: 50%;
		border: 10rpx solid white;
		height: 180rpx;
		margin-top: 25rpx;
		width: 180rpx;
		z-index: 3;
	}

	/* name user style */
	.decript {
		margin-bottom: 40rpx;
	}

	.decript text:nth-child(1) {
		font-weight: 700;
		font-size: 48rpx;
	}

	.decript>text:nth-child(3) {
		color: gray;
	}

	.container {
		height: 100%;
		margin: 80rpx auto 0;
		/* background-color: #f7f7f9; */
		width: 90%;
	}



	.zone {
		height: 100%;
		width: 90%;
		margin: 0 auto;
		margin-bottom: 40rpx;
	}

	/* form style */
	.uni-forms:deep(.uni-easyinput) {
		border: 1px solid #e0e0e0;
	}

	.uni-forms:deep(.uni-forms-item)::after {
		content: "";
		margin-top: 10rpx;
	}

	.zone button {
		background-color: #007dff;
		color: white;
	}
</style>