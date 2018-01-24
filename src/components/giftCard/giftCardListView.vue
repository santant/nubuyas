<template>
	<div id="giftCardView">
		<!--头-->
		<mt-header title="礼品卡">
		  <router-link to="" v-tap="{methods:linkGo}" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		  <mt-button icon=""  slot="right"></mt-button>
		</mt-header>
		<div class="cardList">
			<div class="allPrice">
				<p>礼品卡账户余额</p>
				<p>￥{{giftcardBalance}}</p>
			</div>
			<div class="changeCardInput">
				<div class="changeBox">
					<input type="text" v-model="giftCardCode" placeholder="请输入兑换码" name="" id="" />
					<span v-tap='{methods:changeFn}'>兑换</span>
				</div>
			</div>
			<div class="cardName">
				<p>礼品卡账户明细</p>
			</div>
			<!--<div class="cardListView">
				<div class="viewContent">
				   <div class="leftBox">
				   	  <p>购买商品用（订单号：201708311740173556）</p>
				   	  <p>2017-09-15  14:32:04</p>
				   </div>
				   <p>-￥200</p>
				</div>
			</div>-->
			<div class="cardListView" v-for="(item,index) in dataList">
				<div class="viewContent">
				   <div class="leftBox">
				   	  <p>{{item.remarks}}</p>
				   	  <p>{{item.createDate}}</p>
				   </div>
				   <p v-if="item.tradeAmount > 0">+￥{{item.tradeAmount | absFilter}}</p>
				   <p v-if="item.tradeAmount < 0">-￥{{item.tradeAmount | absFilter}}</p>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import Api from '@/api.js'
import { Swipe, SwipeItem, Indicator,MessageBox,Toast,Loadmore } from 'mint-ui';
export default {
	  data () {
	    return {
	     	dataList:[],
	     	useClassName:'',
	     	giftCardCode:'',
	     	allLoaded:false,
	     	page:1,
	     	giftcardBalance:0
	    }
	  },
    methods:{
		linkGo(){
			this.vurRouterGo();
			//location.href="";
		},
		useFn(){

		},
		changeFn() {
			if(this.giftCardCode != ''){
				Indicator.open({text: '兑换中...',spinnerType: 'fading-circle'})
				var jsons={
					passId: localStorage.getItem("userDbId"),
					giftcardCode: this.giftCardCode
				}
				Api.giftCard.giftCardChange(jsons).then(res=>{
					if(res.data.status === 'OK'){
						Indicator.close()
						Toast('兑换成功')
						this.initGiftCard()
						window.location.reload()
					}else{
						Toast(res.data.message)
						Indicator.close()
					}
				},err=>{

				})
			}else{
				Toast('请输入正确的兑换码')
			}

		},
		initGiftCard(){
			var jsons ={
			  passId: localStorage.getItem("userDbId"),
              pageNo: this.page,
              pageSize: 10000
			}
			Api.giftCard.giftCardList(jsons).then(res=>{
				this.dataList = res.data.data.giftcardLogs
				Indicator.close()
			},err=>{

			})
		}
    },
    mounted(){
      	Indicator.open({text: '加载中...',spinnerType: 'fading-circle'})
		this.initGiftCard()
		Api.getUserInfo.getUserInfo({passId:localStorage.getItem("userDbId")}).then(res=>{
			this.giftcardBalance = res.data.data.giftcardBalance
			console.log(res)
		},err=>{
			Toast('网络异常')
		})

	}
}
</script>

<style>

</style>
