<template>
	<view style="background-color: #F3F3F3;">
		<navbar :title="pageTitle"></navbar>
		<scroll-view scroll-y="true" :scroll-top="scrollTop" class="Anchor" :upper-threshold="pageHeight * 2" @scrolltoupper="scrolltoupper"
			:style="{ height: `calc(100vh - ${ViewPart - 20}px)` }"
			:scroll-with-animation="!ifLoaddingShow" :scroll-anchoring="true">
			<view style="padding-bottom: 180rpx;" class="Anchor">
				<view class="padding">
					<!-- 顶部出现卡片 -->
					<view class="padding wmax flex" v-if="isCompleted" style="height: 340rpx;">
						<view class="flex-sub profileCard  flex flex-direction justify-between padding"
						 :class="lbgColor" v-if="userInfo" @click="enterUserHome(userIdTo)">
							<view class="">
								<u-avatar :size="80" :src="userInfo.avatar" v-if=""></u-avatar>
							</view>
							<view class="text-white">
								{{userInfo.nick}}
							</view>
							<view class="text-white">
								打个招呼吧~
							</view>
						</view>
					</view>
				</view>
				<view style="background-color: #F5F5F5;"></view>
				<view class="isMessage" :class="item.from !== userId ? 'isNotSelf' : 'isSelf'" v-for="(item, I_index) in msgList" :key="item.ID">
					<view :class="item.from !== userId ? 'margin-right-sm' : 'margin-left-sm'">
						<u-avatar :size="80" :src="item.avatar" @click="enterUserHome(item.from)"></u-avatar>
					</view>
					<view class="messageBlock flex align-center justify-center" 
						:style="{ backgroundColor: chatStyle[item.from !== userId ? 0 : 1] }">
						<!-- 文字模式 -->
						<text class="text-justify" v-if="item.payload.text">{{ item.payload.text }}</text>
						<!-- 图片模式 -->
						<view class="flex align-center justify-center" v-if="item.payload.imageInfoArray">
							<image :src="item.payload.imageInfoArray[2].url" @click="imgPrview(item.payload.imageInfoArray[1].url)"
								mode="aspectFill" v-if="item.payload.imageInfoArray[2]"
								:style="{ width: item.payload.imageInfoArray[1].width + 'px',
									height: item.payload.imageInfoArray[1].height + 'px',
									maxWidth: '400rpx'
									}"
								>
							</image>
						</view>
						<!-- 语音模式 -->
						<view class="flex align-center" v-if="item.payload.remoteAudioUrl" 
							@click="audioPlayHandle(item.payload.url, I_index, $event)">
							<view class="blockDance flex align-center" :style="{ height: '40rpx'}">
								<view v-for="(item, index) in 4" :class="{ 'animateRuning' : I_index === playAudioIndex }"
									:key="index" class="blockDance-item" :my="I_index"></view>
							</view>
							<text class="margin-left-xs">{{ item.payload.second + 's' }}</text>
						</view>
					</view>
				</view>
				<!-- 上顶框 -->
				<view class="" :style="{ height: paddingHeight + 'px' }"></view>
			</view>
		</scroll-view>
		<textInput :mode="'aboutChat'" :userIdTo="userIdTo" :keyBoardFlag="keyBoardFlag" :buttonColor="chatStyle[0]"></textInput>
		<loading v-if="ifLoaddingShow"></loading>
	</view>
</template>

<script>
// 播放
const innerAudioContext = uni.createInnerAudioContext();
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
			userInfo: null,
			paddingHeight: 0,
			keyBoardFlag: false,
			recorderManager: null,
			playAudioIndex: -1,
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
				if (!!this.nextReqMessageID && this.nextReqMessageID === imResponse.data.nextReqMessageID) return;
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
				}, 200)
			}).catch(err => {
				console.log(err);
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
		audioPlayHandle(src, I_index, e) {
				this.playAudioIndex = I_index;
				this.$forceUpdate();
				innerAudioContext.src = src;
				innerAudioContext.play(() => {
					console.log('开始播放');
			})
		}
	},
	computed: {
		userId() {
			return this.$cache.get('userId');
		},
		chatStyle() {
			let colorPair = ['#F8D90A, #FFF', '#0396FF, #FFF', '#EA5455, #FFF', '#7360F0, #FFF', '#32CCBC, #FFF'];
			let base = ((this.pageTitle.charCodeAt(0) % 10) >> 1);
			return colorPair[base].split(',');
		},
		lbgColor() {
			return 'lbg-' + (((this.pageTitle.charCodeAt(0) % 10) >> 1) + 1);
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
		// 
		const eventChannel = this.getOpenerEventChannel()
		// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
		eventChannel.on('acceptDataFromOpenerPage', (data) => {
		  this.userInfo = data.data;
		});
		// 
		// 收到消息
		uni.$off("reciveChatMsg");
		uni.$off("keyboardChange");
		uni.$on("keyboardChange", (height) => {
			this.paddingHeight = height;
			this.$nextTick(() =>{
				this.scrollTop += height;
				this.$forceUpdate();
			})
		});
		uni.$on("reciveChatMsg", (data) => {
			data = data.filter((item) => {
				return item.from === this.userIdTo || item.to === this.userIdTo;
			});
			this.msgList = this.msgList.concat(data);
			this.scrollTop = this.msgList.length * 999;
			this.tim.setMessageRead({conversationID: options.id});
			this.$forceUpdate();
		});
		// 音频结束
		innerAudioContext.onEnded(() => {
			this.playAudioIndex = -1;
		})
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

.profileCard {
	border-radius: 10rpx;
	box-shadow: 10rpx 10rpx 10rpx rgba($color: #333333, $alpha: .1);
}

.isMessage {
	// 消息
	padding: 30rpx 20rpx;
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
		box-shadow: 10rpx 10rpx 10rpx rgba($color: #333333, $alpha: .1);
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

.blockDance {
	.blockDance-item {
		width: 8rpx;
		background-color: #000;
		margin-right: 5rpx;
		border-radius: 4rpx;
		animation-duration: .3s;
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		animation-play-state: paused;
		&:nth-child(1) {
			height: 20rpx;
			animation-name: dance1;
		}
		&:nth-child(2) {
			height: 40rpx;
			animation-name: dance2;
		}
		&:nth-child(3) {
			height: 30rpx;
			animation-name: dance3;
		}
		&:nth-child(4) {
			height: 20rpx;
			animation-name: dance4;
		}
	}
}

@keyframes dance1 {
	from {
		height: 20rpx;
	}
	to {
		height: 40rpx;
	}
}

@keyframes dance2 {
	from {
		height: 40rpx;
	}
	to {
		height: 20rpx;
	}
}

@keyframes dance3 {
	from {
		height: 30rpx;
	}

	50% {
		height: 40rpx;
	}
	
	to {
		height: 30rpx;
	}
}

@keyframes dance4 {
	from {
		height: 20rpx;
	}
	to {
		height: 40rpx;
	}
}

.animateRuning {
	animation-play-state: running !important;
}
</style>
