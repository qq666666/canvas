
function Histogram(option) {
	this._init(option);
}

Histogram.prototype = {
	_init:function(option) {
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.w = option.w || 0;
		this.h = option.h || 0;
		this.data = option.data || [];
		// 柱状图中所有的元素的组
		this.group = new Konva.Group({
			x:this.x,
			y:this.y
		});
		
		//矩正组
		this.sqgroup = new Konva.Group({
			x:0,
			y:0
		});
		this.group.add(this.sqgroup);
		//百分比数  //添加一个放百分比文字的组
		this.pergroup = new Konva.Group({
			x:0,
			y:0
		});
		this.group.add(this.pergroup);
		
		//初始化底线
		var x0 = 0 , y0 = 0; 
		 var line = new Konva.Line({
		 	//要求 底线按照画布的左上角顶点进行定位。
			  	points:[x0,y0,x0+this.w,y0],
			  	stroke:'blue',
			  	strokeWidth:1
			  });
			  this.group.add(line);
			  
			  //矩正
			  	var height = this.h;
//			  	当前柱状图的对象
              	var sel = this;
              	//初始化 矩形
		        //初始化 文字%
		       //初始化 底部文字
			  var rectWidth = this.w / this.data.length;
              this.data.forEach(function(items,index){
              	//创建矩形      
              		var rect = new Konva.Rect({
              		x:x0 + (1/4 + index)*rectWidth,
              		y:y0 - items.value * height,
              		width:rectWidth / 2,
              		height:items.value * height,
              		fill:items.color,
              		opacity:.8,
              		cornerRadius:10,
              		shadowBlur:10, //设置阴影的模糊级别
              		shadowColor:'black'
              	});
              	sel.sqgroup.add(rect);
              	
              	//设置百分比
              	var pecent = new Konva.Text({
              		x:x0 + (1/4 + index)*rectWidth,
              		//减去数字大小
              		y:y0 - items.value * height  - 18,
              		width:rectWidth / 2,
              		height:items.value * height,
              		align:'center',
              		text:items.value * 100 + '%',
              		fill:items.color,
              		fontSize:18,
              		name:'pecent'
              	});
              	sel.pergroup.add(pecent);
              	
              	//设置下面文字
              	var text = new Konva.Text({
              		x:x0 + (1/4 + index)*rectWidth,
              		y:y0-9,
              		width:rectWidth / 2,
//            		height:,
              		align:'center',
              		text:items.name,
              		fill:items.color,
              		fontSize:18,
              		rotation:30
              	});
              	sel.group.add(text);         	
              	
	})
            
     },
	addLayer:function(layer) {
		layer.add(this.group);
	},
	animate:function() 
	{   
//	矩正动画
		var sel = this;
		this.sqgroup.getChildren().each(function(items,index){
			items.height(0);
			items.y(0);
				//经过一个动画还原
			items.to({
				duration:1,
				height:sel.data[index].value * sel.h,
				y:- sel.data[index].value * sel.h
			});
		})
		//百分比动画  让文字有个动画
		this.pergroup.getChildren().each(function(items,index){
			items.y(0-14);
			items.to({
				duration:1,
				y:- sel.data[index].value * sel.h-14
			});
		})
	}
}

