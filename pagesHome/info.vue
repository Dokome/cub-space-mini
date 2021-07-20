<template>
	<view>
		<navbar title="账号资料"></navbar>
		<view class="margin-bottom-xs"></view>
		<!-- 资料可修改部分 -->
		<!-- 头像 -->
		<view class="bg-white padding flex justify-between align-center u-border-bottom">
			<label for="nickName">头像</label>
			<image :src="avatar" mode="aspectFill" style="width: 60rpx; height: 60rpx; border-radius: 50%;"></image>
		</view>
		<!-- 昵称 -->
		<view class="bg-white padding flex justify-between align-center u-border-bottom">
			<label for="nickName">昵称</label>
			<input type="text" value="" v-model="nickName" class="text-black text-right" name="nickName" style="width: 85%;" maxlength="8"/>
		</view>
		<!-- 签名 -->
		<view class="bg-white padding flex justify-between align-center u-border-bottom">
			<label for="sign">签名</label>
			<input type="text" value="" v-model="sign" class="text-black text-right" name="nickName" style="width: 85%;" maxlength="20"/>
		</view>
		<!-- 性别 -->
		<view class="bg-white padding flex justify-between align-center u-border-bottom">
			<label for="gender">性别</label>
			<input type="text" value="" v-model="gender" class="text-black text-right" name="gender" style="width: 85%;" maxlength="20"/>
		</view>
		<view class="margin-bottom-xs"></view>
		<!-- 资料不可修改部分 -->
		<view class="bg-white padding flex justify-between align-center u-border-bottom" v-for="(item, index) in forbiddenInfo" :key="index">
			<label>{{forbideenInfoTagName[index]}}</label>
			<view class="">{{item}}</view>
		</view>
		<!-- 提醒 -->
		<view class="margin-bottom-xs"></view>
		<view class="" style="height: 90rpx; width: 100%;">	
			<image src="/static/Img/info.png" style="width: 100%; height: 100%;"></image>
		</view>
		<view class="margin-bottom-xs"></view>
		<view class="flex justify-center padding-top"><u-button size="medium" type="primary">修改</u-button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: 'mate川丶',
				sign: '总有些惊奇的际遇，比方说当我遇见你',
				gender: '男',
				avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftx-free-imgs.acfun.cn%2Fcontent%2F2019_7_21%2F1.5636994914764566E9.png%3Fimageslim&refer=http%3A%2F%2Ftx-free-imgs.acfun.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629122958&t=ddad2dd6664dee4cc4dea6e21c807aa1',
				forbiddenInfo: ['20193857927495725', '13000000001', '三体科幻学院', '罗南', '213873647211'],
				forbideenInfoTagName: ['UUID', '手机号', '学校', '姓名', '学号']
			};
		}
	}
</script>

<style lang="scss">

</style>
