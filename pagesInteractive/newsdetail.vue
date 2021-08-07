<template>
	<view>
		<navbar title="次方空间"></navbar>
		<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${ViewPart - 20}px)` }" v-if="newsDetail">
			<!-- 头部 -->
			<card :clamp="false" :newsdata="newsDetail"></card>
			<!-- 评论 -->
			<view class="" v-if="newsCommentList">
				<!-- 评论头 -->
				<view class="bg-white margin-top-xs padding">
					<text class="text-bold text-black text-df">{{ newsCommentList && newsCommentList.length + '条评论' }}</text>
				</view>
				<!-- 列表 -->
				<card type="comment" v-for="item in newsCommentList" :key="item.id" :commentdata="item"></card>
				<view class="bg-white" style="height: 100rpx;"></view>
			</view>
			<view class="" style="height: 100rpx;"></view>
		</scroll-view>
		<!-- 回复 -->
		<pop type="reply"></pop>
		<textInput></textInput>
		<loading v-if="ifLoaddingShow"></loading>
	</view>
</template>

<script>
export default {
	data() {
		return {
			ifLoaddingShow: true,
			ViewPart: this.ViewPart,
			// 评论信息
			newsDetail: null,
			// 回复列表
			newsCommentList: null,
			imgList: [
				{
					url: 'https://image.sapce.club/common/1623820732138714505.jpg'
				},
				{
					url: 'https://image.sapce.club/common/1623820567807803537.jpg'
				},
				{
					url: 'https://image.sapce.club/common/1623817461535790285.jpg'
				},
				{
					url: 'https://image.sapce.club/common/1623820798277584078.jpg'
				},
				{
					url: 'https://image.sapce.club/common/1623820734980753560.jpg'
				},
				{
					url: 'https://image.sapce.club/common/1623820687514623626.jpg'
				}
			]
		};
	},
	computed: {
		imgStyle() {
			return this.$api.imgHandle.multiImgShow.call(this);
		}
	},
	methods: {
		// 查询动态信息
		async getNewsInfo(options) {
			const data = await this.$http.request({
				url: '/dynamicState/selectDynamicDetail',
				method: 'POST',
				data: {
					dynamicId: options.id
				},
				noToken: options.noToken
			});
			const result = data.data.data;
			this.newsDetail = result;
			this.$forceUpdate();
			setTimeout(() => {
				this.ifLoaddingShow = false;
			}, 500);
		},
		// 查询动态评论
		async getNewComment(options) {
			const data = await this.$http.request({
				url: '/dynamicComment/selectCommentByDyIdAndPage',
				method: 'POST',
				data: {
					pageNum: 1,
					pageSize: 100,
					parmas: {
						dynamicId: options.id
					}
				},
				noToken: options.noToken
			});
			const result = data.data.data;
			this.newsCommentList = result.list;
			this.$forceUpdate();
		}
	},
	onLoad(options) {
		this.getNewsInfo({ id: options.id, noToken: true });
		this.getNewComment({ id: options.id, noToken: true });
	}
};
</script>

<style lang="scss"></style>
