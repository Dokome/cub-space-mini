export const __textInput = {
	InputFocus(e) {
		this.InputBottom = e.detail.height;
		this.ifImgChoose = false;
	},
	InputBlur(e) {
		this.InputBottom = 0;
	},
	ImgChooseHandle() {
		this.ifImgChoose = !this.ifImgChoose;
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
	}
}