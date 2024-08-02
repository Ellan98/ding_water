<template>
	<view class="container">
		<view class="title">
			<LabelTitle />
		</view>
		<!-- logo 显示 -->
		<view class="logo-container">
			<image src="../../static/login.png"></image>
		</view>
		<view class="login-button">
			<button @click="selectLogin()">
				欢迎登录
			</button>
		</view>
		<!--  -->
		<view class="tooltip-contianer">
			使用须知
		</view>
	</view>
	<!-- 弹出层 -->
	<view>
		<!-- 弹出登录 -->
		<uni-popup ref="popup" background-color="#fff" border-radius="20px 20px 0 0">
			<view class="popup-content">
				<uni-section title="登录方式" type="line">
					<uni-list :border="true" :clickable="true">

						<uni-list-item class="robot" title="微信登录" showArrow thumb="/static/icon/wechat.png"
							thumb-size="lg" link="switchTab" to="/pages/home/index"></uni-list-item>

						<uni-list-item class="robot" title="账户密码登录" @click="accountLogin" showArrow
							thumb="/static/icon/plane.png" thumb-size="lg" link="navigateTo"
							to="/pagesPackage/loginPage/account/account"></uni-list-item>
					</uni-list>
				</uni-section>

			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		everyday
	} from "@/api/login.js"
	import LabelTitle from "./components/label-title/label-title.vue"
	export default {
		data() {

			return {
			  fullText: '', // 从请求获取的全文
			      displayText: '', // 当前显示的文本
			      index: 0, // 当前显示的字符索引
			      intervalTextAnimation: null // 定时器 ID

			}
		},
		onLoad() {

		},
		onShow() {

		},
		onHide() {
			
		},
		created() {
			
		},
		components:{
			LabelTitle
		},
		watch: {
			
		},
		mounted() {
			
		},
		destroyed() {
		
		},
		methods: {
			
			selectLogin() {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open("bottom")
				// uni.switchTab({
				// 	url: '/pages/home/index',

				// });
			},

		},
	}
</script>

<style scoped>
	.container {
		background-color: #2db7f5;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 100vh;
		width: 100%;
	}

	.title {
		color: white;
		height: 10vh;
		overflow: hidden;
		padding: 10rpx 20rpx;
		text-align: center;
		text-overflow: ellipsis;
		-webkit-line-clamp: 4;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.logo-container {
		min-height: 42vh;
		margin: 0 auto;
		width: 90%;
	}

	.logo-container image {
		height: 100%;
		object-fit: contain;
		width: 100%;
	}

	.login-button {
		color: white;
		height: 20vh;
	}

	.login-button button {
		background-color: #007dff;
		color: white;
		margin: 10vh auto;
		width: 80%;
	}

	.tooltip-contianer {
		color: white;
		height: 10vh;
		text-align: center;
	}

	/* 弹出框样式 */
	.popup-content {
		height: 400rpx;
		padding: 20rpx;

	}
</style>