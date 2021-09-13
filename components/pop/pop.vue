<template>
	<view class="">
		<u-popup mode="bottom" v-model="show" :custom-style="{ zIndex: '88' }" border-radius="15">
			<view class="content" :style="{ height: type === 'publish' ? '100vh' : '85vh' }">
				<!-- 全屏遮罩 -->
				<view class="mask" v-if="ifMaskShow && type === 'publish'"></view>
				<navbar :title="type === 'publish' ? '发布' : '回复'" :ifBack="false"></navbar>
				<!-- 发布功能 -->
				<scroll-view scroll-y="true" :style="{ height: `calc(100% - ${CustomBar}px)` }" v-if="type === 'publish'">
					<!-- 文字信息 -->
					<view class="padding">
						<u-input
							type="textarea"
							:clearable="false"
							maxlength="360"
							height="600"
							:custom-style="{ 'background': 'white' }"
							:placeholder="'分享生活 留住美好'"
							v-model="newsTextContent"
						></u-input>
					</view>
					<view class="padding-top-xs" style="background-color: #F5F5F5;"></view>
					<!-- 图片选择框 -->
					<view class="imgchoose padding-xs">
						<scroll-view :scroll-x="true">
							<view class="flex imgBox">
								<view class="imgBox-item" v-for="(item, index) in imgList" :key="index" style="position: relative;">
									<image :src="item.url" mode="aspectFill" class="imgBox-img" @click="imgPrview(item.url, imgList)"></image>
									<image src="/static/Img/close.png" class="closeIcon" @click="imgRemove(index)"></image>
								</view>
								<view class="imgBox-item">
									<!-- 添加图片 -->
									<image src="/static/Img/addImg.png" mode="aspectFill" class="imgBox-img" @click="imgSelector" v-if="imgList.length < 9"></image>
								</view>
							</view>
						</scroll-view>
					</view>
					<!-- 匿名 -->
					<view class="flex padding-tb-sm padding-lr align-center justify-between">
						<text >面具</text>
						<u-switch v-model="newsAnonymous"></u-switch>
					</view>
					<!-- 提交按钮 -->
					<view class="flex justify-center padding-top-xl margin-bottom-xl">
						<u-button type="primary" :custom-style="{'height':'80rpx','width':'250rpx'}" @click="newsPublishHandle">发布</u-button>
					</view>
				</scroll-view>

				<!-- 回复部分 -->
				<scroll-view scroll-y="true" :style="{ height: `calc(100% - ${CustomBar}px)` }" v-if="type === 'reply' && commentInfo" @scrolltolower="scrollToBottom">
					<loading v-if="ifLoadingShow" :height="`calc(100% - 0px)`"></loading>
					<view class="">
						<card type="comment" :enterStateComment="true" :commentdata="commentInfo"></card>
						<view class="bg-white margin-top-xs padding">
							<text class="text-bold text-black text-df">{{ dataTotalNum + '条回复' }}</text>
						</view>
						<card type="reply" :enterStateComment="true" v-for="item in getNewsMapData()" :commentdata="item" :key="item.id"></card>
						<u-loadmore :status="loadStatus" :load-text="loadText" :bg-color="'#ffffff'"></u-loadmore>
						<view class="bg-white" style="height: 150rpx;"></view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { __newsPublish } from './newsPublish.js';
import { __dataUpdate } from './dataUpdate.js';
export default {
	name: 'pop',
	props: {
		type: {
			type: String,
			default() {
				return '';
			}
		}
	},
	data() {
		return {
			//
			ifLoadingShow: false,
			/* 
					评论相关的数据
			 */
			//评论信息
			commentInfo: null,
			// 评论回复列表
			replyList: new Map(),
			// 回复总页数
			totalPage: 1,
			//回复的当前页数
			currentPageNum: 1,
			// 回复的总条数
			dataTotalNum: 0,
			// loadmore的加载状态
			loadStatus: 'nomore',
			// 举报文字
			loadText: {
				loadmore: '上拉加载更多',
				loading: '努力加载ing...',
				nomore: '没有更多了~'
			},
			// 弹框的显示
			show: false,
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			/* 
					动态相关的数据
			 */
			// 发布时的选择匿名按钮
			newsAnonymous: false,
			// 文本信息
			newsTextContent: '',
			// 发布时的图片列表
			imgList: [],
			ifMaskShow: false,
		};
	},
	methods: {
		...__newsPublish,
		...__dataUpdate,
		// 控制pop的显示
		popUpChange() {
			this.show = !this.show;
		},
		// 图片预览
		imgPrview(url, imgList) {
			this.$api.imgHandle.imgPreview(url, imgList && imgList.map(item => item.url));
		},
	},
	mounted() {
		// 先把其他页面的时间全部注销
		uni.$off('repylChange');
		uni.$off('popUpChange');
		uni.$off('updatePopCurrentInfo');
		uni.$off('deleteComment');
		// 删除评论
		uni.$on('deleteComment', (id) => {
			this.deleteComment(id);
		})
		//弹起下落(发布)
		uni.$on('popUpChange', status => {
			this.popUpChange();
		});
		uni.$on('repylChange', options => {
			if (!options.popDontChange) {
				this.ifLoadingShow = true;
				this.popUpChange();
			}
			if (!this.commentInfo) {
				this.commentInfo = options.data;
			}
			let id = undefined;
			if (options.type === 'comment') {
				id = options.data.id;
			} else if (options.type === 'reply') {
				id = options.id;
			}
			this.updateReplyList(id, { noToken: true, delay: 100, getNew: true });
		});
	},
	computed: {
		// 当前的状态
		curType() {
			if (this.type === 'publish') {
				return '发布';
			} else {
				return this.type === 'login' ? '登录' : '回复';
			}
		}
	},
	watch: {
		show(state) {
			if (!state && this.type === 'reply') {
				// 回复状态转化为回复动态
				uni.$emit('changeStateBackNew');
				this.clearData();
			} else if (!state) {
				// uni.$emit()
			}
		}
	}
};
</script>

<style lang="scss">
.closeIcon {
	position: absolute;
	top: 0;
	right: 0;
	width: 50rpx;
	height: 50rpx;
	border-radius: 50%;
	background-color: #fff;
}
	
.imgBox {
	display: flex;
	flex-wrap: nowrap;
	.imgBox-item {
		flex-shrink: 0;
		.imgBox-img {
			padding: 5rpx;
			width: 180rpx;
			height: 180rpx;
		}
	}
}

.imgchoose {
	height: 200rpx;
	width: 100%;
	background-color: #fff;
	left: 0;
}

.mask {
	position: absolute;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	z-index: 99999999999999999;
}
</style>
