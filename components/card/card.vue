<template>
	<view class="bg-white margin-top-xs padding" style="width: 100%;">
		<!-- 动态、作者信息 -->
		<view class="flex">
			<!-- 头像 -->
			<view class="margin-top-xs">
				<u-avatar 
				size="mini"
				:src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftx-free-imgs.acfun.cn%2Fcontent%2F2019_7_21%2F1.5636994914764566E9.png%3Fimageslim&refer=http%3A%2F%2Ftx-free-imgs.acfun.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629122958&t=ddad2dd6664dee4cc4dea6e21c807aa1'"
				></u-avatar>
			</view>
			<!-- 文字信息 -->
			<view class="margin-left-xs padding-top-xs">
				<!-- 名字/时间 -->
				<view class="flex align-center">
					<view class="u-main-color u-font-16" style="font-weight: 600">杨超越</view>
					<view class="u-light-color u-font-14 margin-left-xs" style="font-weight: 400">2021/7/21 21:57</view>
				</view>
				<!-- 学校 -->
				<view class="margin-top-xs padding-bottom-xs">
					<view class="u-light-color u-font-14" style="font-weight: 400">江西师范大学</view>
				</view>
			</view>
		</view>
		<!-- 文字栏 -->
		<view class="margin-tb-xs u-main-color u-line-5 u-font-16" style="font-weight: 400">
			但说实话，背包九讲对于小白来说确实不太友好，看起来还是有点费劲的，且都是伪代码理解起来也吃力。但说实话，背包九讲对于小白来说确实不太友好，看起来还是有点费劲的，且都是伪代码理解起来也吃力。
		</view>
		<!-- 图片栏 -->
		<view class="margin-tb-sm">
			<image src="/static/Img/bgc.jpg" mode="aspectFill"></image>
		</view>
		<!-- 底部交互栏 -->
		<view class="flex justify-between align-center">
			<!-- 左/转发 -->
			<view class="flex align-center">
				<image src="/static/Img/share.png" mode="aspectFill" style="width: 40rpx; height: 40rpx;"></image>
				<text class="margin-left-sm">2</text>
			</view>
			<!-- 右/点赞评论 -->
			<view class="flex align-center">
				<image src="/static/Img/chat.png" mode="aspectFill" style="width: 40rpx; height: 40rpx;"></image>
				<text class="margin-left-sm">37</text>
				<text class="margin-lr"></text>
				<image src="/static/Img/thumb-B.png" mode="aspectFill" style="width: 40rpx; height: 40rpx;"></image>
				<text class="margin-left-sm">100</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"card",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
