<template>
	<view class="outWrapper" :style="{height: PageHeight + 'px'}">
		<!-- 导航栏nav -->
		<navbar :ifNavDisplay="'none'"></navbar>
		<scroll-view class="scroll-wrapper" :style="{height: PageHeight + 'px'}" :scroll-y="true">
			<view class="innerWrapper">
				<!-- 背景图以及头部 -->
				<home-header></home-header>
				<!-- 小轮播图 -->
				<!-- <view class="bg-white margin-top-xs wmax" style="height: 140rpx;">
					<u-swiper height="160" mode="dot" :list="imgList" :border-radius="0"></u-swiper>
				</view> -->
				<!-- 关注公众号 -->
				<view class="wmax" style="height: 90rpx; position: relative;" v-if="officialButtonShow">
					<view class="official flex hwmax" style="position: absolute;">
						<view class="flex-sub" @click="closeOfficial"></view>
						<view class="flex-sub" @click="focusOfficial"></view>
					</view>			
					<image src="/static/Img/follow.png" class="hwmax"></image>
				</view> 
				<!-- 功能列表 -->
				<view class="bg-white" @click="enterFuncPage">
					<view class="" v-for="(item, index) in funcList" style="position: relative;" :key="index">
						<view class="hwmax" style="position: absolute; z-index: 9999; opacity: 0;"
									v-if="item.title === '分享小程序'" @click="shareApp"
						>
						<u-button open-type="share">分享</u-button>
						</view>
						<view class="listIcon" style="" :data-page="item.page">
							<image :src="item.path" mode="" class="hwmax"></image>
						</view>
						<u-cell-item :title="item.title" :data-page="item.page">
							<u-icon slot="icon" size="80" name="search" color="transparent"></u-icon>
						</u-cell-item>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部栏nav -->
		<u-tabbar
		  :list="list"
			:mid-button="midButton"
			:inactive-color="inactiveColor"
			:activeColor="activeColor"
			:border-top="borderTop"
		></u-tabbar>
		<login v-if="!login"></login>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				//是否显示关注/关闭公众号部分
				officialButtonShow: true,
				// tabbar参数
				list: this.$store.state.list,
				// 页面高度(通过App.vue获取而来)
				PageHeight: this.windowHeight,
				// 图片列表
				imgList: [
					'https://img2.baidu.com/it/u=376454713,1672600792&fm=26&fmt=auto&gp=0.jpg',
					'https://img2.baidu.com/it/u=275837859,1845605843&fm=26&fmt=auto&gp=0.jpg',
					'https://img1.baidu.com/it/u=2482470290,1487532761&fm=26&fmt=auto&gp=0.jpg'
				],
				// 页面功能列表
				funcList: [
					{
						title: '我的动态',
						path: '/static/home/mynews.png'
					},
					{
						title: '账号资料',
						path: '/static/home/info.png',
						page: '/pagesHome/info'
					},
					{
						title: '学校认证',
						path: '/static/home/identify.png',
						page: '/pagesHome/identify'
					},
					{
						title: '意见反馈',
						path: '/static/home/feedback.png',
						page: '/pagesHome/feedback'
					},
					{
						title: '商务合作',
						path: '/static/home/business.png',
						page: '/pagesHome/about_business?page=business'
					},
					{
						title: '关于我们',
						path: '/static/home/aboutus.png',
						page: '/pagesHome/about_business?page=about'
					},
					{
						title: '设置',
						path: '/static/home/setting.png'
					},
					{
						title: '分享小程序',
						path: '/static/home/share.png'
					}
				]
			}
		},
		methods: {
			//关闭公众号
			closeOfficial() {
				this.officialButtonShow = false;
			},
			// 关注公众号
			focusOfficial() {
				console.log("关注成功");
			},
			// 进入功能页面
			enterFuncPage(e) {
				this.$api.routerHandle.goto(e.target.dataset.page)
			},
			shareApp() {
				
			}
		},
		computed: {
			...mapState(['midButton', 'inactiveColor', 'activeColor', 'borderTop']),
			login() {
				return !!this.$cache.get('token');
			}
		},
		onLoad() {
			this.$u.mpShare = {
				title: '遇见有趣的~', // 默认为小程序名称，可自定义
				path: '', // 默认为当前页面路径，一般无需修改，QQ小程序不支持
				// 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。
				// 支持PNG及JPG，默认为当前页面的截图
				imageUrl: 'https://cub.image.emily.red/operation/logo.png'
			}
		}
	}
</script>

<style scoped lang="scss">
	.outWrapper {
		overflow: hidden;
	}
	.scroll-wrapper {
		overflow: hidden;
	}
	//功能列表小图标样式
	.listIcon {
		position: absolute;
		height: 50rpx;
		width: 50rpx;
		top: 50%;
		transform: translateY(-50%) translateX(30rpx);
		z-index: 98;
	}
</style>
