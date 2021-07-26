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
			<slot class="wmax" v-if="!title"></slot>
			<view style="position: relative;" v-else class="flex justify-center wmax">
				<view class="listIcon" style="" @click="back">
					<image src="/static/Img/back.png" mode="" class="hwmax"></image>
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
				this.$api.routerHandle.goback();
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
