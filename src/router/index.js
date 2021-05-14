import Vue from "vue";
import VueRouter from  "vue-router"
import rank from "../components/rank/rank";
import tab from  "../components/tab/tab"
import search from "../components/search/search";
import singer from "../components/singer/singer";
import recommend from "../components/recommend/recommend";
import disc from "../components/disc/disc";

Vue.use(VueRouter);// 引入路由中间件


export default new VueRouter({
    routes:[{
        path:"/",
        redirect:"/recommend",
    },{
        path:"/rank",
        component:rank,
    },{
        path:"/tab",
        component:tab,
    },{
        path:"/search",
        component:search,
    },{
        path:"/singer",
        component:singer,
    },{
        path:"/recommend",
        component:recommend,
        children:[
            {
                path: ':id',
                component: disc
            }
        ]
    }]
})