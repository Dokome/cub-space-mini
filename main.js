import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import store from './store'
import { imgHandle, routerHandle, interactive } from './utils/common.js';
import { http } from './utils/request.js';
import { set,get,remove,clear } from './utils/cache.js';
import login from './components/login/login.vue'


Vue.config.productionTip = false;
// 使用uView
Vue.use(uView);
// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);

//自定义工具
Vue.prototype.$api = { imgHandle, routerHandle, interactive };
Vue.prototype.$http = http;
Vue.prototype.$cache = {set, get, remove, clear};

App.mpType = 'app';
const app = new Vue({
    ...App,
		store
})
app.$mount();
