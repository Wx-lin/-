//配置路由的地方
import Vue from 'vue';
import VueRouter  from 'vue-router';
import routes from './routers'
import store from '@/store'
//使用插件
Vue.use(VueRouter);

let originPush = VueRouter.prototype.push;
// let originReplace = VueRouter.prototype.replace;
// 配置路由
// 解决连续点击input搜索框按钮出现无效报错现象
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush .call(this, location, resolve, reject);
    } else {
     originPush.call(
        this,
        location,
        () => {},
        () => {}
      );
    }
  };
let router= new VueRouter({
    //配置路由
    // 必须叫routes
     routes,
    //  滚动行为
    
    scrollBehavior(){
      //  返回的y等于0代表滚动条在最上方，在每一次路由跳转时让滚动条在最上方
        return{y:0};
    }
})
// 全局守卫,前置守卫 (在路由跳转之前进行判断)
router.beforeEach( async (to,from,next)=>{
    // to 可以获取到你要跳转到哪个路由的信息
    //from 可以获取你从哪个路由来的信息
    // next 放行函数
  //  next();
  //  用户登录了才会有token  未登录一定不会有token
   let token=(store.state.user.token);
  //  不能通过一个空对象来判断有没有因为空对象永远为真 所以价格name,name是个字符串没有肯定为假
   let name=(store.state.user.userInfo.name)
  //  用户已经登录了
   if(token){
      // 用户已经登录了还想去login  休想！ 不能去直接停留在首页
      if(to.path=='/login'){
        next('/');
      }
      else{
        //  代表已经登录了而且去的不是login页面可能是serch可能是shopcat可能是detail
            // 如果用户名已用
            if(name){
              next()
            }else{
              // 如果没有用户信息  派发action让仓库存储信息在跳转
              //获取用户信息在首页进行展示
            try {
                  // 获取用户信息成功
                  await store.dispatch("getUserInfo");
                next();
            }catch (error){
              // token失效了 需要清除token让他回调登录页面  获取不到用户的信息重新登录
              // 1清除token
                await store.dispatch('userLogout');
                next('/login')
            }
            }
            next();
       }
   }
   else{
           // 没登录不能去交易相关的和支付相关的,不能去个人中心
         
         // 未登录暂时没有处理完毕先这个样子后期在处理
            let toPath=to.path;
                // 一举三得
            if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('center')!=-1){
              // 把未登录的时候而没去成的信息,存储到地址栏中[路由]
                next('/login?redirect='+toPath);
            }else{
                     // 如果没登陆去上面这些路由会跳到home页面
                  next();
            }
   }
})
export default router;