<template>
	<div class="text-container">
		<p class="animated-text">
			{{ displayText }}
			<span class="cursor" v-if="!isDeleting">|</span>
		</p>
	</div>
</template>

<script>
	import {
		everyday
	} from "@/api/login.js"
	export default {
		data() {
			return {
				fullText: '', // 从请求获取的全文
				displayText: '', // 当前显示的文本
				index: 0, // 当前显示的字符索引
				intervalTextAnimation: null, // 定时器 ID
				isDeleting: false // 是否在删除动画中
			};
		},
		async created() {

			// #ifndef WEB
			await this.getFullText();
			// #endif
			this.startTyping();
		},
		mounted() {
			clearInterval(this.intervalTextAnimation); // 在组件卸载前清除定时器
		},

		methods: {
			async getFullText() {
				try {
					const responseData = await everyday().data; // 使用实际的 API 端点

					this.fullText = responseData ?
						`${responseData.hitokoto} ${responseData.from_who ?? ''} -《${responseData.from ?? ''}》` :
						'出现未知错误。';
				} catch (error) {
					console.error('Error fetching new text:', error);
					this.fullText = ' 落叶别树，飘零随风。客无所托，悲与此同。';
				}
			},
			startTyping() {
				this.index = 0; // 重置索引
				this.displayText = ''; // 清空显示文本
				this.isDeleting = false;
				this.type();
			},
			type() {
				this.intervalTextAnimation = setTimeout(() => {
					if (!this.isDeleting) {
						if (this.index < this.fullText.length) {
							this.displayText += this.fullText[this.index]; // 追加下一个字符
							this.index++;
							this.type();
						} else {
							setTimeout(() => {
								this.isDeleting = true;
								this.type();
							}, 2000); // 显示完整文本后等待 2 秒再开始删除动画
						}
					} else {
						if (this.index > 0) {
							this.displayText = this.displayText.slice(0, -1); // 删除最后一个字符
							this.index--;
							this.type();
						} else {
							this.isDeleting = false;
							this.getFullText().then(() => {
								this.startTyping();
							});
						}
					}
				}, 100); // 每隔100ms添加或删除一个字符
			}
		}
	};
</script>

<style scoped>
	.text-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-size: 28rpx;
		font-family: monospace;
		white-space: pre-wrap;
		/* 允许换行 */
		overflow: hidden;
		position: relative;
	}

	.animated-text {
		margin: 0;
		/* 清除段落默认的外边距 */
	}

	.cursor {
		font-weight: bold;
		animation: blink 1s step-end infinite;
		align-self: flex-end;
	}

	@keyframes blink {

		from,
		to {
			visibility: visible;
		}

		50% {
			visibility: hidden;
		}
	}
</style>