export const __chat = {
	tabsChange(index) {
		this.swiperCurrent = index;
		if (index === 1) {
			this.tim.setMessageRead({conversationID: 'C2Cadministrator'});
			this.unreadCount -= this.unreadCountNotice;
			this.unreadCount = this.unreadCount >= 0 ? this.unreadCount : 0;
			this.unreadCountNotice = 0;
			this.$store.commit('chatNewsUnread', this.unreadCount);
		}
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
	// 获取聊天列表
	getConverSationList() {
		this.unreadCount = 0;
		let tim = this.tim;
		let promise = tim.getConversationList();
		promise.then((imResponse) => {
		  const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
			for (let conversation of conversationList) {
				this.unreadCount += conversation.unreadCount;
				if (conversation.conversationID === "C2Cadministrator") {
					this.unreadCountNotice += conversation.unreadCount;
					continue;
				}
				this.chatList.set(conversation.conversationID, conversation); 
			}
			this.$store.commit('chatNewsUnread', this.unreadCount);
			this.$forceUpdate();
			setTimeout(() => {
				this.ifLoaddingShow = false;
			}, 500)
		}).catch((imError) => {
		  console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
		});
	}
}