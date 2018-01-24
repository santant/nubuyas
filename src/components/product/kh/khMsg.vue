<template>
	<div id="khMsg">
		<mt-header title="艺术框画">
		   <router-link to=""  v-tap="{ methods:linkGo }" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		</mt-header>
    <div class="bottom">
    <div class="description">
        <div class="content">
            <p class="title">艺术框画</p>
            <p>用你的作品装点你的生活</p>
            <p>艺术和现代工艺的完美结合</p>
            <p>独具匠心手工装裱</p>
            <p class="end">打造属于你的影像画廊</p>
        </div>
    </div>
    <div class="addCon">
        <div class="addCon_topText">
            定制画芯，多种框型可选，满足你的个性需求，打造家居及办公空间的完美视觉体验。
        </div>
        <div class="addCon_topPic">
             <img  :src="imgHost+'static/img/framed_pictures/1.jpg'" class="addRound" />
        </div>
        <div class="addCon_midText">
            <div class="addCon_midText_up">制作工艺</div>
            <div class="addCon_midText_mid">艺术与现代工艺的结合</div>
            <div class="addCon_midText_bott">
                引进日本制框工艺，全手工精裱，确保细节完美无瑕。              </div>
        </div>
        <div class="addCon_topPic">
             <img  :src="imgHost+'static/img/framed_pictures/che3.jpg'" class="addRound" />

        </div>
        <div class="addCon_topPic">
             <img  :src="imgHost+'static/img/framed_pictures/2.jpg'" class="addRound" />

        </div>
        <div class="addCon_topPicText">
        </div>
        <div class="addCon_midText">
            <div class="addCon_midText_up">多种规格</div>
            <div class="addCon_midText_mid">搭配万种生活</div>
            <div class="addCon_midText_bott">
                画框多种材质，多种尺寸、多种颜色可选， 自由搭配，演绎不同家居及办公风格。              </div>
        </div>
        <div class="addCon_topPic">
             <img  :src="imgHost+'static/img/framed_pictures/3.jpg'" class="addRound" />

        </div>
        <div class="addCon_midText">
            <div class="addCon_midText_up">包装</div>
            <div class="addCon_midText_mid">安全环保，典雅包装</div>
            <div class="addCon_midText_bott">
                环保背板材料，安全无异味；瓦楞纸礼盒包装，精致大方。
            </div>
        </div>
        <div class="addCon_topPic">
             <img  :src="imgHost+'static/img/framed_pictures/4.jpg'" class="addRound" />

        </div>
        <div class="addCon_topPic">
             <img  :src="imgHost+'static/img/framed_pictures/5.jpg'" class="addRound" />

        </div>
    </div>
</div>
 <div class="btn_box">
    	<router-link to="khSelect?category=kuanghua">
        <div class="made_btn" id="kuanghua" style="color: #333;">开始定制</div>
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
//				this.vurRouterGo();
				this.goApp()
			}
	    },
	    mounted(){
	    	    //更改session
	    		this.addToSession();
	    		if(this.$route.query.channelCode){
	    			var jsons = {
	    				"channelCode": this.$route.query.channelCode
	    			}
	    			sessionStorage.setItem("channelCode",this.$route.query.channelCode)
	    			Api.work.editNumber(jsons).then(res=>{
                  console.log(res)
                },err=>{

                })
	    			sessionStorage.setItem('urlQuery',JSON.stringify(this.$route.query))
				if (this.$route.query.userDbId) {
					localStorage.setItem('userDbId',this.$route.query.userDbId)
				}
	    		}

	}
}
</script>

<style>
</style>
