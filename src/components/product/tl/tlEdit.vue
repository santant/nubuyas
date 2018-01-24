<template>
	<div id="tlEdit">
		<transition name="fade">
			<div v-if="isImgAlert" class="title_alert">
				<span>🖱️点击上传后的图片可替换图片 ！</span>
			</div>
		</transition>
		<file-load @getImgData="getImg" :extraPostDatas="extraPostData" :sheetVisible="sheetV" ></file-load>
		<mt-header :title="tittle" id='titt'>
		  <router-link to=""  v-tap="{ methods:linkGo }"  slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		  <mt-button icon="" id='nt' v-bind:hidden="finishWork == false" v-tap="{methods:nextFn}"  slot="right">下一步</mt-button>
		  <mt-button icon="" id='gc'  v-tap="{methods:addCar}"  slot="right">加入购物车</mt-button>
		</mt-header>
		<div  class="reportNavEdt">
			！图片像素不足，会导致打印模糊，建议更换图片
		</div>
		<div class="tlEditTop">
			<span>{{size}}</span>
			<span>{{statDt}}</span>
		</div>
		<div class="max">
			<div class="tlEditContent" v-for="(item,index) in taili">
				<div :class="cssName">

					<img @click="imgshow(index)"  class="updateBtn"  :src="imgHost+'static/img/p_sucai_02.jpg'"  alt="" />
					<div class="myImgBox" >
						<img class="showImg" v-tap='{methods:updataImg,indexs:index}' src="" attrImg='' alt="" />
						<span class="editSpan"  v-tap='{methods:editer,indexs:index}'>编辑</span>
					</div>
				</div>
				<img :class="imgName" v-if="item.imgUrl" :src="item.imgUrl" alt="" />
				<div class="tiData">{{item.code}}</div>
			</div>
		</div>

		<i style="height: 2.9375rem; display: block; width: 100%;"></i>
		<!--<div class="addCarBtn" v-bind:hidden="finishWork == true" >加入购物车</div>-->
		<div class="cart_btn">
			<div class="price">
				价格：<span><b>¥</b>{{price}}</span>
			</div>
			<div  v-model="popupVisible" v-tap='{methods:selects}' class="bgrq">
				变更日期
				 <input type="hidden" name="su_id" id="suId" style="opacity: 0;" value="">
				 <input type="hidden" name="wei_id" id="weiId" value="" style="opacity: 0;">
			</div>
			<div v-bind:hidden="finishWork == true" v-tap="{methods:nextFn}" class="crectOrder">
				下一步
			</div>
			<div v-bind:hidden="finishWork == false"  v-tap="{methods:addCar}"  class="crectOrder">
				加入购物车
			</div>
		</div>
		<edit-img  @selectPreview="selectPreview" @editFinish="editFinish"></edit-img>
	</div>

</template>

<script>
	import fileLoad from '../../component/publicComponent/fileLoad.vue'
	import Api from '@/api.js'
	import { Toast,Indicator,MessageBox,Picker,Popup } from 'mint-ui';
//	import {mapGetters, mapActions} from 'vuex'
	export default{
		data(){
			return{
				imgHost:Api.HOST,
				isImgAlert:true,
				taili:[{
					code:"封面"
				}],
				dataArrImg:[],
				tittle:'台历编辑',
				finishWork:false,
				cssName:'',
				imgName:'',
			     popupVisible:false,
				years:'',
				month:'',
				size:'',
				sheetV:false, //组件的开关
				defDbId:'f80b4c98-15ca-4da0-b482-0c8270c2eac6',
				statDt:'',
				extraPostData:{
					category :"taili",
					client :'mobile',
					channel:'',
					userDbId :"",
					picNum : 1,
					styleType : 1,
					editCnfName :'',
					templateCode : '',
					defDbId:''
				},

	          	imgData:'',//图片数据
	          	workEdit:{ //给后端保存或者编辑完成下一步传递的对象
                        format:"json",
                        ignore:"true",
                        operator:"add",
                        edtDbId:'',// 新生成的产品才有的字段
                        tplCode:sessionStorage.getItem('taili_templateCode'), //暂时写死,父组件带入
//                      sessionId:localStorage.getItem("sessionId"),
                        userDbId:localStorage.getItem('userDbId'),
//                      client:"mobile",//渠道前端传递，暂时写死
                        category:this.getFromSession("category"),//产品类型这里是宝宝书
                        defDbId:'', //tplCode 模版暂时写死,父组件带入
                        channelCode:"zc",//暂时写死
                        sku:'',//产品调sku
                        editPicture:[],//产品图片
                        editTxt:[],
                        thumbnailImageUrl:'',//第一板式的第一张缩略图
                        status:2
                  },
                  ImgHashMap:'',//存储图片的hasmap
                  textHashMap:'',
                  extraCode:'',
                  price:'',
                  skuId:'',
                  pageNumber:'',
                  updataImgStr:''
			}
		},
		components:{
	       fileLoad
	    },
		methods:{
			//编辑器点击回传的事件
            selectPreview(){
                //this.imgshow();
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
		                   // _this.years = selectOneObj.value
		                    //_this.month = selectTwoObj.value
		                    _this.fuoundData(_this.years,_this.month);
		                    for(var i=1; i<_this.textHashMap.keys().length; i++){
					      	 	var textMapVal =  _this.textHashMap.getvalue(i+1);
					      	 	//var mon = this.month + i -1;
					      	 	textMapVal.content = this.taili[i].code;
					      	    _this.textHashMap.putvalue(i+1,textMapVal)
					      	 	console.log( _this.textHashMap)
					      	 }

		                }
		        });
		  	 },

			imgshow(index){ //显示上传
				this.sheetV =!this.sheetV;
				this.extraPostData.picPage = index+1;
				this.updataImgStr = 'upLoad';


			},
			updataImg(params){
				if(this.finishWork == false){
					this.sheetV =!this.sheetV;
					this.extraPostData.picPage = params.index+1;
					this.updataImgStr = 'change';
					this.pageNumber = params.indexs + 1;
				}

			},
			editer(params){
				$(".reportNavEdt").hide();
				this.pageNumber = params.indexs + 1;
				var editData={//编辑图片都数据
	                    oSrc:'',
	                    imgSize: {oW:'', oH: ''},
	                    actions:{},
	                    customParams:{
	                        thumbnailScale:''
	                }
	          	}
			   if ($(params.event.target).hasClass("editSpan")) {

				editData.oSrc='';
				editData.oSrc = this.ImgHashMap.getvalue(params.indexs+1).thumbnailImageUrl;
				editData.picNum = params.indexs+1;
		   		editData.imgSize = {
		   			oW: $('.myImgBox').width(),
		   			oH: $('.myImgBox').height()
		   		};
		   		editData.customParams = {
		   			thumbnailScale:this.ImgHashMap.getvalue(params.indexs+1).actions.thumbnailScale,
		   			picPage:params.indexs+1,
		   			dpi:this.ImgHashMap.getvalue(params.indexs+1).actions.dpi
		   		}
//		   		editData.actions.minDpiHeight = this.ImgHashMap.getvalue(params.indexs+1).actions.minDpiHeight;
//				editData.actions.minDpiWidth = this.ImgHashMap.getvalue(params.indexs+1).actions.minDpiWidth;
				editData.actions = this.ImgHashMap.getvalue(params.indexs+1).actions;
				editData.actions.thumbnailScale = this.ImgHashMap.getvalue(params.indexs+1).actions.thumbnailScale;
				editData.actions.dpi = this.ImgHashMap.getvalue(params.indexs+1).actions.dpi;
				console.log(this.ImgHashMap.getvalue(params.indexs+1))
				console.log('editData',editData)
				this.editorImage(editData);
			   }
			},
			 getImg(val){ //获取组件图片
			 	if(val.dpi== 'false'){
					$(".reportNavEdt").show();
				}else{
					$(".reportNavEdt").hide();
				}
			 	if(this.updataImgStr =="change"){
			 		$('.showImg').eq(this.pageNumber-1).attr('src',val.previewThumbnailImageUrl);
					$('.showImg').eq(this.pageNumber-1).attr('attrImg',val.thumbnailUrl);//存原图
					//更新数据
					this.updataImgData(val,this.pageNumber-1);

				}else{
					$('.showImg').eq(val.picPage-1).attr('src',val.previewThumbnailImageUrl);
					$('.showImg').eq(val.picPage-1).next('span').show();
					$('.showImg').eq(val.picPage-1).parent('.myImgBox').show();
					$('.showImg').eq(val.picPage-1).attr('attrImg',val.thumbnailUrl);//存原图
					$('.updateBtn').eq(val.picPage-1).hide();
					//更新数据
					this.updataImgData(val,val.picPage-1);
				}

			},
			updataImgData(val,page){
				console.log('val----',val)
				var picObj = {
				 	"constName":page+1,
				 	"picDbId" : val.pictureDbId,
				 	"page" :page+1,
				 	"editCnfIndex" :val.styleType,
				 	"num" : val.picNum,

				 	actions : {
				 	 	"thumbnailScale":val.thumbnailScale,
				 	 	"minDpiHeight":val.minDpiHeight,
				 	 	"minDpiWidth":val.minDpiWidth,
				 	 	'dpi':val.dpi
				 	 },
                     "thumbnailImageUrl":val.thumbnailUrl,
                     "previewThumbnailImageUrl" :val.previewThumbnailImageUrl,
                     "cropit" : "false",
                     "editCnfName" : val.editCnfName,
                      "userDbId":val.userDbId
				 };

				 this.ImgHashMap.putvalue(page+1,picObj)
				 var tl_code = this.taili[page].code;
				 var textMapVal = {"content":tl_code,"page":page+1,"num":1,"editCnfIndex":val.styleType,"editCnfName" : val.editCnfName};
				 this.textHashMap.putvalue(page+1,textMapVal)
			},
			editFinish(data){
				console.log('data打开编辑器',data)
				if(data.postData.dpi== 'false'){
					$(".reportNavEdt").show();
				}else{
					$(".reportNavEdt").hide();
				}
				var imgBox = $('.showImg').eq(data.postData.picPage-1);
				imgBox.attr('src',data.imgData);
				imgBox.css(
					{width:"100%",height:"100%",top:0,left:0}
				);
				console.log(this.ImgHashMap.getvalue(data.postData.picPage).actions)
				this.ImgHashMap.getvalue(data.postData.picPage).actions = data.postData;
//				console.log(this.ImgHashMap.getvalue(data.postData.picPage))
			},
			//调起编辑图片组件
			 editorImage(jsons){
	            console.log('宽高',jsons)
	            console.log('207',this.ImgHashMap.getvalue(1))
	            this.$store.commit(
	                'showEditor',
	                {
	                    imgSrc: jsons.oSrc,
	                    imgSize: {width: jsons.imgSize.oW, height:  jsons.imgSize.oH},
	                    initialCrop:jsons.actions,
	                    customParams:{
	                        thumbnailScale:jsons.customParams.thumbnailScale,
	                        picPage:jsons.customParams.picPage,
	                        dpi:jsons.customParams.dpi
	                    }
	                }
	            )
	      },
		fuoundData(year,month){
			 	this.taili=[{
					code:"封面"
				}];
			 	for(var i=0; i<12; i++){

			 		if((parseInt(month)+i) > 12){
			 			var obj = {
			 				code:(parseInt(year)+1)+'年'+((parseInt(month)+i) - 12)+"月",
			 				year:(parseInt(year)+1),
			 				month:((parseInt(month)+i) - 12)
			 			}
			 			this.taili.push(obj);
			 		}else{
			 			var obj = {
			 				code:year+'年'+(parseInt(month)+i) +"月",
			 				year:year,
			 				month:(parseInt(month)+i)
			 			}
			 			this.taili.push(obj);
			 		}
			 	}
			 	this.statDt = this.taili[1].code;
			 	//return codeArr;
			 },
			nextFn(){
				 var arrMap = []; //台历图片
				 var textMap = [];
				 if(this.ImgHashMap.keys().length < 13){
				 	Toast('图片上传不完整!');
				 	return;
				 }
				 $('.bgrq').hide();
				 $('.updateBtn').hide();
				 $('.reportNavEdt').hide();

				this.tittle = '台历预览'
				 for (var i = 0; i < this.ImgHashMap.keys().length; i++) {
					var picObject = this.ImgHashMap.getvalue(this.ImgHashMap.keys()[i]);
					//console.log(picObject)
					if(picObject.thumbnailImageUrl){
						arrMap.push(this.ImgHashMap.getvalue(this.ImgHashMap.keys()[i]));
					}else{
						Toast('第'+(picObject.page)+'页图片上传不完整!');
					}
                    //if (this.ImgHashMap.getvalue(this.ImgHashMap.keys()[i])) {
                    //    arrMap.push(this.ImgHashMap.getvalue(this.ImgHashMap.keys()[i]));
                    //}
                }
				for(var j = 0; j<this.textHashMap.keys().length; j++){
					if(this.textHashMap.getvalue(this.textHashMap.keys()[j])){
						textMap.push(this.textHashMap.getvalue(this.textHashMap.keys()[j]))
					}

				}
				this.workEdit.sku = this.skuName;
				this.workEdit.skuCode = this.skuCode;
				if(this.skuId == undefined || this.skuId == 'undefined'){
					this.workEdit.skuId ='';
				}else{
					this.workEdit.skuId = this.skuId;
				}

				this.workEdit.editPicture = JSON.stringify(arrMap);
				this.workEdit.editTxt = JSON.stringify(textMap);

                $('.editSpan').hide();
				Indicator.open({text: '作品保存中...',spinnerType: 'fading-circle'});

                Api.work.workEdit(this.workEdit).then((res)=>{
                		if(res.data.code == 'success'){
                			this.finishWork = !this.finishWork;
                			$('#gc').show();
                			$('#nt').hide();
                			this.extraCode = res.data.extraCode;
                			this.workEdit.thumbnailImageUrl=res.data.commandTitle;
                			Indicator.close();
                			if($('.tl_img_195X145').attr('src')){
                				$('.tl_img_195X145').css({
				        			'display':'block'
				        		})
                			}else{
                				for(var i=1; i<	this.taili.length; i++ ){
			               		this.taili[i].imgUrl = ''+Api.HOST+'static/img/taili/taili_'+this.size+'/'+this.taili[i].year+this.taili[i].month+'.jpg'
			               	}
//
			              	 $('.max').append("<img class=\""+this.imgName+"\" src=\""+Api.HOST+"static/img/taili/taili_"+this.size+"/end.jpg\" />");

                			}


                		}
                },err=>{
                			Indicator.close();
                })
              	//console.log(this.workEdit)
			},
			addCar(){
				Indicator.open({text: '添加购物车...',spinnerType: 'fading-circle'});

				var jsons = {
                    operator:"add",
//                  sessionId:localStorage.getItem("sessionId"),
                    userDbId:localStorage.getItem("userDbId"),
                    client:"mobile",//渠道前端传递，暂时写死
                    category:this.getFromSession("category"),//产品类型这里是宝宝书,暂时写死
                    edtDbId:	this.extraCode,
                    price:this.price,
                    num:1,
                    discount:'',
                    channelCode:"zc",
                    opSystem:'',
                    thumbnailImageUrl:this.workEdit.thumbnailImageUrl,
                    total:this.price,
                    sku : this.skuName,
                    skuCode : this.skuCode
                }

                Api.car.addCar(jsons).then(res=>{
                    //var category = "baobaoshu"
                    Indicator.close();
          			this.$router.push( { path : '/cart', query : { 'edtDbId' : this.extraCode, 'category' : this.getFromSession("category")}});
                   // location.href="#cart?edtDbId="+this.extraCode+"&category="+this.getFromSession("category");

                },err=>{
                	 	Indicator.close();
                    Toast('添加购物车出错');
                })
			},
	        linkGo(){
	        	if(this.finishWork == true){
	        		$('.tl_img_195X145').css({
	        			'display':'none'
	        		})
	        		$('.tl_img_145X195').css({
	        			'display':'none'
	        		})
	        		$('.editSpan').show();
	        		$('#nt').show();
	        		$('#gc').hide();
	        		this.finishWork = !this.finishWork;
	        		this.tittle = '台历编辑'
	        	}else{
	        		MessageBox({
					  title: '台历编辑',
					  message: '返回将清空所有数据是否确认返回?',
					  showCancelButton: true
					}).then((res)=>{
						if(res=="confirm"){this.vurRouterGo();}else{return}

					})
	        	}


			}
		},
		mounted(){
			this.years = this.$route.query.years;
			this.month = this.$route.query.month;
			this.size = this.$route.query.size;
			this.type = this.$route.query.type;
			this.price = this.$route.query.price;
			this.cssName = 'tl_'+this.size;
			this.imgName = 'tl_img_'+this.size;
			this.fuoundData(this.years,this.month);
			this.statDt = this.taili[1].code;
			this.extraPostData.defDbId = this.defDbId;
			this.extraPostData.templateCode = sessionStorage.getItem('taili_templateCode');
			this.extraPostData.editCnfName = sessionStorage.getItem('taili_editCnfName');
			this.extraPostData.defDbId = this.defDbId;
			this.extraPostData.userDbId = localStorage.getItem("userDbId");
			this.ImgHashMap = new HashMap(); //图片
			this.textHashMap = new HashMap();//文字
			this.skuName = sessionStorage.getItem('taili_skuName');
			this.skuCode = sessionStorage.getItem('taili_skuCode');
			this.skuId = this.$route.query.skuId;
			$('#gc').hide();


			//5秒钟隐藏
			setTimeout(()=>{
				this.isImgAlert = false;
			},5000)
		}
	}
</script>

<style>
</style>
