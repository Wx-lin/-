<template>
  <div>
      <!-- 三级联动的全局组件  三级联动已经注册为全局组件,因此不需要在引入-->
      <TypeNav/>
      <ListContainer/>
      <Recommend/>
      <Rank/>
      <Like/>
      <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
      <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
    name:'index-',
     components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
    mounted(){
      //派发action,获取floor组件的数据
      this.$store.dispatch("getFloorList")
     
    }
    ,
    computed:{
      ...mapState({
        floorList:(state)=>state.home.floorList 
      })
    }
}
</script>

<style>

</style>