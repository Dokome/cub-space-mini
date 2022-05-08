import Vue from 'vue';
import Vuex from 'vuex';
import { get } from '../utils/cache.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
		//tabbar开始
		show: true,
		bgColor: '#ffffff',
		borderTop: false,
		list: [
			// {
			// 	iconPath: "/static/tabbar/chat.png",
			// 	selectedIconPath: "/static/tabbar/chat-fill.png",
			// 	text: '消息',
			// 	count: 0,
			// 	isDot: false,
			// 	customIcon: false,
			// 	pagePath: "/pages/chat/chat"
			// },
			{
				iconPath: "/static/tabbar/meet.png",
				selectedIconPath: "/static/tabbar/meet-fill.png",
				text: '遇见',
				customIcon: false,
				pagePath: "/pages/meet/meet"
			},
			// {
			// 	iconPath: "/static/tabbar/publish.png",
			// 	selectedIconPath: "/static/tabbar/publish.png",
			// 	text: '发布',
			// 	midButton: true,
			// 	customIcon: false,
			// 	// pagePath: "/pages/publish/publish"
			// },
			{
				iconPath: "/static/tabbar/index.png",
				selectedIconPath: "/static/tabbar/index-fill.png",
				text: '广场',
				customIcon: false,
				pagePath: "/pages/index/index"
			},
			{
				iconPath: "/static/tabbar/home.png",
				selectedIconPath: "/static/tabbar/home-fill.png",
				text: '我的',
				// count: 23,
				isDot: false,
				customIcon: false,
				pagePath: "/pages/home/home"
			},
		],
		midButton: false,
		inactiveColor: '#909399',
		activeColor: '#5098FF',
		//tabbar结束
  },
  mutations: {
		chatNewsUnread(state, count) {
			state.list[0].count = count;
		}
	},
  actions: {
		
	},
  getters: {
		
  },
});