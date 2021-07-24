<template>
	<view>
		<!-- 背景图 -->
		<view class="" style="height: 500rpx;">
			<image src="/static/Img/bgc.jpg" mode="aspectFill" style=" width: 100%; height: 100%;"></image>
		</view>
		<!-- 头像框/个人信息 -->
		<view class="bg-white flex flex-direction" style="height: 365rpx; width: 100%;">
			<!-- 信息与头像间隔的地方 -->
			<view class="bg-white flex align-center padding-left-lg" style="height: 40rpx;">
				<!-- 头像 -->
				<u-avatar  mode="circle" 
					:size="150" 
					:src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftx-free-imgs.acfun.cn%2Fcontent%2F2019_7_21%2F1.5636994914764566E9.png%3Fimageslim&refer=http%3A%2F%2Ftx-free-imgs.acfun.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629122958&t=ddad2dd6664dee4cc4dea6e21c807aa1'" 
				></u-avatar>
			</view>
			<!-- 信息 -->
			<view class="padding-lr-lg flex-sub flex flex-direction" style="margin-top: 80rpx;">
				<!-- 名字 -->
				<view class=""><text class="text-lg text-black text-xxl" style="font-weight: 500;">mate川丶</text></view>
				<!-- 标签 -->
				<view class="margin-tb-sm">
					<!-- ID -->
					<u-tag :text="'UID:1098265675'" shape="circle" color="#909399" bg-color="#F5F5F5" border-color="#F5F5F5" />
					<!-- 学校 -->
					<u-tag :text="'学校:江西师范大学'" shape="circle" color="#909399" bg-color="#F5F5F5" border-color="#F5F5F5"/>
				</view>
				<!-- 个性签名 -->
				<view class="text-sm u-line-1 u-tips-color">
					总有些惊奇的际遇，比方说当我遇见你！
				</view>
				<!-- 个人数据 -->
				<view class="flex align-end flex-sub padding-bottom-xs" style="width: 70%;" @click="enterFuncPage">
					<view class="" v-for="(item, index) in userData" :key="index">
						<text class="text-black text-xl margin-right-xs" :data-page="item.page">{{item.count}}</text>
						<text class="margin-right u-tips-color" :data-page="item.page">{{item.title}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"home-header",
		data() {
			return {
				userData: 
				[
					{
						title: '动态',
						count: 8,
						page: '/pages/home/home'
					},
					{
						title: '粉丝',
						count: 62,
						page: '/pagesHome/fans_focus?page=fans'
					},
					{
						title: '关注',
						count: 3,
						page: '/pagesHome/fans_focus?page=focus'
					}
				]
			};
		},
		methods: {
			// 进入功能页面
			enterFuncPage(e) {
				console.log(123);
				uni.navigateTo({
					url: e.target.dataset.page
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
