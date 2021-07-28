<template>
	<view class="bg-white padding u-border-top" style="width: 100%;" :class="{ 'margin-top-xs' : type === 'news'}">
		<!--
			动态
		 -->
		<view class="" v-if="type === 'news'">
			<!-- 动态、作者信息 -->
			<view class="flex">
				<!-- 头像 -->
				<view class="margin-top-xs">
					<u-avatar 
					size="60"
					:src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftx-free-imgs.acfun.cn%2Fcontent%2F2019_7_21%2F1.5636994914764566E9.png%3Fimageslim&refer=http%3A%2F%2Ftx-free-imgs.acfun.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629122958&t=ddad2dd6664dee4cc4dea6e21c807aa1'"
					>
					</u-avatar>
				</view>
				<!-- 文字信息 -->
				<view class="margin-left-xs padding-top-xs">
					<!-- 名字/学校 -->
					<view class="flex align-center">
						<view class="text-sm text-black" style="text-bold">APEX</view>
					</view>
					<!-- 时间 -->
					<view class="u-tips-color text-sm">2021/7/21 21:57</view>
				</view>
			</view>
			<!-- 文字栏 -->
			<view class="margin-tb-xs text-black text-content" :class="{ clamp3 : clamp }">
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
		<!-- 
			回复类型
		 -->		
		<view class="" v-if="type === 'reply' || type === 'comment'" >
			<view class="flex bg-white wmax">
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
					<view class="padding margin-top-xs" style="background-color: #F3F4F6; border-radius: 10rpx;" v-if="!enterStateComment">
						<view class="wmax">
								<view class="clamp1">
									<text style="color: #666;">{{ '孤岛' }}</text>:	
									<text class="margin-left-xs" style="color: #666;">{{ '然而人生辽阔，眼里不应该只有爱情，是的，它真的发生了' }}</text>
								</view>
						</view>
						<view class="margin-top-sm" @click="replyHandle">
							<text class="text-blue">查看全部{{ 21 }}条回复</text>
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
	</view>
</template>

<script>
	export default {
		name:"card",
		data() {
			return {
				imgList: [
					{
						url: 'https://image.sapce.club/common/1623820732138714505.jpg',
					},
					{
						url: 'https://image.sapce.club/common/1623820687514623626.jpg',
					}
				],
				singleImg: null
			};
		},
		computed: {
			imgStyle() {
				return this.$api.imgHandle.multiImgShow.call(this);
			}
		},
		methods: {
			// 回复评论
			replyHandle() {
				uni.$emit('popUpChange', '');
			}
		},
		props: {
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
	}
</script>

<style lang="scss">

</style>
