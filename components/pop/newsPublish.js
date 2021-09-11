export const __newsPublish = {
	imgSelector() {
		this.$api.imgHandle.imgSelector.call(this);
	},
	
	imgRemove(index) {
		this.$api.imgHandle.removeCurrentImg.call(this, index);
	},
	
	async newsPublishHandle() {
		this.ifMaskShow = true;
		// 内容校验
		if (this.newsTextContent.trim().length === 0) {
			return uni.showToast({
				title: '空空如也~',
				icon: 'none'
			})
		}
		uni.showLoading({
			title: '正在发布中'
		});
		// 上传图片
		for (const img of this.imgList) {
			const newImg = await this.$http.upLoadFile(img.url);
			this.$set(img, 'url', newImg);
		}		
		// 定义data
		const uploadData = {
			  anonymousStatus: this.newsAnonymous ? 1 : 0,
			  content: this.newsTextContent,
			  images: this.imgList
		};
		
		// 发送请求
		const data = await this.$http.request({
			url: '/dynamicState/pushDynamic',
			method: 'POST',
			data: uploadData
		});
		
		// 清空数据
		this.newsTextContent = '';
		this.imgList = [];
		this.newsAnonymous = false;
		
		// 发布成功
		uni.hideLoading();
		if (data.data.code === 200) {
			this.ifMaskShow = false;
			this.show = false;
			uni.$emit('updateData', '');
			setTimeout(() => {
				uni.showToast({
					title: '发布成功',
					icon: 'none',
					duration: 1000
				})
			}, 200);
		}
	}
}