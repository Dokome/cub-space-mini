<template>
	<view>
		<!-- 表单 -->
		<navbar title="学校认证"></navbar>
		<view class="" v-if="!confirmStatus">
			<!-- 表单组件 -->
			<!-- 学校 -->
			<view class="bg-white padding flex justify-between align-center u-border-bottom" @click="show = true">
				<label for="nickName">学校</label>
				<u-select v-model="show" :list="schoolList" mode="single-column" @confirm="confirm"></u-select>
				<view class="flex-sub flex">
					<text class="text-right flex-sub"></text>
					{{ school }}
				</view>
			</view>
			<!-- 姓名 -->
			<view class="bg-white padding flex justify-between align-center u-border-bottom">
				<label for="nickName">姓名</label>
				<input type="text" value="" v-model="realName" class="text-right" name="nickName" style="width: 70%;" maxlength="8" placeholder="请输入姓名" />
			</view>
			<!-- 学号 -->
			<view class="bg-white padding flex justify-between align-center u-border-bottom">
				<label for="nickName">学号</label>
				<input type="number" value="" v-model="SID" class="text-right" name="nickName" style="width: 70%;" maxlength="20" placeholder="请输入您的学号" />
			</view>
			<!-- 手机号 -->
			<view class="bg-white padding flex justify-between align-center u-border-bottom">
				<label for="nickName">手机号</label>
				<input type="number" value="" v-model="phone" class="text-right" name="nickName" style="width: 70%;" maxlength="11" placeholder="请输入您的手机号" />
			</view>
			<!-- 验证码 -->
			<view class="bg-white padding flex justify-between align-center u-border-bottom">
				<view class="">获取验证码</view>
				<label for="nickName">
					<u-button size="medium" type="default" :disabled="vaildTimmer" @click="sendVerificationCode">{{ vaildTimmer ? vaildTimeCount : '点击获取' }}</u-button>
				</label>
			</view>
			<!-- 验证码 -->
			<view class="bg-white padding flex justify-between align-center u-border-bottom">
				<label for="nickName">验证码</label>
				<input type="number" value="" v-model="vailid" class="text-right" name="nickName" style="width: 70%;" maxlength="8" placeholder="输入验证码" />
			</view>

			<!-- 提醒 -->
			<view class="margin-bottom-xs"></view>
			<view class="" style="height: 110rpx; width: 100%;"><image src="/static/Img/identify.png" style="width: 100%; height: 100%;"></image></view>
			<view class="margin-bottom-xs"></view>
			<!-- 认证 -->
			<view class="flex justify-center padding-top-xl margin-bottom-xl"><u-button shape="circle" :custom-style="{'height':'120rpx','width':'400rpx'}" type="primary" @click="submit">认证</u-button></view>
		</view>
		<!-- 已验证 -->
		<view class="" style="width: 100%; height: 1100rpx;" v-else><image src="/static/Img/identifyC.png" mode="" style="width: 100%; height: 100%;"></image></view>
		<loading v-if="ifLoaddingShow"></loading>
	</view>
</template>

<script>
import { __identify } from './identify.js';
export default {
	data() {
		return {
			// 验证码间隔定时器
			vaildTimmer: null,
			vaildTimeCount: 120,
			// loading显示控制
			ifLoaddingShow: true,
			// 认证砖头盖
			confirmStatus: false,
			// 基本信息
			realName: '',
			phone: '',
			vailid: '',
			SID: '',
			// 学校ID和学校名称
			schoolId: '',
			school: '请选择您的学校',
			show: false,
			schoolList: [
				{
					value: '1',
					label: '江西师范大学'
				}
			]
		};
	},
	methods: {
		...__identify
	},
	onLoad() {
		this.getConfirmStatus();
		this.getAllSchool();
	}
};
</script>

<style lang="scss"></style>
