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
				<view class="padding flex bg-white margin-bottom-xs wmax"  v-for="item in 3">
					<!-- 头像 -->
					<view class="" style="width: 65rpx;">
						<u-avatar
						size="60"
						:src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftx-free-imgs.acfun.cn%2Fcontent%2F2019_7_21%2F1.5636994914764566E9.png%3Fimageslim&refer=http%3A%2F%2Ftx-free-imgs.acfun.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629122958&t=ddad2dd6664dee4cc4dea6e21c807aa1'"
						></u-avatar>
					</view>
					<!-- 主体 -->
					<view class="padding-left-sm flex-sub flex flex-direction">
						<!-- 名称、下标 -->
						<view class="flex flex-direction" >
							<text class="text-bold">mate</text>
							<text class="margin-tb-xs u-tips-color">南昌</text>
						</view>
						<!-- 正文 -->
						<view class="wmax">
								<view class="clamp3">然而人生辽阔，眼里不应该只有爱情，是的，它真的发生了</view>
								<!-- 配图 -->
								<view class="margin-tb-sm img_Con"  style="width: 600rpx;" v-if="imgList && imgList.length">
									<view :class="imgStyle" v-for="(item, index) in imgList" :key="index">
										<image :src="item.url" mode="aspectFill" class="show_img" :style="imgStyle" ></image>
									</view>
								</view> 
						</view>
						<!-- 回复框 -->
						<view class="padding margin-top-sm" style="background-color: #F3F4F6;">
							<view class="wmax">
									<view class="clamp1">
										<text style="color: #666;">{{'孤岛'}}</text>:	
										<text class="margin-left-xs" style="color: #666;">{{'然而人生辽阔，眼里不应该只有爱情，是的，它真的发生了'}}</text>
									</view>
							</view>
							<view class="margin-top-sm">
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
			</view>
			<view class="" style="height: 120rpx;"></view>
		</scroll-view>
		<!-- 回复 -->
		<view class="bg-white replyStyle flex align-center padding" :style="[{bottom:InputBottom+'px'}]">
			<!-- 图片选择 -->
			<view>
				<image src="/static/Img/imgchose.png" mode="" 
					style="width: 50rpx; height: 40rpx;" @click="ImgChooseHandle"> 
				</image>
			</view>
			<!-- 输入框 -->
			 <textarea value=""  @focus="InputFocus" @blur="InputBlur" :show-confirm-bar="false"
								auto-height class="textarea" :adjust-position="false"
								 maxlength="200" :fixed="true"/>
			<!-- 发送 -->
			<view>
				<u-button type="primary" size="mini">发送</u-button>
			</view>
			<!-- 图片框 -->
			<view class="imgchoose padding-sm" v-show="ifImgChoose" style="transition: .2s;">
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
						url: '/static/Img/bgc.jpg',
					},
					{
						url: '/static/Img/bgc.jpg',
					},
					{
						url: '/static/Img/bgc.jpg',
					},
					{
						url: '/static/Img/bgc.jpg',
					},
					{
						url: '/static/Img/bgc.jpg',
					},
					{
						url: '/static/Img/bgc.jpg',
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
			}
		}
	}
</script>

<style lang="scss">
.replyStyle {
	box-sizing: border-box;
	width: 100%;
	position: fixed;
}

.inputBox {
	width: 520rpx;
	border-radius: 10rpx;
}

.textarea {
	background-color: #F3F4F6;
	padding: 20rpx;
	margin: 0 25rpx;
	border-radius: 15rpx;
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
			padding: 10rpx;
			width: 180rpx;
			height: 180rpx;
			border-radius: 20%;
		}
	}
}
</style>
