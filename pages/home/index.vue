<template>
	<view class="container">
<<<<<<< HEAD
		
	<view class="calendar-content">

		<uni-section title="规划" type="line"></uni-section>
		<view>
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" @change="change"
				@monthSwitch="monthSwitch" />
		</view>
	</view>
	
	<!--列表 -->
		
	<uni-section title="任务" type="line" top="20">
		<uni-group title="分组1">
			
			<view>分组1 的内容</view>
			<view>分组1 的内容</view>
		</uni-group>
		<uni-group title="分组1" top="20">
			<view>分组1 的内容</view>
			<view>分组1 的内容</view>
		</uni-group>
		<uni-group title="分组1" top="20">
			<view>分组1 的内容</view>
			<view>分组1 的内容</view>
		</uni-group>
		<uni-group title="分组1" top="20">
			<view>分组1 的内容</view>
			<view>分组1 的内容</view>
		</uni-group>
		<uni-group title="分组1" top="20">
			<view>分组1 的内容</view>
			<view>分组1 的内容</view>
		</uni-group>
	</uni-section>

	<!-- tooptps -->
	<view class="tooltip" @click="task">
		<image src="/static/animal/rabbit.png"></image>
	</view>
=======

		<view class="calendar-content">

			<uni-section title="规划" type="line"></uni-section>
			<view>
				<!-- 插入模式 -->
				<uni-calendar class="uni-calendar--hook" :selected="info.selected" @change="change"
					@monthSwitch="monthSwitch" />
			</view>
		</view>

		<!--列表 -->

		<uni-section title="任务" type="line" top="20">
			<uni-group title="分组1">
				<template v-for="item in taskList">
					<view>{{item.title}}</view>
				</template>
			</uni-group>
			<uni-group title="分组1" top="20">
				<view>分组1 的内容</view>
				<view>分组1 的内容</view>
			</uni-group>
			<uni-group title="分组1" top="20">
				<view>分组1 的内容</view>
				<view>分组1 的内容</view>
			</uni-group>
			<uni-group title="分组1" top="20">
				<view>分组1 的内容</view>
				<view>分组1 的内容</view>
			</uni-group>
			<uni-group title="分组1" top="20">
				<view>分组1 的内容</view>
				<view>分组1 的内容</view>
			</uni-group>
		</uni-section>

		<!-- tooptps -->
		<view class="tooltip" @click="task">
			<image src="/static/animal/rabbit.png"></image>
		</view>
>>>>>>> 0d855a2fbe841c47ea50356c6c8c5ac660db3253

	</view>
</template>
<script>
<<<<<<< HEAD
=======
	import {
		nextTick
	} from "vue"
	import {
		getTaskList
	} from "/api/home/index.js"
	import useLoading from "/hooks/loading"

>>>>>>> 0d855a2fbe841c47ea50356c6c8c5ac660db3253
	/**
	 * 获取任意时间
	 */
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	export default {
		components: {},
		data() {
			return {
<<<<<<< HEAD
=======
				loading: false,
				taskList: undefined,
>>>>>>> 0d855a2fbe841c47ea50356c6c8c5ac660db3253
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
			}
		},
		onReady() {
			this.$nextTick(() => {
				this.showCalendar = true
			})
			// TODO 模拟请求异步同步数据
			setTimeout(() => {
				this.info.date = getDate(new Date(), -30).fullDate
				this.info.startDate = getDate(new Date(), -60).fullDate
				this.info.endDate = getDate(new Date(), 30).fullDate
				this.info.selected = [{
						date: getDate(new Date(), -3).fullDate,
						info: '打卡'
					},
					{
						date: getDate(new Date(), -2).fullDate,
						info: '签到',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: getDate(new Date(), -1).fullDate,
						info: '已打卡'
					}
				]
			}, 2000)
<<<<<<< HEAD
		},
		methods: {
			
=======


			this.taskListData()
		},
		async mounted() {
			await nextTick()
		},
		methods: {
			async taskListData() {
				let data = (await getTaskList()).data
				this.taskList = data.data

			},

>>>>>>> 0d855a2fbe841c47ea50356c6c8c5ac660db3253
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
<<<<<<< HEAD
	.container {
		padding:0 20rpx;
	}
	
	.calendar-content {
		border-bottom:4rpx solid #f4f7fc;
		margin-bottom:20rpx;
=======

	.container {
		padding: 0 20rpx;
	}

	.calendar-content {
		border-bottom: 4rpx solid #f4f7fc;
		margin-bottom: 20rpx;
>>>>>>> 0d855a2fbe841c47ea50356c6c8c5ac660db3253
	}
</style>