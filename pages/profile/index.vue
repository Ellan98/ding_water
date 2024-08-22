<template>
	<view class="header">

		<view class="banner" @click="editBanner"></view>
		<view class="avatar-container">
			<image src="/static/login.png"></image>
		</view>

	</view>
	<view class="container">

		<view class="decript">
			<text>Ellan</text>
			<br />
			<text>ellan980809@gmail.com</text>
		</view>

		<view class="zone">
			<uni-list :border="true" :clickable="true">

				<!-- 自定义右侧内容 -->
				<uni-list-item title="编辑资料" :show-extra-icon="true"
					:extra-icon="{color: '#4e5058',size: '30',type: 'compose'}" link="navigateTo" to="/pagesPackage/profilePage/editProfile/editProfile">

				</uni-list-item>
				<uni-list-item title="分类归档" :show-extra-icon="true"
					:extra-icon="{color: '#4e5058',size: '30',type: 'paperclip'}" link>

				</uni-list-item>

				<uni-list-item title="存储" :show-extra-icon="true"
					:extra-icon="{color: '#4e5058',size: '30',type: 'map'}" link>

				</uni-list-item>
			</uni-list>
		</view>

		<view class="zone">
			<uni-list :border="true" :clickable="true">
				<uni-list-item title="设置" :show-extra-icon="true"
					:extra-icon="{color: '#4e5058',size: '30',type: 'settings'}" link>

				</uni-list-item>
				<!-- 自定义右侧内容 -->
				<uni-list-item title="关于" :show-extra-icon="true"
					:extra-icon="{color: '#4e5058',size: '30',type: 'info'}" link>

				</uni-list-item>
			</uni-list>
		</view>
		
		<view class="zone">
			<uni-list :border="true" :clickable="true">
				<uni-list-item title="放松一下" :show-extra-icon="true"
					:extra-icon="{color: '#4e5058',size: '30',type: 'map-pin-ellipse'}" link>
				</uni-list-item>
			</uni-list>
		</view>
		
		<view class="zone">
			<uni-list :border="true" :clickable="true">
				<uni-list-item title="登出" :show-extra-icon="true"
					:extra-icon="{color: '#4e5058',size: '30',type: 'cloud-download'}" link>
				</uni-list-item>
			</uni-list>
		</view>

	</view>

	<view>


	</view>


	<!-- 提示信息弹窗 -->
	<uni-popup ref="popup" background-color="#fff" @change="change">
		<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }"><text
				class="text">popup 内容</text></view>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			editBanner() {
				console.log("执行")
				this.$refs.popup.open("bottom")
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},

		}
	}
</script>

<style scoped>
	.header {
		height: 100%;
		position: relative;
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

	.container {
		margin: 70rpx auto;
		/* background-color: #f7f7f9; */
		width: 90%;
	}

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

	.zone {
		height: 100%;
		margin-bottom: 40rpx;
	}
</style>