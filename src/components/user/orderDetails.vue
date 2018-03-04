<template>
  <div class="order-details">
    <mt-header title="订单详情">
      <router-link to="" v-tap='{methods:linkGo}' slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="order-state">
      <i class="iconfont icon-yizhifu"></i>
      <span class="state-text">{{order.orderState}}</span>
      <span class="order-amount"></span>
    </div>
    <div class="making" v-if="order.status >= 7 && !express">
      <i class="iconfont icon-xiangzi1"></i>
      <span class="making-test">生产中</span>
    </div>
    <div class="express" v-if="express" @click="express.show=!express.show">
      <i class="iconfont icon-kuaidi"></i>
      <span class="express-text">{{express.companyName}}</span>
      <div class="express-details">
        <span class="express-number">物流单号　{{express.id}}</span>
        <input :value="express.id" class="dictatorship" ref="expressId"/>
        <button class="copy-btn" @click.stop="copyExpressId">复制</button>
      </div>
      <div class="express-details" v-show="express.show" v-for="info in express.info">
        <div>{{info.accept_time}}</div>
        <div>{{info.remark}}</div>
      </div>
    </div>
    <div class="address-info">
      <i class="iconfont icon-icon-yxj-address"></i>
      <span class="address-name">{{order.consignee}}</span>
      <span class="address-phone">{{order.mobile || ''}}</span>
      <span class="address-details">{{order.address}}</span>
    </div>
    <div class="border"></div>
    <div class="order-goods-list">
      <div class="order-goods-item" v-for="item in order.cars">
        <div class="thumbnail"
             :style="{backgroundImage: 'url('+item.thumbnailImageUrl+')'}"></div>
        <div class="order-goods-info">
          <span class="order-goods-name" v-if="item.sku">{{item.sku}}</span>
          <span class="order-goods-type" v-if="item.sku && item.sku.split('.').length">{{item.sku.split('.')[0]}}</span>
          <span class="order-goods-size"
                v-if="item.sku && item.sku.split('.').length >= 1">{{item.sku.split('.')[1]}}</span>
          <span class="order-goods-color"
                v-if="item.sku && item.sku.split('.').length >= 2">{{item.sku.split('.')[2]}}</span>
        </div>
        <div class="unit-price-count">
          <span class="unit-price">￥{{item.total}}</span>
          <span class="count">X{{order.num}}</span>
        </div>
      </div>
    </div>
    <div class="payment-channel">
      <label for="channel-name">支付方式</label>
      <span id="channel-name">努比亚支付</span>
    </div>
    <div class="order-data">
      <div class="line order-number" v-if="order.code">
        <span>订单编号：{{order.code}}</span>
        <input :value="order.code" class="dictatorship" ref="orderCode"/>
        <button class="btn copy-btn" @click="copyOrderCode">复制</button>
      </div>
      <div class="line coupons" v-if="order.discount">
        <label for="coupons-amount">使用优惠券</label>
        <span id="coupons-amount">-￥{{order.discount}}</span>
      </div>
      <div class="line order-time">
        <span class="order-time-label">下单时间：</span>
        <span class="order-time-value">{{order.createdDt}}</span>
      </div>
      <div class="line order-sum">
        <div class="row">
          <label for="goods-amount">商品总额</label>
          <span id="goods-amount">￥{{order.total}}</span>
        </div>
        <div class="row">
          <label for="freight">+运费</label>
          <span id="freight">￥0</span>
        </div>
      </div>
      <div class="line actual-payment">
        <label for="payment-amount">实付款：</label>
        <span id="payment-amount">￥{{order.total}}</span>
      </div>
      <div class="order-operation">
        <button class="btn cancel-btn" v-bind:hidden="order.status != 1" @click="cancelOrder(order)">取消订单</button>
        <button class="btn pay-btn" v-bind:hidden="order.status != 1"  @click="payOrder(order)">去支付</button>
        <button class="btn delete-btn" v-if='order.status == -1' @click="deleteOrder(order)">删除订单
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast, MessageBox} from 'mint-ui'
  import Api from '@/api.js'

  export default {
    data: function () {
      return {
        userDbId: '',
        orderDbId: this.$route.params.orderDbId,
        order: {},
        express: null
      }
    },
    methods: {
      /**
       * 取消订单
       * @param params
       */
      cancelOrder: function (params) {
        MessageBox({
          title: '我的订单',
          message: '您确认取消该条订单吗？',
          showCancelButton: true
        }).then((res) => {
          if (res === 'confirm') {
            Api.car.cancleOrder2(params.code).then(res => {
              location.reload()
              this.dataList[params.index].status = -1
              this.dataList[params.index].orderState = '已取消'
            }, () => {
              Toast('数据请求错误')
            })
          }
        })
      },
      deleteOrder: function (order) {
        let that = this
        MessageBox({
          title: '我的订单',
          message: '您确认删除此条订单吗?',
          showCancelButton: true
        }).then((res) => {
          if (res === 'confirm') {
            Api.car.deleteOrders(order.code).then(res => {
              if (res.data.code === 'success') {
                location.reload()
                Toast('订单删除成功')
                order.orderState = '已删除'
                order.orderStateCode = 'delete'
//              order.status = -99
              }
            }, () => {
              Toast('数据请求错误')
            })
          }
        })
      },
      /**
       * 立即支付
       * @param params
       */
      payOrder: function (params) {
        let ordJson = {
          orderDbId: params.dbId,
          userDbId: localStorage['userDbId']
        }
        Api.car.cloneOrder(ordJson).then(res => {
          if (res.data.code === 'success') {
            let orderDbId = res.data.orderDbId
            let openId = res.data.openId
            let addressDbId = res.data.addressDbId
            let userDbId = localStorage['userDbId']

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

//             this.$router.push({
//              path: '/orderStatus',
//              query: {
//                paymentType: 'shijie',
//                addressId: addressDbId,
//                dbId: orderDbId,
//                userDbId: userDbId,
//                openId: openId,
//                sorce: 'payOrder'
//              }
//            })
          } else {
            Toast('此订单数据错误，请联系客服！')
          }
        }, () => {
          Toast('数据请求错误')
        })
      },
      copyExpressId: function () {
        this.$refs.expressId.select()
        document.execCommand('Copy')
        Toast('单号复制成功！')
      },
      copyOrderCode: function () {
        this.$refs.orderCode.select()
        document.execCommand('Copy')
        Toast('订单编号复制成功！')
      },
      linkGo: function () {
        this.$router.go(-1)
      },
      _queryOrder: function () {
        Api.car.queryOrder({
          userDbId: this.userDbId,
          orderDbId: this.orderDbId
        }).then(res => {
          this.order = res.data[0]
          if (this.order.logisticsMap && this.order.logisticsMap.code === 'success') {
            this.express = Object.assign({show: false}, this.order.logisticsMap.orderLogisticsInfo[0].listInfo[0])
          }
        })
      }
    },
    mounted: function () {
      this.userDbId = localStorage['userDbId']
      if (!this.orderDbId || !this.userDbId) {
        this.linkGo()
        return
      }
      this._queryOrder()
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .order-details {
    color: #333;
    font-size: .8rem;
    background: #f4f5f5;
    .dictatorship {
      position: absolute;
      top: -9999px;
    }
    .iconfont {
      display: inline-block;
      width: 1.5em;
      color: #9698a1;
    }
    .order-state, .making, .express, .address-info, .payment-channel {
      padding: 0 .66rem 0 .8rem;
      line-height: 2.4rem;
      background: #fff;
      border-bottom: 1px solid #ebebeb;
    }
    .order-state .order-amount {
      float: right;
    }
    .express {
      padding: .4rem .66rem .45rem .8rem;
      line-height: 1;
      .express-details {
        margin-top: .6rem;
        padding-left: 1.9em;
        line-height: 1.2rem;
        vertical-align: middle;
      }
      .express-number {
        line-height: 24px;
      }
      .copy-btn {
        margin-left: 10px;
        line-height: 1.44rem;
        width: 5em;
        text-align: center;
        border: 1px solid #999;
        color: #999;
        background: #fff;
        outline: 0;
      }
    }
    .address-info {
      padding: 1rem .66rem 1rem .8rem;
      line-height: 1;
      border: none;
      .address-name, .address-phone {
        font-weight: bold;
      }
      .address-details {
        display: block;
        padding-left: 1.9em;
        margin-top: .9rem;
      }
    }
    .border {
      height: 4px;
      background: url('../../assets/img/border-3l.png');
      background-size: 100% 100%;
    }
    .order-goods-list {
      margin-top: 0.56rem;
      background: #fff;
      border: 0 solid #e3e3e3;
      border-top-width: 1px;
      border-bottom-width: 1px;
    }
    .order-goods-item {
      display: flex;
      padding: .48rem .53rem .5rem .88rem;
    }
    .thumbnail {
      flex: 0 0 4.8rem;
      height: 4.8rem;
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: contain;
      background-color: #fff;
      border: 1px solid #ebebeb;
      border-radius: 4px;
    }
    .order-goods-info {
      flex: 1;
      width: 100%;
      padding-left: .88rem;
      font-size: .64rem;
      .order-goods-name, .order-goods-type, .order-goods-size, .order-goods-color {
        display: block;
        margin-top: .46rem;
        color: #8a8b96;
      }
      .order-goods-name {
        padding-top: .24rem;
        margin-top: 0;
        color: #333;
      }
    }
    .unit-price-count {
      flex: 0 0 3rem;
      text-align: right;
      .unit-price {
        color: #333;
      }
      .count {
        display: block;
        margin-top: .46rem;
        color: #8a8b96;
      }
    }
    .payment-channel {
      border-bottom: 1px solid #ebebeb;
      #channel-name {
        float: right;
      }
    }
    .order-data {
      margin-top: 0.56rem;
      color: #999;
      background: #fff;
      .line {
        padding: 0 .66rem 0 .8rem;
        line-height: 2.4rem;
        border-bottom: 1px solid #ebebeb;
      }
      #coupons-amount, #goods-amount, #freight {
        float: right;
      }
      .actual-payment {
        border: 0;
        text-align: right;
        #payment-amount {
          color: #d82e00;
        }
      }
      .order-operation {
        padding: 0 .66rem 1rem 0;
        text-align: right;
      }
      .btn {
        margin-left: .6rem;
        line-height: 1.44rem;
        width: 5em;
        text-align: center;
        border: 1px solid #333;
        color: #333;
        background: #fff;
        outline: 0;
      }
      .copy-btn {
        color: #999;
        border-color: #999;
      }
      .pay-btn, .delete-btn {
        color: #d82e00;
        border-color: #d82e00;
      }
    }
  }
</style>
