import Vue from 'vue'
import App from '../App.vue'
// 三级联动组件注册为全局组件
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
// 按需引入elemnetui插件
import {Button,MessageBox} from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// Element注册组件的时候也可以挂载到原型上当然也得先引入
// 注册全局组件
Vue.component(Button.name,Button);
// 第一个参数：全局组件的名字第二个参数:哪一个组件
Vue.component('TypeNav',TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.config.productionTip = false
//引入路由
import router from './router'
// 引入仓库
import store from './store'
//引入mokeServer.js
import '@/mock/mockServe' 
// 引入swiper的样式大家都能使用
import "swiper/css/swiper.css"
//统一接收api文件夹里面的全部请求的函数
// * as 是统一引入的意思  
import * as API from '@/api';
// 引入懒加载插件
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/1.gif'
// 引入自定义插件
// import myPlugins from '@/plugins/myPlugins'
// 使用插件
// 引入表单校验插件
import '@/plugins/validate'
// Vue.use(myPlugins)
Vue.use(VueLazyload,{
  // 懒加载默认的图片
   loading:atm,
});
new Vue({
  render: h => h(App),
  // 配置注册全局事件总线           
  beforeCreate(){
      Vue.prototype.$bus=this;
      // 所有接口都接收到了而且挂载到了原型对象身上
      Vue.prototype.$API=API;
  },
  // 注册路由 底下的写法是KV一致省略v
  router,
  // 注册仓库vuex中的
  store
}).$mount('#app')

