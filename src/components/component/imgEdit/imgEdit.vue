<template>
    <transition name="fade">
        <!--<div id="editImg" class="editImg-wrap" :style="{height:`${editorHeight}px`}" v-show="isShow">-->
        <div id="editImg" class="editImg-wrap"  v-show="isShow">
            <mt-header title="图片编辑" v-once>
                <div slot="left">
                    <mt-button @click="restoreImg">撤销</mt-button>
                </div>
                <div slot="right">
                    <mt-button @click="saveEdit">保存</mt-button>
                </div>
            </mt-header>
            <!--<loading ref="editInstance" @imgChanged="imgChanged" @getImageCropper="getImageCropper"></loading>-->
             <div id="editImg" v-once>
		    		<!--dpi校验-->
		    		<div  class="reportNav">		
						！图片像素不足，会导致打印模糊，建议更换图片
				</div>
		
		        <div id="dropBox" class="resumable-drop">
		        </div>
		        <div id="image-cropper">
		            <div class="cropit-preview" @click="selectPreview"></div>
		            <!--大小大滑拉杆儿-->
		            <div class="div_range">
		                <b>小</b><input type="range" class="cropit-image-zoom-input"><b>大</b>
		            </div>
		            <h6 id="h6"></h6>
		            <!--旋转90度-->
		            <div class="rotate_90">
		                <div class="rotate-ccw" @click="rotateCCW">左旋转<i>90°</i></div>
		                <div class="rotate-cw" @click="rotateCW">右旋转<i>90°</i></div>
		            </div>
		        </div>
		    </div>
        </div>
    </transition>
</template>

<script>
//  import {mapMutations} from 'vuex';
//  import getCropitData from '../../service/getCropitData.js';

    let rotationalp = 90,  //旋转度数
        reg = 0, //旋转初始角度
        angu = 0,
        imageCropper, //图片编辑器对象
		isEdit = 0//编辑的缩放比 build().scale
		
    export default {
    		name:"img-edit",
//      data: () => ({
//
//         
//      }),
        data(){
		    	return{
		    		//  editorHeight: window.innerHeight,
		    		isShow: false,
		    		imgData:{}, //编辑图片的数据
		    		isTrueEdit:false,
		    		isEditFlag:false
		    	}
        },
        props: ["isImgEditShow","editorImageData"],      
        methods: {
            restoreImg(){//撤销图片
				
			},
			saveEdit(){//保存
				//获取返回的数据
				var vm = this;
				var jsons = {}
			
				
				if (this.imgData.customParams) { //合并对象
					jsons.postData = $.extend(vm.imgData.customParams,build())
				}else{
				   jsons.postData =build()
				}
				jsons.imgData = imageCropper.cropit('export');
				if(isEdit != build().scale){
					this.isEditFlag = false;
					jsons.postData.cropit = true;
				}else{
					this.isEditFlag = false;
					jsons.postData.cropit = false;
				}
				this.$emit("postData",jsons)
				this.isShow = false;	
				this.isTrueEdit = false;
			},
			selectPreview(){//点击切换图片
				
			},
			rotateCCW(){//左旋转
				imageCropper.cropit('rotateCCW');
				angu = reg -= rotationalp;
				if (angu == -360) {
					angu = 0;
					reg = 0;
				}
			},
			rotateCW(){//右旋转
				angu = reg += rotationalp;
				if (angu == 360) {
					angu = 0;
					reg = 0;
				}
				imageCropper.cropit('rotateCW');

			},
			openEditImg(){
				this.isShow = true;
			    console.log(this.imgData)

//				this.imgData = this.editorImageData;
			},
			cropitImg(){ //设置图片的位置
				this.imgData = this.editorImageData;
//				imageCropper.cropit('rotateCW');
				 //修改图片src
				 imageCropper.cropit('imageSrc', this.imgData.oSrc);
				 //修改图片框大小
				 if (this.imgData.imgSize.oW && this.imgData.imgSize.oH) {
                      imageCropper.cropit('previewSize', { width: this.imgData.imgSize.oW, height: this.imgData.imgSize.oH })                 		
				 }				 
			}
        		
        },
        watch:{
	    		isImgEditShow:"openEditImg",
	    		editorImageData:"cropitImg"
	    },
		mounted(){
			var vm = this;
			this.isShow = this.isImgEditShow

			setTimeout(()=>{
          	 imageCropper = $('#image-cropper').cropit({
	            freeMove: false,
                exportZoom: 1,
                imageBackground: true,
                imageBackgroundBorderWidth: 0,
                  width: 200,
               	  height: 300,
               	  imageState: {
		            src: 'http://scottcheng.github.io/cropit/images/2-960.jpg',
		          },
		          onOffsetChange:function(){
		          	if(!vm.isEditFlag){
		          		build()
//		          		isEdit = build().scale;
		          		vm.isEditFlag = true;
		          	}
		          }
//		          onImageLoaded(){ //图片渲染完毕
//
//		          },
//		          onOffsetChange(){//图片是否编辑过判断和dpi验证的逻辑
//
//		          	if(!vm.isEditFlag){
//		          		isEdit = build().scale;
//		          		vm.isEditFlag = true;
//		          	}		          	
//		          },
//		          onImageError(err){
//		          	alert(err)
//		          }
        		});
          },100)
		}
    }
</script>

<style scoped>
    .editImg-wrap {
        position: fixed;
        width: 100%;
        background: #fff;
        top: 0;
        left: 0;
        z-index: 9999
    }
    
    #editImg {
        font-size: 40px;
        color: #f60;
        text-align: center;
        /*position: relative;*/
		height: 100%;
    }
	#editImg .reportNav{
		text-align: center;
		line-height: 40px;
		color: red;
		font-size: 0.6rem;
		background: rgba(0,0,0,0.3);
	    position: absolute;
	    top: -110px;
	    width: 100%;
		display: none;
	}
    .cropit-preview {
        background-color: #f8f8f8;
        background-size: cover;
        border: 5px solid #ccc;
        border-radius: 3px;

        width: 12.8125rem;
        height: 12.8125rem;

    }

    .cropit-preview-image-container {
        cursor: move;
    }

    .cropit-preview-background {
        opacity: .2;
        cursor: auto;
    }

    .image-size-label {
        margin-top: 10px;
    }

    input, .export {
        /* Use relative position to prevent from being covered by image background */
        position: relative;
        z-index: 10;
        display: block;
    }

    button {
        margin-top: 10px;
    }

    input[type="range"] {
        -webkit-box-shadow: 0 1px 0 0px #424242, 0 1px 0 #060607 inset, 0px 2px 10px 0px black inset, 1px 0px 2px rgba(0, 0, 0, 0.4) inset, 0 0px 1px rgba(0, 0, 0, 0.6) inset;
        margin-top: 2px;
        background-color: #272728;
        border-radius: 15px;
        width: 13.625rem;
        -webkit-appearance: none;
        height: 5px;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        cursor: default;
        top: -2px;
        height: 34px;
        width: 20px;
        transform: translateY(-1px);
        background: none repeat scroll 0 0 #69277e;
        border-radius: 15px;
        -webkit-box-shadow: 0 -1px 1px black inset;
    }

    #image-cropper {
        height: 100%;

    }

    #image-cropper .div_range {
        width: 15.3125rem;
        margin: 0 auto;
        height: 1.1rem;
        line-height: 1.1rem;
    }

    #image-cropper .div_range > b {
        display: inline-block;
        font-size: 0.6875rem;
    }

    #image-cropper .div_range > input {
        display: inline-block;
    }

    #image-cropper .cropit-preview {
        display: block;
        margin: 0 auto;
        margin: 3.09375rem auto 4rem;
        overflow: hidden;
    }

    #image-cropper .rotate_90 {
        width: 13.5625rem;
        height: 2.3125rem;
        line-height: 2.3125rem;
        text-align: center;
        margin: 3.25rem auto 0;
    }

    #image-cropper .rotate_90 > div {
        width: 6.5rem;
        float: left;
        font-size: 0.68rem;
        border: 1px solid #e0e0e0;
    }

    #image-cropper .rotate_90 > div:last-child {
        float: right;
    }

    #image-cropper .rotate_90 > div > i {
        color: #69277e;

    }
</style>