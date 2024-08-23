<template>
	<view class="container">

		<view class="calendar-content">

			<uni-section title="规划" type="line"></uni-section>
			<view>
				<!-- 插入模式 -->
				<uni-calendar class="uni-calendar--hook" :selected="info.selected" @change="change"
					@monthSwitch="monthSwitch" />
			</view>
		</view>



		<!-- tooptps -->
		<view class="tooltip" @click="task">
			<image src="/static/animal/rabbit.png"></image>
		</view>

	</view>
</template>
<script>
	import {
		nextTick
	} from "vue"
	import {
		getTaskList
	} from "/api/home/index.js"
	import useLoading from "/hooks/loading"


	export default {
		components: {},
		data() {
			return {

			}
		},
		onReady() {




		},
		async mounted() {
			await nextTick()
		},
		methods: {
			async taskListData() {
				let data = (await getTaskList()).data
				this.taskList = data.data

			},
			change(e) {
				console.log('change 返回:', e)
				// 模拟动态打卡
				if (this.info.selected.length > 5) return
				this.info.selected.push({
					date: e.fulldate,
					info: '打卡'
				})
			},
			confirm(e) {
				console.log('confirm 返回:', e)
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			},

			task() {
				uni.navigateTo({
					url: '/pagesPackage/homePage/newTask/newTask',
					animationType: 'zoom-fade-out',
					animationDuration: 200
				});
			}


		}
	}
</script>

<style scoped>
	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}

	.tooltip {
		border-radius: 50%;
		bottom: 200rpx;
		height: 100rpx;
		position: fixed;
		right: 30rpx;
		width: 100rpx;
	}

	.tooltip image {
		height: 100rpx;
		width: 100rpx;
	}
</style>