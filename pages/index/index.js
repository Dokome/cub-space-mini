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
		this.$api.routerHandle.goto('/pagesInteractive/hotList');
	},
	//进入动态详情
	enterDetail() {
		this.ifPublishShow = false;

		this.$api.routerHandle.goto('/pagesInteractive/newsdetail');
	},
	//动态发布
	isPublish(index) {
		if (index === 2) {
			this.ifPublishShow = true;
			uni.$emit('popUpChange', '');
		}
	}
}
