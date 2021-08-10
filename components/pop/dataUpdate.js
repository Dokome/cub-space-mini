// 加载数据
const __listDataAddHandle = function(list, map) {
	// 请求新数据时清空列表
	list.forEach(item => {
		// 判断数据是否存在
		map.get(item.id) ?  map.delete(item.id) : null;
		map.set(item.id, item)
	}); 
}	

export const __dataUpdate = {
	// 更新列表内的消息
	async updateReplyList(id, options = {}) {
		this.loadStatus = 'loading';
		if (options.getNew) {
			this.currentPageNum = this.totalPage ? this.totalPage : 1; 
		}
		if ((this.currentPageNum > this.totalPage) && !options.getNew) {
			this.loadStatus = 'nomore';
			return;
		}

		const data = await this.$http.request({
			url: '/dynamicComment/selectRootComment',
			method: 'POST',
			data: {
				pageNum: this.currentPageNum,
				pageSize: 10,
				parmas: {
				  rootCommentId: id
				}
			},
			delay: 300,
			noToken: true
		});
		// 页面参数赋值
		const result = data.data.data;
		if (data.data.code === 200) {
			this.currentPageNum++;
			this.totalPage = result.totalPage;
			this.dataTotalNum = result.total;
		}
		// 
	this.loadStatus = 'loadmore';
	
	if (this.totalPage === 0 || options.getNew || this.dataTotalNum < 10) {
		this.loadStatus = 'nomore';
	}
	// 
	__listDataAddHandle.call(this, result.list, this.replyList);
	
	// 更新页面状态
		this.$forceUpdate();
		setTimeout(() => {
			this.ifLoadingShow = false;
		}, 200);
	},
	// 映射动态数据
	getNewsMapData() {
		if (this.replyList) {
			return [...this.replyList.values()];
		}
	},
	// 请求更新数据
	scrollToBottom() {
		this.updateReplyList(this.commentInfo.id, { noToken: true, delay: 100});
	},
	// 数据重置
	clearData() {
		this.commentInfo = null;
		this.replyList = new Map();
		this.totalPage = 1;
		this.currentPageNum = 1;
		this.dataTotalNum = 0;
	}
}