const __listDataAddHandle = function(list, map) {
	// 请求新数据时清空列表
	list.forEach(item => {
		// 判断数据是否存在
		map.get(item.id) ?  map.delete(item.id) : null;
		map.set(item.id, item)
	}) 
}	
	
export const __mynews = {
	// 动态数据映射
	getNewsMapData() {
		if (this.newsDataList) {
			return [...this.newsDataList.values()];
		}
	},
	// 获取动态数据
	async getMynewsData(options = {}) {
		if ((this.currentPageNum > this.totalPage) && !options.getNew) {
			this.loadStatus = 'nomore';
			return;
		}
		this.loadStatus = 'loading';
		const data = await this.$http.request({
			url: '/dynamicState/selectUmsDynamicList',
			method: 'POST',
			data: {
				pageNum: this.currentPageNum,
				pageSize: 10,
				parmas: {
					userId: options.id
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
		
		__listDataAddHandle.call(this, result.list, this.newsDataList);
		setTimeout(() => {
			this.ifLoaddingShow = false;
		}, 500)
	},
	// 
	scrollToBottom() {
		this.getMynewsData({ delay: 100, id: this.userId });
	},
	// 
	enterDetail(id) {
		this.$api.routerHandle.goto(`/pagesInteractive/newsdetail?id=${id}`);
	},
	// 
	async getUserInfo(options = {}) {
		const data = await this.$http.request({
			url: '/umsAccount/selectUmsHome',
			method: 'POST',
			data: {
				userId: options.id
			}
		});
		this.userinfo = data.data.data;
		// 
		setTimeout(() => {
			this.ifLoaddingShow = false;
		}, 300);
	}
}