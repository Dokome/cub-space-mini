<template>
	<view>
		<view class="notice-list">
			<!-- 头部 -->
			<view class="notice-list-header bg-white padding-tb flex align-center"  @click="enterList">
				<view class="flex align-center justify-start flex-direction" style="width: 25%;"  v-for="(item, index) in headerList"
				:key="index">
					<view class="notice-list-header-item" :data-page="item.page" >
						<image :src="item.img" mode="aspectFill" class="hwmax" :data-page="item.page" ></image>
					</view>
					<text class="text-sm margin-top-sm" :data-page="item.page" >{{ item.title }}</text>
				</view>
			</view>
			<!-- 主体 -->
			<scroll-view scroll-y="true" class="margin-top-xs">
				<view class="">
					<view class="notice-list-item flex align-center bg-white padding" v-for="item in 10" :key="item">
						<!-- 头像 -->
						<view class="">
							<view class="chat-list-item-avatar margin-right-sm">
								<u-avatar size="100" :src="'https://image.sapce.club/common/1623820798277584078.jpg'"></u-avatar>
							</view>
						</view>
						<!-- 主体 -->
						<view class="flex flex-direction align-start justify-evenly flex-sub">
							<!-- 关系 -->
							<text class="u-tips-color text-sm">{{ 'dk' }} {{ '赞' }}了你的 {{ '评论' }}</text>
							<!-- 内容 -->
							<view class="margin-tb-xs mycut" style="width: 100%;">
								<text class="u-tips-color text-sm mycut content">
									是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批是真的牛批
								</text>
							</view>
							<!-- 时间 -->
							<text class="u-tips-color text-xs">7/30</text>
						</view>
						<!-- 末尾跳转 -->
						<view class="end flex justify-center align-center padding-sm"><text class="text-sm">点击跳转原文&gt&gt</text></view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'notice',
	data() {
		return {
			headerList: [
				{
					title: '官方公告',
					img: '/static/Img/notice.png',
				},
				{
					title: '粉丝',
					img: '/static/Img/follows.png',
					page: '/pagesHome/fans_focus?page=fans'
				},
				{
					title: '关注',
					img: '/static/Img/focus.png',
					page: '/pagesHome/fans_focus?page=focus'
				},
			]
		}
	},
	methods: {
		enterList(e) {
			this.$api.routerHandle.goto(e.target.dataset.page);
		}
	}
}
</script>

<style scoped lang="scss">
.mycut {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

// 通知列表
.notice-list {
	.notice-list-header {
		height: 180rpx;
		.notice-list-header-item {
			width: 90rpx;
			height: 90rpx;
		}
	}
	.notice-list-item {
		height: 180rpx;
		.end {
			width: 120rpx;
			height: 120rpx;
			background-color: #f5f5f7;
			color: #9ca0a9;
		}
		.content {
			display: inline-block;
			width: 400rpx;
		}
	}
}
</style>
