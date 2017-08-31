
function Bar(option) {
	this._init(option);
}

Bar.prototype = {
	_init:function(option) {
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.w = option.w || 0;
		this.h = option.h || 0;
		
		this.strokeStyle = option.strokeStyle || 'red',
		this.fillStyle = option.fillStyle || 'blue'
		//内矩正
		var innerRect = new Konva.Rect({
			x:this.x,
			y:this.y,
			width:100,
			height:this.h,
			fill:this.fillStyle,
			cornerRadius:this.h / 2,
			id:'innerRect'
		});
		//外矩正
		var outRect = new Konva.Rect({
			x:this.x,
			y:this.y,
			width:this.w,
			height:this.h,
			stroke:this.strokeStyle,
			strokeWidth:4,
			cornerRadius:this.h / 2,
		});
		//创建组
		this.group = new Konva.Group({
			x:0,
			y:0
		});
		this.group.add(innerRect);
		this.group.add(outRect);
	},
	//添加到层
	toLayer:function(layer) {
		layer.add(this.group);
	},
	//进度条
	value:function(value) {
		if(value > 1) {
			value = value / 100;
		}
		var width = value * this.w;
		var innerRect = this.group.findOne('#innerRect');
		innerRect.to({
			width:width,
			duration:.9
		});
	}
}
