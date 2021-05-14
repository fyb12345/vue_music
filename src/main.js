import Vue from 'vue'
import App from './App.vue'
import "./common/stylus/index.styl"
import Router from "./router/index";
import attachFastClick from "fastclick"
import "./common/images/logo.png"

attachFastClick.attach(document.body)
Vue.config.productionTip = false
let basePath = 'http://localhost:1111/';
Vue.prototype.basePath = basePath;
new Vue({
  render: h => h(App),
  router:Router,
}).$mount('#app');