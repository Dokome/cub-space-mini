<template>
	<view class="flex justify-center align-center .outWrapper flex-direction">
		<view class="containerCircle">
			<view class="inner_four"></view>
			<view class="inner_three"></view>
			<view class="inner_two"></view>
			<view class="inner_one">
				<image :src="selfAvatar" mode="" class="circle_avatar"></image>
			</view>
			<view class="saomiao"><image src="/static/Img/saomiao.png" alt=""></view>
			<view class="circle_1">
				<image src="/static/Img/meetsmile.png" mode="" class="face"></image>
				<image src="https://image.sapce.club/static/girl_three.jpg" mode="" class="circle_avatar"></image>
			</view>
			<view class="circle_2">
				<image src="/static/Img/bubble.png" mode="" class="face"></image>
				<image src="/static/Img/1_wo@2x.png" mode="" class="face" style="width: 26rpx; height: 26rpx; left: 30%; top: -55%"></image>
				<image src="/static/Img/2_wo@2x.png" mode="" class="face" style="width: 26rpx; height: 26rpx; left: 30%; top: -55%"></image>
				<image src="/static/Img/3_wo@2x.png" mode="" class="face" style="width: 26rpx; height: 26rpx; left: 30%; top: -55%"></image>
				<image src="https://image.sapce.club/static/girl_two.jpg" mode="" class="circle_avatar"></image>
			</view>
			<view class="circle_3">
				<image src="/static/Img/meetsmile.png" mode="" class="face"></image>
				<image src="https://image.sapce.club/static/boy_one.jpg" mode="" class="circle_avatar"></image>
			</view>
		</view>
		<view class="" style="margin-top: 250rpx;">
			<u-button  ripple="true"  @click="filterShow = false"
			:custom-style="{ width: '400rpx', background: 'linear-gradient(-26deg, #A268F4, #7D4CFF)', color: '#fff', height: '100rpx'}">取消匹配</u-button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'meetLoading',
	props: {
		selfAvatar: {
			type: String,
			default() {
				return ''
			}
		}
	},
	data() {
		return {
			
		}
	}
}
</script>

<style scoped lang="scss">
	.outWrapper {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 99999999;
		background-color: rgba($color: #000000, $alpha: .8);
		width: 100vw;
		height: 100vh;
	}
	
	.containerCircle {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 500rpx;
		height: 500rpx;
		// background-color: #fff;
	}
	
	.inner_four {
	  position: absolute;
	  width: 500rpx;
	  height: 500rpx;
	  background-color: rgba(152, 149, 250, 0.1);
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  border-radius: 50%;
	  border: 6rpx solid rgba(152, 149, 250, 0.2);
	  z-index: 10;
	  transform: scale(0.74);
	  animation: waveOut2 0.8s infinite linear;
	}
	
	.inner_three {
	  position: absolute;
	  width: 422rpx;
	  height: 422rpx;
	  background-color: rgba(152, 149, 250, 0.1);
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  border-radius: 50%;
	  border: 6rpx solid rgba(152, 149, 250, 0.2);
	  z-index: 20;
	  transform: scale(0.86);
	  animation: waveOut1 0.8s 0.2s infinite linear;
	}
	
	.inner_two {
	  position: absolute;
	  width: 366rpx;
	  height: 366rpx;
	  background-image: linear-gradient(44deg, #5989ec, #4145e1);
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  border-radius: 50%;
	  border: 6rpx solid #9895fa;
	  z-index: 30;
	}
	
	.inner_one {
	  position: absolute;
	  width: 232rpx;
	  height: 232rpx;
	  border: 20rpx solid #9895fa;
	  background: #ffffff;
	  border-radius: 50%;
	  z-index: 50;
	}
	
	.saomiao {
	  position: absolute;
	  width: 301rpx;
	  height: 301rpx;
	  z-index: 40;
	  transform: translateY(50%);
	  transform-origin: top center;
	  animation: circleRotate 2s infinite linear;
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.circle_1 {
	  position: absolute;
	  width: 76rpx;
	  height: 76rpx;
	  background-color: #fff;
	  border-radius: 50%;
	  z-index: 60;
	  right: 0;
	  top: 0;
	  border: 6rpx solid #9895fa;
	  animation: upAndDown 1s linear infinite alternate;
	}
	
	.circle_2 {
	  position: absolute;
	  width: 76rpx;
	  height: 76rpx;
	  background-color: #fff;
	  border-radius: 50%;
	  z-index: 60;
	  left: 0;
	  top: 40rpx;
	  animation: upAndDown 1s linear infinite alternate;
	  border: 6rpx solid #9895fa;
	}
	
	.circle_3 {
	  position: absolute;
	  width: 76rpx;
	  height: 76rpx;
	  background-color: #fff;
	  border-radius: 50%;
	  z-index: 60;
	  left: 30rpx;
	  bottom: 50rpx;
	  border: 6rpx solid #9895fa;
	  animation: upAndDownReverse 1s linear infinite alternate;
	}
	
	.circle_avatar {
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  border-radius: 50%;
	  z-index: 100;
	}
	
	.circle_3 .face {
	  position: absolute;
	  left: 25%;
	  width: 35rpx;
	  height: 35rpx;
	  animation: upAndDownLong 1s linear infinite;
	}
	
	.circle_1 .face {
	  position: absolute;
	  left: 25%;
	  width: 35rpx;
	  height: 35rpx;
	  animation: upAndDownLong 1s .5s linear infinite;
	}
	
	.circle_2 .face {
	  position: absolute;
	  left: 0%;
	  top: -60%;
	  width: 70rpx;
	  height: 39rpx;
	  z-index: 59;
	}
	
	.circle_2 .face:nth-child(3) {
	  opacity: 0;
	  animation: twoStep 1s steps(2) infinite;
	}
	
	.circle_2 .face:nth-child(4) {
	  opacity: 0;
	  animation: twoStep 1s steps(2) infinite;
		animation-delay: .3s;
	}
	
	@keyframes circleRotate {
	  from {
	    transform: translateY(50%) rotate(0deg);
	  }
	
	  to {
	    transform: translateY(50%) rotate(360deg);
	  }
	}
	
	@keyframes waveOut1 {
	  from {
	    transform: scale(0.86);
	    opacity: 1;
	  }
	
	  50% {
	    transform: scale(1.53);
	    opacity: 0;
	  }
	
	  to {
	    transform: scale(1.53);
	    opacity: 0;
	  }
	}
	
	@keyframes waveOut2 {
	  from {
	    transform: scale(0.86);
	    opacity: 1;
	  }
	
	  50% {
	    transform: scale(1.3);
	    opacity: 0;
	  }
	
	  to {
	    transform: scale(1.3);
	    opacity: 0;
	  }
	}
	
	@keyframes upAndDown {
	  from {
	    transform: translateY(0);
	  }
	
	  to {
	    transform: translateY(-25%);
	  }
	}
	
	@keyframes upAndDownLong {
	  from {
	    transform: translateY(0);
	    opacity: 1;
	  }
	
	  to {
	    transform: translateY(-200%);
	    opacity: 0.3;
	  }
	}
	
	@keyframes upAndDownReverse {
	  from {
	    transform: translateY(0);
	  }
	
	  to {
	    transform: translateY(25%);
	  }
	}
	
	@keyframes twoStep {
	  from {
	    opacity: 0;
	  }
	

	
	  to {
	    opacity: 1;
	  }
	}

</style>
