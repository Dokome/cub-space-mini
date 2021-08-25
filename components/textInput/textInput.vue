<template>
	<view class="bg-white replyStyle flex align-center padding shadow-top" :style="[{ bottom: InputBottom + 'px' }]">
		<!-- 图片选择 -->
		<view>
			<image src="/static/Img/imgchose.png" mode="" 
				style="width: 50rpx; height: 40rpx;" @click="ImgChooseHandle">
			</image>
		</view>
		<!-- 输入框 -->
		<textarea
			v-model="inputContent"
			@focus="InputFocus"
			:show-confirm-bar="false"
			auto-height
			class="textarea"
			:adjust-position="false"
			:placeholder="inputPlaceHolder"
			maxlength="200"
			:fixed="true"
			:hold-keyboard="mode === 'aboutChat' && true"
			@keyboardheightchange="keyboardChange"
		/>
		<!-- 发送 -->
		<view>
			<u-button shape="circle" type="primary" v-if="ifSendShow"
				:custom-style="{ height: '60rpx', width: '120rpx', backgroundColor: buttonColor }" 
				@click="modeHandle()">发送
			</u-button>
			<u-icon type="" name="mic" size="50" color="#989EB4" v-else></u-icon>
		</view>
		<!-- 图片框 -->
		<view class="imgchoose padding-xs shadow-top" v-show="ifImgChoose" style="transition: .2s;">
			<scroll-view :scroll-x="true">
				<view class="flex imgBox">
					<view class="imgBox-item" v-for="(item, index) in imgList" v-if="item" :key="index">
						<image :src="item.url" mode="aspectFill" class="imgBox-img" @click="imgRemove(index)"></image>
					</view>
					<view class="imgBox-item" v-if="imgList && imgList.length < 9">
						<image src="/static/Img/addImg.png" mode="aspectFill" class="imgBox-img" @click="imgSelector"></image>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
import { __textInput } from './textInput.js';
export default {
	name: 'textInput',
	props: {
		mode: {
			type: String,
			default() {
				return 'aboutNews';
			}
		},
		type: {
			type: String,
			default() {
				return 'news';
			}
		},
		target: {
			type: Object,
			default() {
				return {};
			}
		},
		userIdTo: {
			type: String,
			default() {
				return '';
			}
		},
		keyBoardFlag: {
			type: Boolean,
			default() {
				return false
			}
		},
		buttonColor: {
			type: String,
			default() {
				return '';
			}
		}
	},
	data() {
		return {
			ViewPart: this.ViewPart,
			InputBottom: 0,
			// 输入内容
			inputContent: '',
			// 是否处于输入状态
			ifImgChoose: false,
			// 输入图片
			imgList: [],
			tim: this.tim,
			ifFocus: false,
			// 录音文件
			audioPath: '',
			// 是否处于录音模式
			ifRecord: false
		};
	},
	computed: {
		imgStyle() {
			return this.$api.imgHandle.multiImgShow.call(this);
		},
		inputPlaceHolder() {
			if (this.type === 'comment' || this.type === 'news') {
				return '爱国 友善 文明';
			} else if (this.type === 'reply') {
				return '回复 ' + this.target.nickName + ':';
			}
		},
		modeHandle() {
			if (this.mode === 'aboutNews') {
				return this.publishHandle;
			} else if (this.mode === 'aboutChat') {
				return this.chatHandle;
			}
		},
		TIM() {
			return this.$cache.get('TIM');
		},
		ifSendShow() {
			if (this.mode === 'aboutNews') {
				return true;
			} else if (this.mode === 'aboutChat') {
				return !!this.inputContent.trim().length;
			}
		}
	},
	watch: {
		type(val) {
			this.clearCurrentInfo();
		},
		mode(val) {
			this.clearCurrentInfo();
		}
	},
	methods: {
		...__textInput
	},
	onLoad() {

	}
};
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
	background-color: #f3f4f6;
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
