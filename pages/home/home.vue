<template>
	<view class="outWrapper" :style="{ height: PageHeight + 'px' }">
		<!-- 导航栏nav -->
		<navbar :ifNavDisplay="'none'"></navbar>
		<scroll-view class="scroll-wrapper" :style="{ height: PageHeight + 'px' }" :scroll-y="true">
			<view class="innerWrapper">
				<!-- 背景图以及头部 -->
				<home-header :userinfo="{...userinfo}"></home-header>
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
					<view class="" v-for="(item, index) in funcList" style="position: relative;" :key="item.id">
						<view class="hwmax" style="position: absolute; z-index: 9; opacity: 0;" v-if="item.content === '分享小程序'" @click="shareApp">
							<u-button open-type="share">分享</u-button>
						</view>
						<u-cell-item :title="item.content" :data-page="item.jumpLink">
							<view :class="'text-bold margin-right-sm t-icon ' + item.image" slot="icon"></view>
						</u-cell-item>
					</view>
				</view>
				<view class="" style="height: 20rpx;"></view>
			</view>
		</scroll-view>
		<!-- 底部栏nav -->
		<u-tabbar :list="list" :mid-button="midButton" :inactive-color="inactiveColor" :activeColor="activeColor" :border-top="borderTop"></u-tabbar>
		<login v-if="!login"></login>
		<loading v-if="ifLoaddingShow && login"></loading>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { _home } from './home.js';

export default {
	data() {
		return {
			ifPublishShow: false,
			// 加载动画
			ifLoaddingShow: true,
			userinfo: {},
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
			funcList: []
		};
	},
	methods: {
		..._home,
	},
	computed: {
		...mapState(['midButton', 'inactiveColor', 'activeColor', 'borderTop']),
		login() {
			return !!this.$cache.get('token');
		}
	},
	onLoad() {
		uni.$on('updateHome', () => {
			this.getUserInfo();
		});
		if (this.login) {
			this.getFuncList();
			this.getUserInfo();
		}
	},
	// 页面分享
	onShareAppMessage() {
		return this.$api.interactive.onShareFunc();
	},
	
};
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
// icon
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
