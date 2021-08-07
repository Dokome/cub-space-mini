<template>
	<!-- :class="{ 'margin-top-xs': type === 'news' }" -->
	<view class="bg-white padding u-border-top" style="width: 100%;">
		<!--
			动态
		 -->
		<view class="" v-if="type === 'news'">
			<!-- 动态、作者信息 -->
			<view class="flex">
				<!-- 头像 -->
				<view class="margin-top-xs"><u-avatar size="60" :src="newsdata.avatarUrl"></u-avatar></view>
				<!-- 文字信息 -->
				<view class="margin-left-xs padding-top-xs">
					<!-- 名字/学校 -->
					<view class="flex align-center">
						<view class="text-sm text-black text-bold">{{ newsdata.nickName }}</view>
					</view>
					<!-- 时间 -->
					<view class="u-tips-color text-sm">{{ newsdata.pushTime }}</view>
				</view>
			</view>
			<!-- 文字栏 -->
			<view class="margin-tb-xs text-black text-content" :class="{ clamp3: clamp }">{{ newsdata.content }}</view>
			<!-- 图片栏 -->
			<view class="margin-tb-sm img_Con" style="width: 600rpx;" v-if="newsdata.images && newsdata.images.length">
				<view :class="imgNewStyle" v-for="(item, index) in newsdata.images" :key="index">
					<image :src="item.url" mode="aspectFill" @click.stop="imgPrview(item.url, newsdata.images)"
						class="show_img" :style="imgNewStyle">
					</image>
				</view>
			</view>
			<u-tag :text="newsdata.schoolName" shape="circle" color="#909399" bg-color="#F5F5F5" border-color="#F5F5F5" />
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
					<image :src="`/static/Img/thumb${newsdata.likeStatus ? '-B' : ''}.png`" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
					<text class="margin-left-xs text-sm">{{ newsdata.likeNum }}</text>
				</view>
			</view>
		</view>
		<!-- 
			回复类型
		 -->
		<view class="" v-if="type === 'reply' || type === 'comment'" @click="type === 'comment' && replyHandle(commentdata)">
			<view class="flex bg-white wmax">
				<!-- 头像 -->
				<view class="" style="width: 65rpx;"><u-avatar size="60" :src="commentdata.avatarUrl"></u-avatar></view>
				<!-- 主体 -->
				<view class="padding-left-xs flex-sub flex flex-direction" style="margin-top: -10rpx;">
					<!-- 名称、下标 -->
					<view class="flex flex-direction">
						<text class="text-sm text-black text-bold">{{ commentdata.nickName }}</text>
						<text class="u-tips-color text-sm">{{ commentdata.schoolName }}</text>
					</view>
					<!-- 正文 -->
					<view class="wmax margin-top-sm">
						<view class="clamp3 text-black text-content">
							<text v-if="type === 'reply' && commentdata.commentType == 2">
								<text>回复</text>
								<text class="margin-lr-xs text-blue">{{ commentdata.parentCommentUserNickName }}:</text>
							</text>
							<text>{{ commentdata.content }}</text>
						</view>
						<!-- 配图 -->
						<view class="margin-tb-sm img_Con" style="width: 600rpx;" v-if="commentdata.images && commentdata.images.length">
							<view :class="imgComStyle" v-for="(item, index) in commentdata.images" :key="index">
								<image :src="item.url" mode="aspectFill" class="show_img" 
											 :style="imgComStyle" @click.stop="imgPrview(item.url, commentdata.images)">
								</image>
							</view>
						</view>
					</view>
					<!-- 回复框 -->
					<view
						class="padding margin-top-xs"
						style="background-color: #F3F4F6; border-radius: 10rpx;"
						v-if="!enterStateComment && commentdata.childCommentList && commentdata.childCommentList.length"
					>
						<view class="wmax">
							<view class="clamp1">
								<text style="color: #666;">{{ commentdata.childCommentList[0].nickName }}</text>
								:
								<text class="margin-left-xs" style="color: #666;">{{ commentdata.childCommentList[0].content }}</text>
							</view>
						</view>
						<view class="margin-top-sm">
							<text class="text-blue">查看全部{{ commentdata.childCommentList.length }}条回复</text>
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
							<image :src="`/static/Img/thumb${newsdata.likeStatus ? '-B' : ''}.png`" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
							<text class="margin-left-xs text-sm">{{ commentdata.likeNum }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'card',
	data() {
		return {
			singleImg: null
		};
	},
	computed: {
		imgNewStyle() {
			return this.$api.imgHandle.multiImgShow(this.newsdata.images);
		},
		imgComStyle() {
			return this.$api.imgHandle.multiImgShow(this.commentdata.images, { isComment: true });
		}
	},
	mounted() {
		this.$forceUpdate();
	},
	methods: {
		// 回复评论
		replyHandle(commentData) {
			uni.$emit('repylChange', { type: 'comment', data: commentData });
		},
		// 图片预览
		imgPrview(url, imgList) {
			this.$api.imgHandle.imgPreview(url, imgList && imgList.map(item => item.url));
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
		}
	}
};
</script>

<style lang="scss"></style>
