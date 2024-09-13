<template>
	<uni-section title="列表" type="line">
		<uni-swipe-action>
			<template v-for="task in  list" :key="task.userId">
				<uni-swipe-action-item :right-options="options2" show="none" :auto-close="false">
					<uni-list-item :title="task.title" :note="task.Descript" showArrow thumb-size="sm" rightText="小图" />
				</uni-swipe-action-item>
			</template>
		</uni-swipe-action>
	</uni-section>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted,
		nextTick,
		computed,
	} from "vue"
	import {
		useAuthStore
	} from "@/pinia/index.js"
	import {
		getTaskList
	} from "/api/home/index.js"

	const auth = useAuthStore()
	const optiosn2 = [{
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
	]
	let list = ref([])
	let userId = computed(() => auth.userId)


	onMounted(() => {
		// 等待页面加载
		nextTick()
		// 请求任务列表
		taksList()
	})

	const taksList = async () => {
		let respData = await getTaskList({
			userId: userId.value ?? "528978096703930768"
		})
		list.value = respData.data
	}
</script>

<style>
</style>