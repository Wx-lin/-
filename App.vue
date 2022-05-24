<template>
  <div>
  <Header></Header>
  <!-- 路由组件出口的地方 -->
  <router-view></router-view>
  <!-- 在home或者是search显示的 在登入或者注册的时候是隐藏的-->

  <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
    name:'app',
    components:{
      Header,
      Footer
    },
    mounted(){
         this.$store.dispatch("getCategoryList");  
        //  this.$store.dispatch('getBannerList');
        
    }
}
</script> 

<style scoped>

</style>