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
			<scroll-view scroll-y="true" class="margin-top-xs" style="height: 100%;">
				<view class="">
					<view class="notice-list-item flex align-center bg-white padding" 
								v-for="(item, I_index) in msgList" :key="I_index">
						<!-- 头像 -->
						<view class="" @click.stop="enterUserHome(item.userId)">
							<view class="chat-list-item-avatar margin-right-sm">
								<u-avatar size="100" :src="item.face"></u-avatar>
							</view>
						</view>
						<!-- 主体 -->
						<view class="flex flex-direction align-start justify-evenly flex-sub">
							<!-- 关系 -->
							<text class="u-tips-color text-sm">{{ item.nickname }} {{ getoperation(item.operation) }} 了 {{ getbizType(item.bizType) }}</text>
							<!-- 内容 -->
							<view class="margin-tb-xs mycut" style="width: 100%;">
								<text class="u-tips-color text-sm mycut content" v-if="item.content">
									{{ item.content }}
								</text>
							</view>
							<!-- 时间 -->
							<text class="u-tips-color text-xs">{{ item.pushTime }}</text>
						</view>
						<!-- 末尾跳转 -->
						<view class="end flex justify-center align-center padding-sm" v-if="item.bizType != 3" @click="enterNewsDetail(item.bizId)">
							<text class="text-sm">点击跳转原文&gt&gt</text>
						</view>
					</view>
					<u-loadmore
						:status="loadStatus"
						:load-text="loadText"
						:bg-color="'#ffffff'"
					></u-loadmore>
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
			// tim引用
			tim: this.tim,
			CID: 'C2Cadministrator',
			headerList: [
				{
					title: '官方公告',
					img: '/static/Img/notice.png',
					page: '/pagesInteractive/officialNews'
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
			],
			nextReqMessageID: '',
			isCompleted: false,
			msgList: [],
			// loadmore 组件
			loadStatus: 'nomore',
			// 举报文字
			loadText: {
				loadmore: '上拉加载更多',
				loading: '努力加载ing...',
				nomore: '没有更多了~'
			},
			officialNews: []
		}
	},
	methods: {
		getoperation(index) {
			return ['点赞', '转发', '评论', '回复', '关注'][index - 1];
		},
		getbizType(index) {
			return ['评论', '动态', '你'][index - 1];
		},
		scrolltolower() {
			this.getMsgList();
		},
		enterList(e) {
			this.$api.routerHandle.goto(e.target.dataset.page, this.officialNews);
		},
		// 进入用户主页
		enterUserHome(id) {
			this.$api.routerHandle.goto(`/pagesHome/mynews?id=${id}`);
		},
		// 进入文章详情页
		enterNewsDetail(id) {
			this.$api.routerHandle.goto(`/pagesInteractive/newsdetail?id=${id}`);
		},
		getMsgList() {
			if (this.isCompleted) {
				this.loadStatus = 'nomore';
				return;
			}
			// 获取信息过程
			this.loadStatus = 'loading';
			let tim = this.tim;
			let promise = tim.getMessageList({conversationID: this.CID, count: 15, nextReqMessageID: this.nextReqMessageID});
			promise.then((imResponse) => {
				if (!!this.nextReqMessageID && this.nextReqMessageID === imResponse.data.nextReqMessageID) return;
				for (let msg of imResponse.data.messageList.reverse()) {
					if (msg.type === 'TIMCustomElem') {
						const data = JSON.parse((msg.payload && msg.payload.data) || '{}');
						const event = msg.payload.extension;
						if (event === 'event.notify') {
							this.msgList.push(data);
						} else if (event === 'event.notice' && data.content) {
							this.officialNews.push(data); 
						}
					}
				}
				this.nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
				this.isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
			}).finally(() => {
				this.loadStatus = this.isCompleted ? 'nomore' : 'loadmore' ;
			});
		}
	},
	props: {
		
	},
	mounted() {
		if (this.$cache.get('token')) {
			this.getMsgList();
		}
		uni.$on('noticeListUpdate', (msg) => {
			if (msg) {
				this.msgList.unshift(JSON.parse(msg.payload.data || '{}'));
			} else {
				this.getMsgList();
			}
		});
	},
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
