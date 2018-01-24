<template>
	<div id="huace">
		<MaxImg :data-img="dataImg"></MaxImg>
	</div>
</template>

<script>
import Api from '@/api.js'
import { Swipe, SwipeItem,Indicator } from 'mint-ui';
export default {
  data () {
    return {
	    dataImg:{ //img
	      	 imgArrType:[
                huaCeData.bbs1,
                huaCeData.bbs3,
                huaCeData.bbs3,
                huaCeData.bbs3,
                huaCeData.bbs4,
                huaCeData.bbs5,
                huaCeData.bbs5,
                huaCeData.bbs3,
                huaCeData.bbs3,
                huaCeData.bbs4,
                huaCeData.bbs3,
                huaCeData.bbs3,
                huaCeData.bbs3,
                huaCeData.bbs4,
                huaCeData.bbs4,
                huaCeData.bbs3,
                huaCeData.bbs3,
                huaCeData.bbs6,
                huaCeData.bbs6,
                huaCeData.bbs3,
                huaCeData.bbs4,
                huaCeData.bbs3,
                huaCeData.bbs3,
                huaCeData.bbs3
            ],
	      	 imgArrTypeData:huaCeData, //传递板式的对象
	      	 imgArrLome:[],
	      	 mobanArr:[
                Api.HOST+"static/img/huace/style/huace_banshi01.jpg",
                Api.HOST+"static/img/huace/style/huace_banshi02.jpg",
	      	     Api.HOST+"static/img/huace/style/huace_banshi03.jpg",
	      	       Api.HOST+"static/img/huace/style/huace_banshi04.jpg",
	      	       Api.HOST+"static/img/huace/style/huace_banshi05.jpg",
	      	       Api.HOST+"static/img/huace/style/huace_banshi06.jpg"
            ],
      	 dataMsg:{
      	 	title:"拾光集",
      	 	titleEdit:"拾光集预览",
      	 	tplCode:"huace_170-235_24",
      	 	defDbId:"9de2973d-3487-4b05-b556-b9b92dd75493"
      	 }
	   }
    	}
  },
    methods:{

    },
    mounted(){

    }
}
</script>

<style>

</style>
