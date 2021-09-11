export const __indexMethods = {
	tabsChange(index) {
		this.swiperCurrent = index;
	},
	// swiper-item左右移动，通知tabs的滑块跟随移动
	transition(e) {
		let dx = e.detail.dx;
		this.$refs.uTabs.setDx(dx);
	},
	// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
	// swiper滑动结束，分别设置tabs和swiper的状态
	animationfinish(e) {
		let current = e.detail.current;
		this.$refs.uTabs.setFinishCurrent(current);
		this.swiperCurrent = current;
		this.current = current;
	},
	//进入热榜页面
	enterHotList() {
		this.$api.routerHandle.goto('/pagesInteractive/hotList', this.current);
	},
	// 进入轮播图页面
	enterOutHtml(index) {
		const list = this.current === 1 ? this.bannerListR : this.bannerListS;
		this.$api.routerHandle.goto('/pagesInteractive/webView?src=' + list[index].jumpLink);
	},
	//进入动态详情
	enterDetail(id) {
		this.ifPublishShow = false;
		this.$api.routerHandle.goto(`/pagesInteractive/newsdetail?id=${id}`);
	},
	//动态发布
	isPublish(index) {
		this.ifPublishShow = true;
		uni.$emit('popUpChange', '');
	},
	// 拖动屏幕
	startHandleStart(e) {
		this.startPoint = e.changedTouches[0];
	},
	startHandleSEnd(e) {
		if ((this.old.scrollTop > (this.PageHeight * 0.4)) || this.old.scrollTop > 10) return;
		let endPoint = e.changedTouches[0];
		if (endPoint.clientY - this.startPoint.clientY > 20) {
			this.$set(this.old, 'scrollTop', 0);
			this.scrollTop = 0;
			uni.startPullDownRefresh();
		}
	},
	//滑到页面的最下部分
	scrollToBottom(index) {
		this.getNewsData({ noToken: true , tab: index });
	},
	// 返回顶部
	goBackToTop(e) {
		this.scrollTop = this.old.scrollTop;
		this.$nextTick(() => {
			this.scrollTop = 0;
			uni.startPullDownRefresh();
		})
	},
	scroll(e) {
		if(this.scrollTimmer) {
			return;
		}
		//限制请求.3s/次
		this.scrollTimmer = setTimeout(() => {
			this.$set(this.old, 'scrollTop', Math.floor(e.detail.scrollTop))
			this.scrollTimmer = null;
		}, 100)
	},
	scrolltoupper() {
		setTimeout(() => {
			this.$set(this.old, 'scrollTop', 0);
		}, 300);
	}
}
