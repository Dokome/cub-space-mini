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
	async publishHandle() {
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
		} else {
			data.data = 
				{
					...data.data, 
					parentCommentId: this.target.id,
					parentCommentUserId: this.target.userId,
					rootCommentId: this.target.rootCommentId
				}
			data.url = '/dynamicComment/replyComment';
		}
		// 发送请求
		const result = await this.$http.request(data);
		// 更新pop内的内容
		uni.$emit('updateCurrentInfo', '');
		uni.$emit('repylChange', { type: 'comment', data: this.target, popDontChange: true });
		this.clearCurrentInfo();
		if (result.data.code === 200) {
			uni.showToast({
				title: '评论成功~',
				icon: 'none'
			});
		}
		// 清除当前输入
	},
	clearCurrentInfo() {
		this.inputContent = '';
		this.ifImgChoose = false;
		this.imgList = [];
		this.$forceUpdate();
	}
}