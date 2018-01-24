   var jsons = {

		data:[
				
				{
					Size:'400mmX500mm',
					width:'8rem',
					height:'10.12rem'

				},
				{
					Size:"500mmX400mm",
					width:'10rem',
					height:'7.87rem'
					

				},	
				{
					Size:"700mmX500mm",
					width:'13rem',
					height:'9.1rem'
					
					
				},
				{
					Size:"500mmX700mm",
					width:'9rem',
					height:'12.85rem'
					


				},
				{
					Size:"500mmX500mm",
					width:'10rem',
					height:'10rem'
					
				}
			]
  		
  	}

export default {	
	
  	init:{
  		
  		selectK:function(size){ 			
	  		 var data = jsons.data;
	  		 var datas ={
	  		 	currentWidth:'',
	  		 	currentHeight:'',
	  		 	urls:'',
	  		 	smallWidth:'',
	  		 	smallHeight:''
	  		 }
	  		 for(var i=0; i<data.length; i++){
	  		 	
	  		 	if(data[i].Size == size){
	  		 		datas.currentHeight = data[i].height;
	  		 		datas.currentWidth = data[i].width;
	  		 	}
	  		 }
	  		 return datas;  	
  		}
//		selectK:(size)=>{}
  	}
  }