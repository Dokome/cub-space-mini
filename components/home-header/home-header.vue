<template>
	<view>
		<!-- 背景图 -->
		<view class="" style="height: 500rpx;" @click="clear">
			<image src='https://image.sapce.club/common/1623820687514623626.jpg' mode="aspectFill" class="hwmax"></image>
		</view>
		<!-- 头像框/个人信息 -->
		<view class="bg-white flex flex-direction wmax" style="height: 385rpx;" v-if="userinfo">
			<!-- 信息与头像间隔的地方 -->
			<view class="bg-white flex align-center padding-left-lg" style="height: 40rpx;">
				<!-- 头像 -->
				<u-avatar  mode="circle" 
					:size="150" 
					:src="userinfo.avatarUrl" 
				></u-avatar>
			</view>
			<!-- 信息 -->
			<view class="padding-lr-lg flex-sub flex flex-direction" style="margin-top: 80rpx;">
				<!-- 名字 -->
				<view class="flex align-center">
					<text class="text-lg text-black text-xxl margin-right-sm" style="font-weight: 500;">{{ userinfo.nickName }}</text>
					<image :src="`/static/home/gender${ userinfo.gender || 0 }.png`" mode="" style="width: 40rpx; height: 40rpx;"></image>	
				</view>
				<!-- 标签 -->
				<view class="margin-tb-sm">
					<!-- ID -->
					<u-tag :text="`UID:${ userinfo.userId }`" shape="circle" color="#909399" bg-color="#F5F5F5" border-color="#F5F5F5" />
					<!-- 学校 -->
					<u-tag :text="`学校:${ userinfo.schoolName }`" shape="circle" color="#909399" bg-color="#F5F5F5" border-color="#F5F5F5"/>
				</view>
				<!-- 个性签名 -->
				<view class="text-sm u-line-1 u-tips-color">
					{{ userinfo.sign }}
				</view>
				<!-- 个人数据 -->
				<view class="flex align-end flex-sub padding-bottom-xs" style="width: 70%;" @click="enterFuncPage">
					<view class="" v-for="(item, index) in userData" :key="index">
						<text class="text-black text-xl margin-right-xs" :data-page="item.page">{{ userinfo[item.count] }}</text>
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
		props: {
			userinfo: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		data() {
			return {
				userData: 
				[
					{
						title: '动态',
						count: 'dynamicNum',
						page: '/pages/home/home'
					},
					{
						title: '粉丝',
						count: 'fansNum',
						page: '/pagesHome/fans_focus?page=fans'
					},
					{
						title: '关注',
						count: 'focusNum',
						page: '/pagesHome/fans_focus?page=focus'
					}
				]
			};
		},
		methods: {
			// 进入功能页面
			enterFuncPage(e) {
				this.$api.routerHandle.goto(e.target.dataset.page);
			}
		}
	}
</script>

<style lang="scss">

</style>
