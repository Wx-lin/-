//登录和注册的模块  他俩用的同一个模块
import {reqGetCode,reqUserLogin,reqUserRegister,reqUserInfo,reqLogout} from '@/api'
// 引入封装好的本地存储函数
import {setToken,getToken,removeToken} from '@/utils/token';
const state={
    getcode:'',
    //获取本地存储里的token
    token:getToken(),
    userInfo:{}
}
const getters={}
const actions={
    // 获取验证码
   async getCode({commit},phone){
    //获取验证码的这个接口,把验证码返回,但是正常情况下应该是后台把验证码发到用户的手机上 为了省钱就没弄
      let result= await reqGetCode(phone);
        if(result.code==200){
            commit('GETCODE',result.data) 
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户的注册
  // eslint-disable-next-line no-unused-vars
  async  userRegister({commit},user){
   let result=await reqUserRegister(user);
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //登录业务
       async reqUserLogin({commit},data){
            let result = await reqUserLogin(data);
            // 服务器下发的token是某一个用户的唯一标识符跟uuid很像
            // 将来经常通关token找服务器要用户的信息进行展示
            if(result.code==200){
                // 用户已经登录成功且已经获取到了token
                    commit('USERLOGIN',result.data.token)
                    // 持久化存储token
                    setToken(result.data.token)
                    return 'ok'
            }else{
               return Promise.reject(new Error('faile'));
            }
    },
    // 获取用户信息
         async getUserInfo({commit}){
           let result=await reqUserInfo();
            if(result.code==200){
                // 提交用户的信息
                commit('GETUSERINFO',result.data);
                return "ok"
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
    //退出登录
    async userLogout({commit}){
        let result= await reqLogout();
            // 只是向服务器发送一次请求,通知服务器清除token
            if(result.code==200){
                commit('CLEAR');
                return "ok"
            }else{
                return Promise.reject(new Error('faile'));
            }
        
    }
}
const mutations={
    GETCODE(state,getcode){
       state.getcode=getcode;
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    // 清除自己本地的数据
    CLEAR(state){
        // 把仓库相关的用户信息清空同时也把本地存储的数据清空
        state.token=''
        state.userInfo=''
        removeToken();
    }
}
export default{
    state,
    actions,
    mutations,
    getters
}