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
		console.log(this.newsdata.id);
		uni.showToast({
			title: '举报成功!',
			icon: 'none'
		})
	},
}