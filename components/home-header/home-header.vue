<template>
	<view>
		<!-- 背景图 -->
		<view class="" style="height: 530rpx;" @click="changeBackGround">
			<image :src="userinfo.bgImage" mode="aspectFill" class="hwmax"></image>
		</view>
		<!-- 头像框/个人信息 -->
		<view class="bg-white flex flex-direction wmax" style="height: 385rpx;" v-if="userinfo">
			<!-- 信息与头像间隔的地方 -->
			<view class="bg-white flex align-center padding-left-lg" style="height: 40rpx;">
				<!-- 头像 -->
				<u-avatar  mode="circle" 
					:size="150" 
					:src="userinfo.avatarUrl" 
				></u-avatar>
			</view>
			<!-- 信息 -->
			<view class="padding-lr-lg flex-sub flex flex-direction" style="margin-top: 80rpx;position: relative;">
				<!-- 关注 / 私聊 -->
				<view class="interactive flex align-center" v-if="!isSelf">
					<u-button type="primary" class="margin-right-sm" size="medium" :disabled="disabled" :plain="focusStatus"
						:custom-style="{ width : '100rpx' , height: '65rpx' }" @click="changeFocusStatus">
						{{ focusStatus ? '已关注' : '+关注' }} 
					</u-button>
					<u-button type="primary" plain="true" size="medium"
						:custom-style="{ width : '100rpx' , height: '65rpx' }"	>私聊
					</u-button>
				</view>
				<!-- 名字 -->
				<view class="flex align-center">
					<view class="flex align-center">
						<text class="text-lg text-black text-xxl margin-right-sm" style="font-weight: 500;">{{ userinfo.nickName }}</text>
					</view>
					<image :src="`/static/home/gender${ userinfo.gender && userinfo.gender - 1 || 0 }.png`" mode="" style="width: 40rpx; height: 40rpx;"></image>	
				</view>
				<!-- 标签 -->
				<view class="margin-tb-sm">
					<!-- ID -->
					<u-tag :text="`UID:${ userinfo.userId }`" shape="circle" color="#909399" bg-color="#F5F5F5" border-color="#F5F5F5" />
					<!-- 学校 -->
					<u-tag :text="`学校:${ userinfo.schoolName }`" shape="circle" color="#909399" bg-color="#F5F5F5" border-color="#F5F5F5"/>
				</view>
				<!-- 个性签名 -->
				<view class="text-sm u-line-1 u-tips-color">
					{{ userinfo.sign }}
				</view>
				<!-- 个人数据 -->
				<view class="flex align-end flex-sub padding-bottom-xs" style="width: 70%;" @click="false && enterFuncPage">
					<view class="" v-for="(item, index) in userData" :key="index">
						<text class="text-black text-xl margin-right-xs" :data-page="item.page">{{ userinfo[item.count] }}</text>
						<text class="margin-right u-tips-color" :data-page="item.page">{{item.title}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"home-header",
		props: {
			userinfo: {
				type: Object,
				default() {
					return {};
				} 
			},
			isSelf: {
				type: Boolean,
				default() {
					return true;
				}
			},
			focusStatus: {
				type: Boolean,
				default() {
					return true;
				}
			}
		},
		data() {
			return {
				// 关注按钮是否不可点击
				disabled: false,
				// 
				userData: 
				[
					{
						title: '动态',
						count: 'dynamicNum',
						page: '/pages/home/home'
					},
					{
						title: '粉丝',
						count: 'fansNum',
						page: '/pagesHome/fans_focus?page=fans'
					},
					{
						title: '关注',
						count: 'focusNum',
						page: '/pagesHome/fans_focus?page=focus'
					}
				]
			};
		},
		methods: {
			// 更换背景图片
			async changeBackGround() {
				if (!this.isSelf) {
					return;
				} 
				// 选择图片
				uni.chooseImage({
					count: 1,
					extension: ['.gif'],
					success: async (res) => {
						// 上传服务
						const temp = res.tempFilePaths[0];
						// 格式筛选
						if (/\.gif$/.test(temp)) {
							return uni.showToast({
								title: '暂不支持gif格式图片~',
								icon: 'none'
							})
						}
						const url = await this.$http.upLoadFile(temp);
						// 发布更新请求
						const data = await this.$http.request({
							url: '/umsAccount/updateUserInfo',
							method: 'POST',
							data: {
								bgImage: url
							}
						});
						if (data.data.code === 200) {
							uni.showToast({
								title: '更换成功',
								icon: 'none'
							});
							uni.$emit('updateHome', '');
						}
						// 
					}
				});
			},
			// 更改关注状态
			async changeFocusStatus() {
				this.disabled = true;
				const data = await this.$http.request({
					url: '/umsRelation/focusUms',
					method: 'POST',
					data: {
						userId: this.userinfo.userId
					}
				});
				this.$nextTick(() => {
					uni.showToast({
						title: !this.focusStatus ? '关注成功' : '取关成功',
						icon: 'none',
					});
					this.disabled = false;
					uni.$emit('changeFocusStatus', '');
				})
			}
		}
	}
</script>

<style lang="scss">
.interactive {
	position: absolute;
	right: 40rpx;
	top: 0;
	transform: translateY(-120%);
}
</style>
