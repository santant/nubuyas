<template>
	<div id="tlMsg">
		<mt-header title="艺术台历">
		  <router-link to=""  v-tap="{ methods:linkGo }" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		</mt-header>
		<div class="bottom">
	    <div class="description">
	        <div class="content">
	            <p class="title">艺术台历</p>
	            <p>13张专属照片</p>
	            <p>定制365天的时光陪伴</p>
	            <p>用艺术装饰你的生活</p>
	            <p>打造你的桌面展览</p>
	        </div>
	    </div>
	    <div class="addCon">
	        <div class="addCon_topText">
	            感动幸福的瞬间，定格在美好的时间。365天的光影记忆，现为你独家定制。
	        </div>
	        <div class="addCon_topPic">
	            <img  :src="imgHost+'static/img/calendar_detail/1.jpg'" class="addRound" />
	        </div>
	        <div class="addCon_midText">
	            <div class="addCon_midText_up">专属定制</div>
	            <div class="addCon_midText_mid">个性你的生活</div>
	            <div class="addCon_midText_bott">
	                用你的照片定制专属台历，自选封面及12张内页，可任意选择起始月份。
	            </div>
	        </div>
	        <div class="addCon_topPic">
	            <img  :src="imgHost+'static/img/calendar_detail/2.jpg'" class="addRound" />

	        </div>
	        <div class="addCon_topPicText">
	        </div>
	        <div class="addCon_midText">
	            <div class="addCon_midText_up">多种规格</div>
	            <div class="addCon_midText_mid">打造你的桌面展览</div>
	            <div class="addCon_midText_bott">
	                白色、咖啡色2种底托可选，横版、竖版两种规格，随心装饰家居及办公桌面空间。
	            </div>
	        </div>
	        <div class="addCon_topPic">
	            <img  :src="imgHost+'static/img/calendar_detail/3.jpg'" class="addRound" />

	        </div>
	    </div>

	</div>
	<div class="btn_box">
	    	<router-link to="tlSelect?category=taili">
	        <div class="made_btn" id="calendar" style="color: #333;">开始定制</div>
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
