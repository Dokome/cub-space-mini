const __listDataAddHandle = function(list, map) {
	// 请求新数据时清空列表
	list.forEach(item => {
		// 判断数据是否存在
		map.get(item.userId) ?  map.delete(item.userId) : null;
		map.set(item.userId, item)
	}) 
}	

export const __fans_focus = {
	// 动态数据映射
	getUsersMapData() {
		if (this.userList) {
			return [...this.userList.values()];
		}
	},
	// 获取用户列表
	async getUserList(options = {}) {
		if ((this.currentPageNum > this.totalPage) && !options.getNew) {
			this.loadStatus = 'nomore';
			return;
		}
		this.loadStatus = 'loading';

		const data = await this.$http.request({
			url: '/umsRelation/focusAndFans',
			method: 'POST',
			data: {
				pageNum: this.currentPageNum,
				pageSize: 10,
				parmas: {
					type: this.type,
				}
			}
		});
		
		const result = data.data.data;
		console.log(result.list);
		if (data.data.code === 200) {
			this.currentPageNum++;
			this.totalPage = result.totalPage;
			this.dataTotalNum = result.total;
		}
		
		this.loadStatus = 'loadmore';
		if (this.totalPage === 0 || options.getNew || this.dataTotalNum < 10) {
			this.loadStatus = 'nomore';
		}
		
		__listDataAddHandle.call(this, result.list, this.userList);
		setTimeout(() => {
			this.ifLoaddingShow = false;
		}, 500)
	},
	scrollToBottom() {
		this.getUserList();
	},
	// 进入用户主页
	enterUserHome(id) {
		this.$api.routerHandle.goto(`/pagesHome/mynews?id=${id}`);
	}
}