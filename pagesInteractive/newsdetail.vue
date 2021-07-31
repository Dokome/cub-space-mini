<template>
	<view>
		<navbar title="动态详情"></navbar>
		<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${ViewPart - 20}px)`}">
		<!-- 头部 -->
			<card :clamp="false"></card>
			<!-- 评论 -->
			<view class="">
				<!-- 评论头 -->
				<view class="bg-white margin-top-xs padding">
					<text class="text-bold text-black text-lg">{{ 21 + '条评论'}}</text>
				</view>
				<!-- 列表 -->
				<card type="comment" v-for="item in 2" :key="index"></card>
				<view class="bg-white" style="height: 80rpx;"></view>
				<u-divider color="#909399" half-width="200" border-color="#6d6d6d">没有更多了</u-divider>
				<view class="bg-white" style="height: 80rpx;"></view>
			</view>
			<view class="" style="height: 100rpx;"></view>
		</scroll-view>
		<!-- 回复 -->
		<pop type="reply"></pop>
		<textInput></textInput>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ViewPart: this.ViewPart,
				imgList: [
					{
						url: 'https://image.sapce.club/common/1623820732138714505.jpg',
					},
					{
						url: 'https://image.sapce.club/common/1623820567807803537.jpg',
					},
					{
						url: 'https://image.sapce.club/common/1623817461535790285.jpg',
					},
					{
						url: 'https://image.sapce.club/common/1623820798277584078.jpg',
					},
					{
						url: 'https://image.sapce.club/common/1623820734980753560.jpg',
					},
					{
						url: 'https://image.sapce.club/common/1623820687514623626.jpg',
					},
				],
			};
		},
		computed: {
			imgStyle() {
				return this.$api.imgHandle.multiImgShow.call(this);
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>
