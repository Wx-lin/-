import Vue from "vue";
import Vuex from 'vuex';
// 需要使用插件一次
Vue.use(Vuex);
// 引入小仓库
import home  from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade  from "./trade";
// 对外暴露store类的一个实例
export default new Vuex.Store({
    // 实现vuex仓库模块开发存储数据 就是管理多个小仓库  关键字 modules
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
});