<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="laeaveIndex" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件的委派结合编程式导航实现路由参数的跳转 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 遍历菜单一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级三级分类遍历 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <!-- 三级联动 -->
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入方式是把lodash全部功能函数引入

// 最好的引入方式就是按需加载
import throttle from "lodash/throttle";
export default {
  name: "TyepNav-",
  data() {
    return {
      //存储用户鼠标移上去哪个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  //组件挂载完毕 就可以向服务器发请求
  mounted() {
    //通知vuex发请求,获取数据存储到仓库中
    // this.$store.dispatch("categoryList");
    // 当前挂载完毕让show变成false
    // 如果不是Home路由组件将typenav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 右侧需要得是一个函数 当使用计算属性的时候右侧的函数会立即执行一次
      // 注入一个state 其实即为大仓库中的数据
      categoryList:(state) => state.home.categoryList,
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 一级分类鼠标移出事件的回调
    laeaveIndex() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
      this.currentIndex = -1;
    },
    goSearch(event) {
      this.$router.push("/search:keyword");
      // 最好的解决方案就是利用编程式导航加上事件委派
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category1Id = category2id;
        } else {
          query.category1Id = category3id;
        }
        // 判断：如果路由跳转时带有params参数捎带脚传过去
        if(this.$route.params){
          location.params=this.$route.params
        }
        // 整理参数
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    },
    // 当鼠标移入的时候让商品分类列表展示
    entershow() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27.3px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
        // .item:hover{
        //   background-color:skyblue;
        // }
      }
    }
    // 过渡动画的样式
    // 过渡动画进入的开始状态
    .sort-enter{
        height: 0;
    }
    // 过渡动画的结束状态
    .sort-enter-to{
        height: 461px;
    }
    //定义动画的间隔速率
    .sort-enter-active{
      transition: all 0.2s linear;
      overflow: hidden;
    }
    .sort-leave{
      height: 461px;
    }
    .sort-leave-active{
      transition: all 0.2s linear;
      overflow: hidden;
    }
    .sort-leave-to{
      height: 0;
    }
  }
}
</style>