//对于axios进行二次封装
import axios from 'axios';
// 引入进度条
import nprogress  from 'nprogress';
// 引入进度条的样式
import "nprogress/nprogress.css";
// start 进度条开始 done 代表进度条结束
// console.log(nprogress);
//利用axios对象的方法create 去创建一个axios实例
const requests=axios.create({
    //配置对象
    // 基础路径 发请求的时候 路径当中会自动加入api 不用自己书写了
    baseURL:"/mock",
    // 代表请求超时的时间
    timeout:5000
});  
// 请求拦截器: 在发请求之前,请求拦截器可以检测到 可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config 是一个配置对象,里面有一个属性很重要 headers请求头
    // 进度条开始动
    nprogress.start();
    return config;
});
// 响应拦截器
requests.interceptors.response.use(
    (res)=>{
    //服务器成功的回调函数 服务器响应数据回来以后 响应拦截器可以监测到 可以做一些事情
    // 进度条结束
    nprogress.done();
    return res.data;
},
()=>{
    // 服务器响应失败的回调函数
   alert("服务器响应失败")
}
);
// 对外暴露axios
export default requests;