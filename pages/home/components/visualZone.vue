<template>
	<view class="visual-container">

		<uni-section title="可视化" type="line">
			<view class="main">
				<view class="branch-container">
					<view>今日报告</view>
					<view class="segmented-container">
						<uni-segmented-control :current="current" :values="segmentedItem" style-type="button"
							active-color="#01cc70" inActiveColor="#f1f5f8" />
					</view>
				</view>
				<view class="branch-container">
					<view>0小时43分</view>
					<view>
						.Num 123
					</view>
				</view>
				<view class="branch-container" id="barChartContainer">
					<!--  style="width: 300px; height: 200px;" canvas-id="barChart" -->
					<canvas class="canvas-container" canvas-id="barChart" id="barChart"
						:style="{width:'100%'}"></canvas>
				</view>

			</view>

		</uni-section>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		nextTick,
		getCurrentInstance
	} from "vue"
	// import Echarts from "@/utils/Echarts";
	const instance = getCurrentInstance();
	const segmentedItem = ['日', '周', '月', '年']
	let current = ref(0)


	onMounted(async () => {
		await nextTick()
		await createChart()
	})


	const queryNode = async (nodeName) => {
		return new Promise((resolve, reject) => {

			const query = uni.createSelectorQuery().in(instance)
			query.select(nodeName).fields({
				node: true,
				size: true
			}).exec((barStyle) => {

				setTimeout(() => {

					console.log("barStyle", barStyle)
				}, 500)
				const systemInfo = uni.getSystemInfoSync();
				const pixelRatio = systemInfo.pixelRatio; // 获取像素比

				const width = barStyle[0].width * pixelRatio;
				const height = barStyle[0].height * pixelRatio


				// let charts = new Echarts(barStyle[0].node, null, {
				// 	width,
				// 	height,
				// })

				// charts.testCharts()
			})


		})
	}


	const createChart = async () => {
		await queryNode("#barChart")
	}
</script>

<style scoped>
	.visual-container {
		border-radius: 10rpx;
		background-image: linear-gradient(to bottom,
				rgba(244, 247, 252),
				rgba(230, 250, 241));
		height: 100%;
	}

	.main {
		height: 100%;
		padding: 0 20rpx;
	}

	.branch-container {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin-bottom: 40rpx;
		width: 100%;
	}

	.branch-container:nth-child(1) {
		font-size: 32rpx;
	}

	.segmented-container {
		width: 320rpx;
	}

	.canvas-container {
		border: 1px solid red;
	}
</style>