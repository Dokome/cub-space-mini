<template>
	<view class="bg-white margin-top-xs padding" style="width: 100%;">
		<!-- 动态、作者信息 -->
		<view class="flex">
			<!-- 头像 -->
			<view class="margin-top-xs">
				<u-avatar 
				size="60"
				:src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftx-free-imgs.acfun.cn%2Fcontent%2F2019_7_21%2F1.5636994914764566E9.png%3Fimageslim&refer=http%3A%2F%2Ftx-free-imgs.acfun.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629122958&t=ddad2dd6664dee4cc4dea6e21c807aa1'"
				></u-avatar>
			</view>
			<!-- 文字信息 -->
			<view class="margin-left-xs padding-top-xs">
				<!-- 名字/学校 -->
				<view class="flex align-center">
					<view class="text-sm text-black" style="font-weight: 600">APEX</view>
				</view>
				<!-- 时间 -->
				<view class="u-tips-color text-sm">2021/7/21 21:57</view>
			</view>
		</view>
		<!-- 文字栏 -->
		<view class="margin-tb-xs clamp text-black text-content text-df">
			但说实话，背包九讲对于小白来说确实不太友好，看起来还是有点费劲的，且都是伪代码理解起来也吃力。
			但说实话，背包九讲对于小白来说确实不太友好，看起来还是有点费劲的，且都是伪代码理解起来也吃力。
		</view>
		<!-- 图片栏 -->
		<view class="margin-tb-sm img_Con"  style="width: 600rpx;" v-if="imgList && imgList.length">
			<view :class="imgStyle" v-for="(item, index) in imgList" :key="index">
				<image :src="item.url" mode="aspectFill" class="show_img" :style="imgStyle" ></image>
			</view>
		</view> 
		<u-tag :text="'江西师范大学'" shape="circle" color="#909399" bg-color="#F5F5F5" border-color="#F5F5F5"/>
		<!-- 底部交互栏 -->
		<view class="flex justify-between align-center margin-top-sm">
			<!-- 左/转发 -->
			<view class="flex align-center">
				<image src="/static/Img/share.png" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
				<text class="margin-left-xs text-sm">2</text>
			</view>
			<!-- 右/点赞评论 -->
			<view class="flex align-center">
				<image src="/static/Img/chat.png" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
				<text class="margin-left-xs text-sm">37</text>
				<text class="margin-lr"></text>
				<image src="/static/Img/thumb-B.png" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
				<text class="margin-left-xs text-sm">100</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"card",
		data() {
			return {
				imgList: [
					
				],
				singleImg: null
			};
		},
		computed: {
			imgStyle() {
				let singleImg = '';
				//单图特殊格式
				if (this.imgList.length === 1) {
					//定义宽高
					let [width, height] = [this.imgList[0].width, this.imgList[0].height];
					//比例系数
					let scale = width / height;
					if (scale >= 1) {
						// 宽图
						if (scale >= 3) {
							singleImg = `height: 120rpx; width: 360rpx `;
						} else {
							// 正常范围
							singleImg = `height: ${ 360 * scale }rpx; width: 360rpx `;
						}
					} else {
						// 高图
						if (scale <= 0.3) {
							singleImg = `height: 360rpx; width: 120rpx `;
						} else {
							// 正常范围
							singleImg =  `height: 360rpx; width: ${ 360 * scale }rpx `;
						}
					}
				}
				//返回对应css类
				return singleImg || `img_${ this.imgList.length }`;
			}
		}
	}
</script>

<style lang="scss">

</style>
