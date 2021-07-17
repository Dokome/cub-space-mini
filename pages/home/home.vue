<template>
	<view class="">
		<!-- 导航栏nav -->
		<navbar :ifNavDisplay="'none'"></navbar>
		<scroll-view scroll-y="true" class="scroll-wrapper">
			<view class="innerWrapper">
				<!-- 背景图 -->
				<view class="" style="height: 630rpx;">
					<image src="/static/Img/bgc.jpg" mode="aspectFill" style=" width: 100%; height: 100%;"></image>
				</view>
				<!-- 头像框/个人信息 -->
				<view class="bg-white flex flex-direction" style="height: 365rpx; width: 100%;">
					<!-- 信息与头像间隔的地方 -->
					<view class="bg-white flex align-center padding-left-lg" style="height: 40rpx;">
						<!-- 头像 -->
						<u-avatar
							:size="150" 
							:src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftx-free-imgs.acfun.cn%2Fcontent%2F2019_7_21%2F1.5636994914764566E9.png%3Fimageslim&refer=http%3A%2F%2Ftx-free-imgs.acfun.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629122958&t=ddad2dd6664dee4cc4dea6e21c807aa1'" 
						></u-avatar>
					</view>
					<!-- 信息 -->
					<view class="padding-lr-lg flex-sub flex flex-direction" style="margin-top: 80rpx;">
						<!-- 名字 -->
						<view class=""><text class="text-bold text-lg text-black text-xxl">mate川丶</text></view>
						<!-- 标签 -->
						<view class="margin-tb-sm">
							<!-- ID -->
							<u-tag :text="'UID:1098265675'" shape="circle" color="#A8A8A8" bg-color="#F5F5F5" border-color="#F5F5F5" />
							<!-- 学校 -->
							<u-tag :text="'学校:江西师范大学'" shape="circle" color="#A8A8A8" bg-color="#F5F5F5" border-color="#F5F5F5"/>
						</view>
						<!-- 个性签名 -->
						<view class="">
							<text class="text-bold text-sm text-cut text-gray">总有些惊奇的际遇，比方说当我遇见你！</text>
						</view>
						<!-- 个人数据 -->
						<view class="flex align-end flex-sub padding-bottom-xs" style="width: 70%;">
							<text class="text-bold text-black text-xl margin-right-xs">8</text><text class="margin-right text-gray">动态</text>
							<text class="text-bold text-black text-xl margin-right-xs">62</text><text class="margin-right text-gray">粉丝</text>
							<text class="text-bold text-black text-xl margin-right-xs">3</text><text class="margin-right text-gray">关注</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部栏nav -->
		<u-tabbar
		  :list="list"
			:mid-button="midButton"
			:inactive-color="inactiveColor"
			:activeColor="activeColor"
			:change="navChange"
			:border-top="borderTop"
		></u-tabbar>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				list: this.$store.state.list
			}
		},
		methods: {
			
		},
		computed: {
			...mapState(['midButton', 'inactiveColor', 'activeColor', 'borderTop']),
		},
	}
</script>

<style scoped lang="scss">
	.u-demo-area {
		margin: 0 -40rpx;
	}
</style>
