<template>
  <div id="user">
    <mt-header title="个人中心">
      <router-link to="" v-tap="{ methods:linkGo }" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="" slot="right"></mt-button>
    </mt-header>
    <div class="userList">
      <ul>
        <li>
          <router-link to="cart">
            <i class="icon iconfont">&#xe60d;</i>
            <p>购物车</p>
            <i class="icon iconfont next">&#xe65f;</i>
          </router-link>
        </li>
        <li>
          <router-link to="orderList">
            <i class="icon iconfont">&#xe6da;</i>
            <p>订单列表</p>
            <i class="icon iconfont next">&#xe65f;</i>
          </router-link>
        </li>
        <li>
          <router-link to="worklist">
            <i class="icon iconfont">&#xe61a;</i>
            <p>我的作品</p>
            <i class="icon iconfont next">&#xe65f;</i>
          </router-link>
        </li>
        <li>
          <router-link to="material">
            <i class="icon iconfont">&#xe60c;</i>
            <p>我的素材</p>
            <i class="icon iconfont next">&#xe65f;</i>
          </router-link>
        </li>

      </ul>
      <ul>
        <li>
          <router-link to="CouponExchange">
            <i class="icon iconfont">&#xe62b;</i>
            <p>优惠劵</p>
            <p class="coun">{{couponNumber}}张</p>
            <i class="icon iconfont next">&#xe65f;</i>
          </router-link>
        </li>
        <li>
          <router-link to="GiftCard">
            <i class="icon iconfont">&#xe616;</i>
            <p>礼品卡</p>
            <p class="coun">¥{{giftcardBalance}}</p>
            <i class="icon iconfont next">&#xe65f;</i>
          </router-link>
        </li>
        <li>
          <router-link to="Address?dzgl=grzx">
            <i class="icon iconfont">&#xe60e;</i>
            <p>地址管理</p>
            <i class="icon iconfont next">&#xe65f;</i>
          </router-link>
        </li>
      </ul>
      <ul>
        <li>
          <a href="tel:400-6690-999">
            <div>
              <i class="icon iconfont">&#xe798;</i>
              <p>客服电话</p>
              <a style="color: #333; float: left; margin-left: 0.88rem;font-size: 0.77rem;"
                 class="coun">400-6690-999</a>
              <!--<p>400-6690-999</p>-->
            </div>
          </a>
        </li>
        <li>
          <div v-tap="{methods:clearStore}">
            <i class="icon iconfont">&#xe66d;</i>
            <p>清除缓存</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Api from '@/api.js'
  import {Swipe, SwipeItem, Indicator, Toast} from 'mint-ui';

  export default {
    data() {
      return {
        couponNumber: 0,
        giftcardBalance: 0
      }
    },
    methods: {
      linkGo() {
        //this.vurRouterGo();
        location.href = ""
      },
      clearStore() {
        Indicator.open({text: '跳转中...', spinnerType: 'fading-circle'});
        sessionStorage.clear()
        localStorage.clear()
        Api.user.getUserDbId().then(res => {
          Indicator.close()
          //请求微信授权
          //window.location.href=res.data.authorizeCodeUrl
          Toast('清除成功')
        }, err => {
          Indicator.close()

        })
      }
    },
    mounted() {
      var jsons = {
        passId: localStorage.getItem("userDbId"),
        pageNo: 1,
        pageSize: 1000
      }
      Api.counpon.counponList(jsons).then(res => {
        if (res.data.status == "OK") {
          let arr = []
          for (var i = 0; i < res.data.data.coupons.length; i++) {
            if (res.data.data.coupons[i].viewStatus === 'ok') {
              arr.push(res.data.data.coupons[i])
            }
          }
          this.couponNumber = arr.length
        }
        Indicator.close()
      }, err => {
        Indicator.close()
        //	console.log(this.dataList)
      })
      Api.getUserInfo.getUserInfo({passId: localStorage.getItem("userDbId")}).then(res => {
        this.giftcardBalance = res.data.data.giftcardBalance
        console.log(res)
      }, err => {
        Toast('网络异常')
      })
    }
  }
</script>

<style>

</style>
