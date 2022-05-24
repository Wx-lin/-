//路由配置信息
import Register from '../pages/Register'
import Search from '../pages/Search'
import Login from '../pages/Login'
import Detail from  '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade  from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
export default  [
        {
            path:"/detail/:skuId",
            component:Detail,
            meta:{show:true}
        },               
        {
            path:"/home",
            // 路由懒加载
            component:()=>import('@/pages/Home'),
            meta:{show:true}
        },
        {
            path:"/register",
            component:Register,
            meta:{show:false},
        },
        {
            // :keyword
            path:"/search/:keyword?",
            component:Search,
            meta:{show:true},
            name:"search",
        },
        {
            path:"/login",
            component:Login,
            meta:{show:false}
        },
        {
            name:'addCartsuccess',
            path:"/addCartsuccess",
            component: AddCartSuccess,
            meta:{show:false}
        },
        {
            path:"/shopcart",
            component: ShopCart,
            meta:{show:false}
        },
        {
            path:"/trade",
            component: Trade,
            meta:{show:false},
            // 路由独享守卫
            beforeEnter: (to, from, next) => {
                        // 去交易页面必须是从购物车而来
                    if(from.path=='/shopcart'){
                        next()
                    }else{
                        // 其他的路由组件而来且停留在当前页
                        // false==from.path
                        next(false)
                    }
            }
        },
        {
            path:"/pay",
            component: Pay,
            meta:{show:false},
            beforeEnter: (to, from, next) => {
                if(from.path=='/trade'){
                    next()
                }else{
                    next(false)
                }
        }
        },
        {
            path:"/paysuccess",
            component:PaySuccess,
            meta:{show:false},
          
        },
        {
            path:"/center",
            component:Center,
            meta:{show:false},
            children:[
                {
                    path:"myorder",
                    component:myOrder,
                },
                {
                    path:"grouporder",
                    component:groupOrder
                },{
                    path:"/center",
                    // 路由重定向
                    redirect:'/center/myorder'

                }
            ]
        },
        // 重定向,在项目跑起来的时候当你访问/的时候立马让它定向到首页
        {
            path:'*',
            redirect:"/home"
        }
]