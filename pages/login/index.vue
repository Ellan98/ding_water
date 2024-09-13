<template>
	<view class="container">

		<view class="title">
			<!-- <LabelTitle /> -->
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
	<!-- 登录方式弹出层 -->
	<view>
		<!-- 弹出登录 -->
		<uni-popup ref="popup" background-color="#fff" border-radius="10px 10px 0 0">
			<view class="popup-content">
				<uni-section title="登录方式" type="line">
					<uni-list :border="true" :clickable="true">
						<uni-list-item class="robot" title="微信登录" showArrow thumb="/static/icon/wechat.png"
							thumb-size="lg" link="switchTab" @click="wechatLogin"></uni-list-item>
						<uni-list-item class="robot" title="账户密码登录" showArrow thumb="/static/icon/plane.png"
							thumb-size="lg" link="navigateTo"
							to="/pagesPackage/loginPage/account/account"></uni-list-item>

					</uni-list>
				</uni-section>

			</view>
		</uni-popup>
	</view>

	<!-- 微信登录弹框 获取 用户信息 -->
	<view>
		<!-- 弹出登录 -->
		<uni-popup ref="wechatProfilePopup" background-color="#ededed" border-radius="6px 6px 0 0">
			<view class="wechat-popup-content">
				<view class="popup-item-content">
					<image src="/static/login.png" class="wechat-login-logo-container" />
					<view class="title-container">Mochiye 申请</view>
				</view>
				<view class="popup-item-content">
					<view class="title-container">获取你的昵称、头像</view>
				</view>
				<view class="popup-item-content user-profile-container">
					<view class="title-container">头像</view>
					<view>

						<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar"
							class="wechat-login-logo-container">
							<image :src="userProfileInfo.avatar" class="obtain-user-avatar" mode="aspectFill" v-if="userProfileInfo.avatar != ''" />
							<uni-icons type="camera-filled" size="40" style="background-color: #ededed;"v-else ></uni-icons>
						</button>
					</view>

					<!-- <image :src="userProfileInfo.avatar" class="user-avatar-container" />
					<view class="title-container">
						<view class="nickName-container"> {{userProfileInfo.nickName}} </view>
						<view style="color:#767676;font-size: 24rpx;"> 微信个人信息 </view>
					</view> -->
				</view>
				<view class="popup-item-content user-profile-container">

					<view class="title-container">昵称</view>
					<view><input type='nickname' name='nickname' :value='userProfileInfo.nickName'
							placeholder="请输入昵称"></input> </view>
					<!-- <image :src="userProfileInfo.avatar" class="user-avatar-container" />
					<view class="title-container">
						<view class="nickName-container"> {{userProfileInfo.nickName}} </view>
						<view style="color:#767676;font-size: 24rpx;"> 微信个人信息 </view>
					</view> -->
				</view>
				<view class="popup-item-content  authorize-container ">
					<view><button>保存</button></view>
				</view>



			</view>
		</uni-popup>
	</view>




	<view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="tips" type="message">
			<uni-popup-message type="error" message="请使用账号密码登录" :duration="2000"></uni-popup-message>
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
				userProfileInfo: {
					avatar: '',
					nickName: ''
				}
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
		components: {
			LabelTitle
		},
		watch: {

		},
		async mounted() {
			await this.$nextTick()


		},
		destroyed() {

		},
		methods: {

			selectLogin() {
				this.$refs.popup.open("bottom")
			},
			// 获取用户头像
			getUserAvatar(res) {
				console.log("用户头像信息", res)
			},
			// 微信登录
			wechatLogin() {
					this.$refs.popup.close()
				// 打开 微信获取用户信息 弹框
				this.$refs.wechatProfilePopup.open("bottom")
				//  uni.getUserProfile({
				// 	desc: '获取用户信息',
				// 	success: (res) => {
				// 		console.log("用户头像信息", res)

				// 		// 关闭登录方式弹框
			
				// 		this.userProfileInfo.avatar = res.userInfo.avatarUrl;
				// 		this.userProfileInfo.nickName = res.userInfo.nickName;

				// 		// 打开 微信获取用户信息 弹框
				// 		this.$refs.wechatProfilePopup.open("bottom")
				// 	}
				// })



				// uni.authorize({
				// 	scope: 'scope.userInfo',
				// 	success(res) {
				// 		console.log(res)
				// 		uni.getUserInfo()
				// 	}
				// })



				// const accountInfo = uni.getAccountInfoSync();
				// console.log(accountInfo)
				// console.log(accountInfo.miniProgram.appId); // 小程序 appId
				// console.log(accountInfo.plugin.appId); // 插件 appId
				// console.log(accountInfo.plugin.version); // 插件版本号， 'a.b.c' 这样的形式

				// uni.authorize({
				//     scope: 'scope.userInfo',
				//     success() {
				//         uni.getLocation()
				//     }
				// })


			},
			onChooseAvatar(e) {
				this.userProfileInfo.avatar = e.detail.avatarUrl;
			}

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
		height: 350rpx;
		padding: 20rpx;

	}

	/* 获取头像样式 */
	.userAvatar {
		background-color: #fff;
		border: 1px solid #fff;
		font-size: 28rpx;
	}

	/* 获取用户昵称 */

	.user-nick-name {
		margin: 0 10rpx;
	}

	/* 微信获取用户信息 样式 */
	.wechat-login-logo-container {
		background-color: #ededed;
		border-radius: 50%;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 ;
		text-align: center;
		width: 80rpx;
	}



	.obtain-user-avatar {
		height: 80rpx;
		width: 80rpx;
	}

	.popup-item-content {
		align-items: center;
		display: flex;
		height: 70rpx;
	}

	.popup-item-content :nth-child(1) {
		margin-right: 20rpx;
	}

	.title-container {
		color: #171717;
		font-size: 26rpx;
	}

	/* 微信弹出框 容器 高度 */
	.wechat-popup-content {
		height: 480rpx;
		padding: 20rpx;

	}

	/* 用户信息 容器 样式 */
	.user-profile-container {
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;
		height: 120rpx;
	}

	/* 用户头像 */
	.user-avatar-container {
		height: 80rpx;
		width: 80rpx;
	}

	/* 授权区 */
	.authorize-container {
		height: 140rpx;
	}

	.authorize-container :nth-child(1) {
		margin: 0 auto;
	}

	.authorize-container button {
		background-color: #07c160;
		color: white;
		font-size: 24rpx;
		height: 60rpx;
		line-height: 60rpx;

		text-align: center;
		width: 300rpx;
	}
</style>