<template>
	<view class="container">

		<CalendarContainer />
		<!-- 列表 容器 -->
		<TaskList />
		
		<VisualZone />
	</view>
</template>
<script>
	import {
		nextTick
	} from "vue"
	import useLoading from "/hooks/loading"
	import {
		mapState
	} from 'pinia'
	
	import CalendarContainer from "./components/calendarContainer.vue"
	import TaskList from "./components/taskList.vue"
	import VisualZone from "./components/visualZone.vue"


	export default {
		components:{
			CalendarContainer,
			TaskList,
			VisualZone,
		},
		data() {
			return {
				optiosn2: [{
						text: '取消',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '确认',
						style: {
							backgroundColor: '#F56C6C'
						}
					}
				],
				list: [],
			}
		},
		
		onReady() {},
		created() {
		},
		
		async mounted() {
			await nextTick()
		},
		methods: {
		


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
	.container {
		padding: 0 10rpx;
	}

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