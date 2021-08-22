<template>
	<view style="background-color: #fff;">
		<navbar :title="pageTitle"></navbar>
		<scroll-view scroll-y="true" @scrolltoupper="scrolltoupper" :scroll-top="scrollTop"
			:style="{ height: `calc(100vh - ${ViewPart - 20}px)` }" :scroll-with-animation="true">
			<view style="padding-bottom: 180rpx;">
				<view style="background-color: #F5F5F5;"></view>
				<view class="isMessage" v-for="item in msgList" 
					:class="item.from !== userId ? 'isNotSelf' : 'isSelf'" :key="item.time">
					<view :class="item.from !== userId ? 'margin-right-sm' : 'margin-left-sm'">
						<u-avatar :size="80" :src="item.avatar"></u-avatar>
					</view>
					<view class="messageBlock flex align-center justify-center">
						<text class="text-justify">{{ item.payload.text }}</text>
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
			content: '',
			image: '',
			requestId: '',
			tim: this.tim,
			msgList: [],
			pageTitle: '加载中',
			isCompleted: false,
			nextReqMessageID: '',
			scrollTop: 0,
			userIdTo: '',
		};
	},
	methods: {
		getMessageList() {
			if (this.isCompleted) {
				return;
			}
			let tim = this.tim;
			let promise = tim.getMessageList({conversationID: this.requestId, count: 15, nextReqMessageID: this.nextReqMessageID});
			promise.then((imResponse) => {
			  this.msgList = imResponse.data.messageList.concat(this.msgList); // 消息列表。
			  this.nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
			  this.isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
				this.scrollTop = this.msgList.length * this.pageHeight;
				setTimeout(() => {
					this.ifLoaddingShow = false;
				}, 500)
			});
		},
		// 下拉到顶部的时候刷新
		scrolltoupper() {
			console.log(123);
		}
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
		this.getMessageList();
		this.userIdTo = options.userIdTo;
		// 收到消息
		uni.$off("reciveChatMsg");
		uni.$on("reciveChatMsg", (data) => {
			this.msgList = this.msgList.concat(data);
			this.scrollTop += data.length * this.pageHeight;
		});
	}
};
</script>

<style lang="scss" scoped>
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
