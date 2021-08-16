<template>
	<view class="bg-white">
		<navbar :title="page"></navbar>
		<!-- 列表 -->
		<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${ViewPart - 20}px)` }" @scrolltolower="scrollToBottom">
			<view>
				<view class="bg-white flex align-center padding-lg" 
				style="height: 170rpx; position: relative;" v-for="item in getUsersMapData()" :key="item.userId">
					<!-- 头像 -->
					<u-avatar size="100" :src="item.avatarUrl" @click="enterUserHome(item.userId)"></u-avatar>
					<!-- 信息 -->
					<view class="margin-left flex flex-direction justify-between">
						<!-- 昵称 -->
						<text class="text-lg text-bold text-black" style="font-weight: 500;">{{ item.nickName }}</text>
						<!-- 学校 -->
						<text class="text-sm text-gray margin-top-xs">{{ item.schoolName }}</text>
					</view>
					<!-- 按钮 -->
					<view class="focusButton">
						<u-button type="primary" shape="circle" size="mini" :plain="item.focusStatus">
							{{ item.focusStatus ? '已关注' : '+关注' }}
						</u-button>
					</view>
				</view>
				<u-loadmore
					:status="loadStatus"
					:load-text="loadText"
					:bg-color="'#ffffff'"
				></u-loadmore>
			</view>
		</scroll-view>
		<loading v-if="ifLoaddingShow"></loading>
	</view>
</template>

<script>
	import { __fans_focus } from './fans_focus.js';
	export default {
		data() {
			return {
				ViewPart: this.ViewPart,
				//当前页面
				page: '',
				// 页面高度(通过App.vue获取而来)
				PageHeight: this.windowHeight,
				// 用户列表
				userList: new Map(),
				ifLoaddingShow: true,
				// 用户的总页数
				totalPage: 1,
				// 用户的当前页数
				currentPageNum: 1,
				// 用户总条数
				dataTotalNum: 0,
				// loadmore 组件
				loadStatus: 'nomore',
				// 举报文字
				loadText: {
					loadmore: '上拉加载更多',
					loading: '努力加载ing...',
					nomore: '没有更多了~'
				},
			};
		},
		methods: {
			...__fans_focus,
		},
		onLoad(options) {
			this.page = options.page === 'fans' ? '我的粉丝' : '我的关注';
			this.type = options.page === 'fans' ? 2 : 1;
			this.getUserList();
		}
	}
</script>

<style lang="scss" scoped>
	.focusButton {
		position: absolute;
		right: 50rpx;
	}
</style>
