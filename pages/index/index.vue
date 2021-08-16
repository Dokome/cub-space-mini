<template>
	<view class="outWrapper" style="height: 100vh;">
		<!-- 导航栏 -->
		<navbar>
			<view class="flex">
				<u-tabs-swiper
					ref="uTabs"
					:list="navlist"
					:current="current"
					:is-scroll="false"
					font-size="30"
					swiperWidth="750"
					bar-height="10"
					bar-width="50"
					inactive-color="#858585"
					active-color="#333"
					:bar-style="{ background: '#0081FF' }"
					:active-item-style="{ fontSize: '32rpx', transition: '0.1s' }"
					gutter="30"
					@change="tabsChange"
					d
				></u-tabs-swiper>
			</view>
		</navbar>

		<!-- 滑动组件swiper -->
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="viewPart" :style="{ height: `calc(100vh - ${ViewPart}px - 30px)` }">
			<!-- 由于顶部是固定位置，底部是非绝对定位，所及此处计算固定高度 防止头部随页面滚动或出现滑动条 -->
			<swiper-item v-for="(item, index) in navlist" :key="index">
				<!-- 视图区域 -->
				<scroll-view scroll-y="true" class="hmax" v-if="newsDataList[index]" @scroll="scroll" 
					@scrolltolower="scrollToBottom(index)" :scroll-top="scrollTop">
					<view>
						<!-- 轮播图/热榜等 -->
						<!-- 热榜 -->
						<view class="margin-sm bg-gray padding-sm flex flex-direction" style="border-radius: 10rpx;" 
							v-if="(index === 2 || index === 1) && login && hotList && hotList.length > 4" @click="enterHotList">
							<!-- 头部 -->
							<view class=""><text class="text-bold text-black text-sm">校园热门</text></view>
							<view class="gridContent flex-sub margin-top-xs">
								<view class="mycut" v-for="(item, h_index) in 8" :key="h_index">
									<!-- <image :src="`/static/Img/hotList${h_index + 1}.png`" mode="" style="width: 40rpx; height: 40rpx;flex-shrink: 0;"></image> -->
									<text class="text-black">{{ getHotListDataContent(h_index) }}</text>
								</view>
							</view>
						</view>
						<!-- 轮播图 -->
						<view class="margin-top-xs hmax" style="height: 236rpx;" v-if="bannerList && bannerList.length && (index === 1 || index === 2)">
							<u-swiper height="236" mode="dot" border-radius="8" :list="bannerListMap" :effect3d="true"></u-swiper>
						</view>
						<!-- 动态数据 -->
						<view v-if="newsDataList[index] && getNewsMapData(index).length">
							<card v-for="item of getNewsMapData(index)" :key="item.id" :reportInfoList="reportInfoList"
							@click.native="enterDetail(item.id)" :newsdata="{ ...item }"></card>
							<u-loadmore
								:status="loadStatus[index]"
								marginTop="40"
								marginBottom="40"
								v-if="getNewsMapData(index).length"
								:load-text="loadText"
								:bg-color="'#ffffff'"
							></u-loadmore>
						</view>
						<view class="padding flex align-center justify-center u-tips-color" v-else>
							相关内容认证后显示~
						</view>
					</view>
				</scroll-view>
				<!--  -->
			</swiper-item>
		</swiper>
		<!-- 底部栏 -->
		<u-tabbar
			:list="list"
			:mid-button="midButton"
			:inactive-color="inactiveColor"
			:activeColor="activeColor"
			:change="navChange"
			:border-top="borderTop"
			@change="isPublish"
		></u-tabbar>
		<!-- 弹出层 -->
		<pop type="publish" v-if="ifPublishShow"></pop>
		<loading v-if="ifLoaddingShow"></loading>
		<!-- 回到顶部 -->
		<view class="gotop flex align-center justify-center" @click="goBackToTop">
			<image src="/static/Img/gotop.png"  class="hwmax"></image>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { __indexMethods } from './index.js';
import { __getIndexData } from './getIndexData.js';
export default {
	data() {
		return {
			//滚动timmer
			scrollTimmer: null,
			//回顶部timmer
			gotopTimmer: null,
			//滚动条高度
			scrollTop: 0,
			//滚动前的高度
			old: {
			  scrollTop: 0
			},
			// 初始加载动画
			ifLoaddingShow: true,
			// 页面高度(通过App.vue获取而来)
			PageHeight: this.windowHeight,
			//底部栏
			list: this.$store.state.list,
			//头部总高度
			ViewPart: this.ViewPart,
			//当前页面(nav)
			current: 1,
			//当前页面(swiper)
			swiperCurrent: 1,
			//nav栏
			navlist: [
				{
					name: '关注'
				},
				{
					name: '推荐'
				},
				{
					name: '校园'
				}
			],
			//轮播图数据
			bannerList: [],
			// 是否显示发布弹框
			ifPublishShow: true,
			//主要渲染数据
			newsDataList: [],
			//储存每个页面对应的当前请求页数
			pageNumList: new Array(3).fill(1),
			// 每一页的最大值
			pageTotalList: new Array(3).fill(1),
			// 拉动开始
			pullDownY0: undefined,
			// 拉动结束
			pullDownY1: undefined,
			// loadmore 组件
			loadStatus: new Array(3).fill('loadmore'),
			// 举报文字
			loadText: {
				loadmore: '上拉加载更多',
				loading: '努力加载ing...',
				nomore: '没有更多了~'
			},
			// 举报信息列表
			reportInfoList: [],
			hotList: '',
		};
	},
	methods: {
		...__indexMethods,
		...__getIndexData,
	},
	computed: {
		...mapState(['midButton', 'inactiveColor', 'activeColor', 'borderTop']),
		login() {
			return !!this.$cache.get('token');
		},
		bannerListMap() {
			if (this.bannerList && this.bannerList.length) {
				return this.bannerList.map(item => item.image);
			}
		}
	},
	created() {
		this.getNewsData({ noToken: true, tab: 1 });
		this.getHotList({ noToken: true, type: 1 });
		this.getReportList({ noToken: true });
		this.getBanner({ noToken: true });
	},
	watch: {
		current(val) {
			if (this.pageNumList[val] === 1) {
				this.ifLoaddingShow = true;
				if (val === 1 || val === 2) {
					this.getHotList({ type: val });
				}
				this.getNewsData({ noToken: true, tab: val });
			}
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.getNewsData({ noToken: true, tab: this.current, isGetNew: true });
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 1000)
	},
	onLoad() {
		uni.$on('deleteData', (id) => {
			this.deleteData(id);
		});
		uni.$on('updateData', () => {
			this.getNewsData({ noToken: true, tab: 1, isGetNew: true });
		})
	},
	// 页面分享
	onShareAppMessage(res) {
		return this.$api.interactive.onShareFunc(res);
	},
};
</script>

<style scoped lang="scss">
.u-demo-area {
	margin: 0 -40rpx;
}

.outWrapper {
	overflow: hidden;
	background-color: #fff;
}

.viewPart {
	height: 100vh;
}

.gridContent {
	// width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	// grid-template-rows: repeat(4, 1fr);
	grid-gap: 10rpx;
}

.mycut {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.gotop {
	width: 90rpx;
	height: 90rpx;
	position: absolute;
	z-index: 9999;
	right: 40rpx;
	bottom: 200rpx;
	border-radius: 50%;
}
</style>
