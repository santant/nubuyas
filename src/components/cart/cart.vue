<template>
	<div id="cart">
		<mt-header title="购物车">
		  <router-link to="" v-tap="{methods:linkGo}" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		  <mt-button icon="" @click.native='deleteCar' slot="right">删除</mt-button>
		</mt-header>
		<!--购物车列表-->
		<ul v-model="dataList" class="cartList">
			<li v-tap='{methods:updateCheck, index:indexs}' v-for="(trollyDetail, indexs) in dataList">
				<div class="div_select" >
					<b  :class="trollyDetail.isOK ? 'activeSelect':'' "    ><i class="icon iconfont">&#xe672;</i></b>
				</div>
				<div class="div_comenter">
					<div class="img_cart">
						<img v-bind:src="trollyDetail.thumbnailImageUrl" alt="" />
					</div>
					<ol class="img_msg">
						<!-- <li>{{trollyDetail.sku | splitSku}} {{ trollyDetail.worksName }}</li> -->
						<li>
							<span v-if="undefined !== trollyDetail.sku && null !== trollyDetail.sku">{{ trollyDetail.sku | splitSku }}</span>
							<span v-else>{{ trollyDetail.worksName }}</span>
						</li>
						<li>
							<!-- {{trollyDetail.sku | splitSkuLast}} {{ trollyDetail.worksSize }} -->
							<span v-if="undefined !== trollyDetail.sku && null !== trollyDetail.sku">{{ trollyDetail.sku | splitSkuLast }}</span>
							<span v-else>{{ trollyDetail.worksSize }} mm</span>
						</li>
						<!-- <li>{{ trollyDetail.worksShape }}</li> -->
						<li>{{trollyDetail.createdDt}}</li>
						<li class="pic" v-model="trollyDetail.num">¥&nbsp;{{trollyDetail.price * trollyDetail.num | toFixedTwo}}</li>
					</ol>
				</div>
				<div class="div_number">
					<ol>
						<li v-tap='{methods : reduce,num:trollyDetail.num,index:indexs}'>
							<i class="icon iconfont" v-if="trollyDetail.num>1" style="color:#666">&#xe638;</i>
							<i class="icon iconfont" v-else="" >&#xe638;</i>
						</li>
						<li v-model="trollyDetail.num">{{trollyDetail.num}}</li>
						<li v-tap='{methods : add,num:trollyDetail.num,index:indexs}'>
							<i class="icon iconfont">&#xe671;</i>
						</li>
					</ol>
				</div>
			</li>
		</ul>
		<!--购物车底部-->
		<i style="height: 2.9375rem;display: block;width: 100%;"></i>
		<div class="cart_btn">
			<div class="all_select">
				<b  :class="checkAllBtn == false ? '':'activeSelect' "  v-tap='{methods:checkAll}'  ><i v-bind:hidden="checkAllBtn == false" class="icon iconfont" style="top: -0.95rem;">&#xe672;</i></b>
				<span>全选</span>
			</div>
			<div class="price">

				<div class="hj">合计:&nbsp;<span>¥&nbsp;{{allPic}}元</span></div>

			</div>
			<div v-tap="{methods:gotoPayOrder}" class="crectOrder">
				结算
			</div>
		</div>
	</div>
</template>

<script>

import  Api   from '@/api.js'
import  filter   from '../../filter.js'
import { Toast ,Actionsheet,Popup,Indicator,MessageBox} from 'mint-ui';
export default {

	  data () {
	    return {
			dataList:[],
			price:'',
			isindex:'',
			orderNum:'',
			checkes:false,
			allPic:0,
			arr:[],
			picMap:[],
			checkAllBtn:false
	    }
	  },
	 watch:{
　　　　
　　　　},
		methods:{
			deleteCar(){
				var checkData = [];
				for (var i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].isOK) {
						checkData.push(this.dataList[i].isOK)
					}
				}
				if(checkData.length <= 0){
					Toast('请选择要删除的产品');
				}else{
					MessageBox({
					  title: '我的订单',
					  message: '您确认删除此产品吗?',
					  showCancelButton: true
					}).then((res)=>{
						if(res=="confirm"){
							var arr = '';
							for (var i = 0; i < this.dataList.length; i++) {
								if (this.dataList[i].isOK) {
									arr+= this.dataList[i].dbId+',';
									 this.dataList.splice(i,1);
									 i--;
								}
							}
							arr.substr(0,arr.length-1);
							Api.car.deleteCarCorde({dbId:arr,userDbId:localStorage.getItem('userDbId')}).then(res=>{
								if(res.data.code == 'success'){
									Toast('订单删除成功');
									if(this.dataList.length < 1){
										Toast('购物车为空，请去购买产品吧!');
//										MessageBox.alert('购物车为空，请去首页添加购买的产品').then(action => {
//					        				location.href=""
//										});
									}
								}
							},err=>{
								Toast('请求错误');
							})

						}

					})
				}


			},
			/*添加数量*/
			add(params){
				++this.dataList[params.index].num;
				this.oPrice();

			},
			/*减少数量*/
			reduce(params){
				if( params.num > 1){
					--this.dataList[params.index].num;
					this.oPrice();
				}
			},
			oPrice(){//计算价格
				var arr = 0;
				for (var i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].isOK) {
						arr+=this.dataList[i].price * this.dataList[i].num;
					}
				}
				this.allPic = arr.toFixed(2);
			},
			/*设置选中状态*/
			updateCheck(params){
				this.dataList[params.index].isOK = !this.dataList[params.index].isOK;
				var arr = [];

				for (var i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].isOK == true) {
						arr.push(this.dataList[i]);

					}
				}
				if(this.dataList.length == arr.length){
					this.checkAllBtn = true;
				}else{
					this.checkAllBtn = false;
				}
				this.oPrice();

			},
			/*全选*/
			checkAll(){
				this.checkAllBtn  = !this.checkAllBtn;
				if(this.checkAllBtn == true){
					this.dataList.forEach(function(el,n){
						//el.isOK = !el.isOK;
						el.isOK = true;
					})
				}else{
					this.dataList.forEach(function(el,n){
						//el.isOK = !el.isOK;
						el.isOK = false;
					})
				}

				this.oPrice();
				this.$forceUpdate();
			},
			/*跳转到结算页面*/
			gotoPayOrder(){
				var cars = [];
				var carsArry = [];
				var switchBool = false;
				var skus = []
				var skusArr = []
				this.dataList.forEach(function(el,n){
					if(el.isOK){
						var carJson = {
							dbId : el.dbId,
							price : el.price,
							num : el.num
						};

						carsArry.push(carJson);
						cars.push(el.dbId);
						skus.push(el.skuCode.split('.')[0])
						switchBool = true;
					}
				})
				if(cars.length < 1){
					Toast('请选择结算产品');
				}

				if(switchBool == true){
					sessionStorage.setItem('cars', cars.join(','));
					sessionStorage.setItem('skus',skus.join(','))
					var jsons = {
						userDbId:localStorage.getItem("userDbId"),
						cars: JSON.stringify(carsArry)
					}
					Api.car.submitCars(jsons).then(res=>{
						if(res.data.code == 'success'){
							//alert(res.data.orderDbId)
							// location.href="#payOrder?openId="+res.data.openId+"&userDbId="+localStorage.getItem("userDbId");
							this.$router.push( { path : '/payOrder', query : { 'openId' : res.data.openId, 'userDbId' : localStorage.getItem("userDbId") }});
						} else{
							Toast('请求错误');
						}
					},err=>{
						Toast('请求错误');
					})

				}else{
					return
				}
			},
	        linkGo(){
				if(this.isindex){
					this.goApp()
				}else{
					this.vurRouterGo();
				}
			}
		},
		mounted(){
			if(this.$route.query.isindex==='y'){
				this.isindex = this.$route.query.isindex
			}
//			if (this.$route.query.userDbId) {
//	          localStorage.setItem('userDbId', this.$route.query.userDbId)
//	        }
			this.addToSession()
			var jsons = {
	  			userDbId:localStorage.getItem("userDbId"),
	  			status:1,
	  			pageNum:0,
	  			pageSize:15,
	  			sort:"createdDt",
	  			order:'desc'
			}
			//alert(localStorage.getItem("userDbId"));
			Api.car.carList(jsons).then(res=>{
				console.log(res)
				this.dataList = res.data.results;
				if(this.dataList.length < 1){
//						MessageBox.alert('购物车为空，请去首页添加购买的产品').then(action => {
//      				location.href=""
//					});
Toast('购物车为空，请去购买产品吧!');
				}
				for (var i = 0; i < this.dataList.length; i++) {
					this.dataList[i].isOK = false;
				}
				this.oPrice();
			},err=>{
				Toast('数据请求错误');
			})

		}
	}

</script>

<style>

</style>
