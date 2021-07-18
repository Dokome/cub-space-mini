<template>
	<view class="outWrapper" :style="{height: PageHeight + 'px'}">
		<!-- 导航栏nav -->
		<navbar :ifNavDisplay="'none'"></navbar>
		<scroll-view class="scroll-wrapper" :style="{height: PageHeight + 'px'}" :scroll-y="true">
			<view class="innerWrapper">
				<!-- 背景图以及头部 -->
				<home-header></home-header>
				<!-- 小轮播图 -->
				<view class="bg-white margin-top-xs" style="height: 140rpx; width: 100%;">
					<u-swiper height="160" :list="imgList" :border-radius="0"></u-swiper>
				</view>
				<!-- 关注公众号 -->
				<view class="margin-top" style="height: 90rpx; width: 100%; position: relative;" v-if="officialButtonShow">
					<view class="official flex" style="position: absolute; width: 100%; height: 100%;">
						<view class="flex-sub" @click="closeOfficial"></view>
						<view class="flex-sub" @click="focusOfficial"></view>
					</view>			
					<image src="/static/Img/follow.png" style="width: 100%; height: 100%;"></image>
				</view>
				<!-- 功能列表 -->
				<view class="margin-tb-xs bg-white">
					<view class="" v-for="(item, index) in funcList" style="position: relative;" :id="index">
						<view class="listIcon" style="">
							<image :src="item.path" mode="" style="width: 100%; height: 100%;"></image>
						</view>
						<u-cell-item :title="item.title">
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
						path: '/static/home/info.png'
					},
					{
						title: '学校认证',
						path: '/static/home/identify.png'
					},
					{
						title: '意见反馈',
						path: '/static/home/feedback.png'
					},
					{
						title: '商务合作',
						path: '/static/home/business.png'
					},
					{
						title: '关于我们',
						path: '/static/home/aboutus.png'
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
			}
		},
		computed: {
			...mapState(['midButton', 'inactiveColor', 'activeColor', 'borderTop']),
		},
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
		transform: translateY(-50%) translateX(50%);
		z-index: 9999;
	}
</style>
