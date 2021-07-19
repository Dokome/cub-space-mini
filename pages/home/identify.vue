<template>
	<view>
		<navbar title="学校认证"></navbar>
		<view class="margin-bottom-xs"></view>
		<!-- 表单组件 -->
		<view class="bg-white padding flex justify-between align-center u-border-bottom">
			<label for="nickName">学校</label>
			<view class="flex-sub flex"><text class="text-right flex-sub"></text>{{school}}</view>			
		</view>
		<view class="bg-white padding flex justify-between align-center u-border-bottom">
			<label for="nickName">姓名</label>
			<input type="text" value="" v-model="nickName" class="text-black text-right" name="nickName" style="width: 70%;" maxlength="8"/>
		</view>
		<view class="bg-white padding flex justify-between align-center u-border-bottom">
			<label for="nickName">学号</label>
			<input type="number" value="" v-model="nickName" class="text-black text-right" name="nickName" style="width: 70%;" maxlength="20"/>
		</view>
		<view class="bg-white padding flex justify-between align-center u-border-bottom">
			<label for="nickName">验证码</label>
			<input type="number" value="" v-model="nickName" class="text-black text-right" name="nickName" style="width: 70%;" maxlength="8"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				school: '',
			}
		},
		methods: {
			confirm(e) {
				this.school = e[0].label;
			}
		},
	}
</script>

<style lang="scss">

</style>
