<template>
	<div id="couponExchange">
		<!--头-->
		<mt-header title="优惠券">
		  <router-link to="" v-tap="{methods:linkGo}" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		  <mt-button icon=""  slot="right"></mt-button>
		</mt-header>
		<div class="exchangeInput useYhj" v-tap='{methods:selectCoupon,indexs:"no"}'>
			<p>不使用优惠券</p>
			<div class="selectBtn">
				<div class="clearXin" v-tap="{methods:noUseCoupon}" v-show="allcouponBool == true">
				</div>
			</div>
		</div>
		<div class="couponList">
			<ul>
				<li class="wsy" v-if="itmes.hideBoole == true" v-for="(itmes,index) in dataList" v-tap='{methods:selectCoupon,indexs:index}'>
					<div class="leftText">
						<p><span>¥</span>{{itmes.prefeAmount | subStrPrice}}</p>
						<p>代金券</p>
					</div>
					<div class="rightText">
						<p>{{itmes.productType | showName}}</p>
						<p>有效期至{{itmes.validEndDate}}</p>
					</div>
					<div class="clears" >

						<div class="clearXin" v-show="itmes.selectBool == true">

						</div>
					</div>
				</li>
				<li class="bny" v-if="itmes.hideBoole == false" v-for="(itmes,index) in dataList" >
					<div class="leftText">
						<p><span>¥</span>{{itmes.prefeAmount | subStrPrice}}</p>
						<p>代金券</p>
					</div>
					<div class="rightText">
						<p>{{itmes.productType | showName}}</p>
						<p>有效期至{{itmes.validEndDate}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Api from '@/api.js'
import { Swipe, SwipeItem, Indicator } from 'mint-ui';
export default {
	  data () {
	    return {
	     	dataList:[],
	     	useClassName:'',
	     	selectBool:false,
	     	allcouponBool:false

	    }
	  },
    methods:{
		linkGo(){
			this.vurRouterGo();
		},
		clearStore(){

		},
		selectCoupon(params) {

			if(params.indexs == 'no'){
				this.allcouponBool = ! this.allcouponBool
				for (var i = 0; i < this.dataList.length; i++) {
					this.dataList[i].selectBool = false;
				}
				this.$router.push( { path : '/payOrder', query : {'userDbId':this.$route.query.userDbId,'price':0}})
			}else{
				this.allcouponBool = false
				for (var i = 0; i < this.dataList.length; i++) {
					if(i==params.indexs){
						this.dataList[i].selectBool = true;
					}else{
						this.dataList[i].selectBool = false;
					}
				}
				this.$router.push( { path : '/payOrder', query : {'userDbId':this.$route.query.userDbId,'price':this.dataList[params.indexs].prefeAmount,'couponCode':this.dataList[params.indexs].couponCode}});
			}
		},
		noUseCoupon(){

		}
    },
    mounted(){
    	   Indicator.open({text: '加载中...',spinnerType: 'fading-circle'});
//		var oSKU =''
//  		//默认最优优惠劵
//		if (sessionStorage.getItem('skus')=='baobaoshu'){
//			oSKU = 'xiaoshiguang'
//		}else if (sessionStorage.getItem('skus')=='huace'){
//			oSKU = 'shiguangji'
//		}else{
//			oSKU = sessionStorage.getItem('skus')
//		}
		//默认最优优惠劵
       Api.counpon.couponOptimal({'passId':this.$route.query.userDbId,'productTypes':sessionStorage.getItem('skus')}).then(res=>{
       		var dataList = res.data.data.couponList
       		console.log(res)
       		for(var i = 0; i < dataList.length; i++){
       			dataList[i].hideBoole = false;
       			dataList[i].selectBool = false;
       			if(dataList[i].viewEnabled == 1){
       				dataList[i].hideBoole = true
       			}else{
       				dataList[i].hideBoole = false
       			}
       			if(dataList[i].couponCode == this.$route.query.couponPrice){
	 				dataList[i].selectBool = true;
	 			}
       		}
       		Indicator.close()
 			this.dataList = dataList
 			console.log(this.dataList)
       },err=>{})
	}
}
</script>

<style>

</style>
