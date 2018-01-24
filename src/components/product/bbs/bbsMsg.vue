<template>
	<div id="bbsMsg">
		<mt-header title="小时光">
		  <router-link to=""  v-tap="{ methods:linkGo }" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		</mt-header>
		<!--<span><a href="#bbsSelect">宝宝书介绍</a></span>-->
		<div class="main1">
			<span >小时光</span>
			<h4>小小的时光，记录点滴美好</h4>
			<p>采撷照片中的点滴美好，定制一本专属于宝宝的小时光；触手的温暖，记录成长的多彩回忆，珍藏全家的美好时光。</p>
				<img :src="imgHost+'static/img/bbs/bbs01.jpg'"/>
			<br />
			<h4 class="bbs_title">一本只属于宝宝的人生故事</h4>
			<p>留存点滴记忆，书写美好人生；人生的每一个阶段，小时光为你印出感动。</p>
			<img :src="imgHost+'static/img/bbs/bbs02.jpg'"/>
			<br />
			<p>出生了，睁眼了，会笑了，满月了，百天了， 会叫爸妈了，会走路了，周岁了，上幼儿园了… 一辈子的“第一次”，怎能不珍藏</p>
			<br />
			<h4>送给宝宝珍藏一生的礼物</h4>
			<p>我是记录者，你是演绎者；一本本装满爱的小时光，相约与你一起翻阅回味。</p>
			<img :src="imgHost+'static/img/bbs/bbs03.jpg'"/>

			<br />
			<p>时光易逝，害怕宝宝跟自己一样错过儿时的成长瞬间我正奋笔，为你疾书。</p>
			<span class="center_span"></span>
			<span class="center_span"></span>
			<br />
			<h4>珍藏全家人共享的点滴美好</h4>
			<p>触摸到的记忆，随手可翻的温暖；小小的时光，珍藏有亲情作伴的点滴美好。</p>
			<img :src="imgHost+'static/img/bbs/bbs04.jpg'"/>

			<br />
			<h4>暖心套装 随时随心记录成长</h4>
			<p>一套小时光内含一本精致书册，十张简约LOMO卡，一张主题照片。
			放在家里，夹在桌上，随手可翻，抬头可见，让回忆更加丰富清晰。</p>
			<img :src="imgHost+'static/img/bbs/bbs055.jpg'"/>

			<p>专为宝宝 定制的精致书册，完整记录宝宝点滴成长。爱的每一步，我都陪你。
			<br />
			简约LOMO卡，贴在墙上，夹在桌上，写满祝福与家人分享。瞬间的记录，永恒的感动。
			<br />
				6寸定制主题照片，贴在书册扉页，让整本记忆更加清晰；
			<br />
			为爷爷奶奶、姥姥姥爷选择不同的主题照，定制专属馈赠。
			<br />
			宝宝成长的每一步，全家人都不愿缺席一人记录，全家共享。
			</p>
			<h4 class="bbs_title" >多彩封面 给回忆不一样的炫彩 </h4>
			<br />
			<p>智慧蓝、欢乐红、活力橙、健康绿，四种颜色封面供选，书盒及书壳混色配搭。
			为你打造多彩记忆，让每一份热情感动都有处安放</p>
			<img :src="imgHost+'static/img/bbs/bbs06.jpg'"/>
			<h4  class="bbs_title">轻奢礼盒 珍藏馈赠总相宜 </h4>
			<br />
			<p>礼盒封面烫哑银字体设计，表层覆进口艺术纸，含蓄内敛；
			边楞45°斜面设计。看得见的细节，处处让你爱不释手。</p>
			<br />
			<img :src="imgHost+'static/img/bbs/bbs07.jpg'"/>
			<h4 class="bbs_title">专属定制 不辜负用心的美好 </h4>
			<br />
			<p>一键上传你喜爱的照片，海量图片自动排版，更有多种模板风格供选，随心设计。
			私人定制，只给与众不同的你。</p>
			<img :src="imgHost+'static/img/bbs/bbs08.jpg'"/>
			<h4 class="bbs_title">匠心雕琢 每一份精致时光</h4>
			<p>二十余年专业印刷，优选进口环保纸，色彩高保真还原，呈现宝宝可爱笑颜；
			精装硬质书壳，内含海绵弹力夹层，厚实抗压；锁线胶装，可180度平铺，视觉更顺畅舒适。
			清晰悦目的专属回忆，珍藏百年。</p>
			<img :src="imgHost+'static/img/bbs/bbs09.jpg'"/>
			<br />
			<i style="height: 3rem; display: block; width: 100%;"></i>

		</div>
		<div class="btn_box">
			<a href="#/bbsSelect?category=xiaoshiguang" class="">
				<div id="kuanghua" class="made_btn" style="color: #333;">开始定制</div>
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
    	   this.addToSession();
	}
}
</script>

<style>

</style>
