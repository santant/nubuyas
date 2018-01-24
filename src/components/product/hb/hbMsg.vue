<template>
	<div id="hbMsg">
		<mt-header title="海报介绍">
		   <router-link to=""  v-tap="{ methods:linkGo }" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		</mt-header>
	<div class="bottom">
	    <div class="description">
	        <div class="content">
	            <p class="title">艺术海报</p>
	            <p>打破空间距离</p>
	            <p>留住美好瞬间</p>
	            <p>突破新的视界</p>
	            <p>再次定义生活影像</p>
	        </div>
	    </div>
	    <div class="addCon">
	        <div class="addCon_topText">
	            铸简约艺术空间，传影像艺术之美。
	        </div>
	        <div class="addCon_midText">
	            <div class="addCon_midText_up">画质</div>
	            <div class="addCon_midText_mid">色彩的深度演绎</div>
	            <div class="addCon_midText_bott">
	                艺术微喷级输出，画质细腻，色彩层次丰富。
	            </div>
	        </div>
	        <div class="addCon_topPic">
			<img  :src="imgHost+'static/img/haibao_detail/1.jpg'" class="addRound" />

	        </div>
	        <div class="addCon_topPicText">
	        </div>
	        <div class="addCon_midText">
	            <div class="addCon_midText_up">规格</div>
	            <div class="addCon_midText_mid">不同搭配，更多可能</div>
	            <div class="addCon_midText_bott">
	                多种尺寸，多种照片组合模版；单独悬挂，或作为画芯装裱，轻松更换。
	            </div>
	        </div>
	        <div class="addCon_topPic">
			<img  :src="imgHost+'static/img/haibao_detail/2.jpg'" class="addRound" />

	        </div>
	        <div class="addCon_midText">
	            <div class="addCon_midText_up">包装</div>
	            <div class="addCon_midText_mid">典雅包装，贴心设计</div>
	            <div class="addCon_midText_bott">
	                采用三角瓦楞或圆筒纸盒包装，确保海报在长途跋涉的过程中免去折叠挤压。
	            </div>
	        </div>
	        <div class="addCon_topPic">
				<img  :src="imgHost+'static/img/haibao_detail/3.png'" class="addRound" />
	        </div>
	    </div>

	</div>
	<div class="btn_box">
    	<router-link to="hbSelect?category=haibao">
        <div class="made_btn" style="color: #333;">开始定制</div>
    </router-link>
    </div>
	</div>
</template>
<script>
	import Api from '@/api.js'
import { Swipe, SwipeItem } from 'mint-ui';
export default {
	  data () {
	    return {
	      imgHost:Api.HOST
	    }
	  },
    methods:{
		linkGo(){
//			this.vurRouterGo();
			this.goApp()
		}
    },
    mounted(){
    	    //更改session
    		this.addToSession();
	}
}
</script>

<style>


</style>
