import {reqGoodsInfo,reqAddOrUpdateShopcart} from "@/api";
// 封装游客身份的模块uuid 生成一个随机的字符串 注意只要生成一次就不能在改变了
import {getUUID} from  '../utils/uuid_token';
const state={
    goodInfo:{},
    // 游客的临时身份
    uuid_token:getUUID()
};
const mutations={
    GETGOODINFO(state,goodInfo){
            state.goodInfo=goodInfo;
    },
};
const actions={
    // 获取产品信息的action
    async getGoodInfo({commit},skuId){
            let result =await reqGoodsInfo(skuId);
            if(result.code==200){
                commit('GETGOODINFO',result.data);
            }
    },
    // 将产品添加到购物车中
    // 当一个函数加入了async和await返回的结果一定是一个promise
   // eslint-disable-next-line no-unused-vars
   async addOrUpdateShopCart({commit},{skuId,skuNum}){
    //    加入购物车返回结果
    // 注意加入购物车发请求 前台将参数带给服务器,服务器写入数据库成功并没有返回其他的数据 只是返回code==200 代表操作成功
        let result=await reqAddOrUpdateShopcart(skuId,skuNum);
        if(result.code==200){
            return "ok"
        }else{
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'));
        }
        // console.log('调用addOrUpdateShopCart');
    }
};
// 简化数据而生
const getters={
    // 路径导航简化的数据
    categoryView(state){
        // 比如state.goodInfo初始状态是一个空对象的categoryView属性值时undefined
        // 至少是一个空对象
        return state.goodInfo.categoryView||{};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    // 简化产品信息的数据
    spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList||[]
    }
};
export default{
    state,
    actions,
    mutations,
    getters
};