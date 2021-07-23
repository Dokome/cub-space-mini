<template>
	<view>
		<!-- 头部 -->
		<navbar title="校园热榜"></navbar>
		<!-- 热榜内容 -->
		<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${ViewPart - 20}px)`}">
			<view>
				<view v-for="(item, index) in hostList" class="padding-sm flex margin-xs bg-white" style="height: 170rpx;">
					<view class="margin-right-sm text-gray" style="position: relative;">
						<image :src="`/static/Img/hotList${index + 1}.png`" mode="" v-if="index < 3" 
							style="width: 40rpx; height: 40rpx;position: absolute; left: -10rpx; top: 5rpx;"></image>
						<text>{{index + 1}}</text>
					</view>
					<view class="flex-sub flex align-start">
					<!-- 左侧 -->
					<view class="flex-sub">
						<text class="clamp">{{item.content}}</text>
					</view>
					<!-- 右侧 -->
					<view class="margin-left-sm" style="width: 200rpx; height: 130rpx;" v-if="item.imgList && item.imgList.length">
						<image :src="item.imgList[0]" mode="aspectFill" style="width: 100%; height: 100%;"></image>
					</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ViewPart: this.ViewPart,
				hostList: [
					{
						content: '如何看待B站服务器突然崩溃，哈哈哈哈笑死了，哈哈哈哈哈哈哈哈哈啊哈哈......',
						imgList: ['/static/Img/bgc.jpg']
					},
					{
						content: '如何看待B站服务器突然崩溃，哈哈哈哈笑死了，哈哈哈哈哈哈哈哈哈啊哈哈......',
						imgList: ['/static/Img/bgc.jpg']
					},
					{
						content: '如何看待B站服务器突然崩溃，哈哈哈哈笑死了，哈哈哈哈哈哈哈哈哈啊哈哈......',
						imgList: ['/static/Img/bgc.jpg']
					},
					{
						content: '如何看待B站服务器突然崩溃，哈哈哈哈笑死了，哈哈哈哈哈哈哈哈哈啊哈哈......',
						imgList: ['/static/Img/bgc.jpg']
					},
					{
						content: '如何看待B站服务器突然崩溃，哈哈哈哈笑死了，哈哈哈哈哈哈哈哈哈啊哈哈......',
						imgList: ['/static/Img/bgc.jpg']
					},
					{
						content: '如何看待B站服务器突然崩溃，哈哈哈哈笑死了，哈哈哈哈哈哈哈哈哈啊哈哈......',
						imgList: ['/static/Img/bgc.jpg']
					},
					{
						content: '如何看待B站服务器突然崩溃，哈哈哈哈笑死了，哈哈哈哈哈哈哈哈哈啊哈哈......',
						imgList: ['/static/Img/bgc.jpg']
					},
					{
						content: '如何看待B站服务器突然崩溃，哈哈哈哈笑死了，哈哈哈哈哈哈哈哈哈啊哈哈......',
						imgList: ['/static/Img/bgc.jpg']
					},
					{
						content: '如何看待B站服务器突然崩溃，哈哈哈哈笑死了，哈哈哈哈哈哈哈哈哈啊哈哈......',
						imgList: ['/static/Img/bgc.jpg']
					},
					{
						content: '如何看待B站服务器突然崩溃，哈哈哈哈笑死了，哈哈哈哈哈哈哈哈哈啊哈哈......',
						imgList: ['/static/Img/bgc.jpg']
					},
				]
			};
		}
	}
</script>

<style lang="scss" scoped>

</style>
