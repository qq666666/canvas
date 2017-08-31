
function PieChart(option) {
	this._init(option);
}
PieChart.prototype = {
	_init:function(option) {
		this.x = option.x;
		this.y = option.y;
		this.r = option.r;
		this.data = option.data;
		
		//组 	饼状图所有的 物件的组
		this.group = new Konva.Group({
			x:this.x,
			y:this.y
		});
		
		//扇形 饼状图：所有的 扇形的组
		this.Wedgegroup = new Konva.Group({
			x:0,
			y:0
		});
		this.group.add(this.Wedgegroup);
		
		//百分比 饼状图： 所有的文字的组
		this.pergroup = new Konva.Group({
			x:0,
			y:0
		});
		this.group.add(this.pergroup);
	      	var sel = this;
//	      	从-90开始绘制
		   var templateAngle = -90;
		   //把每条数据创建成一个扇形
	   this.data.forEach(function(items,index) {
		     	var wedge = new Konva.Wedge({
		     		x:0,
		     		y:0,
		     		radius:sel.r,
		     		fill:items.color,
		     		angle:items.value *360,
		     		rotation:templateAngle
		     	});
		     	sel.Wedgegroup.add(wedge);
		     	
		     	//百分比 
//		     	绘制文本的 角度
		     	var textAngle = templateAngle + (items.value *360) / 2;
		     		//绘制的 百分比的文本
		     	var text = new Konva.Text({
		     		x:(150 + 20) * Math.cos(Math.PI * textAngle / 180),
		     		y:(150 + 20) * Math.sin(Math.PI * textAngle / 180),
		     	    fill:items.color,
		     	    text:items.value * 100 + '%'
		     	});
		     	sel.pergroup.add(text);
		     				//根据角度判断设置文字的 位置
		     	if(templateAngle > 90 && templateAngle < 270) {
		     		text.x(text.x() - text.getWidth());
		     	}
		     	templateAngle += items.value * 360;
		     });
		     
		      var circle = new Konva.Circle({
		     	x:0,
		     	y:0,
		     	radius:160,
		     	stroke:'gray',
		     	strokeWidth:1
		     });
		     this.group.add(circle);
		     //动画值
		     this._index = 0;
	},
		//把饼状图添加到层里面的方法
	addLayer:function(layer) {
		layer.add(this.group);
	},
	animate:function() {
		var sel = this;
		//根据索引显示动画
		//把所有扇区 角度设置为0
		if(this._index == 0) {
			this.Wedgegroup.getChildren().each(function(item,index) {
				item.angle(0);
			})
		}
			//展示当前索引对应的动画
		var item = this.Wedgegroup.getChildren()[this._index];
		item.to({
			angle:this.data[this._index].value * 360,
			duration:this.data[this._index].value * 2,
			// 是另一个函数，因此是sel
			onFinish:function() {
				sel._index++;
				if(sel._index >= sel.data.length) {
					//让他的索引再回到0
					sel._index = 0;
					// 会把整个递归执行完成。
                     return;
				}
		//继续执行当前方法，播放下一个动画
				sel.animate();
			}
		})
			
		
	}
}
