<template>
	<view style="background-color: #fff;"> 
		<navbar :title="'滴滴'"></navbar>
		<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${ViewPart - 20}px)`}">
			<view style="padding-bottom: 180rpx;">
				<view class="padding-top-xs" style="background-color: #F5F5F5;"></view>
				<view class="isMessage" v-for="item in 10" :class="item % 2 === 1 ? 'isNotSelf' : 'isSelf' ">
					<view :class="item % 2 === 1 ? 'margin-right-sm' : 'margin-left-sm'">
						<u-avatar :size="80" :src="'https://image.sapce.club/common/1623820798277584078.jpg'"></u-avatar>
					</view>
					<view class="messageBlock flex align-center justify-center">
					<text class="text-justify">
						{{'uView是uni-app生态专用的UI框架，uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码'}}
					</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<textInput></textInput>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ViewPart: this.ViewPart,
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.isMessage {
	// 消息
	padding: 40rpx 20rpx;
	display: flex;
	display: flex;
	justify-content: flex-start;
}	

.messageBlock {
	max-width: 450rpx;
	padding: 20rpx;
	// letter-spacing: 0.5rpx;
	min-width: 100rpx;
	border-radius: 10rpx;
}

.isNotSelf {
	// 自己
	.messageBlock {
		background-color: #0081FF;
		color: #FFF;
	}
}
.isSelf {
	// 对方
	flex-direction: row-reverse;
	justify-self: flex-start;
	.messageBlock {
		background-color: #D9E4FA;
		color: #000;
	}
}
</style>
