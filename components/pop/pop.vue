<template>
	<view class="">
		<u-popup mode="bottom" v-model="show" :closeable="true" close-icon-pos="top-left"
			:custom-style="{ zIndex: '88' }">
			<view class="content" style="height: 100vh;">
				<view class="flex justify-center align-center text-bold text-black"
				:style="[
						{ height: CustomBar + 'px' },
					]"
				>
					{{ type === 'publish' ? '发布' : '回复'  }} <!-- publish 发布 reply 回复 login 登录 -->
				</view>
				<!--
					发布功能
				 -->
				<scroll-view scroll-y="true" :style="{ height: `calc(100% - ${ CustomBar }px)`} " v-if="type === 'publish'">
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
									<view class="imgBox-item" v-for="(item, index) in imgList" :key="index">
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
						<view class="flex justify-center padding-top-xl">
							<u-button size="medium" type="primary">发布</u-button>
						</view>
				</scroll-view>
				<!--
					回复功能
				 -->
				<scroll-view scroll-y="true" :style="{ height: `calc(100% - ${ CustomBar }px)`} " v-if="type === 'reply' && commentInfo">
					<view class="">
						<card type="comment" :enterStateComment="true" :commentdata="commentInfo"></card>
						<view class="bg-white margin-top-xs padding">
							<text class="text-bold text-black text-df">{{ replyList.length + '条回复'}}</text>
						</view>
						<card type="reply" :enterStateComment="true" v-for="item in replyList" :commentdata="item" :key="item.id"></card>
						<view class="bg-white" style="height: 150rpx;"></view>
					</view>
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
			//评论信息
			commentInfo: null,
			// 评论回复列表
			replyList: null,
			// 发布时的选择匿名按钮
			checked: false,
			// 弹框的显示
			show: false,
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			props: {
				type: {
					type: String
				}
			},
			// 发布时的图片选择
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
		// 控制pop的显示
		popUpChange() {
			this.show = !this.show;
		}
	},
	mounted() {
		// 先把其他页面的时间全部注销
		uni.$off('repylChange');
		uni.$off('popUpChange');
		//弹起下落(发布)
		uni.$on('popUpChange', (status) => {
			this.popUpChange();
		});
		uni.$on('repylChange', (options) => {
			this.commentInfo = options.data;
			this.replyList = this.commentInfo.childCommentList;
			this.popUpChange();
		});
	},
	computed: {
		// 当前的状态
		curType() {
			if (this.type === 'publish') {
				return '发布'
			} else {
				return this.type === 'login' ? '登录' : '回复';
			}
		}
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
