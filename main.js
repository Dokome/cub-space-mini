import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import store from './store'

Vue.config.productionTip = false
// 使用uView
Vue.use(uView);
// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare)

//自定义工具
import { interactFunc } from './utils/common.js';
Vue.prototype.$api = { interactFunc }

App.mpType = 'app'
const app = new Vue({
    ...App,
		store
})
app.$mount()
