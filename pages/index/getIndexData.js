// 加载数据
const __listDataAddHandle = function(list, map, isGetNew = false) {
	// 请求新数据时清空列表
	if (isGetNew) {
		map.clear();
		this.pageNumList[this.current] = 1;
	}
	list.forEach(item => {
		// 判断数据是否存在
		map.get(item.id) ?  map.delete(item.id) : null;
		map.set(item.id, item)
	}) 
}	
	
const __listDataDeleteHandle = function(id) {
	for (let i = 0; i < this.newsDataList.length; i++) {
		if (!this.newsDataList[i]) continue;
		this.newsDataList[i].delete(id);
		this.$forceUpdate();
	}
}	
	
	
export const __getIndexData = {
	// 获取广场页数据
	async getNewsData(options = {}) {
		// 开始加载
		this.$set(this.loadStatus, this.current, 'loading');
		// 判断是否达到了最大页面值
		if (this.pageTotalList[this.current] < this.pageNumList[this.current]) {
			this.$set(this.loadStatus, this.current, 'nomore');
			return;
		}
		// 判断缓存中是否有该页面
		if (!this.newsDataList[this.current]) {
			this.newsDataList[this.current] = new Map();
			this.$forceUpdate();
		}
		// 获取数据
		const data = await this.$http.request({
			url: '/dynamicState/selectDynamicListByPage',
			method: 'POST',
			data: {
				"pageNum": options.isGetNew ? 1 : this.pageNumList[this.current],
				"pageSize": 10,
				"parmas": {
					"tab": options.tab
				}
			},
			noToken: options.noToken
		});
		// 判断是否请求成功
		if (data.data.code === 200) {
			this.pageNumList[this.current]++;
		}
		
		const reuslt = data.data.data;
		const { list, pageNum, pageSize, totalPage, total } = reuslt;
		
		this.pageTotalList[this.current] = totalPage;
		// 添加数据
		__listDataAddHandle.call(this, list, this.newsDataList[this.current], options.isGetNew);
		this.$set(this.loadStatus, this.current, 'loadmore');
		this.$forceUpdate();
		setTimeout(() => {
			this.ifLoaddingShow = false;
		}, 500)
	},
	
	// 映射动态数据
	getNewsMapData(index) {
		if (this.newsDataList[index]) {
			return [...this.newsDataList[index].values()];
		}
	},
	
	getHotListDataContent(index) {
		if (this.hotList.length > 4) {
			let temp = JSON.parse(this.hotList);
			if (temp[index]) {
				return temp[index].content;
			}
		}
	},
	// 热榜
	async getHotList(options) {
		const data = await this.$http.request({
			url: '/dynamicState/selectHotRank',
			method: 'POST',
			data: {
				"rankType": options.type
			},
			noToken: options.noToken
		});
		const result = JSON.stringify(data.data.data);
		this.hotList = result;
	},
	
	// 获取举报列表
	async getReportList(options) {
		const data = await this.$http.request({
			url: '/sysCode/getDictByKey',
			method: 'POST',
			data: {
				key: 'report'
			},
			noToken: options.noToken
		});
		this.reportInfoList = data.data.data;
	},
	// 获取轮播图
	async getBanner(options) {
		const data = await this.$http.request({
			url: '/sysElement/getElementByCode',
			method: 'POST',
			data: {
				parentCode: "recommend_banner"
			},
			noToken: options.noToken
		});
		
		const result = data.data.data;
		this.bannerList = result;
	},
	
	// 删除数据
	deleteData(id) {
		__listDataDeleteHandle.call(this, id);
	}
}
