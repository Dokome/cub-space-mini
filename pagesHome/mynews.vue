<template>
	<view>
		<scroll-view scroll-y="true" :style="{ height: `100vh` }" @scrolltolower="scrollToBottom">
		<navbar :title=" isSelf ? '我的动态' : 'Ta的主页' "></navbar>
			<view>
				<home-header v-if="!isSelf" :userinfo="userinfo" :isSelf="isSelf"></home-header>
				<card type="news" v-for="item in getNewsMapData()" :key="item.id" 
				:newsdata="item" :isHome="true" @click.native="enterDetail(item.id)"></card>
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
import { __mynews } from './mynews.js';
export default {
	data() {
		return {
			isSelf: true,
			userId: '',
			userinfo: {},
			ifLoaddingShow: true,
			ViewPart: this.ViewPart,
			// 动态列表
			newsDataList: new Map(),
			// 动态的总页数
			totalPage: 1,
			// 动态的当前页数
			currentPageNum: 1,
			// 动态总条数
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
		...__mynews,
	},
	onLoad(options = {}) {
		if (options.id) {
			this.isSelf = false;
			this.userId = options.id;
			this.getUserInfo({ id: options.id });
		}
		this.getMynewsData({ id: options.id });
	}
};
</script>

<style lang="scss"></style>
