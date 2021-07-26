<template>
	<view class="outWrapper" style="height: 100vh;">
		<!-- 导航栏 -->
		<navbar>
			<view class="flex">
				<u-tabs-swiper ref="uTabs" :list="navlist" :current="current" :is-scroll="false" font-size="32"
				 swiperWidth="750" bar-height="10" bar-width="50"  inactive-color="#858585" active-color="#333"
				 :bar-style="{ background: '#0081FF' }" :active-item-style="{ fontSize: '42rpx', transition: '0.1s' }" gutter="30"
				 @change="tabsChange"
				 ></u-tabs-swiper>
			</view>
		</navbar>
		
		<!-- 滑动组件swiper -->
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="viewPart"
			:style="{ height: `calc(100vh - ${ViewPart}px - 70rpx)`}">
			<!-- 由于顶部是固定位置，底部是非绝对定位，所及此处计算固定高度 防止头部随页面滚动或出现滑动条 -->
			<swiper-item v-for="item in navlist" :key="item">
				<!-- 视图区域 -->
				<scroll-view scroll-y="true" class="hmax">
					<view> 
						<!-- 轮播图/热榜等 -->
						<!-- 热榜 -->
						<view class="margin-xs bg-white padding-sm" style="height: 280rpx;" v-show="current === 2" @click="enterHotList">
							<!-- 头部 -->
							<view class="">
								<text class="text-bold text-black text-lg">校园热榜</text>
							</view>
							<!-- 内容 -->
							<view class="">
								<view class="flex align-center margin-top-sm" v-for="(item, index) in 3" :key="index">
									<image :src="`/static/Img/hotList${index + 1}.png`" mode="" style="width: 40rpx; height: 40rpx;flex-shrink: 0;"></image>
									<text class="text-black text-cut margin-left-xs">新的事物再怎么陌生，都逃不开熟悉事物的影新的事物再怎么陌生，都逃不开熟悉事物的影</text>
								</view>
							</view> 
						</view>
						<!-- 轮播图 -->
						<view class="margin-top-xs hmax" style="height: 320rpx;" v-show="current === 1 || current === 2">
							<u-swiper height="320" mode="dot" :list="imgList" :border-radius="0"></u-swiper>
						</view>
						<!-- 动态数据 -->
						<card v-for="(item, index) in 30" :key="index" @click.native="enterDetail"></card>
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
	</view>
</template>

<script>
	import { mapState } from 'vuex';
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
				//
				navlist: [{
					name: '关注'
				}, {
					name: '推荐'
				}, {
					name: '校园'
				}],
				imgList: [
					'https://img2.baidu.com/it/u=2753426540,2942310730&fm=26&fmt=auto&gp=0.jpg',
					'https://img2.baidu.com/it/u=951689591,2206379019&fm=26&fmt=auto&gp=0.jpg',
					'https://img1.baidu.com/it/u=193594492,843414129&fm=26&fmt=auto&gp=0.jpg'
				]
			}
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			//进入热榜页面
			enterHotList() {
				this.$api.routerHandle.goto('/pagesInteractive/hotList');
			},
			//进入动态详情
			enterDetail() {
				this.$api.routerHandle.goto('/pagesInteractive/newsdetail');
			}
		},
		computed: {
			...mapState(['midButton', 'inactiveColor', 'activeColor', 'borderTop']),
		},
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
