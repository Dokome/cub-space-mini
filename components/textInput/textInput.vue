<template>
	<view class="bg-white replyStyle flex align-center padding shadow-top" :style="[{ bottom : InputBottom + 'px'} ]">
		<!-- 图片选择 -->
		<view>
			<image src="/static/Img/imgchose.png" mode="" 
				style="width: 50rpx; height: 40rpx;" @click="ImgChooseHandle"> 
			</image>
		</view>
		<!-- 输入框 -->
		 <textarea value=""  @focus="InputFocus" @blur="InputBlur" :show-confirm-bar="false"
							auto-height class="textarea" :adjust-position="false" placeholder="我来说几句..."
							 maxlength="200" :fixed="true"/>
		<!-- 发送 -->
		<view>
			<u-button type="primary" size="mini">发送</u-button>
		</view>
		<!-- 图片框 -->
		<view class="imgchoose padding-xs shadow-top" v-show="ifImgChoose" style="transition: .2s;">
			<scroll-view :scroll-x="true" >
				<view class="flex imgBox">
					<view class="imgBox-item" v-for="item in imgList" v-if="item">
						<image :src="item.url" mode="aspectFill" class="imgBox-img"></image>
					</view>
					<view class="imgBox-item">
						<image src="/static/Img/addImg.png" mode="aspectFill" class="imgBox-img"></image>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"textInput",
		data() {
			return {
				ViewPart: this.ViewPart,
				InputBottom: 0,
				ifImgChoose: false,
				imgList: [
					{
						url: 'https://image.sapce.club/common/1623820732138714505.jpg',
					},
					{
						url: 'https://image.sapce.club/common/1623820567807803537.jpg',
					},
					{
						url: 'https://image.sapce.club/common/1623817461535790285.jpg',
					},
					{
						url: 'https://image.sapce.club/common/1623820798277584078.jpg',
					},
					{
						url: 'https://image.sapce.club/common/1623820734980753560.jpg',
					},
					{
						url: 'https://image.sapce.club/common/1623820687514623626.jpg',
					},
				],
			};
		},
		computed: {
			imgStyle() {
				return this.$api.imgHandle.multiImgShow.call(this);
			}
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height;
				this.ifImgChoose = false;
			},
			InputBlur(e) {
				this.InputBottom = 0;
			},
			ImgChooseHandle() {
				this.ifImgChoose = !this.ifImgChoose;
			}
		}
	}
</script>

<style lang="scss">
.replyStyle {
	box-sizing: border-box;
	width: 100%;
	position: fixed;
	z-index: 99999999;
}

.inputBox {
	width: 520rpx;
	border-radius: 10rpx;
}

.textarea {
	background-color: #F3F4F6;
	margin: 0 25rpx;
	padding: 15rpx;
	border-radius: 10rpx;
}

.imgchoose {
	position: absolute;
	bottom: 100%;
	height: 200rpx;
	width: 100%;
	background-color: #fff;
	left: 0;
}

.imgBox {
	display: flex;
	flex-wrap: nowrap;
	.imgBox-item {
		flex-shrink: 0;
		.imgBox-img {
			padding: 5rpx;
			width: 180rpx;
			height: 180rpx;
		}
	}
}
</style>
