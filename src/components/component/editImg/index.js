import loadingComponent from './editImg.vue'

const EditImg={
    install:function(Vue){
        Vue.component('EditImg',loadingComponent)
    }  //'Loading'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default EditImg;