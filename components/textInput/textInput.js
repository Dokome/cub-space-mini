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
		  to: '1622109839081240311',
		  conversationType: TIM.TYPES.CONV_C2C,
		  // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
		  // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
		  // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
		  payload: {
		    text: 'Hello world!'
		  },
		  // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
		  // cloudCustomData: 'your cloud custom data'
		});
		// 2. 发送消息
		let promise = tim.sendMessage(message);
		promise.then(function(imResponse) {
		  // 发送成功
		  console.log('发送成功');
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