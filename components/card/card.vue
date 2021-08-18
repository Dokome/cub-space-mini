<template>
	<!-- :class="{ 'margin-top-xs': type === 'news' }" -->
	<view class="padding wmax" @touchstart="touchstart" :class="backGround" @touchend="touchend">
		<!--
			动态
		 -->
		<view class="" v-if="type === 'news'">
			<!-- 动态、作者信息 -->
			<view class="flex" style="position: relative;" v-if="!isHome">
				<!-- 操作框(三个点) -->
				<view class="text-lg moreOptions" @click.stop="moreOptions">. . .</view>
				<!-- 头像 -->
				<view class="margin-top-xs"><u-avatar size="80" :src="newsdata.avatarUrl" 
				 @click.stop="enterUserHome(newsdata.userId, newsdata.anonymousStatus)"></u-avatar></view>
				<!-- 文字信息 -->
				<view class="margin-left-sm padding-top-xs">
					<!-- 名字/学校 -->
					<view class="flex align-center">
						<view class="text-black" >{{ newsdata.nickName }}</view>
					</view>
					<!-- 时间 -->
					<view class="u-tips-color text-sm margin-top-xs">{{ newsdata.pushTime }}</view>
				</view>
			</view>
			<!-- 个人主页的头部 -->
			<view class="padding-tb text-bold text-lg text-black" v-else>
				{{ newsdata.pushTime }}
			</view>
			<!-- 文字栏 -->
			<!-- <view class="margin-tb-xs text-black text-content"  :class="{ clamp3: clamp }">{{ newsdata.content }}</view> -->
			<view class="margin-tb-xs text-black text-content" >{{ newsdata.content }}</view>
			<!-- 图片栏 -->
			<view class="margin-tb-sm img_Con" style="width: 600rpx;" v-if="newsdata.images && newsdata.images.length">
				<view :class="imgNewStyle" v-for="(item, index) in newsdata.images" :key="index">
					<image :src="item.url" mode="aspectFill" @click.stop="imgPrview(item.url, newsdata.images)" class="show_img" :style="imgNewStyle"></image>
				</view>
			</view>
			<u-tag :text="newsdata.schoolName" shape="circle" color="#909399" bg-color="#F5F5F5" border-color="#F5F5F5"  v-if="!isHome"/>
			<!-- 底部交互栏 -->
			<view class="flex justify-between align-center margin-top-sm">
				<!-- 左/转发 -->
				<view class="flex align-center">
					<image src="/static/Img/share.png" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
					<text class="margin-left-xs text-sm">{{ newsdata.forwardNum }}</text>
				</view>
				<!-- 右/点赞评论 -->
				<view class="flex align-center">
					<image src="/static/Img/chat.png" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
					<text class="margin-left-xs text-sm">{{ newsdata.commentNum }}</text>
					<text class="margin-lr"></text>
					<view class="" @click.stop="likeHandle(newsdata, 1)">
						<image :src="`/static/Img/thumb${likeStatus ? '-B' : ''}.png`" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
						<text class="margin-left-xs text-sm">{{ likeNum }}</text>
					</view>
				</view>
			</view>
			<!-- 模态框 -->
			<!-- 更多 -->
			<u-modal v-model="modalShow" :show-confirm-button="false" :mask-close-able="true" :show-title="false">
				<view class="flex flex-direction" @click="moreOptionsClick(newsdata, $event)">
					<view class="padding" data-type="delete" v-if="!newsdata.btnStatus">删除</view>
					<view class="padding" data-type="report">举报</view>
					<view class="padding" data-type="share" style="position: relative;">
						转发
						<button open-type="share" :data-info="newsdata" class="shareButton"></button>
					</view>
				</view>
			</u-modal>
			<!-- 举报 -->
			<u-modal v-model="reportModalShow" :show-confirm-button="false" :mask-close-able="true" :show-title="false">
				<view class="flex flex-direction">
					<view class="padding" v-for="item in reportInfoList" :key="item.id" @click="dataReport(item.value)">{{ item.value }}</view>
				</view>
			</u-modal>
		</view>
		<!-- 
			回复类型
		 -->
		<view class="" v-if="type === 'reply' || type === 'comment'" @click="replyHandle(commentdata)">
			<view class="flex wmax">
				<!-- 头像 -->
				<view class="" style="width: 65rpx;"  @click.stop="enterUserHome(commentdata.userId)">
					<u-avatar size="60" :src="commentdata.avatarUrl"></u-avatar>
				</view>
				<!-- 主体 -->
				<view class="padding-left-xs flex-sub flex flex-direction" style="margin-top: -10rpx;">
					<!-- 名称、下标 -->
					<view class="flex flex-direction">
						<text class="text-sm text-black text-bold">
							{{ commentdata.nickName }}
							<text class="text-blue text-bold" v-if="commentdata.isAuthor">{{ '[作者]' }}</text>
						</text>
						<text class="u-tips-color text-sm">{{ commentdata.schoolName }}</text>
					</view>
					<!-- 正文 -->
					<view class="wmax margin-top-sm">
						<view class="text-black text-content">
							<text v-if="type === 'reply' && commentdata.commentType == 2">
								<text>回复</text>
								<text class="margin-lr-xs text-blue">
									<text>{{ commentdata.parentCommentUserNickName }}</text>
								</text>
							</text>
							<text>{{ commentdata.content }}</text>
						</view>
						<!-- 配图 -->
						<view class="margin-tb-sm img_Con" style="width: 600rpx;" v-if="commentdata.images && commentdata.images.length">
							<view :class="imgComStyle" v-for="(item, index) in commentdata.images" :key="index">
								<image :src="item.url" mode="aspectFill" class="show_img" :style="imgComStyle" @click.stop="imgPrview(item.url, commentdata.images)"></image>
							</view>
						</view>
					</view>
					<!-- 回复框 -->
					<view class="padding margin-top-xs" style="background-color: #F3F4F6; border-radius: 10rpx;" v-if="!enterStateComment && commentdata.childCommentLength">
						<view class="wmax">
							<view class="clamp1">
							</view>
						</view>
						<view class="">
							<text class="text-blue">查看全部{{ commentdata.childCommentLength }}条回复</text>
						</view>
					</view>
					<!-- 互动 -->
					<view class="flex justify-between align-center margin-top-sm">
						<!-- 左/转发 -->
						<view class="flex align-center u-tips-color">{{ commentdata.pushTime }}</view>
						<!-- 右/点赞评论 -->
						<view class="flex align-center">
							<image src="/static/Img/chat.png" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
							<text class="margin-lr"></text>
							<view class="" @click.stop="likeHandle(commentdata, 2)">
								<image :src="`/static/Img/thumb${likeStatus ? '-B' : ''}.png`" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
								<text class="margin-left-xs text-sm">{{ likeNum }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { __moreOptionsHandle } from './moreOptions.js';
export default {
	name: 'card',
	data() {
		return {
			singleImg: null,
			// 模态框的显示
			modalShow: false,
			// 举报框的显示
			reportModalShow: false,
			// 点赞的即时累加
			likeStatusCount: 0,
			likeNumCount: 0,
			// 背景色
			backGround: 'bg-white',
		};
	},
	computed: {
		imgNewStyle() {
			return this.$api.imgHandle.multiImgShow(this.newsdata.images);
		},
		imgComStyle() {
			return this.$api.imgHandle.multiImgShow(this.commentdata.images, { isComment: true });
		},
		likeStatus() {
			const data = this.commentdata.nickName ? this.commentdata : this.newsdata;
			return this.likeStatusCount ^ data.likeStatus;
		},
		likeNum() {
			const data = this.commentdata.nickName ? this.commentdata : this.newsdata;
			return data.likeNum + this.likeNumCount;
		}
	},
	mounted() {

	},
	methods: {
		...__moreOptionsHandle,
		// 回复评论打开
		replyHandle(commentData) {
			//
			if (this.enterStateComment) {
				uni.$emit('inputStatusChange', { type: this.type, data: commentData });
			} else if (this.type === 'comment' && !this.enterStateComment) {
				uni.$emit('repylChange', { type: this.type, data: commentData });
				uni.$emit('inputStatusChange', { type: this.type, data: commentData });
			}
		},
		// 图片预览
		imgPrview(url, imgList) {
			this.$api.imgHandle.imgPreview(url, imgList && imgList.map(item => item.url));
		},
		async likeHandle(data, type) {
			this.$api.interactive.likeHandle.call(this, data, type);
		},
		// 进入用户主页
		enterUserHome(id, anonymousStatus) {
			if (anonymousStatus || this.isIndex) {
				return;
			}
			this.$api.routerHandle.goto(`/pagesHome/mynews?id=${id}`);
		},
		// 长按
		touchstart(){
			this.backGround = 'bg-transition';
		},
		touchend() {
			this.backGround = 'bg-white';
		}
	},
	props: {
		newsdata: {
			type: Object,
			default() {
				return {};
			}
		},
		commentdata: {
			type: Object,
			default() {
				return {};
			}
		},
		clamp: {
			type: Boolean,
			default() {
				return false;
			}
		},
		type: {
			type: String,
			default() {
				return 'news';
			}
		},
		enterStateComment: {
			type: Boolean,
			default() {
				return false;
			}
		},
		reportInfoList: {
			type: Array,
			default() {
				return [];
			}
		},
		isHome: {
			type: Boolean,
			default() {
				return false;
			}
		},
		isIndex: {
			type: Boolean,
			default() {
				return false;
			}
		}
	}
};
</script>

<style lang="scss">
.moreOptions {
	position: absolute;
	right: 0;
	top: 0;
	z-index: 999;
}
.shareButton {
	width: 100%;
	height: 100%;	
	padding: 0;
	text-align: left;
	background-color: transparent;
	border: none;
	position: absolute;
	left: 0;
	top: 0;
}
</style> 
