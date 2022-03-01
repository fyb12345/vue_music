import Vue from 'vue'
import App from './App.vue'
import "./common/stylus/index.styl"
import Router from "./router/index";
import attachFastClick from "fastclick"
import "./common/images/logo.png"
import store from "./store/index"

attachFastClick.attach(document.body)
Vue.config.productionTip = false
let basePath = 'http://localhost:1111/';
// let basePath = 'http://100.168.6.166:1111/';

let pageData = {
  showCount: 15,//每页显示记录数
  totalPage: 1,  //总页数
  totalResult: 0, //总记录数
  currentPage: 0, //当前页
};
Vue.prototype.basePath = basePath;
Vue.prototype.pageData =pageData
new Vue({
  render: h => h(App),
  router:Router,
  store
}).$mount('#app');