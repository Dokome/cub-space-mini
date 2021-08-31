<template>
	<view>
		<view class="bg">
			<!-- 品宣图 -->
			<image class="start-img" :src="startImage" />
			<!-- 跳过 -->
			<u-button size="default" type="primary" shape="circle"
				@click="jump" :custom-style="customStyle">跳过{{ countDownNum }}秒
			</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 品宣图
			startImage: null,
			// 定时器名字
			timer: null,
			// 倒计时初始值
			countDownNum: 3
		};
	},
	computed: {
		customStyle() {
			return {
				width: '200rpx',
				padding: '10rpx',
				bottom: '150rpx',
				right: '50rpx',
				float: 'right'
			};
		}
	},
	onLoad() {
		// 页面加载获取品宣图
		this.getStartImage();
		// 倒计时
		this.countDown();
		uni.$once('unreadUpdate', (unreadCount) => {
			this.$store.commit('chatNewsUnread', unreadCount);
		});
	},
	onUnload() {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	},
	methods: {
		// 获取品宣图
		async getStartImage() {
			const result = await this.$http.request({ url: '/sysCode/selectProductImage', method: 'GET' });
			// 品宣图
			this.startImage = result.data.data.value;
		},
		// 点击跳过
		jump: function() {
			wx.switchTab({
				url: '../index/index',
			});
		},
		// 倒计时
		countDown: function() {
			// 定时器
			this.timer = setInterval(() => {
				if (this.countDownNum == 0) {
					wx.switchTab({
						url: '../index/index'
					});
				} else {
					this.countDownNum --;
				}
			}, 1000);
		}
	}
};
</script>

<style>
.bg {
	width: 100%;
	height: 100%;
	position: absolute;
}
.start-img {
	width: 100%;
	height: 100%;
}
</style>
