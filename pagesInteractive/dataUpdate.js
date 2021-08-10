// 加载数据
const __listDataAddHandle = function(list, map) {
	// 请求新数据时清空列表
	list.forEach(item => {
		// 判断数据是否存在
		map.get(item.id) ?  map.delete(item.id) : null;
		map.set(item.id, item)
	}) 
}	

export const __dataUpdate = {
	// 查询动态信息
	async getNewsInfo(options) {
		const data = await this.$http.request({
			url: '/dynamicState/selectDynamicDetail',
			method: 'POST',
			data: {
				dynamicId: options.id
			},
			noToken: options.noToken
		});
		const result = data.data.data;
		this.newsDetail = result;
		this.currentTarget = result;
		this.$forceUpdate();
		setTimeout(() => {
			this.ifLoaddingShow = false;
		}, 800);
	},
	// 查询动态评论
	async getNewComment(options) {
		
		if (options.getNew) {
			this.currentPageNum = this.totalPage ? this.totalPage : 1; 
		}
		
		if ((this.currentPageNum > this.totalPage) && !options.getNew) {
			this.loadStatus = 'nomore';
			return;
		}
		this.loadStatus = 'loading';
		const data = await this.$http.request({
			url: '/dynamicComment/selectCommentByDyIdAndPage',
			method: 'POST',
			data: {
				pageNum: this.currentPageNum,
				pageSize: 10,
				parmas: {
					dynamicId: options.id
				}
			},
			noToken: options.noToken
		});
		
		const result = data.data.data;
		if (data.data.code === 200) {
			this.currentPageNum++;
			this.totalPage = result.totalPage;
			this.dataTotalNum = result.total;
		}
		this.loadStatus = 'loadmore';
		if (this.totalPage === 0 || options.getNew || this.dataTotalNum < 10) {
			this.loadStatus = 'nomore';
		}

		__listDataAddHandle.call(this, result.list, this.newsCommentList);
	},
	// 映射动态数据
	getNewsMapData() {
		if (this.newsCommentList) {
			return [...this.newsCommentList.values()];
		}
	},
	// 请求更新数据
	scrollToBottom() {
		this.getNewComment({ id: this.newsDetail.id, noToken: true, delay: 100});
	}
}