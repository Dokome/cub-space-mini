import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import store from './store'

Vue.config.productionTip = false
// 使用uView
Vue.use(uView);
//
App.mpType = 'app'
const app = new Vue({
    ...App,
		store
})
app.$mount()
