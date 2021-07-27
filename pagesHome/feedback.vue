<template>
	<view>
		<navbar title="意见反馈"></navbar>
		<view class="margin-bottom-xs"></view>
		<u-input type="textarea" maxlength="140" height="900"
			:custom-style="{ background: 'white' }" placeholder="请输入反馈内容">
		</u-input>
		<view class="flex justify-center padding-top-xl"><u-button size="medium" type="primary">提交</u-button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
