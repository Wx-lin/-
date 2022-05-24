// Vue的插件一定是暴露了一个对象
let myPlugins={};



myPlugins.install=function(){
    console.log('调用');
}

export default myPlugins