//多图上传模块封装
import MaxImgComponent from './maxImg.vue'

const MaxImg={
    install:function(Vue){
        Vue.component('MaxImg',MaxImgComponent)
    }  
};
export default MaxImg;