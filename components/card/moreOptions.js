export const __moreOptionsHandle = {
	// 更多
	moreOptions() {
		this.modalShow = true;
	},
	// 处理更多选项
	moreOptionsClick(data, e) {
		const type = e.target.dataset.type;
		this.modalShow = false;
		if (type === 'delete') {
			this.dataDelete(data.id);
		} else if (type === 'report') {
			this.reportModalShow = true;
		} else {
			// 转发动态
			this.shareNews(data.id);
		}
	},
	// 删除数据
	async dataDelete(id) {
		uni.showLoading({
			title: '删除中'
		})
		// 删除请求
		const data = await this.$http.request({
			url: '/dynamicState/deleteDynamic',
			method: 'POST',
			data: {
				dynamicId: id
			}
		});
			uni.hideLoading();
		if (data.data.code === 200) {
			uni.showToast({
				title: '删除成功~',
				icon: 'none'
			});
			uni.$emit('deleteData', id);
		} else {
			uni.showToast({
				title: '删除失败',
				icon: 'none'
			});
		}
	},
	// 举报文章
	async dataReport(reportValue) {
		this.reportModalShow = false;
		// 举报
		const data = await this.$http.request({
			url: '/sysReport/report',
			method: 'POST',
			data: {
				type: 1,
				bizId: this.newsdata.id,
				content: reportValue
			}
		});
		uni.showToast({
			title: '举报成功!',
			icon: 'none'
		})
	},
	// 分享
	async shareNews(id) {
		this.$api.interactive.newsShareHandle.call(this, id);
	},
	// 评论的更多
	commentOpts(commentID) {
		this.commentShow = true;
		this.deleteCommentId = commentID;
	},
	// 删除
	async deleteCommentHandle() {
		this.commentShow = false;
		const data = await this.$http.request({
			url: '/dynamicComment/deleteComment',
			method: 'POST',
			data: {
				commentId: this.deleteCommentId
			}
		});
		if (data.data.code === 200) {
			uni.showToast({
				title: '删除成功',
				icon: 'none'
			});
			uni.$emit('deleteCommentDetail', this.deleteCommentId);
			uni.$emit('deleteComment', this.deleteCommentId);
		}
		this.deleteCommentId = undefined;
	}
}