// 加载数据
const __listDataAddHandle = function(list, map) {
	list.forEach(item => {
		// 判断数据是否存在
		map.get(item.id) ?  map.delete(item.id) : null;
		map.set(item.id, item)
	}) 
}	
	
export const __getIndexData = {
	// 获取广场页数据
	async getNewsData(options = {}) {
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
				"pageNum": 1,
				"pageSize": 10,
				"parmas": {
					"tab": options.tab
				}
			},
			noToken: options.noToken
		});
		const reuslt = data.data.data;
		const { list, pageNum, pageSize, totalPage, total } = reuslt;
		console.log(reuslt);
		
		// 添加数据
		__listDataAddHandle(list, this.newsDataList[this.current]);
		this.$forceUpdate();
	},
	
	// 映射数据
	getNewsMapData(index) {
		if (this.newsDataList[index]) {
			return [...this.newsDataList[index].values()];
		}
	}
}
