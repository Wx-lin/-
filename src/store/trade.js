import {reqAddresInfo,reqOrderInfo} from '@/api'
const state={
    // 存放用户地址信息
    Address:[],
    orderInfo:{},
}
const mutations={
    // 用户地址信息
    GETADDRESS(state,Address){
        state.Address=Address
    },
    // 商品清单     
    GETORDER(state,orderInfo){
        state.orderInfo=orderInfo
    }
}
const actions={
    //获取用户地址信息
   async getUserAddress({commit}){
     let result= await  reqAddresInfo();
            if(result.code==200){
                commit('GETADDRESS',result.data)
                return "ok"
            }else{
                return Promise.reject(new Error('falie'))
            }
    },
    // 获取商品清单
      async getOrderInfo({commit}){
        let result= await  reqOrderInfo();
           if(result.code==200){
               commit('GETORDER',result.data)
               return "ok"
           }else{
               return Promise.reject(new Error('falie'))
           }
        }
}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}