<template>
  <div class="swiper-container" id="floor1Swiper" ref="cur">
    <div class="swiper-wrapper">
      <!-- 实现轮播图效果 -->
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" alt="" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "Carsousel-",
  props:['list'],
  watch:{
  list:{
    // 立即监听一次
    // 为什么watch监听不到list因为这个数据从来没有发生过变化 父亲给的时候就时一个不会改变的对象
    immediate:true,
    handler(){
      // 监听的数据已经有了,但是v-for动态渲染的结构还是没有办法确定的,因此还是需要用到nextTick
      this.$nextTick(()=>{
        
          new Swiper(
            this.$refs.cur,
            {
            loop: true, // 循环模式选项
            // 如果需要分页器 
            //自动播放代码
            autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
            },
            pagination: {
              clickable: true,
              el: ".swiper-pagination",
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要滚动条
          });
      })
    }
  }
}
};
</script>

<style>
</style>