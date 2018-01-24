var data{
		CaseData:'',
		size:'',
		type:'',
		sheetV:false, //组件的开关
		imgData:'',
		defDbId:'6afedcf6-b0e4-447d-afd9-c70449f42f50',
		sizeCode:'',
		typeCode:'',
		skuCode:'',
		skuName:'',
		extraCode:'',
		price:'',
		extraPostData:{
			category :"kuanghua",
			client :'mobile',
			channel:'',
			userDbId :"", 
			picPage : 1,
			picNum : 1,
			styleType : 1,
			editCnfName :'',
			templateCode : '',				
			defDbId:''
		},
		 workEdit:{ //给后端保存或者编辑完成下一步传递的对象
                format:"json",
                ignore:"true",
                operator:"add",
                edtDbId:'',// 新生成的产品才有的字段
                tplCode:this.templateCode, //暂时写死,父组件带入
                userDbId:localStorage.getItem('userDbId'),
                category:this.getFromSession("category"),//产品类型这里是宝宝书
                defDbId:'', //tplCode 模版暂时写死,父组件带入
                channelCode:"zc",//暂时写死
                sku:'',//产品调sku
                editPicture:[],//产品图片
                thumbnailImageUrl:'',//第一板式的第一张缩略图
                status:2
           },
	  editData:{//编辑图片都数据
                oSrc:'',
                imgSize: {oW:'', oH: ''},
                actions:'',
                customParams:{
                    thumbnailScale:''
                }
      	 },
       finishWork:false,
       oldImgData:'',
       skuId:''
	}
export default {	
  	init:{
		nextGoCar:function(){
				if($("#showImg").attr('src')){
				
					this.finishWork = !this.finishWork;
					this.workEdit.defDbId = this.defDbId;
					if(this.editData.actions){
						this.workEdit.editPicture[0].actions = this.editData.actions ;
					}
					//this.workEdit.editPicture[0].actions = this.editData.actions ;
					this.workEdit.editPicture = '['+JSON.stringify(this.workEdit.editPicture[0])+']';
					this.workEdit.sku = this.skuName;
					this.workEdit.skuCode = this.skuCode;
	
					if(this.skuId == undefined){
						this.workEdit.skuId ='';
					}else{
						this.workEdit.skuId = this.skuId;
					}
				   Api.work.workEdit(this.workEdit).then((res)=>{
				   	this.extraCode = res.data.extraCode;
				   	this.workEdit.thumbnailImageUrl = res.data.commandTitle;
				   	console.log(res.data)
				   
				   })
			  }else{
			  	Toast('请先上传图片');
			  }
		}
		getImg:function(val){ //获取组件图片
				this.oldImgData = val;
				$('#showImg').attr('src',val.previewThumbnailImageUrl);
				$('.imgBox').show();
				$('#updateBtn').show();			
				$('#showImg').attr('attrImg',val.thumbnailUrl);//存原图
				this.imgData = val;
				var picObj = {
				 	"constName":'1_1',
				 	"picDbId" : val.pictureDbId,
				 	"page" :val.picPage,
				 	"editCnfIndex" :val.styleType,
				 	"num" : val.picNum,
				 	 actions : {
				 	 	"thumbnailScale":val.thumbnailScale,
				 	 	"minDpiHeight":val.minDpiHeight,
				 	 	"minDpiWidth":val.minDpiWidth
				 	 },
                     "thumbnailImageUrl":val.thumbnailUrl, 
                     "previewThumbnailImageUrl" :val.previewThumbnailImageUrl,
                     "cropit" : "false",
                     "editCnfName" : val.editCnfName,
                     "userDbId":val.userDbId
				 };
				 this.workEdit.editPicture.push(picObj);
				 this.workEdit.thumbnailImageUrl = val.thumbnailUrl;
				 this.workEdit.tplCode = this.extraPostData.templateCode; 	 
			}
			updataType:function(params){//选择框型
				this.type = $(params.event.target).text();
				$(params.event.target).addClass('dd_active').siblings().removeClass('dd_active');
				this.typeCode = $(params.event.target).attr('data-code');
				this.initStyle();				
			}
			updataSize:function(params){//选择尺寸
				this.size = $(params.event.target).text();
				$(params.event.target).addClass('dd_active').siblings().removeClass('dd_active');
				this.sizeCode =  $(params.event.target).attr('data-code');
				this.initStyle();	

			}
		
  	}
}