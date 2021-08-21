<template>
	<view class="loginPage flex align-center justify-center">
		<!-- 显示部分 -->
		<view class="flex flex-direction justify-center">
			<!-- 头像 -->
			<view class="flex align-center justify-center flex-direction">
				<u-avatar size="150" :src="officalImg"></u-avatar>
				<text class="margin-top-sm">次方空间</text>
			</view>
			<!-- 按钮 -->
			<view class="flex justify-center padding-top-xl margin-top-xl">
				<u-button size="default" type="primary" shape="circle" @click="loginIn" :custom-style="customStyle">授权登录</u-button>
			</view>
		</view>
	</view>
</template>

<script>
import GetTimRef from './tim.js';
export default {
	name: 'login',
	data() {
		return {
			officalImg: 'https://cub.image.emily.red/operation/logo.png'
		};
	},
	computed: {
		customStyle() {
			return {
				width: '300rpx',
				padding: '10rpx'
			};
		}
	},
	methods: {
		// 授权登录
		loginIn() {
			uni.getUserProfile({
				desc: '用于授权登录',
				success: res => {
					uni.login({
						provider: 'weixin',
						timeout: 2000,
						success: result => {
							const code = result.code;
							this.wxLogin(res, code);
						}
					});
				}
			});
		},
		// 具体的登录函数
		async wxLogin(res, code) {
			const result = await this.$http.request({
				url: '/umsAccount/wxLogin',
				data: {
					code: code,
					nickName: res.userInfo.nickName,
					gender: res.userInfo.gender,
					language: res.userInfo.language,
					city: res.userInfo.city,
					province: res.userInfo.province,
					country: res.userInfo.country,
					avatarUrl: res.userInfo.avatarUrl
					// "code":"0518BK0w3nt3dW2BXu1w37W57448BK0n",
					// "nickName":"风华正茂",
					// "gender":1,
					// "language":"zh_CN",
					// "city":"",
					// "province":"",
					// "country":"",
					// "avatarUrl":"https://thirdwx.qlogo.cn"
				},
				noToken: true
			});
			const resultData = result.data.data;
			// 添加用户信息缓存
			if (!this.$cache.get('userSig')) {
				// 当存在旧的缓存
				console.log('old cache userSig：' + this.$cache.get('userSig'));
				this.$cache.remove('userSig');
			}
			this.$cache.set('userSig', resultData.userSig, resultData.expires);
			
			// 添加用户信息缓存
			if (!this.$cache.get('userId')) {
				// 当存在旧的缓存
				console.log('old cache userId：' + this.$cache.get('userId'));
				this.$cache.remove('userId');
			}
			this.$cache.set('userId', resultData.userId, resultData.expires);

			// 添加token缓存
			if (!this.$cache.get('token')) {
				// 当存在旧的缓存
				console.log('old cache token：' + this.$cache.get('token'));
				this.$cache.remove('token');
			}
			console.log('token >>> ' + resultData.token);
			this.$cache.set('token', resultData.token, resultData.expires);

			// 添加appId缓存
			if (!this.$cache.get('appId')) {
				// 当存在旧的缓存
				console.log('old cache appId：' + this.$cache.get('appId'));
				this.$cache.remove('appId');
			}
			console.log('appId >>> ' + resultData.appId);
			this.$cache.set('appId', resultData.appId, resultData.expires);
			
		  // TIM
			GetTimRef(resultData);
			
			// 页面跳转
			uni.reLaunch({
				url: '/pages/home/home'
			});
		}
	}
};
</script>

<style lang="scss">
.loginPage {
	width: 100vw;
	height: 100vh;
	background-color: white;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 99;
}
</style>
