<template>
  <div id="payOrder">
    <!--头-->
    <mt-header title="确认订单">
      <router-link to="" v-tap="{methods:linkGo}" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="" slot="right"></mt-button>
    </mt-header>
    <div v-bind:hidden="addresBool" class="address" v-tap="{methods:addAddress}">
      <span>+</span>&nbsp;请添加收货地址
    </div>
    <div class="addressContet" v-bind:hidden="!addresBool" v-tap="{methods:updataAddress}">
      <ul>
        <li><span>收件人姓名</span><span>{{addressData.name | subStr}}({{addressData.mobile}})</span></li>
        <li>{{addressData.provinceCityDistricts}}{{addressData.address | splitAddress}}</li>
        <i class="icon iconfont">&#xe65f;</i>
      </ul>
    </div>
    <div class="content">
      <div class="contentList clearfix">
        <ul class="clearfix">
          <li class="clearfix" v-for="(itmes,index) in dataList">
            <div class="leftBox clearfix">
              <img :src="itmes.thumbnailImageUrl"/>
            </div>
            <div class="rightBox">
              <ul>
                <li>{{itmes.sku | splitSku}}</li>
                <li>{{itmes.sku | splitSkuLast}}</li>
                <li>{{itmes.createdDt}}</li>
                <li><span>¥{{itmes.price}}</span><span>×{{itmes.num}}</span></li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="zffs">
          <ul>
            <li>
              <span>支付方式</span>
              <!--<span><i class="icon iconfont">&#xe605;</i>微信支付</span>-->
              <span>努比亚支付</span>
            </li>
            <li>
              <span>商品金额</span>
              <span id="total">￥{{total | toFixedTwo}}</span>
            </li>
            <li class="useCard">
              <p style="border: none;width: 98%;" v-tap='{methods:selectCards,index:1}'>优惠劵 <span class=""><i class="icon iconfont">&#xe639;</i></span>
              </p>
              <!--<p v-tap='{methods:selectCards,index:2}'>礼品卡<span><i class="icon iconfont">&#xe639;</i></span></p>-->
            </li>
            <li v-tap="{methods:useCoupon}" v-show="userCouponCode">
              <span>优惠券</span>
              <span style="color: #ff0000;">-￥{{yhj}}<i class="icon iconfont" style="top: 0.1rem;color: #bebebe;">&#xe65f;</i></span>
            </li>
            <li class="userGifts" v-show="giftsCard">
              <p>使用礼品卡金额
                <span
                  v-if="giftcardBalance > 0">-￥{{total >= giftcardBalance ? giftcardBalance : total | toFixedTwo}}</span>
                <span v-else>-￥0</span>
              </p>
              <p>礼品卡账号余额<span>￥{{giftcardBalance}}</span></p>
            </li>
            <li>
              <span>运费</span>
              <span>免运费</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <i style="height: 2.93rem;display: block;width: 100%;"></i>
    <div class="bottomBar">
      <ul>
        <li>合计<span>￥{{orderRealPayTotalPrice | toFixedTwo}}</span></li>
        <!--<li v-else >合计<span>￥0</span></li>-->
        <li><span v-tap="{methods:gotoOrderPay}">确认订单</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Toast, Actionsheet, Popup, Indicator} from 'mint-ui'
  import Api from '@/api.js'

  export default {
    data() {
      return {
        orderRealPayTotalPrice: 0,
        dataList: [],
        addressData: [],
        addresBool: false,
        car: '',
        total: 0,
        yhj: 0,
        couponCode: '',
        userCouponCode: false,
        giftsCard: false,
        giftcardBalance: 0,
        isUseCard: '',
        selectIndex: 1
      }
    },
    methods: {
      selectCards(params) {
        if (this.selectIndex != params.index) {
          this.changeCardsUseFn(params.index)
          this.selectIndex = params.index
        } else {
          //取消使用优惠劵或者是礼品卡
          this.changeCardsUseFn(-1)
          this.selectIndex = -1
        }

      },
      changeCardsUseFn(index) {
        $('.useCard p').find('span').removeClass('spanBorderNow')
        $('.useCard p:nth-child(' + index + ')').find('span').addClass('spanBorderNow')
        $('.useCard p').find('span i').hide()
        $('.useCard p:nth-child(' + index + ')').find('span i').show()
        if (index === 1) {//优惠劵
          this.$store.commit('setUserCouponCode', true)
          this.userCouponCode = this.$store.getters.getUserCouponCode
          this.$store.commit('setUserGiftsCode', false)
          this.giftsCard = this.$store.getters.getUserGiftsCode
          this.orderRealPayTotalPrice = (this.total - this.yhj) >= 0 ? (this.total - this.yhj) : 0
        } else if (index === 2) {//礼品卡
          this.couponCode = ''
          this.isUseCard = 1
          this.$store.commit('setUserCouponCode', false)
          this.userCouponCode = this.$store.getters.getUserCouponCode
          this.$store.commit('setUserGiftsCode', true)
          this.giftsCard = this.$store.getters.getUserGiftsCode
          this.orderRealPayTotalPrice = (this.total - this.giftcardBalance) >= 0 ? (this.total - this.giftcardBalance) : 0
        } else {
          //取消使用礼品卡或者优惠劵
          this.orderRealPayTotalPrice = this.total
          this.couponCode == ''
          this.giftsCard = false
          this.userCouponCode = false
          this.isUseCard = ''
        }
      },
      gotoOrderPay() {
        if (this.addresBool != true) {
          Toast('地址不能为空');
          return;
        }
        var jsons = {
          userDbId: localStorage.getItem("userDbId"),
          cars: this.car,
          addressDbId: this.addressData.dbId,
          couponCode: this.couponCode,
          isUseCard: this.isUseCard,
          'client': 'shijie',
        }
        //如果session有channelCode 就存入
        if (sessionStorage.getItem("channelCode")) {
          console.log(sessionStorage.getItem("channelCode"))
          jsons.channelCode = sessionStorage.getItem("channelCode")
        }
        Api.car.createOrder(jsons).then(res => {
          if (res.data.code == 'success') {
            var orderDbId = res.data.orderDbId;
            var openId = res.data.openId;
            var userDbId = localStorage.getItem("userDbId");
            var isZeroPaid = res.data.isZeroPaid
//            this.$router.push({
//              path: '/orderStatus',
//              query: {
//                'paymentType': 'shijie',
//                'addressId': this.addressData.dbId,
//                'dbId': orderDbId,
//                'userDbId': userDbId,
//                'openId': openId,
//                'client': 'shijie',
//                'sorce': 'payOrder',
//                'isZeroPaid': isZeroPaid
//              }
//            });
            var jsons = {
              paymentType: 'shijie',
              addressId: this.addressData.dbId,
              dbId: orderDbId,
              userDbId: userDbId,
              openId: openId,
              client: 'mobile',
              subject: '努比亚支付'
            }
            this.goAppPay(jsons,isZeroPaid)
          } else {
            Toast(res.data.message)
          }
        }, err => {
          Toast('请求错误')
        })
      },
      updataAddress() {
        this.$router.push({
          path: '/Address',
          query: {
            "openId": this.$route.query.openId,
            "&orderDbId": this.$route.query.orderDbId,
            "&userDbId": localStorage.getItem("userDbId")
          }
        })
        //location.href="#Address?openId="+this.$route.query.openId+"&orderDbId="+this.$route.query.orderDbId+"&userDbId="+localStorage.getItem("userDbId");
      },
      addAddress() {
        this.$router.push({
          path: '/Address',
          query: {
            "openId": this.$route.query.openId,
            "&orderDbId": this.$route.query.orderDbId,
            "&userDbId": localStorage.getItem("userDbId")
          }
        })
        //location.href="#Address?openId="+this.$route.query.openId+"&orderDbId="+this.$route.query.orderDbId+"&userDbId="+localStorage.getItem("userDbId");
      },
      linkGo() {
        this.vurRouterGo()
      },
      useCoupon() {
        this.$router.push({
          path: "/UseCoupon",
          query: {
            'openId': this.$route.query.openId,
            'orderDbId': this.$route.query.orderDbId,
            'userDbId': localStorage.getItem("userDbId"),
            couponPrice: this.couponCode
          }
        })
        //location.href="UseCoupon#?openId="+this.$route.query.openId+"&orderDbId="+this.$route.query.orderDbId+"&userDbId="+localStorage.getItem("userDbId");
      },
      findProduct(couponCodes) {
        //商品查询
        var _this = this
        this.car = sessionStorage.getItem('cars')
        var jsons = {
          dbId: this.car,
          couponCode: couponCodes,
          userDbId: this.$route.query.userDbId
        }
        Api.car.queryCar(jsons).then(res => {
          this.orderRealPayTotalPrice = res.data.data.orderRealPayTotalPrice
          if (res.data.data.trollyDetailList.length > 0) {
            this.dataList = res.data.data.trollyDetailList
            for (var i = 0; i < this.dataList.length; i++) {
              this.total += Number(this.dataList[i].total)
            }
            if (this.yhj > 0) {
              this.changeCardsUseFn(1)
            } else if (this.giftcardBalance > 0) {
              this.changeCardsUseFn(2)
            } else {
              this.giftcardBalance = 0
              return
            }
            this.userCouponCode = this.$store.getters.getUserCouponCode
            //在使用了优惠劵或者礼品卡的情况下
            if (this.userCouponCode === true) {//判断显示优惠劵dom
              this.changeCardsUseFn(1)
            } else if (this.giftsCard === true) {//判断显示礼品卡dom
              this.changeCardsUseFn(2)
            }
          }
        }, err => {
          Toast('数据请求错误');
        })
      }
    },
    mounted() {
      //礼品卡
      Api.getUserInfo.getUserInfo({passId: localStorage.getItem("userDbId")}).then(res => {
        this.giftcardBalance = res.data.data.giftcardBalance
      }, err => {
        Toast('网络异常')
      })
      //默认最优优惠劵
//      			var oSKU =''
//	        		//默认最优优惠劵
//				if (sessionStorage.getItem('skus')=='baobaoshu'){
//					oSKU = 'xiaoshiguang'
//				}else if (sessionStorage.getItem('skus')=='huace'){
//					oSKU = 'shiguangji'
//				}else{
//					oSKU = sessionStorage.getItem('skus')
//				}
      Api.counpon.couponOptimal({
        'passId': this.$route.query.userDbId,
        'productTypes': sessionStorage.getItem('skus')
      }).then(res => {
        if (res.data.data.couponList.length > 0) {
          //console.log(res.data.data.couponList[0].prefeAmount)
          var arrs = []
          for (var i = 0; i < res.data.data.couponList.length; i++) {
            if (res.data.data.couponList[i].viewEnabled == 1) {
              arrs.push(res.data.data.couponList[i].couponCode)
            }
          }
          if (arrs.length > 0) {
            if (this.$route.query.price >= 0) {
              this.yhj = this.$route.query.price
            } else {
              this.yhj = res.data.data.couponList[0].prefeAmount
              console.log(res.data.data.couponList[0].prefeAmount)
            }
            if (this.$route.query.couponCode == 'undefined' || this.$route.query.couponCode == undefined && this.$route.query.price >= 0) {
              this.couponCode == ''
            } else {
              this.couponCode = this.$route.query.couponCode
            }
            if (this.$route.query.price == undefined || this.$route.query.price == 'undefined') {
              this.couponCode = res.data.data.couponList[0].couponCode
            }
            this.findProduct(this.couponCode)
          } else {
            this.findProduct()
          }

        } else {
          this.findProduct()
        }
      }, err => {
      })
      var addJsons = {
        userDbId: this.$route.query.userDbId
      }
      Api.address.defaultAddress2(addJsons).then(res => {
        this.addressData = res.data
        console.log(res.data)
        if (res.data.address.length > 0) {
          this.addresBool = true
        } else {
          this.addresBool = false
        }

      }, err => {
        Toast('数据请求错误2')
      })

    }
  }
</script>

<style>
</style>
