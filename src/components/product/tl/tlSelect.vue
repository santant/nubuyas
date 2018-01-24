<template>
	<div id="bbs-select">
		<mt-header title="选择产品">
		  <router-link to="" href="javascript:window.history.go(-1);" v-tap slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		</mt-header>
		<div class="bbsImg bbsImgTl">
			<img v-model="imgUrl" :src="imgUrl"/>
		</div>


		<dl class="slect_dl">
			<dt>
				选择日期
			</dt>
			<dd>
				<!-- v-tap='{methods:selects}'-->
				<div v-model="popupVisible" v-tap='{methods:selects}'  class="dd_slect date dd_slectWidth">
					 <input type="hidden" name="su_id" id="suId" style="opacity: 0;" value=""> {{years}}年
				</div>
				<div v-model="popupVisible" v-tap='{methods:selects}' class="dd_slect date dd_slectWidth ">
					<input type="hidden" name="wei_id" id="weiId" value="" style="opacity: 0;">   {{month}}月
				</div>

			</dd>
		</dl>
		<dl class="slect_dl">
			<dt>
				选择尺寸
			</dt>
			<dd>
				<div data-code= '195X145'  v-tap='{methods:updateSize}' class="dd_slect size dd_slectWidth dd_active">
					195mmX145mm
				</div>
				<div data-code= '145X195' v-tap='{methods:updateSize}' class="dd_slect size dd_slectWidth ">
					145mmX195mm
				</div>

			</dd>
		</dl>
		<dl class="slect_dl">
			<dt>
				选择颜色
			</dt>
			<dd>
				<div data-code= 'white' v-tap='{methods:updateType}'  class="dd_slect type dd_slectWidth dd_active">
					白色
				</div>
				<div data-code= 'coffee' v-tap='{methods:updateType}' class="dd_slect type dd_slectWidth ">
					咖啡色
				</div>

			</dd>
		</dl>
		<!--<mt-popup style='width: 100%;' v-model="popupVisible" popup-transition="popup-up" position="bottom">
			<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
		</mt-popup>-->

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
	import selectTl from '../../../../static/js/selectTl.js'
	import { Toast,Indicator,MessageBox,Picker,Popup } from 'mint-ui';
//	import {mapGetters, mapActions} from 'vuex'
	export default{
		data(){
			return{
				years:'2018',
				month:1,
				skuCode:'',
				skuName:'',
				sizeCode:'',
				colorCode:'',
				bbs:{
					},
				bbsSlsectDate:{ //给后端传递的数据

				},
				price:"", //价格,
				popupVisible:false,
				size:'',//选择台历的尺寸
				type:'',//选择的颜色类型
				imgUrl:'',//显示台历样式的图片数据
				skuId:''
			}
		},
		methods:{
		   nextPage(){
//		   		location.href="#tlEdit?years="+this.years+'&month='+this.month+'&size='+this.sizeCode+'&type='+this.type+'&price='+this.price+'&skuId='+this.skuId;
		  		this.$router.push({path:"/tlEdit",query:{"years":this.years,"month":this.month,"size":this.sizeCode,"type":this.type,"price":this.price,"skuId":this.skuId}})
		   },
		   selects(){
			var _this = this

			 var sanguoSelect = new IosSelect(2,
	            [suData, weiData],
	            {
	                title: '选择日期',
	                itemHeight: 35,
	                oneLevelId: suId,
	                twoLevelId: weiId,
	                callback: function (selectOneObj, selectTwoObj) {
	                		if(selectOneObj.value == 2018){
	                			 _this.years = selectOneObj.value
	                			_this.month = 1;
	                		}else{
	                			 _this.years = selectOneObj.value
	                   		 _this.month = selectTwoObj.value
	                		}
	                    //_this.years = selectOneObj.value
	                   	//_this.month = selectTwoObj.value

	                }
	        });
		   },
		   updateSize(params){
		   	this.size = $(params.event.target).text();
		   	this.sizeCode = $(params.event.target).attr('data-code');
		   	this.initStyle();
		   	$(params.event.target).addClass('dd_active').siblings().removeClass('dd_active')
		   },
		   updateType(params){
		   	this.type = $(params.event.target).text();
		   	this.colorCode = $(params.event.target).attr('data-code');
		   	this.initStyle();
		   	$(params.event.target).addClass('dd_active').siblings().removeClass('dd_active')
		   },
		   trimStr(str){//字符串去空格
				return str.replace(/(^\s*)|(\s*$)/g,"");
			},
			initStyle(){//初始化数据
				var size = this.trimStr(this.size);
				var type = this.trimStr(this.type);
				var imgUrl = selectTl.init.selectK(size,type);
				this.imgUrl = imgUrl;
				this.skuName = "台历."+ size+'.'+type;
				this.templateCode = 'taili_'+this.sizeCode;
				this.skuCode = 'taili.'+this.sizeCode+'.'+this.colorCode;
				sessionStorage.setItem('taili_skuName',this.skuName);
				sessionStorage.setItem('taili_templateCode',this.templateCode);
				sessionStorage.setItem('taili_editCnfName',this.templateCode + '_single');
				sessionStorage.setItem('taili_skuCode',this.skuCode);
				var paramsJson = {
						"category": this.getFromSession("category"),
						"parameter" : this.skuCode
					};
				 	//请求价格:
				Api.sku.querySku(paramsJson).then((res)=>{
					console.log(res)
					 this.price = res.data.price;
					 //this.bbsSlsectDate.price = res.data.price;
					 this.skuId = res.data.skuId;
					 sessionStorage.setItem("TlPrice",this.price)
				})
			},
			 editorImage(jsons){
                this.$store.commit(
                    'showEditor',
                    {
                        imgSrc: jsons.oSrc,
                        imgSize: {width: jsons.oW, height: jsons.oH},
                        initialCrop:jsons.actions,
                        customParams:{
                            thumbnailScale:jsons.thumbnailScale
                        }
                    }
                )
            }
		},
		mounted(){
			this.addToSession();

			this.size = this.trimStr($('.size:nth-child(1)').text());
			this.type = this.trimStr($('.type:nth-child(1)').text());
			this.sizeCode = $('.size:nth-child(1)').attr('data-code');
			this.colorCode = $('.type:nth-child(1)').attr('data-code');
			this.initStyle();


		}
	}
</script>

<style>

</style>
