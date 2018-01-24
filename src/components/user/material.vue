<template>
	   <div id="material">
		   	<mt-header title="素材库">
			  <router-link to="" v-tap="{methods:linkGo}" slot="left">
			    <mt-button icon="back">返回</mt-button>
			  </router-link>
			  <mt-button icon=""  slot="right"></mt-button>
			</mt-header>
			<div style="height: auto;" class="img_div">
				<ul>
					<li v-for="(item,inde) in Material">
						<img :src="item.thumbnailUrl"/>
					</li>
				</ul>
			</div>
	   </div>
</template>

<script>
	import  Api   from '@/api.js'
	import {Indicator} from 'mint-ui';

	export default{
		data(){
			return{
				Material:[]
			}
		},
		methods:{
			linkGo(){
				this.vurRouterGo();
			}
		},
		created(){

		},
		mounted(){
				Indicator.open({text: '素材加载中...',spinnerType: 'fading-circle'});
		    		//素材库地址图片
		            var paramJson ={
                        format:"json",
                        userDbId:localStorage.getItem('userDbId'),
                        status:1,
                        pageNum:0,
                        pageSize:50,
                        sort:"uploadDt",
                        order:"desc",
                        category: ""
                    }
                    Api.Material.MaterialData(paramJson).then((res)=>{
                    	console.log(res)
		            this.Material = res.data.results;
		            setTimeout(function(){
			        	 //计算素材库图片的位置
		                $(".img_div ul li").each(function(i,el){
		                    setTimeout(function(){
		                        dragThumb($(el).find("img"),$(el));
		                    },100)
		                })
			        },300)
		            //关闭弹窗
		           Indicator.close();
		        })
		}
	}
</script>

<style>
</style>
