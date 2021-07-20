<template>
	<view>
		<navbar :title="page"></navbar>
		<!-- 列表 -->
		<scroll-view scroll-y="true" :style="{ height: PageHeight + 'px' }" class="scroll-wrapper">
			<view>
				<view class="bg-white margin-top-xs flex align-center padding-lg" style="height: 170rpx; position: relative;" v-for="item in 100">
					<!-- 头像 -->
					<u-avatar size="large" :src="'https://img2.baidu.com/it/u=2537426187,1713205820&fm=26&fmt=auto&gp=0.jpg'"></u-avatar>
					<!-- 信息 -->
					<view class="margin-left flex flex-direction justify-between">
						<!-- 昵称 -->
						<text class="text-lg text-bold text-black">Niubility</text>
						<!-- 学校 -->
						<text class="text-sm text-gray margin-top">江西师范大学</text>
					</view>
					<!-- 按钮 -->
					<view class="focusButton">
						<u-button type="primary" shape="circle" size="mini">+关注</u-button>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//当前页面
				page: '',
				// 页面高度(通过App.vue获取而来)
				PageHeight: this.windowHeight,
			};
		},
		onLoad(options) {
			this.page = options.page === 'fans' ? '我的粉丝' : '我的关注';
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-wrapper {
		overflow: hidden;
	}
	
	.focusButton {
		position: absolute;
		right: 50rpx;
	}
</style>
