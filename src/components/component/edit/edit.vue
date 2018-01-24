<template>
    <div id="editImg" v-once>
    		<transition name="fade">
			<div  class="title_alert title_alert_edit" style="display: none; background:rgba(0,0,0,0.28);top:40px;">
				<span>🖱️ 图片可上下左右滑动裁切！</span>
			</div>
		</transition>
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
            <!--旋转90度-->
            <div class="rotate_90">
                <div class="rotate-ccw" @click="rotateCCW">左旋转<i>90°</i></div>
                <div class="rotate-cw" @click="rotateCW">右旋转<i>90°</i></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import getCropitData from '../../service/getCropitData.js';
    import { Indicator } from 'mint-ui';

    let imageCropper,
        imgIsChanged = false,
        restoreData,
        rotationalp = 90,
        reg = 0,
        angu = 0
    ;

    export default {
        data() {
            return {
             
            }
        },
        methods: {
            ...mapMutations(['selectPreview']),
            cropitImg({scale, rotate, x, y}){

                let image = document.querySelector(".cropit-preview-image"),
                    transform = image.style.transform,
                    currentDeg = +transform.match(/rotate\((\d+)deg\)/)[1];
                if (scale !== undefined && rotate !== undefined && x !== undefined && y !== undefined) {
                	imageCropper.cropit('imageSrc', "");
                    //设置图像的加载缩放
                    imageCropper.cropit('zoom', scale);
                    //旋转角度
                    while (currentDeg !== rotate) {
                        if (currentDeg < rotate) {
                            imageCropper.cropit("rotateCW");
                        } else {
                            imageCropper.cropit("rotateCCW");
                        }
                        transform = image.style.transform;
                        currentDeg = +transform.match(/rotate\((\d+)deg\)/)[1];
                    }
                    //重新换算位置
                    //alert(0)
                    imageCropper.cropit('offset', {
                        x: -x * scale,
                        y: -y * scale
                    });
                }
            },
            restore(){
                this.cropitImg(restoreData);
            },
            getRestoreData(){
                if (this.initialCrop && this.initialCrop.x) {
                    restoreData = this.initialCrop;
                } else {
                    restoreData = getCropitData();
                }
            },
            imgChanged(){
                if (!imgIsChanged) {
                    this.$emit('imgChanged');
                    imgIsChanged = true;
                }
            },
            rotateCW(){
                angu = reg += rotationalp;
                if (angu == 360) {
                    angu = 0;
                    reg = 0;
                }
                imageCropper.cropit('rotateCW');
                this.imgChanged();
            },
            rotateCCW(){
                imageCropper.cropit('rotateCCW');
                angu = reg -= rotationalp;
                if (angu == -360) {
                    angu = 0;
                    reg = 0;
                }
                this.imgChanged();
            }
        },
        computed: mapState({
            imgSrc: ({editImgModule}) => editImgModule.imgSrc,
            imgSize: ({editImgModule}) => editImgModule.imgSize,
            initialCrop: ({editImgModule}) => editImgModule.initialCrop
        }),
        watch: {
            imgSrc(val, oldVal) {
                if (val) {

//                  Indicator.open();
                    const {
                        imgSize
                    } = this;
                    if (imgSize.width && imgSize.height) {
                        imageCropper.cropit('previewSize', imgSize);
                    }
                    imageCropper.cropit('imageSrc', val);
                }
            }
        },
        mounted() {

            const vm = this;
            //图片裁切
            imageCropper = $('#image-cropper').cropit({
                freeMove: false,
                exportZoom: 1,
                imageBackground: true,
                imageBackgroundBorderWidth: 0,
                width: 200,
                height: 200,
                onImageLoaded(){
//                  Indicator.close();
                    let {initialCrop} = vm;
                    vm.cropitImg(initialCrop);

                    vm.getRestoreData();
					$('.title_alert_edit').show();
					setTimeout(function(){
						$('.title_alert_edit').hide();
					},5000)
                    imgIsChanged = false;
                    
                },
                onOffsetChange(){               		
                   vm.imgChanged();
                    var imgObj = build();
                    //dpi 检验
                    var dpiImg = vm.$store.state.editImgModule.initialCrop;
                    var scale = dpiImg.thumbnailScale; 
					var imgWidth = imgObj.width/scale; 
					var imgHeight= imgObj.height/scale;
					var minDpiWidth = dpiImg.minDpiWidth;
					var minDpiHeight = dpiImg.minDpiHeight;	
					
					if(imgWidth < minDpiWidth || imgHeight < minDpiHeight){ 
						vm.$store.commit('checkDPiFalse');
						$(".reportNav").show();
					}else{
						vm.$store.commit('checkDPiTrue');
						$(".reportNav").hide(); 	
					} 
					 
                },
                onZoomChange(){
                    vm.imgChanged();
                }
            });
            this.$emit('getImageCropper', imageCropper);
        }
    }
</script>

<style scoped>
    #editImg {
        font-size: 40px;
        color: #f60;
        text-align: center;
        position: relative;

    }
	#editImg .reportNav{
		text-align: center;
		line-height: 40px;
		color: red;
		font-size: 0.6rem;
		background: rgba(0,0,0,0.3);
	    position: absolute;
	    top: -3.4rem;
	    width: 100%;
		display: none;
		z-index: 999;
	}
    .cropit-preview {
        background-color: #f8f8f8;
        background-size: cover;
        border: 2px solid #ccc;
        width: 12.8125rem;
        height: 12.8125rem;
		border-radius: 2px;
	    /*-webkit-box-shadow: 0 10px 6px -6px #777;*/
	    /*-moz-box-shadow: 0 10px 6px -6px #777;*/
	    box-shadow: 0 10px 6px -6px #777;
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