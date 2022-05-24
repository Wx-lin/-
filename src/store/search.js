import {reqGetSearchInfo} from "@/api";
//search模块的小仓库
// state是仓库
const state={
    searchList:{}
};
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
};
const actions ={
    async getSearchList({commit},params={}){
        // reqGetSearchInfo函数 调用的时候至少传递一个空对象
        // parasm形参 是当用户派发action的时候,第二个参数传递过来的至少是一个空对象
    let result= await reqGetSearchInfo(params)
    if(result.code==200){
        commit('GETSEARCHLIST',result.data);
    }
    }
};
// getters项目当中主要作用是简化仓库中的数据 
// 可以把我们将来在组件当中需要用的数据简化一下 将来在获取组件的时候方便了
const getters ={
    // 当前形参state,当前仓库的state 并非大仓库中的state
    // 假如网络没有网返回的是undefine
    goodsList(state){
        // 这样书写会有问题的
        return state.searchList.goodsList;
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}
