<template>
	<view class="outWrapper flex align-center justify-center">
		<view class="meet-main flex align-center justify-between flex-direction">
			<!-- 顶部  剩余次数  筛选		 -->
			<view class="meet-main-header flex justify-between align-center">
				<view class="flex meet-main-header-left">
					<text class="text-white text-bold margin-right-sm">剩余匹配次数:</text>
					<text class="text-white text-bold">{{ meetCount }}次</text>
				</view>
				<view class="" @click="matchOptionsHandle">
					<image src="/static/Img/select.png" mode="aspectFill" class="meet-select"></image>
				</view>
			</view>
			<!-- 中间部分头像等 -->
			<view class="meet-main-center justify-center align-center flex" @click="matchStartHandle">
				<!-- 中间动画 -->
				<view class="meet-main-center-bgAnimate" v-for="item in 8" :key="item"
					:style="{ animationDelay: `${(item / 2) - 1}s`}"></view>
				<view class="meet-main-center-text flex justify-center align-center"><text class="text-bold text-white">遇见</text></view>
			</view>
			<!-- 底部 在线人数	 -->
			<view class="">
				<text class="text-white text-bold margin-right-sm">当前在线人数:</text>
				<text class="text-white text-bold">{{ onlineCount }}人</text>
			</view>
			<view class="">
				<u-popup v-model="filterShow" mode="bottom" :height="700" :border-radius="20" :closeable="true">
					<view style="height: 100rpx;" class="flex justify-center align-center text-bold">设置筛选项</view>
					<view class="flex flex-direction" style="height: 400rpx;">
						<view class="flex-sub padding flex flex-direction">
							<text class="u-tips-color">性别</text>
							<view class="flex flex-sub">
								<view class="flex-treble padding-sm"
									v-for="(item, g_index) in genderOptions" :key="g_index">
									<view class="optionTab">
										<u-tag :text="item" :size="g_index === sets[0] ? 'largeCur' : 'large'"
										shape="circle" color="#000" bg-color="#F5F5F5" border-color="#F5F5F5" 
										@click="changeUnsetHandle(0, g_index)"
										/>
									</view>
								</view>
							</view>
						</view>
						<view class="flex-sub padding flex flex-direction">
							<text class="u-tips-color">学校</text>
							<view class="flex flex-sub">
								<view class="flex-treble padding-sm" v-for="(item, s_index) in schoolOptions" :key="s_index">
									<view class="optionTab">
										<u-tag :text="item" :size="s_index === sets[1] ? 'largeCur' : 'large'"
										shape="circle" color="#000" bg-color="#F5F5F5" border-color="#F5F5F5" 
										@click="changeUnsetHandle(1, s_index)"
										/>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="padding-lr-xl flex justify-center align-center" style="height: 200rpx;">
						<u-button  ripple="true" shape="circle" @click="saveSets"
						:custom-style="{ width: '400rpx', backgroundColor: '#E6C2D7', color: '#fff', border: '#E6C2D7'}">保存</u-button>
					</view>
				</u-popup>
			</view>
		</view>
		<!-- 底部栏 -->
		<u-tabbar
		  :list="list"
			:mid-button="midButton"
			:inactive-color="inactiveColor"
			:activeColor="activeColor"
			:change="navChange"
			:border-top="borderTop"
		></u-tabbar>
		<login v-if="!login"></login>
		<meetLoading v-if="login && IfMeetLoadingShow" :selfAvatar="selfAvatar"></meetLoading>
		<loading v-if="login && ifLoading"></loading>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { meetLoading } from './matchAnimate.vue';
	export default {
		data() {
			return {
				ifLoading: true,
				IfMeetLoadingShow: false,
				list: this.$store.state.list,
				filterShow: false,
				genderOptions: ["不限", "男生", "女生"],
				schoolOptions: ["不限", "同校", "异校"],
				sets: [0, 0],
				onlineCount: 0,
				meetCount: 0,
				selfAvatar: '',
				ifSucc: false,
			}
		},
		methods: {
			matchOptionsHandle() {
				this.filterShow = true;
			},
			changeUnsetHandle(type, curVal) {
				this.$set(this.sets, type, curVal);
			},
			// 获取个人信息
			 async getUserInfo() {
				 const data = await this.$http.request({
					 url: '/umsAccount/selectUmsHome',
					 method: 'POST'
				 });
				const result = data.data.data;
				this.selfAvatar = result.avatarUrl;
			 },
			// 获取用户设置
			async getSets() {
				const data = await this.$http.request({
					url: '/ums/set/selectUmsSet',
					method: 'POST',
					data: {
						keys: ["school", 'sex']
					}
				});
				const result = data.data.data;
				this.sets = [+result.sex, +result.school];
			},
			// 保存用户设置
			async saveSets() {
				const data = await this.$http.request({
					url: '/ums/set/saveSet',
					method: 'POST',
					data: {
						sets: [
						  {
						    "key": "school",
						    "value": this.sets[1],
						    "desc": "学校"
						  },
						  {
						    "key": "sex",
						    value: this.sets[0],
						    "desc": "性别"
						  }
						]
					}
				});
				this.filterShow = false;
			},
			// 获取当前在线人数
			async getOnlineCount() {
				const data = await this.$http.request({
					url: '/social/onlineNum',
					method: 'GET'
				});
				let result = data.data.data;
				this.onlineCount = result.count;
			},
			// 获取匹配次数
			async getMeetCount() {
				const data = await this.$http.request({
					url: '/social/meetNum',
					method: 'GET'
				});
				let result = data.data.data;
				this.meetCount = result.count;
			},
			// 开始匹配
			async matchStartHandle() {
				if (!this.meetCount) return;
				let cnt = 8;
				this.ifSucc = true;
				this.IfMeetLoadingShow = true;
				let timmer = null;
				((fn, delay) => {
					function __interval() {
						fn();
						if (!cnt || !this.ifSucc) {
							clearTimeout(timmer);
							return;
						}
						timmer = setTimeout(__interval.bind(this), delay);
					}
					__interval.call(this);
				})(async () => {
					cnt--;
					if (!cnt && this.ifSucc) {
						const data = await this.$http.request({
							url: '/social/meetSomeBody',
							method: 'GET'
						});
						const result = data.data.data;
						this.IfMeetLoadingShow = false;
						this.chatDetail('C2C', result.nickName, result.userId, result);
						return true;
					}
				}, 500);
			},
			// 进入聊天详情页
			chatDetail(id, nick, userIdTo, userInfo) {
				this.$api.routerHandle.goto(`/pagesInteractive/chatDetail?id=${id + userIdTo}&nick=${nick}&userIdTo=${userIdTo}`, userInfo);
			},
		},
		computed: {
			...mapState(['midButton', 'inactiveColor', 'activeColor', 'borderTop']),
			login() {
				return !!this.$cache.get('token');
			}
		},
		components: {
			meetLoading,
		},
		onLoad() {
			uni.$on('ifSuccChange', () => {
				this.ifSucc = false;
				this.IfMeetLoadingShow = false;
			});
			setTimeout(() => {
				this.ifLoading = false;
			}, 1500);
		},
		onShow() {
			this.getSets();
			this.getOnlineCount();
			this.getMeetCount();
			this.getUserInfo();
		}
	}
</script>

<style scoped lang="scss">
	.u-demo-area {
		margin: 0 -40rpx;
	}
	
	.outWrapper {
		height: 100vh;
		background-image: url(https://image.sapce.club/static/bgImage.jpg);
		background-size: 100vh;
	}
	
	.meet-main {
		height: 80vh;
		width: 100%;
		padding: 50rpx 40rpx;
		.meet-main-header {
			width: 100%;
			.meet-select {
				width: 160rpx;
				height: 80rpx;
			}
		}
		.meet-main-center {
				position: relative;
				width: 100%;
				height: 400rpx;
			.meet-main-center-bgAnimate {
				position: absolute;
				width: 200rpx;
				height: 200rpx;
				background-color: #469AF7;
				border-radius: 50%;
				color: white;
				animation-name: wave;
				animation-duration: 5s;
				animation-iteration-count: infinite;
				transform: scale(1);
				opacity: .8;
			}
			.meet-main-center-text {
				width: 200rpx;
				height: 200rpx;
				position: absolute;
				z-index: 999;
			}
		}
	}
	
	@keyframes wave {
		from {
			background-color: #469AF7;
			transform: scale(1);
			opacity: .8;
		}
		
		40% {
			background-color: #469AF7;
			transform: scale(1);
			opacity: .8;
		}
		
		to {
			background-color: #ffffff;
			transform: scale(2.5);
			opacity: 0;
		}
	}
</style>
