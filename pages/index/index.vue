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
					:bold="false"
					:show-bar="false"
					:bar-style="{background: '#0081FF'}"
					:active-item-style="{ fontSize: '36rpx', transition: '0.1s' }"
					gutter="30"
					@change="tabsChange"
				></u-tabs-swiper>
			</view>
		</navbar>

		<!-- 滑动组件swiper -->
		<swiper :current="swiperCurrent" @transition="transition" @touchstart="startHandleStart" @touchend="startHandleSEnd"
		@animationfinish="animationfinish" class="viewPart" :style="{ height: `calc(100vh - ${ViewPart}px - 30px)` }">
			<!-- 由于顶部是固定位置，底部是非绝对定位，所及此处计算固定高度 防止头部随页面滚动或出现滑动条 -->
			<swiper-item v-for="(item, index) in navlist" :key="index">
				<!-- 视图区域 -->
				<scroll-view scroll-y="true" class="hmax" v-if="newsDataList[index]" @scroll="scroll" 
					@scrolltolower="scrollToBottom(index)" :scroll-top="scrollTop" @scrolltoupper="scrolltoupper">
					<view>
						<!-- 轮播图/热榜等 -->
						<!-- 热榜 -->
						<view
							class="bg-white padding-sm flex flex-direction"
							style="margin-block-start: 10rpx; margin-block-end: 10rpx;"
							v-if="(index === 2 || index === 1) && login && hotList && hotList[index - 1] && hotList[index - 1].length > 4"
							@click="enterHotList"
						>
							<!-- 头部 -->
							<view class="">
								<text class="text-bold-600 text-black text-lg">{{ index === 1 ? '今日热门' : '校园热门' }}</text>
							</view>
							<view class="gridContent flex-sub margin-top-xs">
								<view class="mycut" v-for="(item, h_index) in 8" :key="h_index">
									<text class="text-black text-df-plus">{{h_index+1}}. {{ getHotListDataContent(h_index, index) }}</text>
								</view>
							</view>
						</view>
						<!-- 轮播图 -->
						<view
							class="hmax"
							style="height: 240rpx;"
							v-if="(bannerListR && bannerListR.length && index === 1)"
						>
							<u-swiper height="240" mode="round" indicator-pos="bottomRight" @click="enterOutHtml" :list="bannerListMap"></u-swiper>
						</view>
						<view
							class="hmax"
							style="height: 240rpx;"
							v-if="(bannerListS && bannerListS.length && index === 2)"
						>
						<u-swiper height="240" mode="round" indicator-pos="bottomRight" @click="enterOutHtml" :list="bannerListMap"></u-swiper>
						</view>
						<!-- 动态数据 -->
						<view v-if="newsDataList[index] && getNewsMapData(index).length">
							<card
								v-for="item of getNewsMapData(index)"
								:key="item.id"
								:reportInfoList="reportInfoList"
								@click.native="enterDetail(item.id)"
								:newsdata="{ ...item }"
								:isIndex="true"
							></card>
							<u-loadmore
								:status="loadStatus[index]"
								v-if="getNewsMapData(index).length"
								:load-text="loadText"
								:bg-color="'#ffffff'"
							></u-loadmore>
						</view>
						<view class="padding flex align-center justify-center u-tips-color" v-else-if="index === 2">
							{{ isAuthor ? '快来发第一条动态吧~' : '相关内容认证后显示~' }}
						</view>
						<view class="padding flex align-center justify-center u-tips-color" v-else-if="index === 0">{{ '快去关注其他用户吧~' }}</view>
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
		></u-tabbar>
		<!-- 弹出层 -->
		<pop type="publish" v-if="ifPublishShow"></pop>
		<loading v-if="ifLoaddingShow"></loading>
		<!-- 回到顶部 -->
		<view class="gotop flex align-center justify-center">
			<image src="/static/Img/gotop.png" @click="goBackToTop" v-show="old.scrollTop > 800" class="hwmax"></image>
			<image src="/static/Img/publish.png" @click="isPublish" v-show="old.scrollTop <= 800" class="hwmax"></image>
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
			bannerListS: [],
			//
			bannerListR: [],
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
			hotList: new Array(2).fill(''),
			startPoint: undefined,
		};
	},
	methods: {
		...__indexMethods,
		...__getIndexData
	},
	computed: {
		...mapState(['midButton', 'inactiveColor', 'activeColor', 'borderTop']),
		login() {
			return !!this.$cache.get('token');
		},
		bannerListMap() {
			if (this.bannerListR && this.bannerListR.length && this.current === 1) {
				return this.bannerListR.map(item => item.image);
			} else if (this.bannerListS && this.bannerListS.length && this.current === 2) {
				return this.bannerListS.map(item => item.image);
			}
		},
		isAuthor() {
			return !!this.$cache.get('isAuthor');
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
		}, 1000);
	},
	onLoad() {
		uni.$on('deleteData', id => {
			this.deleteData(id);
		});
		uni.$on('updateData', () => {
			this.getNewsData({ noToken: true, tab: 1, isGetNew: true });
			this.getNewsData({ tab: 2, isGetNew: true });
		});
	},
	// 页面分享
	onShareAppMessage(res) {
		return this.$api.interactive.onShareFunc(res);
	}
};
</script>

<style scoped lang="scss">
.u-demo-area {
	margin: 0 -40rpx;
}

.outWrapper {
	overflow: hidden;
	background-color: #F3F4F6;
}

.viewPart {
	height: 100vh;
}

.gridContent {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
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
	box-shadow: 3rpx 3rpx 5rpx rgba($color: #000000, $alpha: .4);
	overflow: hidden;
}
</style>
