<template>
	<view>
		<navbar title="账号资料"></navbar>
		<!-- 资料可修改部分 -->
		<!-- 头像 -->
		<view class="bg-white padding flex justify-between align-center u-border-bottom" @click="disabled && changeAvatar()">
			<label for="nickName">头像</label>
			<image :src="avatar" mode="aspectFill" style="width: 60rpx; height: 60rpx; border-radius: 50%;"></image>
		</view>
		<!-- 昵称 -->
		<view class="bg-white padding flex justify-between align-center u-border-bottom">
			<label for="nickName">昵称</label>
			<input type="text" value="" v-model="nickName" :disabled="!disabled" class="text-black text-right" name="nickName" style="width: 85%;" maxlength="8" />
		</view>
		<!-- 签名 -->
		<view class="bg-white padding flex justify-between align-center u-border-bottom">
			<label for="sign">签名</label>
			<input type="text" value="" v-model="sign" :disabled="!disabled" class="text-black text-right" name="nickName" style="width: 85%;" maxlength="20" />
		</view>
		<!-- 性别 -->
		<view class="bg-white padding flex justify-between align-center u-border-bottom">
			<label for="gender">性别</label>
			<u-switch v-model="gender" active-color="blue" inactive-color="red" :disabled="!disabled"></u-switch>
		</view>
		<view class="margin-bottom-xs"></view>
		<!-- 资料不可修改部分 -->
		<view class="bg-white padding flex justify-between align-center u-border-bottom" v-for="(item, index) in forbiddenInfo" :key="index">
			<label>{{ forbideenInfoTagName[index] }}</label>
			<view class="">{{ item || '未认证' }}</view>
		</view>
		<!-- 提醒 -->
		<view class="margin-bottom-xs"></view>
		<view class="" style="height: 90rpx; width: 100%;"><image src="/static/Img/info.png" style="width: 100%; height: 100%;"></image></view>
		<view class="margin-bottom-xs"></view>
		<view class="flex justify-center padding-top margin-bottom-xl">
			<u-button :type="disabled ? 'primary' : 'error'" @click="buttonClickHandle" ripple="true"  :custom-style="{'height':'75rpx','width':'250rpx'}">
				{{ !disabled ? '编辑' : '保存' }}
			</u-button>
		</view>
		<loading v-if="ifLoaddingShow"></loading>
	</view>
</template>

<script>
export default {
	data() {
		return {
			ifLoaddingShow: true,
			nickName: '',
			sign: '',
			gender: '',
			avatar: '',
			avatarIsChange: false,
			forbiddenInfo: [],
			forbideenInfoTagName: ['UUID', '手机号', '学校', '姓名', '学号'],
			disabled: false
		};
	},
	methods: {
		// 获取用户信息
		async getUserInfo() {
			const data = await this.$http.request({
				url: '/umsAccount/getUserInfo',
				method: 'GET'
			});
			let result = data.data.data;
			({ gender: this.gender, avatarUrl: this.avatar, sign: this.sign, nickName: this.nickName } = result);
			this.forbiddenInfo = [result.uuid, result.phone, result.schoolName, result.realName, result.studentCode];
			this.gender = !(this.gender - 1);
			setTimeout(() => {
				this.ifLoaddingShow = false;
			}, 300);
		},
		// 按钮点击事件
		buttonClickHandle() {
			if (this.disabled === true) {
				this.updateUserInfo();
			}
			this.disabled = !this.disabled;
		},
		// 更新用户信息
		async updateUserInfo() {
			if (this.avatarIsChange) {
				this.avatar = await this.$http.upLoadFile(this.avatar);
			}

			const data = await this.$http.request({
				url: '/umsAccount/updateUserInfo',
				data: {
					nickName: this.nickName,
					avatarUrl: this.avatar,
					sign: this.sign,
					gender: !this.gender ? 2 : 1
				}
			});
			if (data.data.code === 200) {
				uni.$emit('updateHome', '');
			}
		},
		// 更改头像
		changeAvatar() {
			uni.chooseImage({
				count: 1,
				success: res => {
					this.avatar = res.tempFilePaths[0];
					this.avatarIsChange = true;
				}
			});
		}
	},
	onLoad() {
		this.getUserInfo();
	}
};
</script>

<style lang="scss"></style>
