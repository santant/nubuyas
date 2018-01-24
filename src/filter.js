import Vue from 'vue'
//2017年04月10日15:02:01 作者:827879040@qq.com vue全局过滤器测试
//定义全局过滤器
Vue.filter("sum", function(value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    return value + 40;
});
Vue.filter("json", function(value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
   console.log(value)
   return JSON.stringify(value);
});
Vue.filter("splitSku",function(value){
	console.log(value)
	if (value ) {
		var arr = value.split('.');
//		if(arr.length > 2){
//			var newArr = [];
//			for(var i=0; i<arr.length-2; i++){
//				newArr.push(arr[i])
//			}
//			return newArr.join('.');
//		}else{
//			return arr[0];
//		}
		return arr[0];
		
	}
});
Vue.filter("splitSkuLast",function(value){
	if (value) {
		var arr = value.split('.');
		return arr.slice(1,arr.length).join('.')
	}
})

Vue.filter("splitAddress",function(value){
	if (value) {
		return value.length > 10 ? value.substr(0,10).concat('...'):value;
	}
})

Vue.filter("toFixedTwo",function(value){
	if (value>0) {
		return parseFloat(value.toFixed(2));
	}else{
		return 0
	}
})
Vue.filter('subStr',function(value){
	if(value){
		return value.length > 9 ? value.substr(0,9).concat('...'):value; 
	}
	
})
Vue.filter('subStrPrice',function(value){
	var _value = value + ''
	if(_value){
		
		return _value.length > 3 ? _value.substr(0,3).concat('...'):_value; 
	}
	
})
Vue.filter('showName',function(value){
	if(value == 'jiashu'){
		return '仅限家书产品使用'
	}else if(value == 'huace'){
		return '仅限画册产品使用'
	}else if(value == 'taili'){
		return '仅限台历产品使用'
	}else if(value == 'guali'){
		return '仅限挂历产品使用'
	}else if(value == 'citiehua'){
		return '仅限磁贴画产品使用'
	}else if(value == 'citiehuaxin'){
		return '仅限磁贴画芯产品使用'
	}else if(value == 'haibao'){
		return '仅限海报产品使用'
	}else if(value == 'kuanghua'){
		return '仅限框画产品使用'
	}else if(value == 'all'){
		return '全线产品使用'
	}else if(value == 'shiguangji'){
		return '仅限拾光集产品使用'
	}else if(value == 'voyage'){
		return '仅限旅行记产品使用'
	}else if(value == 'xiaoshiguang'){
		return '仅限小时光产品使用'
	}else if(value == 'yujianqingyuan'){
		return '仅限遇见．情缘产品使用'
	}else if(value == 'heji'){
		return '仅限合集产品使用'
	}else if(value == 'biyeji'){
		return '仅限毕业季产品使用'
	}
})
Vue.filter('absFilter',function(value){
	if(value){
		return Math.abs(value)
	}	
})
