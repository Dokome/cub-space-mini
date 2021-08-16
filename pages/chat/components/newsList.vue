<template>
	<view class="chat-list">
		<view class="chat-list-item bg-white u-border-bottom padding flex" v-for="item in 20" :key="item" @click="chatDetail">
			<view class="chat-list-item-avatar margin-right-sm">
				<u-avatar size="100" :src="'https://image.sapce.club/common/1623820798277584078.jpg'"></u-avatar>
			</view>
			<view class="chat-list-item-info flex-sub">
				<view class="top flex align-center justify-between">
					<text class="text-bold text-df text-black">司空千落</text>
					<text class="u-tips-color text-xs">20:43</text>
				</view>
				<view class="bottom flex align-center justify-between flex-sub margin-top-xs">
					<text class="u-tips-color text-sm text-cut message">
						会不会我再怎么努力，去成为他心口上的朱会不会我再怎么努力，去成为他心口上的朱会不会我再怎么努力，去成为他心口上的朱会不会我再怎么努力，去成为他心口上的朱
					</text>
					<text class="number">5</text>
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
