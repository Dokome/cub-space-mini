<template>
	<view>
		<!-- 头部 -->
		<navbar title="校园热榜"></navbar>
		<!-- 热榜内容 -->
		<scroll-view scroll-y="true" :style="{ height: `calc(100vh - ${ViewPart - 20}px)`}">
			<view>
				<view v-for="(item, index) in hotList" class="padding-sm flex margin-xs bg-white" style="height: 170rpx;" :key="item.id">
					<view class="margin-right-sm text-gray" style="position: relative;">
						<image :src="`/static/Img/hotList${index + 1}.png`" mode="" v-if="index < 3" 
							style="width: 40rpx; height: 40rpx;position: absolute; left: -10rpx; top: 5rpx;"></image>
						<text>{{index + 1}}</text>
					</view>
					<view class="flex-sub flex align-start"  style="position: relative;" @click="enterNewsDetail(item.id)">
					<!-- 左侧 -->
					<view class="flex-sub">
						<text class="clamp2 text-black text-bold">{{item.content}}</text>
						<view class="hotValue"><text class="u-tips-color text-sm">{{item.hotValue}}热度</text></view>
					</view>
					<!-- 右侧 -->
					<view class="margin-left-sm" style="width: 200rpx; height: 130rpx;">
						<image :src="getImage(index)" mode="aspectFill" style="width: 100%; height: 100%;"></image>
					</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<loading v-if="ifLoaddingShow"></loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ifLoaddingShow: true,
				ViewPart: this.ViewPart,
				hotList: [
					{
						content: '如何看待B站服务器突然崩溃，哈哈哈哈笑死了，哈哈哈哈哈哈哈哈哈啊哈哈......',
						images: []
					}
				],
				defaultImg: 'https://image.sapce.club/common/1623820687514623626.jpg',
				type: 1,
			};
		},
		methods: {
			getImage(index) {
				if (this.hotList && this.hotList[index] && this.hotList[index].images) {
					let temp = this.hotList[index].images[0];
					return temp ? temp.url : this.defaultImg;
				}
			},
			enterNewsDetail(id) {
				this.$api.routerHandle.goto(`/pagesInteractive/newsdetail?id=${id}`);
			},
			async getHotList(options = {}) {
				const data = await this.$http.request({
					url: '/dynamicState/selectHotRank',
					method: 'POST',
					data: {
						"rankType": options.type
					},
					skip: true,
					noToken: options.noToken
				});
				const result = data.data.data;
				this.hotList = result;
				this.ifLoaddingShow = false;
			}
		},
		onLoad: function(option) {
		  const eventChannel = this.getOpenerEventChannel()
		  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
		  eventChannel.on('acceptDataFromOpenerPage', (data) => {
		    this.type = data.data;
		  });
			this.getHotList({ type: this.type });
		}
	}
</script>

<style lang="scss" scoped>
.hotValue {
	position: absolute;
	left: 0;
	bottom: 0;
}
</style>
