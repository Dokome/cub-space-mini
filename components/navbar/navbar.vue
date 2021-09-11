<template>
	<view :style="[
		{ height: CustomBar + 'px' },
		{ display: ifNavDisplay },
		{ backgroundColor: navBarColor }
	]" :class="{ 'fixed' : isFixed }">
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
				<view class="listIcon" style="" @click="back" v-if="ifBack">
					<image src="/static/Img/back.png" mode="" class="hwmax"></image>
				</view>
				<view class="listIcon flex align-center justify-center close" v-if="!ifBack" @click="closePage">
					<image src="/static/Img/close.png" mode="" class="hwmax"></image>
				</view>
				<text class="text-lg text-bold text-black">{{title}}</text>
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
			},
			navBarColor: {
				type: String, 
				default() {
					return '#fff'
				}
			},
			isFixed: {
				type: Boolean,
				dafault() {
					return false;
				}
			},
			ifBack: {
				type: Boolean,
				default() {
					return true;
				}
			},
			ifBackToIndexPage: {
				type: Boolean,
				default() {
					return true;
				}
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
			},
			closePage() {
				uni.$emit('popUpChange', '');
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
	
	.fixed {
		position: fixed;
		top: 0;
		z-index: 99999;
	}
	
	.close {
		width: 40rpx;
		height: 40rpx;
	}
</style>
