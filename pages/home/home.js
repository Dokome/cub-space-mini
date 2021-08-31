export const _home = {
	//关闭公众号
	closeOfficial() {
		this.officialButtonShow = false;
	},
	// 关注公众号
	focusOfficial() {
		this.$api.routerHandle.goto('/pagesInteractive/webView?src=https://mp.weixin.qq.com/s/yo0juBljBUpHYP-yBMxJ0w');
	},
	// 进入功能页面
	enterFuncPage(e) {
		this.$api.routerHandle.goto(e.target.dataset.page);
	},
	// 获取功能列表
	async getFuncList() {
		const data = await this.$http.request({
			url: '/sysElement/getElementByCode',
			method: 'POST',
			data: {
				parentCode: "func_list"
			}
		});
		const result = data.data.data;
		this.funcList = result;
		this.$forceUpdate();
	},
	// 获取个人信息
	 async getUserInfo() {
		 const data = await this.$http.request({
			 url: '/umsAccount/selectUmsHome',
			 method: 'POST'
		 });
		this.userinfo = data.data.data;
		setTimeout(() => {
			this.ifLoaddingShow = false;
		}, 300);	
		if (this.userinfo && this.userinfo.schoolName) {
			this.$cache.set('isAuthor', true, 1000 * 60 * 60 * 2);
		}
	 }
}