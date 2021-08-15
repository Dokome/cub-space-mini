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
		this.$api.routerHandle.goto('/pagesInteractive/hotList', JSON.parse(this.current));
	},
	//进入动态详情
	enterDetail(id) {
		this.ifPublishShow = false;
		this.$api.routerHandle.goto(`/pagesInteractive/newsdetail?id=${id}`);
	},
	//动态发布
	isPublish(index) {
		if (index === 2) {
			this.ifPublishShow = true;
			uni.$emit('popUpChange', '');
		}
	},
	// 拖动屏幕
	startHandle(e) {
		uni.startPullDownRefresh({
			success: () => {
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 1000)
			}
		})
	},
	//滑到页面的最下部分
	scrollToBottom(index) {
		this.getNewsData({ noToken: true , tab: index });
	},
	// 返回顶部
	goBackToTop(e) {
		this.scrollTop = this.old.scrollTop;
		this.$nextTick(function() {
		    this.scrollTop = 0;
		});
		if(this.gotopTimmer) {
			return;
		}
		//限制请求1s/次
		this.gotopTimmer = setTimeout(() => {
			this.getNewsData({ noToken: true, tab: this.current, isGetNew: true });
			this.timmer = null;
		}, 1000)
	},
	scroll(e) {
		if(this.scrollTimmer) {
			return;
		}
		//限制请求.5s/次
		this.scrollTimmer = setTimeout(() => {
			this.old.scrollTop = Math.floor(e.detail.scrollTop);
			this.scrollTimmer = null;
		}, 2000)
	}
}
