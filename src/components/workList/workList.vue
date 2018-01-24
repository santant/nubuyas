<template>
	<div id="workList">
		<!--头-->
		<mt-header title="我的作品">
		  <router-link to="" v-tap='{methods:linkGo}' slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		  <mt-button icon="" id='deleteBtn' slot="right" @click.native='deleteWork' >删除</mt-button>
		</mt-header>
		<div class="headTap">
			<ul>
				<li><p v-tap='{methods : updatStyle}' class="tabBtn liActive">未完成</p></li>
				<li><p v-tap='{methods : updatStyle}' class='tabBtn'>已完成</p></li>
			</ul>
		</div>
		<div class="tapList">
			<div class="listContent">
				<ul
			  v-infinite-scroll="loadMore"
			  infinite-scroll-disabled="loading"
			  infinite-scroll-distance="10" v-model="worklist">
			  <li v-tap='{methods:updataCheck,indexs:index}' v-for="(works, index) in worklist" style="margin-top: 0.53rem;">
			  	<div class="content">
					<ul>
						<li ><p :class="works.isOK ? 'circle':'circle circleNone' "><i v-bind:hidden="works.isOK == false" class="icon iconfont">&#xe639;</i></p></li>
						<li>
							<img :src="works.thumbnailImageUrl">
						</li>
						<li>
							<ul>
								<li>
									<!-- <span>{{works.sku | splitSku}} {{ works.name }}</span> -->
									<span v-if="undefined !== works.sku && null !== works.sku">{{ works.sku | splitSku }}</span>
									<span v-else>{{ works.name }}</span>
									<br />
									<!-- <span>{{works.sku | splitSkuLast}} {{ works.size }}</span>	-->
									<span v-if="undefined !== works.sku && null !== works.sku">{{ works.sku | splitSkuLast }}</span>
									<span v-else>{{ works.size }} mm</span>
									<!--
									<br />
									<span>{{ works.color }}</span>
									-->
									<br />
									<span>{{ works.shape }}</span>

								</li>
								<!--<li>170mm*235mm</li>-->
								<li>{{works.createdDt}}</li>
							</ul>
						</li>
						<li>
							<p v-tap="{methods : continueEdit ,index : index}" v-bind:hidden="tapStyle == true">继续编辑</p>
							<p v-tap='{methods:addCar , itmeData : works}' v-bind:hidden="tapStyle == false">加入购物车</p>
						</li>
					</ul>
				</div>
			  </li>
			</ul>
			<!--<p class="page-infinite-loading" v-bind:hidden="loading == false">
		    	  加载中...
		    	 6228484040538704117
		    </p>-->
			</div>

		</div>
	</div>
</template>

<script>
	import {Toast, InfiniteScroll,Indicator,MessageBox } from 'mint-ui';
	import Api from '@/api.js'
    import  filter   from '../../filter.js'

	export default{
		data(){
			return{
				tapStyle:false,
				worklist:[],
				loading:false,
				workPage:0 //第0页
			}
		},
		methods:{
			updatStyle(params){
				$('.tabBtn').removeClass('liActive')
				if($(params.event.target).hasClass("liActive")){
				}else{
					$(params.event.target).addClass('liActive');
				}
				var paraJson = {
					userDbId:localStorage.getItem('userDbId'),
					sortField:"createdDt",
					pageSize:15,//每页多少条
					pageNum:this.workPage, //第几页
					order:"desc",
					category: '' //类型
				};
				if($(params.event.target).text() == '未完成'){
					paraJson.status = 1;
					Api.work.workList(paraJson).then((res)=>{
						this.worklist = res.data.results;
						console.log(res)
					})
					this.tapStyle = false;
				}else{
					paraJson.status = 2;
					Api.work.workList(paraJson).then((res)=>{
						this.worklist = res.data.results;
						console.log(res)
					})
					this.tapStyle = true;
				}
				if(this.tapStyle == true){
					$('#deleteBtn').hide();
				}else{
					$('#deleteBtn').show();
				}

			},
			updataCheck(params){
			this.worklist[params.indexs].isOK = !this.worklist[params.indexs].isOK;
			this.$forceUpdate();
			//alert(this.worklist[params.indexs].isOK)
			},
			addCar(params){
				var jsons = {
                    operator:"add",
//                  sessionId:localStorage.getItem("sessionId"),
                    userDbId:localStorage.getItem("userDbId"),
                    client:"mobile",//渠道前端传递，暂时写死
                    category:params.itmeData.category,//产品类型这里是宝宝书,暂时写死
                    edtDbId:	params.itmeData.dbId,
                    price:params.itmeData.price,
                    num:params.itmeData.num,
                    discount:params.itmeData.discount,
                    channelCode:params.itmeData.channelCode,
                    opSystem:params.itmeData.opSystem,
                    thumbnailImageUrl:params.itmeData.thumbnailImageUrl,
                    total:params.itmeData.total,
                    skuCode:params.itmeData.skuCode

                }
                Api.car.addCar(jsons).then(res=>{
                	console.log(jsons)
                    //var category = "baobaoshu"
                   location.href="#cart?edtDbId="+jsons.edtDbId+"&category="+jsons.category;
                },err=>{
                    Toast('添加购物车出错');
                })

			},
			loadMore() {
				  this.loading = true;
			},
			continueEdit(params){ //继续编辑
				var jsons = {};
				//更改再次编辑的书皮的颜色
				console.log(sessionStorage.getItem("bbsSlsectDate"))
				if(sessionStorage.getItem("bbsSlsectDate")){
					jsons = JSON.parse(sessionStorage.getItem("bbsSlsectDate"));
				 	jsons.colorName = this.worklist[params.index].sku.split('.')[1]
				 	jsons.sku  = this.worklist[params.index].sku
				 	jsons.name  = this.worklist[params.index].sku
				 	jsons.skuCode  = this.worklist[params.index].skuCode
				 	jsons.skuId  = this.worklist[params.index].skuId
					jsons.category = this.worklist[params.index].category;
				}else{

					jsons.colorName = this.worklist[params.index].sku.split('.')[1];
					jsons.name = this.worklist[params.index].sku;
					jsons.category = this.worklist[params.index].category;
					jsons.sku  = this.worklist[params.index].sku
				 	jsons.skuCode  = this.worklist[params.index].skuCode
				 	jsons.skuDbId  = this.worklist[params.index].skuDbId
				 	jsons.skuId  = this.worklist[params.index].skuId
				}
				this.getPriceAndGo(params,jsons)

			},
			getPriceAndGo(params,jsons){
				var paramsJson = {
					"category": this.worklist[params.index].category,
					"parameter" : this.worklist[params.index].skuCode
				};
				//请求价格:
				Api.sku.querySku(paramsJson).then((res)=>{
					jsons.price =res.data.price;
					jsons.skuId = res.data.skuId;
				    sessionStorage.setItem("bbsSlsectDate",JSON.stringify(jsons));
				    sessionStorage.setItem('urlQuery', JSON.stringify({"category":""+this.worklist[params.index].category+""}))
					//存入继续编辑页面的id
					if(this.worklist[params.index].category=="shiguangji"){
//						location.href = "#huaceImgs?edtDbid="+this.worklist[params.index].dbId;
						this.$router.push({path:"/huaceImgs",query:{"edtDbid":this.worklist[params.index].dbId}})
					}else{
//						location.href = "#BbsImgs?edtDbid="+this.worklist[params.index].dbId;
						this.$router.push({path:"/BbsImgs",query:{"edtDbid":this.worklist[params.index].dbId}})
					}
				})
			},
	        linkGo(){
				this.vurRouterGo();
			},
			deleteWork(){
				var checkArr = [];
				for (var i = 0; i < this.worklist.length; i++) {
						if (this.worklist[i].isOK) {
							checkArr.push(this.worklist[i])
						}
					}
				if(checkArr.length < 1){
					Toast('请选择要删除的作品');
					return;
				}
				MessageBox({
				  title: '我的作品',
				  message: '您确认删除此数据吗?',
				  showCancelButton: true
				}).then((res)=>{
					if(res=="confirm"){
						var arr = '';
						for (var i = 0; i < this.worklist.length; i++) {
							if (this.worklist[i].isOK) {
								arr+= this.worklist[i].dbId+',';
								this.worklist.splice(i,1);
								i--;
							}
						}
						Api.work.deletWork({dbId:arr,userDbId:localStorage.getItem('userDbId')}).then(res=>{
							if(res.data.code == 'success'){

								Toast('作品删除成功');
								if(this.worklist.length < 1){
									MessageBox.alert('您当前没有任何作品请去创建').then(action => {
				        				location.href=""
									});
								}
							}
						},err=>{
							Toast('请求错误');
						})

					}

				})
			}
		},
		mounted(){
			//var category = 'baobaoshu'
			Indicator.open({text: '作品加载中...',spinnerType: 'fading-circle'});
			var paraJson = {
					userDbId:localStorage.getItem('userDbId'),
					sortField:"createdDt",
					pageSize:15,//每页多少条
					pageNum:this.workPage, //第几页
					order:"desc",
					status : 1,
					category: '' //类型
				};
			//开始默认的时候，去拿我的作品列表
			Api.work.workList(paraJson).then((res)=>{
				this.worklist = res.data.results;
				console.log(this.worklist)
				for (var i = 0; i < this.worklist.length; i++) {
					this.worklist[i].isOK = false;
				}
				Indicator.close();
				console.log(this.worklist)
			})
		}
	}
</script>

<style>
</style>
