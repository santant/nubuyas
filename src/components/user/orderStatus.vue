<template>
  <div>

  </div>
</template>

<script>
  import {Toast, Actionsheet, Popup, Indicator} from 'mint-ui';
  import Api from '@/api.js'

  export default {
    data() {
      return {}
    },
    methods: {},

    mounted() {
      var jsons = {
        paymentType: this.$route.query.paymentType,
        addressId: this.$route.query.addressId,
        dbId: this.$route.query.dbId,
        userDbId: this.$route.query.userDbId,
        openId: this.$route.query.openId,
        client: 'mobile',
        subject: '努比亚支付'
      };
      if (this.$route.query.isZeroPaid == 1) {
        Api.car.updataOrderStatus3Pay({id: jsons.dbId, status: 3}).then(res => {
          if (res.data.status == 1) {
            var stateObj = {foo: "bar"};
            this.$router.push({path: '/orderList'})
          }
        }, err => {
          Toast('请求数据失败');
        })
      } else {

        Api.car.orderPay(jsons).then(res => {
          if (res.data.code === 'success') {
//  		  	var orderJsonStr = "{\"cp_order_id\":\"tdyshshhs\",\"product_name\":\"dddddd\",\"product_des\":\"dddddd\",\"product_price\":0.009999999776482582,\"product_num\":2,\"data_timestamp\":546466767676}";
            var orderJsonStr = {
              "cp_order_id": res.data.cp_order_id,
              "product_name": res.data.product_name,
              "product_des": res.data.product_des,
              "amount": res.data.amount,
              "product_price": res.data.product_price,
              "product_num": res.data.product_num,
              "data_timestamp": res.data.data_timestamp
            }

            if (window.YaChang) { //如果方法存在
              window.YaChang.onSumResult(JSON.stringify(orderJsonStr))
            }
            console.log(res.data)
            console.log(orderJsonStr)

          } else {
            this.$router.push({path: '/orderList'})
          }
        }, err => {
          Toast('请求数据失败');
        })
      }
    }
  }
</script>

<style>
</style>
