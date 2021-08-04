<template>
	<view style="height: 100vh;" class="outWrapper">
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
			:style="{ height: `calc(100vh - ${ViewPart}px - 50rpx)`}">
			<!-- 由于顶部是固定位置，底部是非绝对定位，所及此处计算固定高度 防止头部随页面滚动或出现滑动条 -->
			<swiper-item>
				<!-- 视图区域 -->
				<scroll-view scroll-y="true" class="hmax">
					<view> 
						<view class="chat-list margin-top-xs">
							<view class="chat-list-item bg-white u-border-bottom padding flex" 
										v-for="item in 20" :key="item" @click="chatDetail"
							>
								<view class="chat-list-item-avatar margin-right-sm">
									<u-avatar size="100" :src="'https://image.sapce.club/common/1623820798277584078.jpg'"></u-avatar>
								</view>
								<view class="chat-list-item-info flex-sub">
									<view class="top flex align-center justify-between">
										<text class="text-bold text-lg text-black">滴滴</text>
										<text class="u-tips-color text-sm">20:43</text>
									</view>
									<view class="bottom flex align-center justify-between flex-sub margin-top-xs">
										<text class="u-tips-color text-cut message">会不会我再怎么努力，去成为他心口上的朱会不会我再怎么努力，去成为他心口上的朱会不会我再怎么努力，去成为他心口上的朱会不会我再怎么努力，去成为他心口上的朱</text>
										<text class="number">5</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<!--  -->
			</swiper-item> 
			<!-- 通知 -->
			<swiper-item>
				<!-- 视图区域 -->
				<scroll-view scroll-y="true" class="hmax">
					<view> 
						<view class="notice-list margin-top-xs">
							<!-- 头部 -->
							<view class="notice-list-header bg-white padding flex align-center">
								<view class="flex align-center justify-center flex-direction" style="width: 15%;">
									<view class="notice-list-header-item">
										<image src="/static/Img/notice.png" mode="aspectFill" class="hwmax"></image>
									</view>
									<text class="text-sm margin-top-sm">官方公告</text>
								</view>
							</view>
							<!-- 主体 -->
							<scroll-view scroll-y="true" class="margin-top-xs">
								<view>
									<view class="notice-list-item flex align-center bg-white padding" v-for="item in 120" :key="item">
										<!-- 头像 -->
										<view class="">
											<view class="chat-list-item-avatar margin-right-sm">
												<u-avatar size="100" :src="'https://image.sapce.club/common/1623820798277584078.jpg'"></u-avatar>
											</view>
										</view>
										<!-- 主体 -->
										<view class="flex flex-direction align-start justify-evenly flex-sub">
											<!-- 关系 -->
											<text class="u-tips-color text-sm">{{'dk'}} {{'赞'}}了你的 {{'评论'}}</text>
											<!-- 内容 -->
											<view class="margin-tb-xs " style="width: 100%;">
												<text class="u-tips-color text-sm text-cut content">是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批</text>
											</view>
											<!-- 时间 -->
											<text class="u-tips-color text-xs">7/30</text>
										</view>
										<!-- 末尾跳转 -->
										<view class="end flex justify-center align-center padding-sm">
											<text class="text-sm">点击跳转原文&gt&gt</text>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</scroll-view>
				<!--  -->
			</swiper-item> 
		</swiper>
		<u-tabbar
		  :list="list"
			:mid-button="midButton"
			:inactive-color="inactiveColor"
			:activeColor="activeColor"
			:change="navChange"
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
				// 页面高度(通过App.vue获取而来)
				PageHeight: this.windowHeight,
				//底部栏
				list: this.$store.state.list,
				//头部总高度
				ViewPart: this.ViewPart,
				//当前页面(nav)
				current: 0,
				//当前页面(swiper)
				swiperCurrent: 0,
				//
				navlist: [{
					name: '私信'
				}, {
					name: '通知'
				}],
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
			// 进入聊天详情页
			chatDetail() {
				this.$api.routerHandle.goto('/pagesInteractive/chatDetail');
			}
		},
		computed: {
			...mapState(['midButton', 'inactiveColor', 'activeColor', 'borderTop']),
			login() {
				return !!this.$cache.get('token');
			}
		},
	}
</script>

<style scoped lang="scss">
	// 聊天列表
.chat-list {
	.chat-list-item {
		height: 150rpx;
		background-color: #fff;
		.chat-list-item-avatar {
			width: 100rpx;
			height: 100rpx;
		}
		.chat-list-item-info {
			.top {
				height: 50rpx;
			}
			.bottom {
				.message {
					display: inline-block;
					width: 510rpx;
				}
				.number {
					display: inline-block;
					width: 37rpx;
					line-height: 37rpx;
					color: white;
					border-radius: 50%;
					background-color: #FF5218;
					text-align: center;
					margin-right: 10rpx;
				}
			}
		}
	}
}
// 通知列表
.notice-list {
	.notice-list-header {
		height: 180rpx;
		.notice-list-header-item {
			width: 80rpx;
			height: 80rpx;
		}
	}
	.notice-list-item {
		height: 180rpx;
		.end {
			width: 120rpx; 
			height: 120rpx;
			background-color: #F5F5F7;
			color: #9CA0A9;
		}
		.content {
			display: inline-block;
			width: 400rpx;
		}
	}
}

.outWrapper {
	overflow: hidden;
}

</style>
