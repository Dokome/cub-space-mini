<template>
	<view class="outWrapper flex align-center justify-center">
		<view class="blockWrapper flex flex-direction">
			<!--   ⚪ -->
			<view class="flex-sub flex justify-center align-end" style="width: 120%;">
				<view class="circle" style="width: 42%; height: 100%; background-color: #82ccdd; flex-shrink: 0;"></view>
			</view>
			<!-- ⚪  ⚪ -->
			<view class="flex-sub flex justify-evenly" style="width: 120%;">
				<!-- 左 -->
				<view class="circle" style="background-color: #6a89cc; width: 42%;"></view>
				<!-- 右 -->
				<view class="circle" style="background-color: #3c6382; width: 42%;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"loading",
		data() {
			return {
				ifNeedLoadIng: false
			};
		}
	}
</script>

<style lang="scss" scoped>
	.outWrapper {
		background-color: #fff;
		position: absolute;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		z-index: 100;
	}
	
	.blockWrapper {
		position: relative;
		width: 150rpx;
		height: 150rpx;
		animation-name: rotateCircle;
		animation-duration: 3s;
		animation-timing-function: ease;
		animation-iteration-count: infinite;
		.circle {
			flex-shrink: 0;
			border-radius: 50%;
			// margin: 5%;
			display: flex;
			justify-content: center;
			align-items: center;
			&::after {
				position: absolute;
				content: "";
				width: 10rpx;
				height: 10rpx;
				background-color: #Fff;
				transform: translateX(100%) translateY(-100%);
				border-radius: 50%;
			}
			&:nth-of-type(1) {
				animation: 2s colorCircle1 infinite alternate;
			}
			
			&:last-child {
				animation: 2s colorCircle2 infinite alternate;
			}
			
			&:nth-child(2) {
				animation: 2s colorCircle3 infinite alternate;
			}
		}
	}
	
	@keyframes rotateCircle {
		from {
			rotate: 0deg;
		}
		
		25% {
			rotate: 120deg;
		}
		
		33% {
			rotate: 120deg;
		}
		
		58% {
			rotate: 240deg;
		}
		
		66% {
			rotate: 240deg;
		}
		
		91% {
			rotate: 360deg;
		}
		
		to {
			rotate: 360deg;
		}
	}
	
	@keyframes colorCircle1 {
		from {
			background-color: #6a89cc;
			scale: 1;
		}
		
		50% {
			background-color: #2c2c54;
			scale: .85;
		}
		
		to {
			background-color: #e55039;
			scale: 1;
		}
	}
	
	@keyframes colorCircle2 {
		from {
			background-color: #b8e994;
			scale: 1;
		}
		
		50% {
			background-color: #ff793f;
			scale: .85;
		}
		
		to {
			background-color: #fad390;
			scale: 1;
		}
	}
	
	@keyframes colorCircle3 {
		from {
			background-color: #7efff5;
			scale: 1;
		}
		
		50% {
			background-color: #f7f1e3;
			scale: .85;
		}
		
		to {
			background-color: #fffa65;
			scale: 1;
		}
	}
</style>
