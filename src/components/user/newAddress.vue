<template>
	<div id="newAddress">
		<!--头-->
		<mt-header title="收货地址">
		  <router-link to="" v-tap="{methods:linkGo}" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		  <mt-button icon=""  slot="right"></mt-button>
		</mt-header>
		<div class="newAddressList">
			<ul>
				<li>
					<div class="listTable">
						<p>收件人</p>
						<input id="name" name="name" v-model="datas.name" type="text" placeholder="收货人姓名" />
					</div>
				</li>
				<li>
					<div class="listTable">
						<p>联系方式</p>
						<input id="mobile" name="mobile" v-model="datas.mobile" type="text" placeholder="手机号码" />
					</div>
				</li>
				<li>
					<div class="listTable">
						<p>省市区县</p>
					    <div class="content-block">
				            <input id="province" v-model="datas.province" name="province" type="text" readonly="" placeholder="请选择地址" />
				            <input id="selectedRegion" type="hidden" value="00" />
				       </div>
					</div>
				</li>
				<li>
					<div class="listTable">
						<p>详细地址</p>
						<textarea id="address" v-model="datas.address" name="address" placeholder="请填写详细地址" rows="" cols=""></textarea>

					</div>
				</li>
				<li>
					<div class="listTable" v-tap='{methods:updataCheck}'>
						<p>默认地址</p>
						<p  v-model="datas.mainAddr" :class= "datas.mainAddr=='Y'? '':'circleNone'"><i class="icon iconfont">&#xe639;</i></p>
					</div>
				</li>
			</ul>
		</div>
		<div class="submitBtn" v-tap='{methods:submitAddress}' >确认</div>
	</div>
</template>

<script>
	import  Api   from '@/api.js'
	import { Toast ,Actionsheet,Popup,Indicator} from 'mint-ui';


	export default{
		data(){
			return{
				tapStyle:false,
				datas:{
					name:'',
					mobile:"",
					province:'',
					address:'',
					mainAddr:"Y"
				}
			}
		},
		methods:{
			/*选择默认*/
			updataCheck(params){
				if(this.tapStyle == false){
					this.datas.mainAddr = 'N';
					this.tapStyle = true;
				}else{
					this.datas.mainAddr = 'Y';
					this.tapStyle = false;
				}

			},
			submitAddress(){
				if(isEmojiCharacter(this.datas.name)){  //有表情
					Toast('请不要输入表情^_^');
					return false;
				}
				if(this.datas.name==""){
					Toast('收货人姓名不能为空!');
					return;
				}
				if(this.datas.mobile==""){
					Toast('手机号码不能为空!');
					return;
				}
				if(this.datas.province == ""){
					Toast('请选择地区!');
					return;
				}
				if(this.datas.address==""){
					Toast('详细地址不能为空!');
					return;
				}

				var reg = /^1[3|4|5|7|8]\d{9}$/;
		　　　　if (!reg.test(this.datas.mobile)){
					Toast('请输入正确的手机号码!');
					return;
				}
				/*
				 *判断是新建地址还是编辑地址
				 *如果路由上有dbid是编辑地址
				 *else就是新建
				 * */
				if(undefined !== this.$route.query.dbId && null !== this.$route.query.dbId && '' !== this.$route.query.dbId){
					var jsons={
						name:this.datas.name,
						mobile:this.datas.mobile,
						province : $('#selectedRegion').val(),
						address:this.datas.address,
						dbId:this.$route.query.dbId,
						mainAddr:this.datas.mainAddr,
						userDbId:localStorage.getItem("userDbId")

					}
					/*确认提交*/
					Api.address.updateAddress(jsons).then(res=>{
						//console.log(res);
						if( this.$route.query.dzgl !=''){
							//location.href="#address?dzgl=grzx";
							this.$router.push( { path : '/address', query : {'dzgl':'grzx'}});
						}else{
							//location.href="#payOrder?openId="+this.$route.query.openId+"&orderDbId="+this.$route.query.orderDbId+"&userDbId="+localStorage.getItem("userDbId")
							this.$router.push( { path : '/payOrder', query : { 'openId' : this.$route.query.openId, 'orderDbId' : this.$route.query.orderDbId, 'userDbId' : localStorage.getItem("userDbId") }});
						}
					},err=>{
						Toast('数据请求错误');
					})
				}else{
					var jsons={
						name:this.datas.name,
						mobile:this.datas.mobile,
						province : $('#selectedRegion').val(),
						address:this.datas.address,
						mainAddr:this.datas.mainAddr,
						userDbId:localStorage.getItem("userDbId")

					}
					Api.address.newAddress(jsons).then(res=>{
						console.log(res);
						if(res.data.code == 'success'){
							if(this.$route.query.orderDbId){
								// location.href="#payOrder?openId="+this.$route.query.openId+"&orderDbId="+this.$route.query.orderDbId+"&userDbId="+localStorage.getItem("userDbId");
								this.$router.push( { path : '/payOrder', query : { 'openId' : this.$route.query.openId, 'orderDbId' : this.$route.query.orderDbId, 'userDbId' : localStorage.getItem("userDbId") }});
							}else{
								// location.href="#address?openId="+this.$route.query.openId+"&orderDbId="+this.$route.query.orderDbId+"&userDbId="+localStorage.getItem("userDbId");
								this.$router.push( { path : '/address', query : { 'openId' : this.$route.query.openId, 'orderDbId' : this.$route.query.orderDbId, 'userDbId' : localStorage.getItem("userDbId") }});
							}
						}
					},err=>{
						Toast('数据请求错误');
					})
				}
				console.log(this.datas)
			},
	        linkGo(){
				this.vurRouterGo();
			}

		},
		mounted(){
			$('body').height($('body')[0].clientHeight)

			/*初始化地区数据*/
			var lArea = new LArea();
		    lArea.init({
		        'trigger': '#province',
		        'valueTo': '#selectedRegion',
		        'keys': {
		            id: 'value',
		            name: 'text'
		        },
		        'type': 2,
		        'data': [provs_data, citys_data, dists_data]
		    });

		    if(this.$route.query.dbId){
		    	var jsons = {
		    		status:1,
		    		dbId:this.$route.query.dbId
		    	}
		    	Api.address.editorAddress(jsons).then(res=>{
		    		this.datas.name = res.data.name;
		    		this.datas.mobile =  res.data.mobile;
//		    		this.datas.province = res.data.province+','+res.data.city+','+res.data.region;
//		    		this.datas.province = res.data.province;
		    		this.datas.province = res.data.provinceCityDistricts;
		    		this.datas.address =  res.data.address;
		    		this.datas.mainAddr = res.data.mainAddr;
		    		$('#selectedRegion').val(res.data.province + ',' + res.data.city + ',' + res.data.region);
		    	},err=>{

		    	})
		    }
		  // console.log(this.$route.query)
		}
	}
</script>




