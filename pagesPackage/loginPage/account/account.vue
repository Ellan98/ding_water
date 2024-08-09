<template>
	<view class="container">
		<view class="title">
			仅作演示
		</view>
		<!-- logo 显示 -->
		<view class="logo-container">
			<image src="/pagesPackage/loginPage/static/welcome.png"></image>
		</view>

		<view class="form-container">
			<!-- 登录表单 -->
			<uni-forms :modelValue="loginForm" label-position="top" :rules="rules" ref='form'>
				<uni-forms-item label="账号" name="account">
					<uni-easyinput v-model="loginForm.account" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<uni-easyinput type="password" v-model="loginForm.password" placeholder="请输入账号" />
				</uni-forms-item>

			</uni-forms>
		</view>

		<view class="login-button">
			<button @click="submit">
				登录
			</button>
		</view>
		<!--  -->
		<view class="tooltip-contianer">

		</view>
	</view>
	<!-- 弹出层 -->
	<view>

	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import {
		useAuthStore
	} from '/pinia'
	
	import {login} from "@/api/login"
	
	

	const authStore = useAuthStore()
	// 登录表单
	const loginForm = reactive({
		account: 'Ellan',
		password: 'Ellan'
	})

	// 校验规则

	const rules = {
		account: {
			// name 字段的校验规则
			rules: [
				// 校验 name 不能为空
				{
					required: true,
					errorMessage: '请输入账号',
				},
				
			],
			},
			password: {
				// name 字段的校验规则
				rules: [
					// 校验 name 不能为空
					{
						required: true,
						errorMessage: '请输入密码',
					},
					
				],
				}
	}

let form = ref(null)

	const submit = () => {
		
			form.value.validate().then( async(res) => {

			const data =  await	login(res)
			if(data.data) {
				uni.switchTab({
					url:"/pages/home/index"
				})
			}
			console.log("data",data)
			}).catch(err => {
				console.log('err', err);
			})
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
		height: 5vh;
		text-align: center;

	}

	.logo-container {
		min-height: 40vh;
		margin: 0 auto;
		width: 90%;
	}

	.logo-container image {
		height: 100%;
		object-fit: contain;
		width: 100%;
	}

	.form-container {
		color: white;
		margin: 0 auto;
		width: 80%;
	}

	.login-button {
		color: white;
		height: 10vh;
	}

	.login-button button {
		background-color: #007dff;
		color: white;
		margin: auto;
		width: 80%;
	}

	.tooltip-contianer {
		color: white;
		height: 10vh;
		text-align: center;
	}
</style>