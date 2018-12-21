// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import Vuex from 'vuex'
import store from './store/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  post,
  fetch,
  patch,
  put
} from './utils/htttp'
import localstorage from './assets/js/localstorage'
Vue.use(ElementUI);
Vue.use(Vuex)
/* main.js中将其挂在到vue的原型属性上： */
Vue.prototype.$localstorage = localstorage
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.qs = qs //全局注册，使用方法为:this.qs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
