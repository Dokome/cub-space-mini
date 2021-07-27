<template>
	<view>
		<navbar title="动态详情"></navbar>
		<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${ViewPart - 20}px)`}">
		<!-- 头部 -->
			<card></card>
			<!-- 评论 -->
			<view class="">
				<!-- 评论头 -->
				<view class="bg-white margin-top-xs padding">
					<text class="text-bold text-black text-lg">{{ 21 + '条评论'}}</text>
				</view>
				<!-- 列表 -->
				<view class="padding flex bg-white wmax u-border-top"  v-for="item in 2">
					<!-- 头像 -->
					<view class="" style="width: 65rpx;">
						<u-avatar
						size="60"
						:src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftx-free-imgs.acfun.cn%2Fcontent%2F2019_7_21%2F1.5636994914764566E9.png%3Fimageslim&refer=http%3A%2F%2Ftx-free-imgs.acfun.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629122958&t=ddad2dd6664dee4cc4dea6e21c807aa1'"
						></u-avatar>
					</view>
					<!-- 主体 -->
					<view class="padding-left-xs flex-sub flex flex-direction" style="margin-top: -10rpx;">
						<!-- 名称、下标 -->
						<view class="flex flex-direction" >
							<text class="text-black" style="font-weight: 600;">mate</text>
							<text class="u-tips-color text-sm">江西财经大学</text>
						</view>
						<!-- 正文 -->
						<view class="wmax margin-top-sm">
								<view class="clamp3 text-black text-content">
									然而人生辽阔，眼里不应该只有爱情，是的，它真的发生了。
									然而人生辽阔，眼里不应该只有爱情，是的，它真的发生了。
								</view>
								<!-- 配图 -->
								<view class="margin-tb-sm img_Con"  style="width: 600rpx;" v-if="imgList && imgList.length">
									<view :class="imgStyle" v-for="(item, index) in imgList" :key="index">
										<image :src="item.url" mode="aspectFill" class="show_img" :style="imgStyle" ></image>
									</view>
								</view> 
						</view>
						<!-- 回复框 -->
						<view class="padding margin-top-xs" style="background-color: #F3F4F6; border-radius: 10rpx;">
							<view class="wmax">
									<view class="clamp1">
										<text style="color: #666;">{{'孤岛'}}</text>:	
										<text class="margin-left-xs" style="color: #666;">{{'然而人生辽阔，眼里不应该只有爱情，是的，它真的发生了'}}</text>
									</view>
							</view>
							<view class="margin-top-sm" @click="replyHandle">
								<text class="text-blue">查看全部{{21}}条回复</text>
							</view>
						</view>
						<!-- 互动 -->
						<view class="flex justify-between align-center margin-top-sm">
							<!-- 左/转发 -->
							<view class="flex align-center u-tips-color">
								{{'1天前'}}
							</view>
							<!-- 右/点赞评论 -->
							<view class="flex align-center">
								<image src="/static/Img/chat.png" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
								<text class="margin-lr"></text>
								<image src="/static/Img/thumb-B.png" mode="aspectFill" style="width: 30rpx; height: 30rpx;"></image>
								<text class="margin-left-xs text-sm">100</text>
							</view>
						</view>
					</view>
				</view>
				<u-divider color="#909399" half-width="200" border-color="#6d6d6d"	>没有更多了</u-divider>
				<view class="bg-white" style="height: 80rpx;"></view>
			</view>
			<view class="" style="height: 120rpx;"></view>
		</scroll-view>
		<!-- 回复 -->
		<pop type="reply"></pop>
		<view class="bg-white replyStyle flex align-center padding" :style="[{bottom:InputBottom+'px'}]">
			<!-- 图片选择 -->
			<view>
				<image src="/static/Img/imgchose.png" mode="" 
					style="width: 50rpx; height: 40rpx;" @click="ImgChooseHandle"> 
				</image>
			</view>
			<!-- 输入框 -->
			 <textarea value=""  @focus="InputFocus" @blur="InputBlur" :show-confirm-bar="false"
								auto-height class="textarea" :adjust-position="false" placeholder="我来说几句..."
								 maxlength="200" :fixed="true"/>
			<!-- 发送 -->
			<view>
				<u-button type="primary" size="mini">发送</u-button>
			</view>
			<!-- 图片框 -->
			<view class="imgchoose padding-xs" v-show="ifImgChoose" style="transition: .2s;">
				<scroll-view :scroll-x="true" >
					<view class="flex imgBox">
						<view class="imgBox-item" v-for="item in imgList">
							<image :src="item.url" mode="aspectFill" class="imgBox-img"></image>
						</view>
						<view class="imgBox-item">
							<image src="/static/Img/addImg.png" mode="aspectFill" class="imgBox-img"></image>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ViewPart: this.ViewPart,
				InputBottom: 0,
				ifImgChoose: false,
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
			InputFocus(e) {
				this.InputBottom = e.detail.height;
				this.ifImgChoose = false;
			},
			InputBlur(e) {
				this.InputBottom = 0;
			},
			ImgChooseHandle() {
				this.ifImgChoose = !this.ifImgChoose;
			},
			// 回复评论
			replyHandle() {
				uni.$emit('popUpChange', '')
			}
		}
	}
</script>

<style lang="scss">
.replyStyle {
	box-sizing: border-box;
	width: 100%;
	position: fixed;
	z-index: 999999999;
}

.inputBox {
	width: 520rpx;
	border-radius: 10rpx;
}

.textarea {
	background-color: #F3F4F6;
	margin: 0 25rpx;
	padding: 15rpx;
	border-radius: 10rpx;
}

.imgchoose {
	position: absolute;
	bottom: 100%;
	height: 200rpx;
	width: 100%;
	background-color: #fff;
	left: 0;
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
</style>
