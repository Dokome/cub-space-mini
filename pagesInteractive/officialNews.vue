<template>
	<view class="">
		<navbar :title="'官方公告'"></navbar>
		<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${ViewPart - 20}px)` }">
			<view class="padding-sm">
				<view class="card margin-bottom-sm flex flex-direction" v-for="(item, index) in dataList" :key="index" @click="enterdetail(item.link)">
					<view class="bg-white flex-twice flex-basis">
						<image :src="item.image" 
							mode="aspectFill" class="hwmax">
						</image>
					</view>
					<view class="flex-sub flex flex-direction padding-sm flex-basis">
						<view class="text-lg text-bold text-black margin-bottom-xs">{{ item.title }}</view>
						<view class="u-tips-color">{{ item.content }}</view>
						<view class="flex flex-sub text-sm u-tips-color justify-between" style="align-items: center;">
							<text>{{ item.pushTime }}</text>
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
				dataList: [],
			};
		},
		methods: {
			enterdetail(src) {
				this.$api.routerHandle.goto(`/pagesInteractive/webView?src=${src}`);
			}
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel()
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('acceptDataFromOpenerPage', (data) => {
			  this.dataList = data.data;
			});
		}
	}
</script>

<style lang="scss" scoped>
.card {
	height: 550rpx;
	background-color: #fff;
}
</style>
