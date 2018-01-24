import Api from '@/api.js'

export default {
  install(Vue, options) {
    //addToSession 循环url，存入session
    Vue.prototype.addToSession = function () {
      if (this.$route.query.userDbId) {
        localStorage.setItem('userDbId', this.$route.query.userDbId)
      }
      var obj = JSON.parse(sessionStorage.getItem("urlQuery"));
      if (obj) {
      } else {
        obj = {};
      }

      for (var key in this.$route.query) {
        if (this.$route.query[key]) {
          obj[key] = this.$route.query[key]
        }

      }
      sessionStorage.setItem("urlQuery", JSON.stringify(obj))
    }

    //获取我需要对session
    Vue.prototype.getFromSession = function (sessionName) {
      var obj = JSON.parse(sessionStorage.getItem("urlQuery"))
      if (sessionName) {
        if (obj[sessionName]) {
          return obj[sessionName]
        }
        return ''
      }
    }
    //给上传地址url用的方法
    Vue.prototype.getFromSession3 = function (sessionName) {
      var obj = JSON.parse(sessionStorage.getItem("bbsSlsectDate"));
      if (sessionName) {
        if (obj[sessionName]) {
          return obj[sessionName];
        }
        return ''
      }
    }
    Vue.prototype.getFromSession2 = function (name, sessionName) {
      var obj = JSON.parse(sessionStorage.getItem(name));
      if (sessionName) {
        if (obj[sessionName]) {
          return obj[sessionName];
        }
        return ''
      }
    }

    //将sessionStorage中存储的属性增加到jsons中
    Vue.prototype.sourceSession = function (jsons) {
      var obj = JSON.parse(sessionStorage.getItem("urlQuery"));
      if (jsons) {
        for (var i in obj) {
          if (obj[i] && obj[i] != '') {
            jsons[i] = obj[i]
          }
        }
        return jsons;
      } else {
        return obj;
      }
    }
    //路由返回上一页
    Vue.prototype.vurRouterGo = function () {

      this.$router.go(-1)
    }
    // 返回app
    Vue.prototype.goApp = function () {
      if (window.YaChang) {
        window.YaChang.goToThirdMall()
      }
    }

    // 屌用支付的公共方式
    Vue.prototype.goAppPay = function (jsons, isZeroPaid) {  //isZeroPaid =1就是0元支付
      if (isZeroPaid && isZeroPaid === 1) { //0元支付
        Api.car.updataOrderStatus3Pay({id: jsons.dbId, status: 3}).then(res => {
          if (res.data.status === 1) {
            this.$router.push({path: '/orderList'})
          }
        })
        return
      }
      Api.car.orderPay(jsons).then(res => {
        if (res.data.code === 'success') {
          var orderJsonStr = {
            "cp_order_id": res.data.cp_order_id,
            "product_name": res.data.product_name,
            "product_des": res.data.product_des,
            "amount": res.data.amount,
            "product_price": res.data.product_price,
            "product_num": res.data.product_num,
            "data_timestamp": res.data.data_timestamp
          }

          if (window.YaChang) { // 如果方法存在
            window.YaChang.onSumResult(JSON.stringify(orderJsonStr))
          }
          console.log(res.data)
          console.log(orderJsonStr)

        } else {
          this.$router.push({path: '/orderList'})
        }
      }, err => {
        Toast('请求数据失败')
      })
    }
  }
}
