<template>
	<view>
		<navbar title="次方空间"></navbar>
		<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${ViewPart - 20}px)` }" v-if="newsDetail"
			@scrolltolower="scrollToBottom">
			<!-- 头部 -->
			<card :clamp="false" :newsdata="newsDetail"></card>
			<!-- 评论 -->
			<view class="" v-if="newsCommentList">
				<!-- 评论头 -->
				<view class="bg-white margin-top-xs padding">
					<text class="text-bold text-black text-df">{{ dataTotalNum + '条评论' }}</text>
				</view>
				<!-- 列表 -->
				<card type="comment" v-for="item in getNewsMapData()" :key="item.id" :commentdata="item"></card>
				<u-loadmore
					:status="loadStatus"
					:load-text="loadText"
					:bg-color="'#ffffff'"
				></u-loadmore>
				<view class="bg-white" style="height: 100rpx;"></view>
			</view>
			<view class="" style="height: 100rpx;"></view>
			<scroll-view scroll-y="true" class="emojiBox bg-white wmax" 
				style="height: 300px; width: 100%;" v-if="emojiShow">
				<view class="flex" style="flex-wrap: wrap;">
					<view class="emojiItem" v-for="(emoji, e_index) in emojiName" :key="e_index"  @click="emojiSelect(emoji)">
						<view class="emojiTtemImg flex align-center justify-center">
							<image :src="getEmoji(emoji)" mode="aspectFill" style="width: 60%; height: 60%;"></image>
						</view>
					</view>
				</view>
			</scroll-view>
		</scroll-view>
		<!-- 回复 -->
		<pop type="reply"></pop>
		<textInput :type="inputType" :target="currentTarget"></textInput>
		<loading v-if="ifLoaddingShow"></loading>
	</view>
</template>

<script>
import { __dataUpdate } from './dataUpdate.js'
import { emojiUrl, emojiMap, emojiName } from 'utils/emoji.js';
export default {
	data() {
		return {
			newsId: undefined,
			emojiName: emojiName,
			ifLoaddingShow: true,
			ViewPart: this.ViewPart,
			// 评论信息
			newsDetail: null,
			// 回复列表
			newsCommentList: new Map(),
			// 回复的总页数
			totalPage: 1,
			// 回复的当前页数
			currentPageNum: 1,
			// 回复总条数
			dataTotalNum: 0,
			// 输入框的状态
			inputType: 'news',
			// 当前回复的对象 news/comment/reply
			currentTarget: {},
			// loadmore 组件
			loadStatus: 'nomore',
			// 举报文字
			loadText: {
				loadmore: '上拉加载更多',
				loading: '努力加载ing...',
				nomore: '没有更多了~'
			},
			emojiShow: false
		};
	},
	computed: {
		imgStyle() {
			return this.$api.imgHandle.multiImgShow.call(this);
		}
	},
	methods: {
		...__dataUpdate,
		getEmoji(name) {
			return emojiUrl + emojiMap[name];
		},
		emojiSelect(name) {
			uni.$emit('textInputAddEmoji', name);
		}
	},
	onLoad(options) {
		this.newsId = options.id;
		this.getNewsInfo({ id: options.id, noToken: true });
		this.getNewComment({ id: options.id, noToken: true });
		// 注销之前的监听器
		uni.$off('inputStatusChange');
		uni.$off('changeStateBackNew');
		uni.$off('updateCurrentInfo');
		uni.$off('deleteCommentDetail');
		uni.$off('emojiStateChange');
		// 回复对象转化
		uni.$on('inputStatusChange', (options) => {
			this.inputType = options.type;
			this.currentTarget = options.data;
			uni.$emit('clearInputData', '');
		});
		// 重新变为回复动态
		uni.$on('changeStateBackNew', () => {
			this.inputType = 'news';
			this.currentTarget = this.newsDetail;
			uni.$emit('clearInputData', '');
		});
		// 更新互动后的信息
		uni.$on('updateCurrentInfo', () => {
			this.getNewComment({ id: options.id, noToken: true, delay: 100, getNew: true});
		});
		uni.$on('deleteCommentDetail', (id) => {
			this.deleteComment(id);
		});
		uni.$on('emojiStateChange', (state) => {
			this.emojiShow = state;
		})
	},
	// 页面分享
	onShareAppMessage(res) {
		return this.$api.interactive.onShareFunc(res);
	},
};
</script>

<style lang="scss">
	.emojiBox {
		position: fixed;
		bottom: 0;
		z-index: 99999;
	}
	
	.emojiItem {
		position: relative;
		width: 12.5%;
		height: 0;
		padding-top: 12.5%;
		.emojiTtemImg {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
		}
	}
</style>
