<template>
	<view>
		<scroll-view scroll-y="true" :style="{ height: `100vh` }" @scrolltolower="scrollToBottom">
		<navbar :title="' '" :isFixed="true"></navbar>
			<view>
				<home-header :userinfo="userinfo" :isSelf="isSelf" :focusStatus="focusStatus"></home-header>
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
			// 是否为自己
			isSelf: true,
			userId: '',
			userinfo: {},
			focusStatus: false,
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
		uni.$off('changeFocusStatus');
		uni.$on('changeFocusStatus', () => {
			this.getUserInfo({ id: this.userId });
		});
		this.userId = options.id;
		this.isSelf = !options.id;
		this.getUserInfo({ id: options.id });
		this.getMynewsData({ id: options.id });
	}
};
</script>

<style lang="scss"></style>
