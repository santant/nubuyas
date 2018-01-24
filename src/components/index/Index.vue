<template>
  <div id="index" style="width: 100%;height:100%;">
    <!--<div>
      <p class="class_4">404</p>
      <p class="class_msg">您请求的页面不存在!!</p>
    </div>-->
  </div>

</template>

<script>
  import Api from '@/api.js'
  import {Swipe, SwipeItem, Indicator} from 'mint-ui';

  export default {
    data() {
      return {
        indexImg: [],
//				isShow:false
      }
    },
    methods: {
      fetchData() {
        //alert(this.$route.query.userDbId)
        sessionStorage.setItem('urlQuery', JSON.stringify(this.$route.query))
        if (this.$route.query.userDbId) {
          localStorage.setItem('userDbId', this.$route.query.userDbId)
        }
        if (this.$route.query.query_tag) { //跳转到哪里去
          var query_tag = this.$route.query.query_tag
          switch (query_tag) {
            case "cart":
              this.$router.push({path: "/cart", query: {}})
              break;
            case "order":
              this.$router.push({path: "/orderList", query: {}})
              break;
            case "coupon":
              this.$router.push({path: "/CouponExchange", query: {}})
              break;
            case "haibao":
              this.$router.push({path: "/hbMsg", query: {"category": "haibao"}})
              break;
            case "xiaoshiguang":
              this.$router.push({path: "/bbsMsg", query: {"category": "xiaoshiguang"}})
              break;
            case "shiguangji":
              this.$router.push({path: "/huaceMsg", query: {"category": "shiguangji"}})
              break;
            case "taili":
              this.$router.push({path: "/tlMsg", query: {"category": "taili"}})
              break;
            case "kuanghua":
              this.$router.push({path: "/hbMsg", query: {"category": "kuanghua"}})
              break;
            default:

              break;
          }
        }
      }
    },
    mounted() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      if (JSON.stringify(this.$route.query) != "{}") {
        this.fetchData();
      }
      //首页请求的数据
      Api.Index.indexImg().then(res => {
        //				var obj = {
        //					client:'mobile',
        //					imgUrl:'http://image2.artup.com/resources/static/pc/images/gqfhtz.jpg'
        //				}
        //				res.data.data.unshift(obj)
        this.indexImg = res.data.data;
        console.log(this.indexImg)
        Indicator.close();
      })
    },
    watch: {
      $route: 'fetchData'
    }
  }
</script>

<style>
  #index .class_4 {
    text-align: center;
    line-height: 96px;
    font-size: 3rem;
    color: #a1a1a1;
    margin-top: 2rem;
  }

  #index .class_msg {
    line-height: 2rem;
    font-size: 1rem;
    text-align: center;
    color: #666;
  }
</style>
