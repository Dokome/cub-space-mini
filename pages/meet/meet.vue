<template>
	<view class="outWrapper flex align-center justify-center">
		<view class="meet-main flex align-center justify-between flex-direction">
			<!-- 顶部  剩余次数  筛选		 -->
			<view class="meet-main-header flex justify-between align-center">
				<view class="flex meet-main-header-left">
					<text class="text-white text-bold margin-right-sm">剩余匹配次数:</text>
					<text class="text-blue text-bold">{{5}}次</text>
				</view>
				<view class="">
					<image src="/static/Img/select.png" mode="aspectFill" class="meet-select"></image>
				</view>
			</view>
			<!-- 中间部分头像等 -->
			<view class="meet-main-center justify-center align-center flex">
				<!-- 中间动画 -->
				<view class="meet-main-center-bgAnimate" v-for="item in 20" :key="item"
					:style="{ animationDelay: `${item / 2}s`}"></view>
				<view class="meet-main-center-text flex justify-center align-center"><text class="text-bold text-white">遇见</text></view>
			</view>
			<!-- 底部 在线人数	 -->
			<view class="">
				<text class="text-white text-bold margin-right-sm">当前在线人数:</text>
				<text class="text-blue text-bold">{{4096}}人</text>
			</view>
		</view>
		<!-- 底部栏 -->
		<u-tabbar
		  :list="list"
			:mid-button="midButton"
			:inactive-color="inactiveColor"
			:activeColor="activeColor"
			:change="navChange"
			:border-top="borderTop"
		></u-tabbar>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				list: this.$store.state.list
			}
		},
		methods: {
			
		},
		computed: {
			...mapState(['midButton', 'inactiveColor', 'activeColor', 'borderTop']),
		},
	}
</script>

<style scoped lang="scss">
	.u-demo-area {
		margin: 0 -40rpx;
	}
	
	.outWrapper {
		height: 100vh;
		background-image: linear-gradient(225deg,  #D4BABD, #E5C2D8, #E2D2DE, #F5D3D9,#E6E6EB,#DBE0E9,#F5ECEB,#F5D4DA);
	}
	
	.meet-main {
		height: 80vh;
		width: 100%;
		padding: 50rpx 40rpx;
		.meet-main-header {
			width: 100%;
			.meet-select {
				width: 160rpx;
				height: 80rpx;
			}
		}
		.meet-main-center {
				position: relative;
				width: 100%;
				height: 400rpx;
			.meet-main-center-bgAnimate {
				position: absolute;
				width: 200rpx;
				height: 200rpx;
				background-color: #469AF7;
				border-radius: 50%;
				color: white;
				animation-name: wave;
				animation-duration: 5s;
				animation-iteration-count: infinite;
				// animation-direction: alternate;
				transform: scale(1);
				opacity: .8;
			}
			.meet-main-center-text {
				width: 200rpx;
				height: 200rpx;
				position: absolute;
				z-index: 999999;
			}
		}
	}
	
	@keyframes wave {
		from {
			background-color: #469AF7;
			transform: scale(1);
			opacity: .8;
		}
		
		40% {
			background-color: #469AF7;
			transform: scale(1);
			opacity: .8;
		}
		
		to {
			background-color: #ffffff;
			transform: scale(2.5);
			opacity: 0;
		}
	}
</style>
