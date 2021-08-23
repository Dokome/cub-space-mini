<template>
	<view style="background-color: #fff;">
		<navbar :title="pageTitle"></navbar>
		<scroll-view scroll-y="true" :scroll-top="scrollTop" class="Anchor" :upper-threshold="pageHeight" @scrolltoupper="scrolltoupper"
			:style="{ height: `calc(100vh - ${ViewPart - 20}px)` }" :scroll-with-animation="!ifLoaddingShow" :scroll-anchoring="true">
			<view style="padding-bottom: 180rpx;" class="Anchor">
				<view style="background-color: #F5F5F5;"></view>
				<view class="isMessage" :class="item.from !== userId ? 'isNotSelf' : 'isSelf'" v-for="item in msgList" :key="item.time">
					<view :class="item.from !== userId ? 'margin-right-sm' : 'margin-left-sm'">
						<u-avatar :size="80" :src="item.avatar" @click="enterUserHome(item.from)"></u-avatar>
					</view>
					<view class="messageBlock flex align-center justify-center">
						<!-- 文字模式 -->
						<text class="text-justify" v-if="item.payload.text">{{ item.payload.text }}</text>
						<!-- 图片模式 -->
						<view class="" v-if="item.payload.imageInfoArray">
							<image :src="item.payload.imageInfoArray[2].url" @click="imgPrview(item.payload.imageInfoArray[1].url)"
								mode="aspectFill" v-if="item.payload.imageInfoArray[2]"
								:style="{ width: item.payload.imageInfoArray[1].width + 'px',
									height: item.payload.imageInfoArray[1].height + 'px',
									maxWidth: '440rpx'
									}"
								>
							</image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<textInput :mode="'aboutChat'" :userIdTo="userIdTo"></textInput>
		<loading v-if="ifLoaddingShow"></loading>
	</view>
</template>

<script>
export default {
	data() {
		return {
			ifLoaddingShow: true,
			ViewPart: this.ViewPart,
			pageHeight: this.windowHeight,
			// 内容
			content: '',
			// 发送图片
			image: '',
			// 请求的会话ID
			requestId: '',
			tim: this.tim,
			// 消息列表
			msgList: [],
			pageTitle: '加载中',
			// 是否请求完全
			isCompleted: false,
			// 下一次请求的数据ID
			nextReqMessageID: '',
			// 顶部高度
			scrollTop: 0,
			// 发送对象
			userIdTo: '',
			// scrollTimmer 防抖
			scrollTimmer: null,
		};
	},
	methods: {
		getMessageList() {
			if (this.isCompleted || this.scrollTimmer) {
				return;
			}
			// 获取信息过程
			let tim = this.tim;
			let promise = tim.getMessageList({conversationID: this.requestId, count: 15, nextReqMessageID: this.nextReqMessageID});
			promise.then((imResponse) => {
				if (this.nextReqMessageID === imResponse.data.nextReqMessageID) return;
			  this.msgList = imResponse.data.messageList.concat(this.msgList); // 消息列表。
			  this.nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
			  this.isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
				if (!this.scrollTop) {
					this.scrollTop = this.msgList.length * 999;
				}
				setTimeout(() => {
					this.ifLoaddingShow = false;
				}, 500);
				this.scrollTimmer = setTimeout(() => {
					this.scrollTimmer = null;
				}, 1000)
			});
		},
		scrolltoupper() {
			if (this.scrollTimmer) {
				return;
			}
			this.getMessageList();
		},
		getImgShowStyle(img) {
			return ';' + this.$api.imgHandle.multiImgShow([img]);
		},
		imgPrview(url) {
			this.$api.imgHandle.imgPreview(url, [url]);
		},
		enterUserHome(id) {
			this.$api.routerHandle.goto(`/pagesHome/mynews?id=${id}`);
		},
	},
	computed: {
		userId() {
			return this.$cache.get('userId');
		}
	},
	onLoad(options) {
		// 将某会话下所有未读消息已读上报
		let tim = this.tim;
		this.tim.setMessageRead({conversationID: options.id});
		this.pageTitle = options.nick;
		this.requestId = options.id;
		// 第一次获取消息列表
		this.getMessageList();
		this.userIdTo = options.userIdTo;
		// 收到消息
		uni.$off("reciveChatMsg");
		uni.$on("reciveChatMsg", (data) => {
			data = data.filter((item) => {
				return item.from === this.userIdTo || item.to === this.userIdTo;
			});
			this.msgList = this.msgList.concat(data);
			this.scrollTop = this.msgList.length * 999;
			this.tim.setMessageRead({conversationID: options.id});
			this.$forceUpdate();
		});
	},
	onUnload() {
		uni.$off("reciveChatMsg");
	}
};
</script>

<style lang="scss" scoped>
.Anchor {
	overflow-anchor: auto;
}

.isMessage {
	// 消息
	padding: 40rpx 20rpx;
	display: flex;
	display: flex;
	justify-content: flex-start;
}

.messageBlock {
	max-width: 450rpx;
	padding: 20rpx;
	// letter-spacing: 0.5rpx;
	min-width: 100rpx;
	border-radius: 10rpx;
}

.isNotSelf {
	// 自己
	.messageBlock {
		background-color: #0081ff;
		color: #fff;
	}
}
.isSelf {
	// 对方
	flex-direction: row-reverse;
	justify-self: flex-start;
	.messageBlock {
		background-color: #d9e4fa;
		color: #000;
	}
}
</style>
