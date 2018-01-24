<template>
  <div id="orderList">
    <mt-header title="我的订单">
      <router-link to="" v-tap='{methods:linkGo}' slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="" slot="right"></mt-button>
    </mt-header>
    <div class="order" v-for="(order, indexs) in dataList">
      <ul>
        <li>
          <span>订单号</span>
          <span @click="orderDetails(order)">{{order.code}}</span>
          <span v-if='order.status == -1' v-tap="{methods:delectFn,index:indexs,dbid:order.dbId,code:order.code}"><i
            class="icon iconfont">&#xe68a;</i></span>
        </li>
        <li>
          <span>状态</span>
          <span>{{order.orderState}}</span>
        </li>
        <li class="ordersContent" @click="orderDetails(order)" v-for="(works, index) in order.worksList">
          <div class="orderContent">
            <ul>
              <li>
                <img :src="works.thumbnailImageUrl"/>
              </li>
              <li>
                <ul>
                  <li>
                    <!-- <span>{{works.sku | splitSku}} {{ works.name }}</span> -->
                    <span v-if="undefined !== works.sku && null !== works.sku">{{works.sku | splitSku}}</span>
                    <span v-else>{{ works.name }}</span>
                  </li>
                  <li>{{works.sku | splitSkuLast}} {{ works.size }}</li>
                  <li>¥ {{works.price | toFixedTwo}}</li>
                  <!--<li>{{ works.size }}</li>
                                    <li>¥ {{works.price |toFixedTwo}}</li>-->
                </ul>
              </li>
              <li>
                <span>X{{works.num}}</span>
              </li>
            </ul>
          </div>
        </li>
        <li v-show="order.domShowBool">
          <span style="width: 4rem;">{{order.texts}}</span>
          <span style="width: 12.5rem;text-align: right;color: #f84845;">-¥{{order.favourablePrice}}</span>
        </li>
        <li>
          <p>{{order.createdDt}}</p>
          <p>共{{order.num}}件商品</p>
          <!-- <p v-if="order.total-order.couponDiscountAmount > 0">合计：<span>¥{{order.total-order.couponDiscountAmount}}</span></p>
                    <p v-if="order.total-order.couponDiscountAmount > 0">合计：<span>¥{{ order.total }}</span></p>
                    <p v-else>合计：<span>¥0</span></p>
                     -->
          <p v-if="undefined !== order.total && null !== order.total">合计：<span>¥{{ order.total }}</span></p>
          <p v-else>合计：<span>¥0</span></p>
        </li>
        <li>
          <div>
            <p v-bind:hidden="order.status != 1"
               v-tap="{methods:cancleOrder,dbId:order.dbId,index:indexs,code:order.code}"> 取消订单</p>
            <p v-bind:hidden="order.status != 1" class="active" v-tap="{methods:gotoOrderPay,dbId:order.dbId}">立即支付</p>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import {Toast, Actionsheet, Popup, Indicator, MessageBox} from 'mint-ui';
  import Api from '@/api.js'

  export default {
    data() {
      return {
        dataList: [],
        favourablePrice: 0,
        texts: '',
        domShowBool: true
      }
    },
    beforeRouteEnter(to, from, next) {
      if (from.path == "/orderStatus") {
        //this.$router.replace({path:"/user"})
      }
      next()
    },
    methods: {
      orderDetails(order) {
        this.$router.push({
          path: `/orderDetails/${order.dbId}`
        })
      },
      gotoOrderPay(params) {
        var ordJson = {
          orderDbId: params.dbId,
          userDbId: localStorage.getItem("userDbId")
        }
        Api.car.cloneOrder(ordJson).then(res => {
          if (res.data.code == 'success') {
            var orderDbId = res.data.orderDbId;
            var openId = res.data.openId;
            var addressDbId = res.data.addressDbId;
            var userDbId = localStorage.getItem("userDbId");
            //var payUrl = "#orderStatus?paymentType=wx&addressId="+addressDbId+"&dbId="+orderDbId+"&userDbId="+userDbId+"&openId="+openId+'&sorce=payOrder';
            var jsons = {
              paymentType: 'shijie',
              addressId: addressDbId,
              dbId: orderDbId,
              userDbId: userDbId,
              openId: openId,
              client: 'mobile',
              subject: '努比亚支付',
              sorce: 'payOrder'
            }
            this.goAppPay(jsons, 2)

//            this.$router.push({
//              path: "/orderStatus",
//              query: {
//                'paymentType': 'shijie',
//                'addressId': addressDbId,
//                "dbId": orderDbId,
//                "userDbId": userDbId,
//                "openId": openId,
//                'sorce': 'payOrder',
//
//              }
//            })
            //this.$router.replace({path:"/orderStatus?paymentType=WX&addressId="+addressDbId+"&dbId="+orderDbId+"&userDbId="+userDbId+"&openId="+openId+'&sorce=payOrder'})
            //location.href = payUrl;
          } else {
            Toast('此订单数据错误，请联系客服！');
          }
          //console.log(res)
        }, err => {
          Toast('数据请求错误');
        })
      },
      cancleOrder(params) {
        MessageBox({
          title: '我的订单',
          message: '您确认取消该条订单吗？',
          showCancelButton: true
        }).then((res) => {
          if (res == "confirm") {
            Api.car.cancleOrder2(params.code).then(res => {
              this.dataList[params.index].status = -1
              this.dataList[params.index].orderState = '已取消'
            }, err => {
              Toast('数据请求错误')
            })
          }
        })
      },
      delectFn(params) {
        var jsons = {
          dbId: params.dbid
        }
        var that = this
        MessageBox({
          title: '我的订单',
          message: '您确认删除此条订单吗?',
          showCancelButton: true
        }).then((res) => {
          if (res == "confirm") {
            that.dataList.splice(params.index, 1);
            Api.car.deleteOrders(params.code).then(res => {
              console.log(res.data)
              if (res.data.status == 1) {
                Toast('订单删除成功');
                if (this.dataList.length < 1) {
                  Toast('您当前没有任何订单!')
                }
              }
            }, () => {
              Toast('数据请求错误');
            })
          }
        })
      },
      linkGo() {
//    	this.vurRouterGo();
        this.goApp()
      }
    },
    mounted() {
      if (this.$route.query.userDbId) {
        localStorage.setItem('userDbId', this.$route.query.userDbId)
      }
      Api.car.orderListStatus({userDbId: localStorage.getItem('userDbId')}).then(res => {
        this.dataList = res.data.results
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].cardDiscountAmount > 0) {
            this.dataList[i].favourablePrice = this.dataList[i].cardDiscountAmount
            this.dataList[i].texts = '使用礼品卡'
            this.dataList[i].domShowBool = true

          } else if (this.dataList[i].couponDiscountAmount > 0) {
            this.dataList[i].favourablePrice = this.dataList[i].couponDiscountAmount
            this.dataList[i].texts = '使用优惠劵'
            this.dataList[i].domShowBool = true
          } else if (this.dataList[i].cardDiscountAmount === 0 && this.dataList[i].couponDiscountAmount === 0) {
            this.dataList[i].domShowBool = false
          }
        }
        if (this.dataList.length < 1) {
          Toast('您当前没有任何订单!');
        }
      }, () => {
        Toast('数据请求错误')
      })
    }
  }
</script>

<style>
</style>
