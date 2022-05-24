<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <!-- 面包蟹 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>        
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removecaregoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removekeyword">×</i></li>
            <!-- 品牌的面包屑展示 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removecrademark">×</i></li>
            <!-- 各项配置的面包屑展示 -->
            <!-- 这个是一个数组不能用v-if -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeattrValue(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->  
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isone}" @click="changeOrder('1')">
                  <a href="#">综合<span v-show="isone"  class="iconfont" :class="{'icon-long-arrow-up-copy':isAsc,'icon-long-arrow-down':isDesc}"></span></a>
                </li>
                <li :class="{active:istwo}" @click="changeOrder('2')">
                  <a href="#">价格<span v-show="istwo"  class="iconfont" :class="{'icon-long-arrow-up-copy':isAsc,'icon-long-arrow-down':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳转时切记不要忘了带id params参数 -->
                   <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg">
                   </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="good.title">
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
            
          </div>
          <!-- 分页器 -->
          <!-- pageNo代表当前是第几页 -->  
          <!-- pageSize代表一页有几条数据-->
          <!-- total代笔一共有多少条数据-->
          <!-- continuesd代表连续的页码数-->
          <!-- 这里数据将来需要替换为search的数据-->
         <Pagination- :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters,mapState} from 'vuex'
  export default {
    name: 'Search-',
    components: {
      SearchSelector
    },
    data() {
      return {
        // 带给服务器的参数
        searchParams:{
          // 三级分类的id
            "category3Id": "",
            // 一级分类的id
            "category1Id": "",
            // 二级分类的id
            "category2Id": "",
            // 分类的名字
            "categoryName": "",
            // 关键字
            "keyword": "",
            // 排序  // 综合排序降序初始值是降序
            "order": "1:desc",
            // 分页器参数  代表的当前是第几页
            "pageNo": 1,
            // 代表的每一页展示数据的个数
            "pageSize": 20,
            // 平台售卖属性的操作
            "props": [],
            // 品牌
            "trademark": ""
        }
      }
    },
    // 在组件挂载完毕之前执行一次 mounted之前
    beforeMount(){
          // 在发送请求之前就会把接口的参数整理好(在服务器发送之前把参数整理好,服务器就会返回查询的数据)
         Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    mounted(){
      // 在发送请求之前带给服务器参数 searchparams参数发生变化
    this.getData()
    },
    methods:{
      // 向服务器发送请求获取search模块的数据根据参数不同返回不同模块的数据
      getData(){
        // 把这次请求封装为一个函数需要时直接调用这个函数
          // 测试接口返回的数据格式
      this.$store.dispatch('getSearchList',this.searchParams);
      },
      removecaregoryName(){
        // 只是把带给服务器的参数置空了但是还有像服务器发送请求
        // 带给服务器的参数都是可有可无的,如果属性值为空的字符串还是会把相应的字段带给服务器
        // 但是你把相应的字段变成undefined 当前字段就不会带给服务器
        this.searchParams.categoryName=undefined;
        this.searchParams.category1Id= undefined;
        this.searchParams.category2Id= undefined;
        this.searchParams.category3Id= undefined;
        this.getData()
        // 地址栏数组也需要进行更改,进行路由跳转
        if(this.$route.params){
          this.$router.push({name:"search",params:this.$route.params})
        }
      },
      // 删除关键字
      removekeyword(){
        // 第一步给服务器带过来的keyword变空
        this.searchParams.keyword=undefined
        // 再次发请求
        this.getData()
        // 通知组件header清除关键字
        this.$bus.$emit("clear");
        //需要进行路由的跳转
      if(this.$route.query){
        this.$router.push({name:"search",query:this.$route.query})
      }
      },
      // 自定义事件的回调
      trademarkInfo(trademark){
        // 整理品牌字段参数
          // console.log('我是父组件',trademark);
          this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`;
          this.getData();
      },
      removecrademark(){
        // 删除品牌的信息
        this.searchParams.trademark=undefined;
        this.getData();
      },
      //收集平台属性地方的回调(自定义事件)
      attrInfo(attr,attrValue){
          // 参数的格式整理好
          let props= `${attr.attrId}:${attrValue}:${attr.attrName}`
          // 把子组件传递过来的数据添加到props数组里面 所以用push
          // if的里只有一行代码可以省略大花括号
            if(this.searchParams.props.indexOf(props)==-1)this.searchParams.props.push(props);
          // 再次发送请求
          this.getData();
          
      },
      // 删除配置参数的面包屑
      removeattrValue(index){
        // 删除数组中你当前点击的那个元素的面包屑
        this.searchParams.props.pop(index)
        // 删除完毕后重新发请求
        this.getData();
      },
      // 排序的操作 chaheOrder
      changeOrder(flag){
          //falag 它是一个形参代表用户点击的是综合(1)还是价格(2)
         // eslint-disable-next-line no-unused-vars
         let oringinOder =this.searchParams.order;
        //  这里获取到的是最开始的状态
         let originFlag =this.searchParams.order.split(":")[0];
         let orginSort =this.searchParams.order.split(":")[1];
        //  准备一个新的order的属性值
        let newOrder ='';
        //  这个语句我能确定点击的一定是综合
         if(flag==originFlag){
              newOrder=`${originFlag}:${orginSort=="desc"?"asc":"desc"}`
              console.log(newOrder);
         }else{
           newOrder=`${flag}:${'desc'}`;
         }
         this.searchParams.order=newOrder;
         this.getData();
      },
      // 这是自定义事件的回调函数获取当前是第几页
      getPageNo(pageNo){
        this.searchParams.pageNo=pageNo;
        this.getData();
      }
    },

    computed:{
      // .mapGetters里面的写法传递的数组因为getters计算是没有划分模块的
      ...mapGetters(['goodsList']),
      isone(){
           return this.searchParams.order.indexOf('1')!= -1

      },
      istwo(){
           return this.searchParams.order.indexOf('2')!= -1
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc')!= -1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc')!= -1
      },
      // 获取search模块展示的产品一共多少数据
      ...mapState({
        total:state=>state.search.searchList.total
      })
    },
    // 数据监听,监听组件实例身上的属性的属性值的变化
    watch:{
          // eslint-disable-next-line no-unused-vars
          $route(newValue,oldValue){
                Object.assign(this.searchParams,this.$route.query,this.$route.params)
                // console.log(this.searchParams);
                // 再次发起ajax请求
                this.getData()
                // 每一次请求完毕,应该把相应的1,2,3id置空,让它接受下一次对应的1,2,3id
                this.searchParams.category1Id=undefined
                this.searchParams.category2Id=undefined
                this.searchParams.category3Id=undefined
          }
    }
  }
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>