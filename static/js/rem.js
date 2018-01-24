(function () {
    var html = document.documentElement;

    function onWindowResize() {
        html.style.fontSize = html.getBoundingClientRect().width / 20 + 'px';
    }

    window.addEventListener('resize', onWindowResize);
    onWindowResize();
})();


/*定义宝宝书八个板式模板*/
var htmlData={
	bbs1:'<div bsdata = "1" imgNum="1"  class="bbs01  bbsA bbsClass marginAuto"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="1"  type="1" class="editImg">编辑</span><a></a></div><img nm="1"  type="1" editCnfName="baobaoshu_170-235_24_single"  @click="ActionsheetIn"  src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="textarea"><p maxLength="40" nm="1" type="1" editCnfName="baobaoshu_170-235_24_single"  class="classP"></p></div>',
	bbs2:'<div bsdata = "2"  imgNum="1" class="bbs02 bbsA bbsClass marginAuto"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="1"  type="2" class="editImg">编辑</span><a></a></div><img nm="1"  type="2" editCnfName="baobaoshu_170-235_24_single"  src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="textarea"><p maxLength="40" nm="1" type="2" editCnfName="baobaoshu_170-235_24_single" class="classP"></p></div>',
	bbs3:'<div bsdata = "3" imgNum="1" class="bbs03 bbsA bbsClass marginAuto"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="1"  type="3" class="editImg">编辑</span><a></a></div><img nm="1" type="3" editCnfName="baobaoshu_170-235_24_single"   src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div>',
	bbs4:'<div bsdata = "4" imgNum="1" class="bbs04 bbsA bbsClass marginAuto"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="1"  type="4" class="editImg">编辑</span><a></a></div><img nm="1" type="4"  editCnfName="baobaoshu_170-235_24_single"  src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="textarea"><p maxLength="40" nm="1"  type="4" editCnfName="baobaoshu_170-235_24_single"  class="classP"></p></div>',
	bbs5:'<div bsdata = "5" imgNum="2" class="bbsA allBbsClass"><div class="bbs05 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="1"  type="5" class="editImg">编辑</span><a></a></div><img nm="1" type="5" editCnfName="baobaoshu_170-235_24_single"  src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="bbs05 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="2"  type="5" class="editImg">编辑</span><a></a></div><img nm="2" type="5" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg" editCnfName="baobaoshu_170-235_24_single" class="sucaiClass" alt="" /></div></div>',
	bbs6:'<div bsdata = "6" imgNum="2" class="bbsA allBbsClass"><div class="bbs06 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="1"  type="6" class="editImg">编辑</span><a></a></div><img nm="1"  type="6" editCnfName="baobaoshu_170-235_24_single"   src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="bbs06 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="2"  type="6" class="editImg">编辑</span><a></a></div><img nm="2"  type="6" editCnfName="baobaoshu_170-235_24_single" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div></div><div class="textarea"><p maxLength="40" nm="1" type="6" editCnfName="baobaoshu_170-235_24_single"  class="classP"></p></div>',
	bbs7:'<div bsdata = "7" imgNum="4" class="bbsA allBbsClass"><div class="bbs07 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="1"  type="7" class="editImg">编辑</span><a></a></div><img nm="1"   type="7" editCnfName="baobaoshu_170-235_24_single"  src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="bbs07 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="2"  type="7" class="editImg">编辑</span><a></a></div><img nm="2" type="7" editcnfname="baobaoshu_170-235_24_single" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="bbs07 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="3"  type="7" class="editImg">编辑</span><a></a></div><img nm="3" type="7" editCnfName="baobaoshu_170-235_24_single" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="bbs07 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="4"  type="8" class="editImg">编辑</span><a></a></div><img  nm="4"  type="7" editCnfName="baobaoshu_170-235_24_single" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div></div>',
	bbs8:'<div bsdata = "8" imgNum="4" class="bbsA allBbsClass"><div class="bbs08 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="1"  type="8" class="editImg">编辑</span><a></a></div><img nm="1"  type="8" editCnfName="baobaoshu_170-235_24_single"  src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="bbs08 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="2"  type="8" class="editImg">编辑</span><a></a></div><img nm="2" type="8" editCnfName="baobaoshu_170-235_24_single" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="bbs08 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="3"  type="8" class="editImg">编辑</span><a></a></div><img nm="3" type="8" editCnfName="baobaoshu_170-235_24_single" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="bbs08 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="4"  type="8" class="editImg">编辑</span><a></a></div><img nm="4" type="8" editCnfName="baobaoshu_170-235_24_single" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div></div><div class="textarea"><p maxLength="40" nm="1" type="8" editCnfName="baobaoshu_170-235_24_single" class="classP"></p></div>',
	bbs9:'<div imgNum="1" class="bbs01 lome01  bbsA bbsClass marginAuto"><div class="myImgBox"><a></a><img class="lomo" src="" alt="" /><span nm="1"  type="1" editCnfName="baobaoshu_lomo" class="editImg">编辑</span><a></a></div><img nm="1"  type="1" editCnfName="baobaoshu_lomo" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div>',
	bbs10:'<div imgNum="1" class="bbs02 lome02  bbsA bbsClass marginAuto"><div class="myImgBox"><a></a><img class="lomo" src="" alt="" /><span nm="1"  type="2" editCnfName="baobaoshu_lomo" class="editImg">编辑</span><a></a></div><img nm="1"  type="2" editCnfName="baobaoshu_lomo" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div>',			
};
//定义画册的几个模版
var huaCeData={  
	bbs1:'<div bsdata = "1" imgNum="1"  class="hc01 bbsA bbsClass marginAuto"><div class="hc1"><div class="textarea textareahc"><p nm="1" type="1" maxLength="16" editcnfname="huace_170-235_24_single" class="classP text_Class"></p></div><div class="textarea textareahc2"><textarea nm="2"  maxLength="400" type="1" editcnfname="huace_170-235_24_single" class="classP text_Class"></textarea></div></div></div>',
	bbs2:'<div bsdata = "2"  imgNum="1" class="hc02 bbsA bbsClass marginAuto"><div class="hc1"><div class="textarea textareahc3"><p nm="1" type="2" maxLength="16" editcnfname="huace_170-235_24_single" class="classP text_Class"></p></div><div class="textarea textareahc4"><textarea nm="2"  maxLength="100" type="2" editcnfname="huace_170-235_24_single" class="classP text_Class"></textarea></div></div></div>',
	bbs3:'<div bsdata = "3"  imgNum="1" class="hc03 bbsA bbsClass marginAuto"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="1"  type="3" class="editImg">编辑</span><a></a></div><img nm="1"  type="3" editCnfName="huace_170-235_24_single"  src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="textarea"><p maxLength="40" nm="1" type="3" editCnfName="huace_170-235_24_single" class="classP"></p></div>',
	bbs4:'<div bsdata = "4" imgNum="2" class="hc04 bbsA allBbsClass"><div class="bbs05 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="1"  type="4" class="editImg">编辑</span><a></a></div><img nm="1" type="4" editCnfName="huace_170-235_24_single"  src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="bbs05 bbsClass"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="2"  type="4" class="editImg">编辑</span><a></a></div><img nm="2" type="4" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg" editCnfName="huace_170-235_24_single" class="sucaiClass" alt="" /></div><div class="textarea"><p maxLength="40" nm="1" type="4" editcnfname="huace_170-235_24_single" class="classP textErea"></p></div></div>',
	bbs5:'<div bsdata = "5" imgNum="1"  class="hc05 bbsA bbsClass marginAuto"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="1"  type="5" class="editImg">编辑</span><a></a></div><img nm="1"  type="5" editCnfName="huace_170-235_24_single"  @click="ActionsheetIn"  src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="textarea"><p maxLength="40" nm="1" type="5" editCnfName="huace_170-235_24_single"  class="classP"></p></div>',
	bbs6:'<div bsdata = "6" imgNum="1"  class="hc06 bbsA bbsClass marginAuto"><div class="myImgBox"><a></a><img src="" alt="" /><span nm="1"  type="6" class="editImg">编辑</span><a></a></div><img nm="1"  type="6" editCnfName="huace_170-235_24_single"  @click="ActionsheetIn"  src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div><div class="textarea"><p maxLength="40" nm="1" type="6" editCnfName="huace_170-235_24_single"  class="classP"></p></div>'

	
//	bbs9:'<div imgNum="1" class="bbs01 lome01  bbsA bbsClass marginAuto"><div class="myImgBox"><img class="lomo" src="" alt="" /><span nm="1"  type="1" editCnfName="baobaoshu_lomo" class="editImg">编辑</span><a></a></div><img nm="1"  type="1" editCnfName="baobaoshu_lomo" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div>',
//	bbs10:'<div imgNum="1" class="bbs02 lome02  bbsA bbsClass marginAuto"><div class="myImgBox"><img class="lomo" src="" alt="" /><span nm="1"  type="2" editCnfName="baobaoshu_lomo" class="editImg">编辑</span><a></a></div><img nm="1"  type="2" editCnfName="baobaoshu_lomo" src="'+HOST_STATIC_SERVER_HOST+'static/img/p_sucai_02.jpg"  class="sucaiClass" alt="" /></div>',			
};



/*板式默认的格式*/
//var typeHtmlLome = [htmlData.bbs09,htmlData.bbs10,htmlData.bbs10,htmlData.bbs10,htmlData.bbs10,htmlData.bbs10,htmlData.bbs10,htmlData.bbs10,htmlData.bbs10,htmlData.bbs10,htmlData.bbs10]

var typeHtmlLome = [htmlData.bbs9]	
//var typeHtml = [htmlData.bbs01,htmlData.bbs02,htmlData.bbs01,htmlData.bbs03,htmlData.bbs01,htmlData.bbs01,htmlData.bbs03,htmlData.bbs03,htmlData.bbs04,htmlData.bbs04,htmlData.bbs02,htmlData.bbs05,htmlData.bbs06,htmlData.bbs02,htmlData.bbs07,htmlData.bbs04,htmlData.bbs08,htmlData.bbs02,htmlData.bbs02,htmlData.bbs01,htmlData.bbs02,htmlData.bbs02,htmlData.bbs06,htmlData.bbs03,htmlData.bbs01,htmlData.bbs02,htmlData.bbs03,htmlData.bbs01,htmlData.bbs04,htmlData.bbs03,htmlData.bbs01,htmlData.bbs04]
var typeHtml = [htmlData.bbs1]



//HashMap取值
function HashMap () {
    /**
    * map大小
    */
    var size = 0;
    /**
    * 对象
    */
    var entry = new Object();//存放信息
    
            /**
     * @description 往hashmap中添加键值对
     * @param key 键 页码
     * @param value 值 
     */
    this.putvalue=function(key,value){
        if(!this.containsKey(key)){//没有包含时map大小+1
            size++;
        }
        entry[key]=value;//赋值
    }
    /**
     * @description 从hashmap中根据键获取值
     * @param key 键 页码
     * @return value|null
     */
    this.getvalue=function (key){
        return this.containsKey(key)?entry[key]:null;
    }
    /**
     * @description 判断是否包含key
     * @param key 键
     * @return true|false
     */
    this.containsKey=function (key){
        if(!(key in entry)){
            return false;
        }else{
            return true;
        }
        //return (null==(key in entry))?false:true;
    }
    /**
     * @description 从map中移除键值
     * @param key 键
     */
    this.remove=function (key){
        if(this.containsKey(key) && (delete entry[key])){
            size--;
        }
    }
    /**
     * @description 是否包含value
     * @param value 值
     */
    this.containsValue=function (value){
        for(var temp in entry){
            if(entry[temp]==value){
                return true;
            }
        }
        return false;
    }
    /**
     * @description 返回所有值
     * 
     */
    this.values=function (){
        var values = new Array();
        for(var temp in entry){
            values.push(entry[temp]);
        }
        return values;
    }
    /**
     * @description 返回所有键
     */
    this.keys=function (){
        var keys=new Array();
        for(var temp in entry){
            keys.push(temp);
        }
        return keys;
    }
    /**
     * @description 返回map大小
     */
    this.size=function (){
        return size;
    }
    /**
     * @description 清除map
     */
    this.removeAll=function (){
        size=0;
        entry=new Object();
    }
}
/*计算图片的缩放*/
function dragThumb(cs_src, cs_divdom) { //cs_src图片的节点,框型（固定div）的节点
	
	 imgWidth = parseFloat(cs_src.width());//原图宽
	 imgHeight = parseFloat(cs_src.height());//原图高
	 boxWidth = parseFloat(cs_divdom.width());//框宽
	 boxHeight = parseFloat(cs_divdom.height());//框高
	//原图和框的比例（宽）
	var oProportionWidth = boxWidth/imgWidth;
	//原图和框的比例（高）
	var oProportionHeight =boxHeight/imgHeight;
	//alert(boxWidth)
	//得到换算的最终比例mul
	var mul;
	if (oProportionWidth>oProportionHeight) {
		 mul= oProportionWidth;
	}else{
		 mul = oProportionHeight;
	}
	//得到原图变小的比例大小
	imgWidth = imgWidth * mul;
		imgHeight = imgHeight * mul;
	//图片宽<盒子宽
	if (imgWidth < boxWidth) {
		imgWidth = boxWidth
	}else if(imgHeight< boxHeight){//图片高 > 盒子高
		imgHeight= boxHeight
	}
	//位移的距离盒子-图片缩小比例/2
	var dx = (boxWidth-imgWidth)/2;
	var dy = (boxHeight-imgHeight)/2;	
	//渲染定位
	cs_src.css({
		width:imgWidth+'px',
		height:imgHeight+'px',
		left:dx+'px',
		top:dy+'px'
		})
} 


//换取宝宝书皮的js
function checkColor(shupi,dom1,dom2,dom3){
	switch(shupi){
			case "健康绿":
//				dom1.removeClass("fmLv fmLs fmCs fmFs hcBsFm hcHsFm hcNsFm hcZsFm")
//				dom2.removeClass("fdLv fdLv fdLv fdFs hcBsFd hcHsFd hcNsFd hcZsFd")
//				dom3.removeClass("feLv feLs feCs feFs hcBsFe hcHsFe hcNsFe hcZsFe")
				dom1.addClass('fmLv');
				dom2.addClass('fdLv');
				dom3.addClass('feLv');
			break;
			case "智慧蓝":
				dom1.addClass('fmLs');
				dom2.addClass('fdLs');
				dom3.addClass('feLs');
			break;
			case "活力橙":
				dom1.addClass('fmCs');
				dom2.addClass('fdCs');
				dom3.addClass('feCs');
			break;
			case "欢乐红":

				dom1.addClass('fmFs');
				dom2.addClass('fdFs');
				dom3.addClass('feFs');
				break;
			//画册白色	
			case "纯真白":
				dom1.addClass('hcBsFm');
				dom2.addClass('hcBsFd');
				dom3.addClass('hcBsFe');	
				break;
			//红色	
			case "欢聚红":
				dom1.addClass('hcHsFm');
				dom2.addClass('hcHsFd');
				dom3.addClass('hcHsFe');	
				break;
				
			case "随性绿":
				dom1.addClass('hcNsFm');
				dom2.addClass('hcNsFd');
				dom3.addClass('hcNsFe');
				break;
				
			case "浪漫紫":
				dom1.addClass('hcZsFm');
				dom2.addClass('hcZsFd');
				dom3.addClass('hcZsFe');	
				break;				
		}
}
Array.prototype.removeItem = function(item){
	if(this.length == 0)　 
		return this;
	else if(item) {
		var len = this.length;
		for(var i=0,n=0;i<this.length;i++)
		{ 
			if(this[i] && this[i] != ''){
				//alert("this[i]="+this[i]+"=item="+item);
				if(this[i] != item)
				{ 
				　　this[n++]=this[i];
			　　} 
				else{
					len --
				}
			} else {
				len--;
			}
			
		}
		this.length=len;
	} 
}
Array.prototype.del=function(n) {　//n表示第几项，从0开始算起。
	//prototype为对象原型，注意这里为对象增加自定义方法的方法。
	　if(n<0)　//如果n<0，则不进行任何操作。
	　　return this;
	　else
	　　return this.slice(0,n).concat(this.slice(n+1,this.length));
	　　/*
	　　　concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
	　　　　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
	　　 　　　　　　组成的新数组，这中间，刚好少了第n项。
	　　　slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
	　　*/
	}
/*校验文本框输入是否有表情*/
function isEmojiCharacter(substring) {  
    for ( var i = 0; i < substring.length; i++) {  
        var hs = substring.charCodeAt(i);  
        if (0xd800 <= hs && hs <= 0xdbff) {  
            if (substring.length > 1) {  
                var ls = substring.charCodeAt(i + 1);  
                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
                if (0x1d000 <= uc && uc <= 0x1f77f) {  
                    return true;  
                }  
            }  
        } else if (substring.length > 1) {  
            var ls = substring.charCodeAt(i + 1);  
            if (ls == 0x20e3) {  
                return true;  
            }  
        } else {  
            if (0x2100 <= hs && hs <= 0x27ff) {  
                return true;  
            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
                return true;  
            } else if (0x2934 <= hs && hs <= 0x2935) {  
                return true;  
            } else if (0x3297 <= hs && hs <= 0x3299) {  
                return true;  
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
                    || hs == 0x2b50) {  
                return true;  
            }  
        }  
    }  
}

/*微信支付*/
function wxpay(d,callback){
	wx.config({
		debug: false,
		appId: d.appId,
		timestamp: d.timestamp,
		nonceStr: d.nonceStr,
		signature: d.signature,
		jsApiList: ["chooseWXPay"]
	});
	wx.ready(function(){
		wx.chooseWXPay({//微信支付
			timestamp: d.timeStamp,
			nonceStr: d.nonceStr,
			package: d.package,
			signType: d.signType,
			paySign: d.paySign,
			success: function (res) {
				//alert('支付成功');
				// 支付成功后的回调函数
				if(callback){
					callback(res)
				}
			},
			cancel:function(res){
				  //支付取消
				//history.back();
				if(callback){
					callback(res)
				}
			}       
		});
	});
	
	wx.error(function(res){
		alert(res.err_msg);
		history.back();
	})
}
