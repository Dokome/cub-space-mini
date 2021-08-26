const recorderManager = uni.getRecorderManager();
export const __textInput = {
	InputFocus(e) {
		this.ifImgChoose = false;
	},
	keyboardChange(e) {
		this.InputBottom = e.detail.height;
		if (this.mode === 'aboutChat') {
			uni.$emit("keyboardChange", e.detail.height)
		}
	},
	ImgChooseHandle() {
		if (this.mode === 'aboutNews') {
			this.ifImgChoose = !this.ifImgChoose;
		} else if (this.mode === 'aboutChat') {
			let TIM = this.TIM;
			let tim = this.tim;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], // 从相册选择
				success: (res) => {
					let message = tim.createImageMessage({
						to: this.userIdTo,
						conversationType: TIM.TYPES.CONV_C2C,
						payload: { file: res }
					});
					// 2. 发送消息
					let promise = tim.sendMessage(message);
					promise.then(function(imResponse) {
						// 发送成功
						uni.$emit("reciveChatMsg", [imResponse.data.message]);
					}).catch(function(imError) {
						// 发送失败
					console.warn('sendMessage error:', imError);
			});
  }
});
		}
	},
	imgSelector() {
		this.$api.imgHandle.imgSelector.call(this);
	},
	imgRemove(index) {
		this.$api.imgHandle.removeCurrentImg.call(this);
	},
	// 动态相关的回复和评论等
	async publishHandle() {
		if (this.inputContent.trim().length === 0) {
			return uni.showToast({
				title: "空空如也~",
				icon: "none"
			});
		}
		let finalId = undefined;
		let data = {
			url: '',
			method: 'POST',
			data: {
				content: this.inputContent,
				images: this.imgList
			}
		}
		// 具体配置
		if (this.type === 'news' || this.type === 'comment') {
			data.url = '/dynamicComment/pushComment';
			if (this.type === 'news') {
				data.data.dynamicId = this.target.id;
			} else {
				data.data.rootCommentId = this.target.id;
			}
			finalId = this.target.id;
		} else {
			data.data = 
				{
					...data.data, 
					parentCommentId: this.target.id,
					parentCommentUserId: this.target.userId,
					rootCommentId: this.target.rootCommentId
				}
			data.url = '/dynamicComment/replyComment';
			finalId = this.target.rootCommentId;
		}
		// 发送请求
		const result = await this.$http.request(data);
		// 更新pop内的内容
		uni.$emit('updateCurrentInfo', '');
		if (this.type !== 'news') {
			uni.$emit('repylChange', { type: this.type, data: this.target, popDontChange: true, id: finalId });
		}
		this.clearCurrentInfo();
		if (result.data.code === 200) {
			uni.showToast({
				title: '评论成功~',
				icon: 'none'
			});
		}
	},
	// 聊天相关
	chatHandle() {
		if (this.inputContent.trim().length === 0) {
			return uni.showToast({
				title: "空空如也~",
				icon: "none"
			});
		}
		let TIM = this.TIM;
		let tim = this.tim;
		// 发送文本消息，Web 端与小程序端相同
		// 1. 创建消息实例，接口返回的实例可以上屏
		let message = tim.createTextMessage({
		  to: this.userIdTo,
		  conversationType: TIM.TYPES.CONV_C2C,
		  payload: {
		    text: this.inputContent
		  },
		});
		// 2. 发送消息
		let promise = tim.sendMessage(message);
		promise.then(function(imResponse) {
		  // 发送成功
			uni.$emit("reciveChatMsg", [imResponse.data.message]);
		}).catch(function(imError) {
		  // 发送失败
		  console.warn('sendMessage error:', imError);
		});
		this.clearCurrentInfo();
	},
	// 清除当前输入
	clearCurrentInfo() {
		this.inputContent = '';
		this.ifImgChoose = false;
		this.imgList = [];
		this.$forceUpdate();
	},
	// 录音模式
	changeRecordState() {
		this.ifRecord = !this.ifRecord;
		if (this.ifRecord) {
			uni.authorize({
					scope: 'scope.record',
					success: (res) => {
						// 已授权 可以录音
					},
					fail: (res) => {
						// 未授权 提醒授权
						this.toSettingPage({
							success: (authRes) => {
								let authState = authRes.authSetting['scope.record'];
								this.ifRecord = authState;
							},
							fail: (err) => {
								this.ifRecord = false;
							}
						});
					}
			})
		}
	},
	// 开始录音
	longpressRecordStart(e) {
		this.recordStartPoint = e.changedTouches[0];
		if (e.target.id === 'record') {
			uni.authorize({
					scope: 'scope.record',
					success: (res) => {
						// 已授权 开始录音
						recorderManager.start();
						this.recordTitle = '正在说话',
						this.isRecording = true;
						this.ifRecordSucc = true;
					},
					fail: (res) => {
						// 未授权 提醒授权 取消录音状态
						this.toSettingPage({
							success: (authRes) => {
								let authState = authRes.authSetting['scope.record'];
								this.ifRecord = authState;
							},
							fail: (err) => {
								this.ifRecord = false;
							}
						});
					}
			});
		}
	},
	// 录音时手指移动
	recordTouchMove(e) {
		if (this.isRecording) {
			let point = e.changedTouches[0];
			if (this.recordStartPoint.clientY - point.clientY > 100) {
				this.recordTitle = "松开后取消发送";
				this.ifRecordSucc = false;
			} else if (this.recordStartPoint.clientY - point.clientY > 20) {
				this.recordTitle = "上滑可取消";
				this.ifRecordSucc = true;
			} else {
				this.recordTitle = "正在说话";
				this.ifRecordSucc = true;
			}
		}
	},
	// 录音结束
	recordEnd() {
		this.isRecording = false;
		recorderManager.stop();
		this.recordTitle = '按住说话';
	},
	// 前往设置页
	toSettingPage(options = {}) {
		uni.showModal({
			title: '前往授权',
			content: '语音功能需要授权录音功能',
			cancelText: '取消',
			confirmText: '确定',
			success: (res) => {
				if (res.confirm) {
					uni.openSetting(options);
				} else if(res.cancel) {
					this.ifRecord = false;
				}
			},
			fail:(err) => {
				this.ifRecord = false;
			}
		})
	}
}