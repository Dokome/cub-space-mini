<template>
	<view class="outWrapper" style="height: 100vh;">
		<!-- 导航栏 -->
		<navbar>
			<view class="flex">
				<u-tabs-swiper ref="uTabs" :list="navlist" :current="current" :is-scroll="false" font-size="32"
				 swiperWidth="750" bar-height="10" bar-width="50"  inactive-color="#858585" active-color="#333"
				 :bar-style="{ background: '#0081FF' }" :active-item-style="{ fontSize: '42rpx', transition: '0.1s' }" gutter="30"
				 @change="tabsChange" d
				 ></u-tabs-swiper>
			</view>
		</navbar>
		
		<!-- 滑动组件swiper -->
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="viewPart"
			:style="{ height: `calc(100vh - ${ViewPart}px - 30px)`}">
			<!-- 由于顶部是固定位置，底部是非绝对定位，所及此处计算固定高度 防止头部随页面滚动或出现滑动条 -->
			<swiper-item v-for="(item, index) in navlist" :key="index">
				<!-- 视图区域 -->
				<scroll-view scroll-y="true" class="hmax" v-if="newsDataList[index]">
					<view> 
					<!-- 轮播图/热榜等 -->
						<!-- 热榜 -->
						<view class="margin-xs bg-white padding-sm" style="height: 280rpx;" 
									v-if="index === 2 && login" @click="enterHotList">
							<!-- 头部 -->
							<view class="">
								<text class="text-bold text-black text-lg">校园热榜</text>
							</view>
							<!-- 内容 -->
							<view class="">
								<view class="flex align-center margin-top-sm" v-for="(item, index) in 3" :key="item">
									<image :src="`/static/Img/hotList${index + 1}.png`" mode="" style="width: 40rpx; height: 40rpx;flex-shrink: 0;"></image>
									<text class="text-black text-cut margin-left-xs">新的事物再怎么陌生，都逃不开熟悉事物的影新的事物再怎么陌生，都逃不开熟悉事物的影</text>
								</view>
							</view> 
						</view>
						<!-- 轮播图 -->
						<view class="margin-top-xs hmax" style="height: 320rpx;" v-if="imgList.length && (index === 1 || index === 2) && login">
							<u-swiper height="320" mode="dot" :list="imgList" :border-radius="0"></u-swiper>
						</view>
						<!-- 动态数据 -->
						<view v-if="newsDataList[index]">
							<card v-for="item of getNewsMapData(index)" :key="item.id"
										 @click.native="enterDetail" :newsdata="{...item}"
							>
							</card>
						</view>
						<!-- <u-divider color="#909399" half-width="200" border-color="#6d6d6d">没有更多了</u-divider> -->
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
		<pop type="login" v-if="ifLoginShow"></pop>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { __indexMethods } from './index.js';
	import { __getIndexData } from './getIndexData.js';
	export default {
		data() {
			return {
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
				navlist: [{
					name: '关注'
				}, {
					name: '推荐'
				}, {
					name: '校园'
				}],
				//轮播图数据
				imgList: [],
				// 是否显示发布弹框
				ifPublishShow: true,
				// 是否显示登录弹框
				ifLoginShow: false,
				//主要渲染数据
				newsDataList:[],
				//储存每个页面对应的当前请求页数
				pageNumList: [],
			}
		},
		methods: {
			...__indexMethods,
			...__getIndexData,
		},
		computed: {
			...mapState(['midButton', 'inactiveColor', 'activeColor', 'borderTop']),
			login() {
				return !!this.$cache.get('token');
			}
		},
		created() {
			this.getNewsData({ noToken: true , tab: 1});
		},
		watch: {
			current(val) {
				this.getNewsData({ noToken: true , tab: val });
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-demo-area {
		margin: 0 -40rpx;
	}
	
	.outWrapper {
		overflow: hidden;
	}
	
	.viewPart {
		height: 100vh;
	}
</style>
