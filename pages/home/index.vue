<template>
	<view class="container">
		<!-- 日历容器 -->
		<view class="calendar-container">
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" />
		</view>

		<!-- 列表 容器 -->

		<view class="task-container">
			<uni-section title="列表" type="line">

				<uni-swipe-action>
					<template v-for="task in  list" :key="task.userId">
					<uni-swipe-action-item :right-options="options2" show="none" :auto-close="false">
						<uni-list-item :title="task.title" :note="task.Descript" showArrow thumb-size="sm" rightText="小图" />
					</uni-swipe-action-item>
					</template>
				</uni-swipe-action>
			</uni-section>
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
	import { mapState } from 'pinia'
	import { useAuthStore } from "@/pinia/index.js"


	export default {
		components: {},
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
				list:[],
			}
		},
		computed:{
			...mapState(useAuthStore, {
			      userId: store => store.userId,
			      // 你也可以写一个函数来获得对 store 的访问权
			    }),
		},
		onReady() {},
		created() {
			this.taksList()
		},
		async mounted() {
			await nextTick()
		},
		methods: {
			async taksList() {
				let authStore = useAuthStore()
				let respData = await getTaskList({
					userId : '528978096703930768'
				})
				this.list = respData.data

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