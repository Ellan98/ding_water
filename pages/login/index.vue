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
		<uni-popup ref="wechatProfilePopup" background-color="#fff">
			<view class="popup-content">
				<uni-section title="用户信息" type="line">
					<uni-list :border="true" :clickable="true">
						<!-- 获取头像 -->
						<uni-list-item class="list-item-container">
							<template v-slot:header>
								头像
							</template>
							<template v-slot:body>
								<button open-type="chooseAvatar" class="userAvatar"
									@chooseavatar="getUserAvatar">授权头像</button>
							</template>
						</uni-list-item>
						<!-- 获取昵称 -->
						<uni-list-item class="list-item-container">
							<template v-slot:header>
								昵称
							</template>
							<template v-slot:body>
								<input :clearable="false" type="nickname" class="user-nick-name"
									:value="userProfileInfo.nickName" placeholder="请输入昵称" />
							</template>

						</uni-list-item>
						<!-- 登录 -->
						<uni-list-item class="list-item-container">
							<button>登录</button>
						</uni-list-item>

					</uni-list>


				</uni-section>

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
		mounted() {

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

				// 关闭登录方式弹框
				this.$refs.popup.close()
				uni.login({
					provider: 'weixin', //使用微信登录
					success: function(loginRes) {
						console.log("11",loginRes);
					}
				});


				// 打开 微信获取用户信息 弹框
				// this.$refs.wechatProfilePopup.open("bottom")

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

	.list-item-container {
		border: 1px solid red;
	}
</style>