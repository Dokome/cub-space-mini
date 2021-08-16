<template>
	<view style="height: 100vh;" class="outWrapper">
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
				></u-tabs-swiper>
			</view>
		</navbar>
		<!-- 滑动组件swiper -->
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="viewPart" :style="{ height: `calc(100vh - ${ViewPart}px - 50rpx)` }">
			<!-- 由于顶部是固定位置，底部是非绝对定位，所及此处计算固定高度 防止头部随页面滚动或出现滑动条 -->
			<swiper-item>
				<!-- 视图区域 -->
				<scroll-view scroll-y="true" class="hmax">
					<newsList></newsList>
				</scroll-view>
				<!--  -->
			</swiper-item>
			<!-- 通知 -->
			<swiper-item>
				<!-- 视图区域 -->
				<scroll-view scroll-y="true" class="hmax">
					<notice></notice>
				</scroll-view>
				<!--  -->
			</swiper-item>
		</swiper>
		<u-tabbar :list="list" :mid-button="midButton" :inactive-color="inactiveColor" :activeColor="activeColor" :change="navChange" :border-top="borderTop"></u-tabbar>
		<login v-if="!login"></login>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import newsList from './components/newsList.vue';
import notice from './components/notice.vue';
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
			navlist: [
				{
					name: '私信'
				},
				{
					name: '通知'
				}
			]
		};
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
	components: {
		newsList,
		notice
	}
};
</script>

<style scoped lang="scss">
.outWrapper {
	overflow: hidden;
}
</style>
