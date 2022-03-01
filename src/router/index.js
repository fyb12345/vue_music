import Vue from "vue";
import VueRouter from "vue-router"
import rank from "../components/rank/rank";
import tab from "../components/tab/tab"
import search from "../components/search/search";
import singer from "../components/singer/singer";
import recommend from "../components/recommend/recommend";
import disc from "../components/disc/disc";
import singerDetails from "../components/singer-details/singer-details"
import TopList from "../components/top-list/top-list"

Vue.use(VueRouter);// 引入路由中间件


export default new VueRouter({
  routes: [{
    path: "/",
  }, {
    path: "/rank",
    component: rank,
      children:[
          {
              path:":id",
              component:TopList
          }
      ]
  }, {
    path: "/tab",
    component: tab,
  }, {
    path: "/search",
    component: search,
  }, {
    path: "/singer",
    component: singer,
    children: [
      {
        path: ':id',//利用动态的属性路由
        component: singerDetails
      }
    ]
  }, {
    path: "/recommend",
    component: recommend,
    children: [
      {
        path: ':id',
        component: disc
      }
    ]
  }]
})