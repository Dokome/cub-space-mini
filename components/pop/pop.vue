<template>
	<view class="">
		<u-popup mode="bottom" v-model="show" :closeable="true" close-icon-pos="top-left"
			:custom-style="{zIndex: '999999'}">
			<view class="content" style="height: 100vh;">
				<view class="flex justify-center align-center text-bold text-black"
				:style="[
						{ height: CustomBar + 'px' },
					]"
				>
					{{ type === 'index' ? '发布' : '回复' }}
				</view>
				<scroll-view scroll-y="true" :style="{ height: `calc(100% - ${CustomBar}px)`} ">
					<view class="padding-top-xs" style="background-color: #F5F5F5;"></view>
					<!-- 文字信息 -->
					<view class="padding"> 
						<u-input type="textarea" maxlength="140" height="500"
							:custom-style="{ background: 'white' }" placeholder="很高兴认识你~">
						</u-input>
					</view>
					<view class="padding-top-xs" style="background-color: #F5F5F5;"></view>
					<!-- 图片选择框 -->
					<view class="imgchoose padding-xs">
						<scroll-view :scroll-x="true" >
							<view class="flex imgBox">
								<view class="imgBox-item" v-for="item in imgList">
									<image :src="item.url" mode="aspectFill" class="imgBox-img"></image>
								</view>
								<view class="imgBox-item">
									<image src="/static/Img/addImg.png" mode="aspectFill" class="imgBox-img"></image>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="padding-top-xs" style="background-color: #F5F5F5;"></view>
					<!-- 匿名 -->
					<view class="flex padding-tb-sm padding-lr align-center justify-between">
						<text>面具</text>
						<u-switch v-model="checked"></u-switch>
					</view>
					<view class="padding-top-xs" style="background-color: #F5F5F5;"></view>
					<!-- 提交按钮 -->
					<view class="flex justify-center padding-top-xl"><u-button size="medium" type="primary">发布</u-button></view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	name: 'pop',
	props: {
		type: {
			type: String,
			default() {
				return ''
			}
		}
	},
	data() {
		return {
			checked: false,
			show: false,
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
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
		}
	},
	methods: {
		popUpChange() {
			this.show = !this.show;
		}
	},
	mounted() {
		//弹起下落
		uni.$on('popUpChange', () => {
			this.popUpChange();
		})
	}
}
</script>

<style lang="scss">
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

.imgchoose {
	height: 200rpx;
	width: 100%;
	background-color: #fff;
	left: 0;
}

</style>
