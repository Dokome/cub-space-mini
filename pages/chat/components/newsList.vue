<template>
	<view class="chat-list">
		<view class="chat-list-item bg-white u-border-bottom padding flex" 
			v-for="item in dataList" :key="item.conversationID" 
			@click="chatDetail(item.conversationID, item.userProfile.nick, item.userProfile.userID, item.userProfile)">
			<view class="chat-list-item-avatar margin-right-sm" v-if="item.userProfile && item.userProfile.avatar">
				<u-avatar size="100" :src="item.userProfile.avatar"></u-avatar>
			</view>
			<view class="chat-list-item-info flex-sub">
				<view class="top flex align-center justify-between">
					<text class="text-bold text-df text-black">{{ item.userProfile.nick }}</text>
					<text class="u-tips-color text-xs">{{ getMessageTime(item.lastMessage.lastTime) }}</text>
				</view>
				<view class="bottom flex align-center justify-between flex-sub margin-top-xs">
					<text class="u-tips-color text-sm text-cut message">
						{{ item.lastMessage.isRevoked ? '撤回了一条消息' : item.lastMessage.messageForShow}}
					</text>
					<text class="number" v-if="item.unreadCount">{{ item.unreadCount }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'newsList',
	data() {
		return {
			
		}
	},
	methods: {
		// 进入聊天详情页
		chatDetail(id, nick, userIdTo, profile) {
			this.$api.routerHandle
			.goto(`/pagesInteractive/chatDetail?id=${id}&nick=${nick}&userIdTo=${userIdTo}`, profile);
		},
		getMessageTime(timestamp) {
			return this.$api.timeHandle.chatMessage(timestamp)
		}
	},
	props:{
		dataList: {
			type: Array,
			default() {
				return [];
			}
		}
	}
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
					background-color: #ff5218;
					text-align: center;
					margin-right: 10rpx;
				}
			}
		}
	}
}	
</style>
