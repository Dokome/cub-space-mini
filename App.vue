<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			//获取系统信息来更改头部的高度
			uni.getSystemInfo({
				success: (e) => {
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					Vue.prototype.ViewPart = custom.bottom + custom.top - e.statusBarHeight + e.statusBarHeight;
					// #endif		
					Vue.prototype.windowHeight = e.windowHeight;
				},
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss"; 
	@import "common/common.css"; 
	.page {
		background-color: #F5F5F5;
	}
	page {
		background-color: #F5F5F5;
	}
	/* #ifdef MP-WEIXIN || APP-PLUS */
		::-webkit-scrollbar {
			display: none;
			width: 0 !important;
			height: 0 !important;
			-webkit-appearance: none;
			background: transparent;
			color: transparent;
		}
	/* #endif */
</style> 