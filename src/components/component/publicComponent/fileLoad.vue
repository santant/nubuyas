<template>
	<div id="fileLoad">
		<!-- 弹出框选上传方式 -->
		<mt-popup class="fileUpload" style="position;relative;" v-model="sheetVisibles" closeOnClickModal="false" position="bottom">
			<ul>
				<li id="browseButton">从本地添加</li>
				<li v-tap="{methods : slectUpload}">从素材库里导入</li>
				<li @click="sheetVisibles=false">取消</li>
			</ul>
		</mt-popup>
		<!-- 弹出框图片素材库 -->
		<mt-popup style="position;relative;" v-model="popupVisible" position="bottom">
			<div class="img_div">
				<ul>
					<li v-tap="{methods : MaterialCheckImg ,index : index}" :class="imgs.activeLi? 'liActive':'' " v-for="(imgs,index) in Material">
						<img :src="imgs.thumbnailUrl">
					</li>
				</ul>
				<div class="btn_button">
					<a class="Determine" v-tap="{methods : okQuery}">确认</a>
				</div>
			</div>
		</mt-popup>
		<!--新增加的上传提示-->
		<div style="display: none;" id="loading_file" class="loading-popup">
			<div class="loading_div">
				<div class="spinner">
				  <div class="spinner-container container1">
				    <div class="circle1"></div>
				    <div class="circle2"></div>
				    <div class="circle3"></div>
				    <div class="circle4"></div>
				  </div>
				  <div class="spinner-container container2">
				    <div class="circle1"></div>
				    <div class="circle2"></div>
				    <div class="circle3"></div>
				    <div class="circle4"></div>
				  </div>
				  <div class="spinner-container container3">
				    <div class="circle1"></div>
				    <div class="circle2"></div>
				    <div class="circle3"></div>
				    <div class="circle4"></div>
				  </div>
				</div>
				<span>上传中...</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast, Actionsheet, Popup, Indicator } from 'mint-ui';
	import Api from '@/api.js'
	export default {
		name: "file-load",
		data() {
			return {
				isOk: true,
				sheetVisibles: false, //组件传递的
				extraPostData: {}, //组件传递的
				popupVisible: false, //素材库显示
				Material: [], //素材库地址
				MaterialImgIndex: 0,
				progressWidth: 0
			}
		},
		props: [
			"sheetVisible",
			"extraPostDatas"
		],
		watch: { //动态监听此方法用来触发组件内部的数据
			sheetVisible: 'countDown'
		},
		methods: {
			countDown() { //监听更新数据
				this.sheetVisibles = true,
					this.extraPostData = this.extraPostDatas
			},
			slectUpload() {

				Indicator.open({
					text: '素材上传中...',
					spinnerType: 'fading-circle'
				});
				$("body").css("overflow", "hidden")
				//素材库地址图片
				var paramJson = {
					format: "json",
					userDbId: localStorage.getItem('userDbId'),
					status: 1,
					pageNum: 0,
					pageSize: 50,
					sort: "uploadDt",
					order: "desc",
					category: ''
				}
				console.log(paramJson)
				Api.Material.MaterialData(paramJson).then((res) => {
					if(res.data.results.length<1){
						this.popupVisible = false;
						this.sheetVisibles = false;
						Toast("素材库为空");
						Indicator.close();
						return
					}
					this.Material = res.data.results;
					this.MaterialImgIndex = 0;
					//添加属性切换属性
					this.Material.forEach((arrJson, i) => {
						arrJson.activeLi = false;
					})
					if(this.Material) {
						this.Material[this.MaterialImgIndex].activeLi = true;
					}

					setTimeout(function() {
						//计算素材库图片的位置
						$(".img_div ul li").each(function(i, el) {
							setTimeout(function() {
								dragThumb($(el).find("img"), $(el));
							}, 100)
						})
					})
					//关闭弹窗
					Indicator.close();
					this.sheetVisibles = false;
					this.popupVisible = true;
					//避免窗口被滑动
					$("body").css("overflow", "inherit")
				},err=>{
                		 Indicator.close();
                    Toast('网络错误!');
                })

			},
			MaterialCheckImg(params) { //选择图片
				this.Material.forEach((arrJson, i) => {
					arrJson.activeLi = false;
				})
				this.MaterialImgIndex = params.index;
				this.Material[this.MaterialImgIndex].activeLi = true;
				$(".img_div ul li").removeClass("liActive")
				$(".img_div ul li").eq(params.index).addClass("liActive")
			},
			okQuery() {
				Indicator.open({
					text: '素材上传中...',
					spinnerType: 'fading-circle'
				});
				var oData = this.Material[this.MaterialImgIndex];
				var jsonDpi = {};
				console.log(this.extraPostData)
				jsonDpi.client = oData.client;
				jsonDpi.channel = oData.channel;
				jsonDpi.category = this.getFromSession("category");
				jsonDpi.pictureDbId = oData.dbId;
				jsonDpi.templateCode = this.extraPostData.templateCode;
				jsonDpi.editCnfName = this.extraPostData.editCnfName;
				jsonDpi.picNum = this.extraPostData.picNum;
				jsonDpi.picPage = this.extraPostData.picPage;
				jsonDpi.styleType = this.extraPostData.styleType;
				jsonDpi.userDbId = localStorage.getItem('userDbId');
				//确认选择
				Api.work.checkDPI(jsonDpi).then(res => {
					console.log(res)
					this.$emit('getImgData', res.data)
					//隐藏两个模块
					this.sheetVisibles = false;
					this.popupVisible = false;
					Indicator.close();
				},err=>{
                		 Indicator.close();
                    Toast('网络错误!');
                })
			}
		},
		mounted() {
			//父组件过来控制显示隐藏的数据
			this.sheetVisibles = this.sheetVisible;

			var oThis = this;

			/* 文件上传init URL */
			var uploadUrl = Api.UPLOAD_URL + '&category=' + this.getFromSession("category");
			//图片上传时提交的参数
			//          var extraPostData = {};

			uploadInitializer($, uploadUrl, onUploadComplete);
			// //文件上传事件
			function onUploadComplete($, r) {
				var browBtn = document.getElementById('browseButton');
				r.assignBrowse(browBtn, false);
				r.on('filesAdded', function(array) {
					if(array.length > 1) {
						$.each(array, function(idx, file) {
							file.chunks = [];
						});
						alert('只能上传一张图片');
						return;
					}
					var ok = validateUploadFiles($, array);
					if(ok) {
						//触发uploadStart
						r.upload();
					} else {
						r.cancel();
					}
				});
				//开始上传
				r.on('uploadStart', function() {
					//组装后端需要的数据
					//console.log(oThis.extraPostData)
					//                  extraPostData  = {"templateCode" : 'templateCode', "client" : 'client', "channel" : 'channel',"picPage":"1","picNum":"1","styleType":"1","editCnfName":"框画"}
					r.opts.query = oThis.extraPostData;
					//打开进度框
//					Indicator.open({
//						text: '图片上传中...',
//						spinnerType: 'fading-circle'
//					});
					$("#loading_file").show();
					//关闭上弹块儿
					oThis.sheetVisibles = false;
				});
				//上传中
				r.on('progress', function(e) {
					var progress = Number(r.progress());
					var progressWidth = progress.toFixed(2) * 100;
					//进度条显示
					//console.log(parseInt(progressWidth))
					if(progressWidth > 0) {
						$("#loading_file .loading_div >span").text("上传中..."+parseInt(progressWidth)+'%');
					}

				});
				r.on('error', function() {
					Indicator.close(); //关闭弹出框
					$("#loading_file").hide();
					Toast('网络错误，上传失败');
				});

				//上传成功
				r.on('fileSuccess', function(file, message) {
					var rObj = $.parseJSON(message);
					if(rObj.pictureDbId) {
						this.sheetVisibles = false;
						//给父级的回调
						oThis.$emit('getImgData', $.parseJSON(message));
					} else {
						Toast('上传图片失败，请重试');
					}
					$("#loading_file").hide();
				});
			}

		},

	}
</script>

<style>

</style>
