/* eslint-disable no-unused-vars */
import { reqCartList,reqDeleteCarById,reqUpdateCheckedByid} from "@/api"
const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const getters={
    // 简化数据
    cartList(state){
         return state.cartList[0]||{}
    },
    // 计算出来的购物车属性
    // cartInfoList(state){
    //     return state.
    // }
}
const actions={
    // 获取购物车列的数据
  async  getCartList({commit}){
       let result= await reqCartList();
        // 测试是否能获取你购物车的数据      
        // 发请求的时候是获取不到购物车里的数据的因为服务器不知道你是谁 临时解决用uuid 
        if(result.code==200){
            commit("GETCARTLIST",result.data)
        }
    },
    // 删除购物车某一个产品
       async deleteCartListBySkuId({commit},skuId){
              let result=await reqDeleteCarById(skuId);
              if(result.code==200){
                  return 'ok'
              }else{
                  return Promise.reject(new Error('faile'));
              }
        },
        //修改购物车某一个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
    // 删除全部勾选产品
    deleteAllCheckedCart({dispatch,getters}){
        //context 可以理解为小仓库里面包含很多东西 它是一个上下文对象
        // committ(提交mutations修改state) getters 计算简写属性 dispatch {派发action} state {当前仓库数据}
        // 获取购物车中全部的产品(是一个数组)
        // 这里foreach执行了五次 因为carInfoList的长度是5
        let PromiseAll=[];
        getters.cartList.cartInfoList.forEach(item =>{
            // 用三元表达式 当ischecked的值为1的时候代表选中的在删除否则什么也不干
         let promise=  item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'';
        // prpmise.all([p1,p2,p3]) 数组里每一个都是一个promise对象 如果有一个promise失败都失败 如果都成功返回的是成功4
        PromiseAll.push(promise);
        });
        //只要全部的p1或者p2都成功返回的才是成功 如果有一个失败返回的即为失败的失败
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        //数组
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
          let promise = dispatch("updateCheckedById", {
            skuId: item.skuId,
            isChecked,
          });
          promiseAll.push(promise);
        });
        //最终返回结果
        return Promise.all(promiseAll);
      },
}
export default{
    state,
    mutations,
    actions,
    getters
}