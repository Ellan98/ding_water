<template>
	
	<uni-section title="通知" type="line">
		<uni-list :border="true" :clickable="true">

			<uni-list-item class="robot" title="robot" note="Ask AI anything" showArrow thumb="/static/animal/cat-icon.png"
				thumb-size="lg" link="navigateTo" to="/pagesPackage/taskPage/chatRoom/chatRoom"></uni-list-item>
		</uni-list>
		

	</uni-section>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.uni-list {
		border: 2rpx solid #f4f7fc;
		margin: 0 auto;
		width: 99%;
	}

</style>