<template>
	<view :style="[
		{ height: CustomBar + 'px' },
		{ display: ifNavDisplay }
	]" class="bg-white">
		<view 
			class="flex align-center" 
			:class="{ 'justify-center': !!title }"
			:style="[
				{ height: CustomBar - StatusBar + 'px', width: '100%' }, 
				{ marginTop: StatusBar + 'px' },
			]"
			>
			<slot style="width: 100%;" v-if="!title"></slot>
			<view style="width: 100%;position: relative;" v-else class="flex justify-center">
				<view class="listIcon" style="" @click="back">
					<image src="/static/Img/back.png" mode="" style="width: 100%; height: 100%;"></image>
				</view>
				<text class="text-lg text-bold text-black" style="font-weight: 500;">{{title}}</text>
			</view>
		</view>		
	</view>
</template>

<script>
	export default {
		name:"navbar",
		props: {
			ifNavDisplay: {
				type: String,
				default: 'flex'
			},
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		methods: {
			//返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	//功能列表小图标样式
	.listIcon {
		position: absolute;
		height: 50rpx;
		width: 50rpx;
		top: 50%;
		left: 0;
		transform: translateY(-50%) translateX(40rpx);
		z-index: 9999;
	}
</style>
