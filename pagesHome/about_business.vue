<template>
	<view>
		<navbar :title="page"></navbar>
		<view class="align-center justify-center flex flex-direction container">
			<image :src="img" mode="aspectFill" style="width: 400rpx; height: 400rpx;"></image>
			<view v-if="page !== '商务合作'" class="margin-top"><text class="text-bold text-xxl text-gray" >次方空间</text></view>
			<view class="margin-top"><text class="text-bold text-gray" >{{ page === '商务合作' ? bussiness : aboutus }}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//页面
				page: '',
				img: 'https://image.sapce.club/common/1623820687514623626.jpg',
				bussiness: '扫一扫上面的二维码，加我微信',
				aboutus: '欢迎加入官方QQ群：810216790'
			};
		},
		onLoad(options) {
			this.page = options.page === 'business' ? '商务合作' : '关于我们';
		}
	}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 70vh;
}
</style>
