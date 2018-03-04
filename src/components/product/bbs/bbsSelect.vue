<template>
	<div id="bbs-select">
		<mt-header title="选择产品">
		  <router-link to="" href="javascript:window.history.go(-1);" v-tap slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		</mt-header>
		<div class="bbsImg">
			<img :src="imgHost+'static/img/bbs.png'"/>
		</div>
			<dl v-for="(item,index1) in bbs.attributes"  class="slect_dl">
				<dt>
					{{item.name}}选择
				</dt>
				<dd>
					<div v-for="(elements,index2)  in item.attributeValues"  :data-name="elements.name" :data-code="elements.code" v-tap="{methods : check,index1:index1,index2:index2}"  :class="elements.colorF? 'dd_slect dd_slectWidth dd_active' : 'dd_slect dd_slectWidth '"><b  v-bind:style="{background:elements.attr}" v-if="item.code =='color'"></b>{{elements.name}}</div>
				</dd>
			</dl>

		<i style="height: 2.9375rem; display: block; width: 100%;"></i>
		<div class="cart_btn">
			<div class="price">
				价格：<span><b>¥</b>{{price}}</span></div>
			<div  v-tap="{methods : nextPage}" class="crectOrder">
				下一步
			</div>
		</div>
	</div>
</template>

<script>
	import Api from '@/api.js'
	import { Toast,Indicator,MessageBox} from 'mint-ui';
//	import {mapGetters, mapActions} from 'vuex'
	export default{
		data(){
			return{
				imgHost:Api.HOST,
				bbs:{
				},
				bbsSlsectDate:{ //给后端传递的数据

				},
				price:0 //价格
			}
		},
		methods:{
			fnd(){
				this.$router.push({ path: 'register', query: { plan: 'private' }})
			},
			check(params){ //切换选项
				for (var i = 0; i < this.bbs.attributes.length; i++) {
						for (var j = 0; j < this.bbs.attributes[i].attributeValues.length; j++) {
							this.bbs.attributes[i].attributeValues[j].colorF = false;
							this.bbs.attributes[params.index1].attributeValues[params.index2].colorF = true;
						}
				}
				$("#bbs-select .slect_dl").eq(params.index1).find("dd .dd_slectWidth").eq(params.index2).addClass("dd_active").siblings().removeClass("dd_active");
				//在次计算价格
				this.getPrice($("#bbs-select .slect_dl > dd .dd_active"));
			},
			checkColor(data,num){ //切换选项
				for (var i = 0; i < data.length; i++) {
						for (var j = 0; j < data[i].attributeValues.length; j++) {
							data[i].attributeValues[j].colorF = false;
							data[i].attributeValues[num].colorF = true;
						}
				}
			},
			nextPage(){//下一页
				//location.href="#BbsImgs"
				this.$router.push( { path : '/BbsImgs' } );
			},
			getPrice(dom){//获得页面的价格
					this.bbsSlsectDate={};
					//获得页面的颜色
				 	this.bbsSlsectDate.colorName = dom.eq(0).text().trim();
					var dataCode = '';//请求价格需要的参数
					var dataCode2 = '';//后端需要的参数
					dom.each(function(index,el){
						dataCode+=$(this).attr("data-code")+'.'
						dataCode2+=$(this).attr("data-name")+'.'
					})
					console.log(dataCode)
					console.log(dataCode2)
					//组装后端需要的数据暂存浏览器
					this.bbsSlsectDate.name = this.bbs.name+'.'+dataCode2;
					this.bbsSlsectDate.skuCode = this.getFromSession("category")+'.'+dataCode;
					this.bbsSlsectDate.category = this.getFromSession("category"); //类型字段
					//console.log(this.getFromSession("category"))
					var paramsJson = {
						"category": this.getFromSession("category"),
						"parameter" : dataCode
					};
				 	//请求价格:
					Api.sku.querySku(paramsJson).then((res)=>{
						//价格计算
						 this.price = res.data.price;
						 this.bbsSlsectDate.price = res.data.price;
						 this.bbsSlsectDate.skuId = res.data.skuId;
						 sessionStorage.setItem("bbsSlsectDate",JSON.stringify(this.bbsSlsectDate))
					})
			}
		},
		mounted(){
			var This = this;
      this.addToSession();
			//宝宝书选择作品
			Indicator.open({text: '页面加载中...',spinnerType: 'fading-circle'});
			var paraAttributeJson = {
				category: this.getFromSession("category"), //类型
				client:'mobile'
			};
			Api.sku.queryAttributes(paraAttributeJson).then((res)=>{
				//添加1个titleName
				 sessionStorage.setItem('titleName',res.data.name);
				 this.bbs= res.data;
				 //给数据里面添加1个判断class的对象
				 this.checkColor(this.bbs.attributes,0)
				 Indicator.close();
				 //默认的价格
				 setTimeout(function(){
				 	This.getPrice($("#bbs-select .slect_dl > dd .dd_active"))
				 },100)
			});
			//开始默认的时候，去拿我的作品列表判断是否有未完成的作品
			this.bbsSlsectDate.category =this.getFromSession("category"); //类型字段

			var paraJson = {
				userDbId:localStorage.getItem('userDbId'),
				status:1, //未完成1，已经完成2
				sortField:"createdDt",
				pageSize:15,//每页多少条
				pageNum:0, //第几页
				order:"desc",
				category: this.getFromSession("category") //类型
			};

			Api.work.workList(paraJson).then((res)=>{
				if (res.data.results.length>0) {
//					MessageBox({
//					  title: '我的作品',
//					  message: '您有未完成的作品,需要继续编辑吗?',
//					  confirmButtonText:'编辑未完成作品',
//					  cancelButtonText:'创建新作品',
//					  showCancelButton: true
//					}).then((res)=>{
//						if(res=="confirm"){//有未完成的作品
//							//跳转到未完成的页面去
//							this.$router.push({path:"/workList"})
//						}
//					})
				};
			})
			//监听浏览器返回
			window.addEventListener("popstate", function(e) {
		       MessageBox.close();
		    }, false);


		}
	}
</script>

<style>
</style>
