// 加载数据
const __listDataAddHandle = function(list, map, isGetNew = false, tab) {
	// 请求新数据时清空列表
	if (isGetNew) {
		map.clear();
		this.pageNumList[tab] = 1;
	}

	list.forEach(item => {
		// 判断数据是否存在
		map.get(item.id) ?  map.delete(item.id) : null;
		map.set(item.id, item)
	});
	this.$forceUpdate();
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
		let tab = options.tab;
		// 开始加载
		this.$set(this.loadStatus, tab, 'loading');
		// 判断是否达到了最大页面值
		if ((this.pageTotalList[tab] < this.pageNumList[tab]) && !options.isGetNew) {
			this.$set(this.loadStatus, tab, 'nomore');
			return;
		}
		// 判断缓存中是否有该页面
		if (!this.newsDataList[tab]) {
			this.newsDataList[tab] = new Map();
			this.$forceUpdate();
		}
		// 获取数据
		const data = await this.$http.request({
			url: '/dynamicState/selectDynamicListByPage',
			method: 'POST',
			data: {
				"pageNum": options.isGetNew ? 1 : this.pageNumList[tab],
				"pageSize": 10,
				"parmas": {
					"tab": options.tab
				},
			},
			skip: true,
			noToken: options.noToken
		});
		// 判断是否请求成功
		if (data.data.code === 200) {
			this.pageNumList[tab]++;
			const reuslt = data.data.data;
			const { list, pageNum, pageSize, totalPage, total } = reuslt;
			
			this.pageTotalList[tab] = totalPage;
			// 添加数据
			__listDataAddHandle.call(this, list, this.newsDataList[tab], options.isGetNew, tab);
			this.$set(this.loadStatus, tab, 'loadmore');
			this.$forceUpdate();
		} else {

		}
		// 取消遮罩
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
	
	getHotListDataContent(h_index, index) {
		if (this.hotList[index - 1] && this.hotList[index - 1].length > 4) {
			let temp = JSON.parse(this.hotList[index - 1]);
			if (temp[h_index]) {
				let res = temp[h_index].content.replace(/\r\n/g,"").replace(/\n/g,"");
				return res;
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
			skip: true,
			noToken: options.noToken
		});
		const result = JSON.stringify(data.data.data);
		this.hotList[options.type - 1] = result;
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
		this.bannerListR = result;
		
		const data2 = await this.$http.request({
			url: '/sysElement/getElementByCode',
			method: 'POST',
			data: {
				parentCode: "school_banner"
			},
			noToken: options.noToken
		});
		
		const result2 = data2.data.data;
		this.bannerListS = result2;
	},
	
	// 删除数据
	deleteData(id) {
		__listDataDeleteHandle.call(this, id);
	}
}
