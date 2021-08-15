<template>
	<view>
		<navbar title="意见反馈"></navbar>
		<view class="padding bg-white">
			<u-input
				type="textarea"
				maxlength="140"
				height="700"
				v-model="content"
				:clearable="false"
				:custom-style="{ background: 'white', padding: '10rpx' }"
				placeholder="请输入反馈内容"
			></u-input>
		</view>
		<view class="flex justify-center padding-top-xl margin-bottom-xl">
			<u-button  :custom-style="{'height':'80rpx','width':'300rpx'}" type="primary" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			content: ''
		};
	},
	methods: {
		// 提交反馈
		async submit() {
			if (this.content.trim().length === 0) {
				return uni.showToast({
					title: '内容不能为空',
					icon: 'none'
				});
			} else {
				uni.showLoading({
					title: '提交中',
					icon: 'none'
				});
				const data = await this.$http.request({
					url: '/sysFeedback/pushFeedback',
					method: 'POST',
					data: {
						content: this.content
					}
				});
				uni.hideLoading();
				if (data.data.code === 200) {
					setTimeout(() => {
						this.$api.routerHandle.goback();
					}, 1000);
					return uni.showToast({
						title: '感谢您的反馈~',
						icon: 'none'
					});
				}
			}
			//
		}
	}
};
</script>

<style lang="scss" scoped></style>
