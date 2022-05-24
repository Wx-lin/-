// 当前模块 所有的api接口统一的管理
import requests  from "./Ajax";
import mockRequests from "./mockAjax";
//三级联动的接口
// /api/product/getBaseCategoryList  get请求 参数无

// 对外暴露因为别的模块要用
//发请求 axios发请求返回的结果是promise对象
// export const reqCategoryList= ()=>requests({url:'/product/getBaseCategoryList',method:'get'})
export const reqgetCategoryList = () =>requests.get(`/product/getBaseCategoryList`);

// 获取banner home组件实现轮播图效果 切记不能用以前的接口
export const reqGetBannerList = () => mockRequests.get("/banner");
//获取floor的数据
export const reqFloorList = () => mockRequests.get("/floor");

// 获取搜索模块的数据  请求地址 /api/list  方式时是post  参数 十个
// 当前函数需要传递接收外部传递的参数
// 当前的接口获取服务器搜索模块的数据时,给服务器传递一个默认参数(至少是一个空对象) 不然捞不到数据
export const reqGetSearchInfo =(params)=>requests({url:'/list',method:"post",data:params});


//获取产品信息详情的接口  地址 /api/item/{ skuId }  方式GET  传参前面要加$
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:"get"});

//将产品添加到购物车中或者更新某一个产品的个数  /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopcart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
//获取购物车列表的数据的接口 请求地址是 URL:/api/cart/cartList get请求 无参数
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'});

// 删除购物车产品的接口  /api/cart/deleteCart/{skuId} DELETE请求
export const reqDeleteCarById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'DELETE'})

//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get 
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

//获取验证码
//URL:/api/user/passport/sendCode/{phone}   get请求  参数  phone
export const reqGetCode =(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

// 用户注册
//URL:/api/user/passport/register
export const reqUserRegister=(data)=>requests({url:`/user/passport/register`,data,method:'post'});

// 用户登录
//URL:/api/user/passport/login  post请求 带俩个参数 phone和password
export const reqUserLogin=(data)=>requests({url:`/user/passport/login`,data,method:'post'})

//获取用户的信息需要带着用户的token向服务器要用户信息
//URL:/api/user/passport/auth/getUserInfo  get请求
export const reqUserInfo=()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'})

// 用户退出登录
//URL:/api/user/passport/logout
export const reqLogout=()=>requests({url:`/user/passport/logout`,method:'get'});

// 获取用户地址信息
// URL:/api/user/userAddress/auth/findUserAddressList
export const reqAddresInfo =()=>requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'});

// 获取订单交易页信息
// URL:/api/order/auth/trade
export const reqOrderInfo =()=>requests({url:`/order/auth/trade`,method:'get'});

//提交订单信息
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}     POST
export const reqSunmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

//获取用户支付的信息
// URL:/api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取用户支付订单状态
// URL:/api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取我的订单
// URL:/api/order/auth/{page}/{limit}  GET请求
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})

