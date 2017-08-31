//初始化构造函数
function Bar(option) {
	this._init(option);
}

Bar.prototype = {
	//初始化
	_init:function(option) {
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.width = option.width || 0;
		this.height = option.height || 0;
		
		this.strokeStyle = option.strokeStyle || 'red';
		this.fillStyle = option.fillStyle ||'blue';
		
		//创建内矩正
		var innerRect = new Konva.Rect({
			x:this.x,
			y:this.y,
			width:100,
			height:this.height,
			
			fill:this.fillStyle,
			cornerRadius: this.height / 2,
			//通过id值来找到相对应的名
			id:'innerRect'
		});
		
		//创建外矩正
		var outRect = new Konva.Rect({
			x:this.x,
			y:this.y,
			width:this.width,
			height:this.height,
			strokeWidth:4,
			stroke:this.strokeStyle,
			cornerRadius: this.height / 2
			
		});
		//创建组存放内外矩正
		this.group = new Konva.Group({
			x:0,
			y:0
		});
		this.group.add(innerRect);
		this.group.add(outRect);
	},
	//方法  把组存放到layer上
	 addLayer:function(layer) {
	 	layer.add(this.group);
	 },
	 
	 //进度条值
	 value:function(value) {
	 	if(value > 1) {
	 		value = value / 100;
	 	}
	 	//重新设置宽度
	 	var width = this.width * value;
	 	//找到要更高宽的矩正   通过id查找
	 	var innerRect = this.group.findOne('#innerRect');
	 	//让我们的物体变换状态
	 	innerRect.to({
	 		width:width,
	 		duration:.9
	 	});
	 }
}
