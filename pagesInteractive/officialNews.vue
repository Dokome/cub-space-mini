<template>
	<view class="">
		<navbar :title="'官方公告'"></navbar>
		<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${ViewPart - 20}px)` }">
			<view class="padding-sm">
				<view class="card margin-bottom-sm flex flex-direction" v-for="item in 10">
					<view class="bg-white flex-twice flex-basis">
						<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201304%2F25%2F195133e7a1l7b4f5117y4y.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632730148&t=1058a9a70023b0257f63424ad8c03324" 
							mode="aspectFill" class="hwmax">
						</image>
					</view>
					<view class="flex-sub flex flex-direction padding-sm flex-basis">
						<view class="text-lg text-bold text-black margin-bottom-xs">我是标题</view>
						<view class="u-tips-color">我是名字</view>
						<view class="flex flex-sub text-sm u-tips-color justify-between" style="align-items: center;">
							<text>2021/8/28</text>
							<text class="text-blue margin-right">查看详情&gt</text>
						</view>
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
				ViewPart: this.ViewPart,
			};
		}
	}
</script>

<style lang="scss" scoped>
.card {
	height: 550rpx;
	background-color: #fff;
}
</style>
