<template>
	<div id="hcMsg">
		<mt-header title="拾光集">
		  <router-link to=""  v-tap="{ methods:linkGo }" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		</mt-header>

		<div class="bottom">
		    <img class="cart_size" :src="imgHost+'static/img/index/huace01.jpg'"/>

		    <div class="addCon_topText">
		       	 随时随地捕捉生活精彩瞬间，手机一键上传传给雅昌，定制专属于你的多彩拾光集。你也可以是设计师，尽情发挥想象力，选择多种颜色及模版，随意组合照片，轻松编辑你的画册。
		    </div>
		    <img class="cart_size cart_size2" :src="imgHost+'static/img/index/huace02.jpg'"/>

		    <div  class="addCon_midText_mid2">爱情  浪漫紫</div>
		    <div class="addCon_midText_bott">邂逅一场紫色浪漫，铭记每一个心动瞬间</div>
			<img class="cart_size cart_size3" :src="imgHost+'static/img/index/huace09.jpg'"/>


		    <div  class="addCon_midText_mid2">亲子  纯真白</div>
		    <div class="addCon_midText_bott">将宝宝成长记录成册，</div>
		     <div class="addCon_midText_bott">成长路上愿宝宝纯真如初</div>
			<img class="cart_size cart_size3" :src="imgHost+'static/img/index/huace10.jpg'"/>


		    <div  class="addCon_midText_mid2">旅行  随性绿</div>
		    <div class="addCon_midText_bott">一场说走就走的旅行，</div>
		     <div class="addCon_midText_bott">认识世界的方式一直都在路上</div>
			<img class="cart_size cart_size3" :src="imgHost+'static/img/index/huace11.jpg'"/>



		     <div  class="addCon_midText_mid2">仪式  欢聚红</div>
		    <div class="addCon_midText_bott">记录每一次欢聚时刻，定格珍贵瞬间</div>
			<img class="cart_size cart_size3" :src="imgHost+'static/img/index/huace03.jpg'"/>
		    <div  class="addCon_midText_mid2">多彩封面可选</div>
		    <b style="text-align: center;margin-bottom:1rem;display: block;">缤纷你的生活</b>
		    <div style="padding: 0.5rem 0" class="addCon_midText_bott">浪漫紫、纯真白、随性绿、欢聚红，</div>

		     <div class="addCon_midText_bott">4种颜色封面可供选择，</div>

		     <div class="addCon_midText_bott">为你的生活添彩上色。</div>

			<img class="cart_size cart_size3" :src="imgHost+'static/img/index/huace04.jpg'"/>




		    <div  class="addCon_midText_mid2">随心操作  随拍随传</div>
		    <!-- <div style="padding: 0.5rem 0 0.8rem 0" class="addCon_midText_bott"></div> -->

		     <div class="addCon_midText_bott">简单易操作的微信定制平台</div>

		     <div class="addCon_midText_bott">使用流畅，随拍随传，轻松编辑你的画册。</div>

			<img class="cart_size cart_size3" :src="imgHost+'static/img/index/huace05.jpg'"/>



		    <div  class="addCon_midText_mid2">多种照片模板可选</div>
		    <div style="padding: 0.5rem 0 0.8rem 0" class="addCon_midText_bott">随意搭配</div>

		     <div class="addCon_midText_bott">多种照片模版可供选择，满足你的不同需求</div>

		     <div class="addCon_midText_bott">24页内文排版更自由，随意搭配。</div>

			<img class="cart_size cart_size3" :src="imgHost+'static/img/index/huace06.jpg'"/>


		    <div  class="addCon_midText_mid2">图像清晰  色彩真实</div>
		    <!-- <div style="padding: 0.5rem 0 0.8rem 0" class="addCon_midText_bott"></div> -->

		     <div class="addCon_midText_bott">采用全球顶尖数码输出设备，实现传统银盐照</div>

		     <div class="addCon_midText_bott">片质量，层次清晰，色彩艳丽，百年不褪色。</div>

			<img class="cart_size cart_size3" :src="imgHost+'static/img/index/huace07.jpg'"/>


		    <div  class="addCon_midText_mid2">制作工艺  装帧精美</div>
		    <!-- <div style="padding: 0.5rem 0 0.8rem 0" class="addCon_midText_bott"></div> -->

		     <div class="addCon_midText_bott" style="text-align: left;width:90%;margin: 0 auto;">质感硬壳封面，封面烫金文字；内页为高品质意大利进口哑光滑面真粉纸；超高白度、极高挺度，无酸不易泛黄，将回忆永久保存；纸张具有轻微丝质触感，时尚高级；踩线精装，平整美观。</di>


			<img class="cart_size cart_size3" :src="imgHost+'static/img/index/huace08.jpg'"/>

		    <i style="height: 5rem;display: block;width: 100%;"></i>
		    </div>

		</div>
		<div class="btn_box">
	       <a href="#/huaceSelect?category=shiguangji">
	       	<div class="made_btn" id="art_album" style="color: #333;">开始定制</div>
	       </a>
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
