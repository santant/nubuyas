<template>
	<div id="couponExchange">
		<!--头-->
		<mt-header title="优惠券">
		 <router-link to="" v-tap="{methods:linkGo}" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		  <mt-button icon=""  slot="right"></mt-button>
		</mt-header>
		<div class="exchangeInput">
			<input class="exchangeInputs" placeholder="请输入兑换码" type="" name="" id="" value="" v-model="couponCode" />
			<div class="exchangeBtn" v-tap="{methods:useFn}">兑换</div>
		</div>

		<mt-loadmore :distance-index='1' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill=false>
		  <ul class="couponList">
				<li :class="itmes.classNames" v-for="itmes in dataList">
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
		</mt-loadmore>
	</div>
</template>

<script>
import Api from '@/api.js'
import { Swipe, SwipeItem, Indicator,MessageBox,Toast,Loadmore } from 'mint-ui';
export default {
	  data () {
	    return {
	     	dataList:[],
	     	useClassName:'',
	     	couponCode:'',
	     	allLoaded:false,
	     	page:1
	    }
	  },
    methods:{
      loadBottom() {
		  this.$refs.loadmore.onBottomLoaded();
		 // this.allLoaded = true;
		 // this.page+=1;
		// this.page+=1
		 this.initCounpon()

		},

		linkGo(){
//			this.vurRouterGo();
			this.goApp()
			//location.href="";
		},
		clearStore(){

		},
		useFn(){
			if(this.couponCode.length > 0){
				var jsons={
				couponCode:this.couponCode,
				passId:localStorage.getItem("userDbId")

				}
			Indicator.open({text: '兑换中...',spinnerType: 'fading-circle'})
			Api.counpon.changeCupon(jsons).then(res=>{
				if(res.data.status === "OK"){
					//this.initCounpon()
					location.reload()
					Toast('兑换成功')
				}else{
					Indicator.close()
					MessageBox({
					  title: '优惠券',
					  message: res.data.message,
					  showCancelButton: true
					}).then((res)=>{
						if(res=="confirm"){
							return
						}else{return}
					})
				}
			},err=>{

			})
			}else{
				MessageBox({
					  title: '优惠券',
					  message: '请输入优惠券码',
					  showCancelButton: true
					}).then((res)=>{
						if(res=="请输入优惠券码"){
							return
						}else{return}
					})
			}


		},
		initCounpon(){
			var jsons = {
				passId:localStorage.getItem("userDbId"),
				pageNo:this.page,
				pageSize:1000
			}
			Api.counpon.counponList(jsons).then(res=>{
			 	if(res.data.status == "OK"){
			 		console.log(res.data.data)
//			 		if(this.page >= res.data.data.pageTotal) {
//			 			this.page = res.data.data.pageTotal
//			 			this.allLoaded = true
//			 			Toast('没有更多内容')
//			 			Indicator.close()
//			 			return;
//			 		}
			 		this.dataList = res.data.data.coupons
			 		for (var i = 0; i < this.dataList.length; i++) {

			 			if(this.dataList[i].viewStatus == 'ok'){
			 				this.dataList[i].classNames = 'wsy'
			 			}else if(this.dataList[i].viewStatus == 'used'){
			 				this.dataList[i].classNames = 'ysy'
			 			}else if(this.dataList[i].viewStatus == 'expire'){
			 				this.dataList[i].classNames = 'ygq'
			 			}else if(this.dataList[i].viewStatus=='wait'){
			 				this.dataList[i].classNames = 'wdq'
			 			}
			 		}
			 	}
			 	Indicator.close()

			},err=>{
				Indicator.close()
	          //	console.log(this.dataList)
	        })
		}
    },
    mounted(){
    	   Indicator.open({text: '加载中...',spinnerType: 'fading-circle'})

	   this.initCounpon()
	}
}
</script>

<style>

</style>
