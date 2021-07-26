import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import store from './store'
import { imgHandle, routerHandle } from './utils/common.js';

Vue.config.productionTip = false
// 使用uView
Vue.use(uView);
// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare)

//自定义工具
Vue.prototype.$api = { imgHandle, routerHandle }

App.mpType = 'app'
const app = new Vue({
    ...App,
		store
})
app.$mount()
