const ctx = document.getElementById('canvas').getContext('2d');

const night = {
	drawStar ( cx, cy, r, R, rotate = 20) {

		ctx.save();
		ctx.translate(cx, cy);
		ctx.rotate(rotate * Math.PI / 180);

		//ctx.transform(a,b,c,d,e,f)
		//ctx.scale(1.2, 1.2);

		this.starPath(r, R);

		ctx.fillStyle = '#FFF807';
		ctx.strokeStyle = 'rgba(255, 252, 148, .5)';
		ctx.lineWidth = 1;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		ctx.fill();
		ctx.stroke();

		ctx.restore();

	},
	starPath(r, R) {
		ctx.beginPath();
		for ( let i = 0; i < 5; i++ ) {
			ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * R , -Math.sin((18 + i * 72) / 180 * Math.PI) * R);
			ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * r, -Math.sin((54 + i * 72) / 180 * Math.PI) * r);
		}
		ctx.closePath();
	},
	drawMoon(controlPoint, x, y , r, rotate) {
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(rotate * Math.PI / 180);
		ctx.scale(r, r);
		moonPath();
		let c = ctx.createLinearGradient(0, 0, 1, 0);
		c.addColorStop(0, '#FFFBDC');
		c.addColorStop(.25, '#FFF9B9');
		c.addColorStop(.5, '#FFFB77');
		c.addColorStop(.75, '#FFDF1C');
		c.addColorStop(1, '#FFFBDC');
		ctx.fillStyle = c;
		ctx.fill();
		ctx.restore();

		function moonPath() {
			ctx.beginPath();
			ctx.arc(0, 0, 1, 0.5 * Math.PI, 1.5 * Math.PI, true);
			ctx.moveTo(0, -1);
			//ctx.arcTo(controlPoint, 0, 0, 1, dis(0, -1, controlPoint, 0) / controlPoint);
			ctx.quadraticCurveTo(controlPoint, 0, 0, 1);
			ctx.closePath();
		}

		function dis(x1, y1, x2, y2) {//求三角边长
			return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
		}
	},
	skyRect: {
		width: ctx.canvas.width,
		height: 300,
	},
	drawStarrySky() {
		let num = 200;
		while(num --) {
			this.drawStar(this.skyRect.width * (Math.random()),
							this.skyRect.height * (Math.random()),
							Math.min(Math.random() * 5, 2),
							Math.min(Math.random() * 10, 4),
							(Math.random()) * 100)
		}
	},
	drawRect ( sx, sy, w, h, bw = 5, fc = '#1AE191', bc = '#DF15E1') {
		ctx.lineWidth = bw;
		ctx.strokeStyle = bc;

		let c = ctx.createLinearGradient(sx, sy, sx, sy + h);
		c.addColorStop(0, '#000000');
		c.addColorStop(0.25, '#092253');
		c.addColorStop(0.5, '#0f378c');
		c.addColorStop(0.75, '#1741c2');
		c.addColorStop(1, '#0e78c6');

		/*var _img = new Image();
		_img.src = './111.jpg';
		_img.onload = function(e) {
			let pattern = ctx.createPattern(_img, 'no-repeat');
			ctx.fillStyle = pattern;
			ctx.fillRect(sx, sy, w, h);
		};*/
		/*let _c = this.createCanvas();

		_c.then((data) => {
			ctx.fillStyle = ctx.createPattern(data, 'no-repeat');
			ctx.fillRect(sx, sy, w, h);
		});*/
		ctx.fillStyle = c;
		ctx.fillRect(sx, sy, w, h);

	},
	createCanvas() {
		let _ctx = document.createElement('canvas');
		_ctx.width = 1000;
		_ctx.height = 800;

		return new Promise(function(resolve, reject){
			let _img = new Image();
			_img.src = './111.jpg';
			_img.onload = function(e) {
				let pattern = _ctx.getContext('2d').createPattern(_img, 'no-repeat');
				_ctx.getContext('2d').fillStyle = pattern;
				_ctx.getContext('2d').fillRect(0, 0, 1000, 800);
				resolve(_ctx);
			};
		});
	},
	drawLand: function () {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0, this.skyRect.height);
		ctx.bezierCurveTo(300, 200, 500, 450, ctx.canvas.width, this.skyRect.height);
		ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
		ctx.lineTo(0, ctx.canvas.height);
		ctx.closePath();

		let c = ctx.createLinearGradient(0, ctx.canvas.height, 0, this.skyRect.height);
		c.addColorStop(0, '#67ff4e');
		c.addColorStop(0.25, '#69D25A');
		c.addColorStop(0.5, '#3CBF32');
		c.addColorStop(0.75, '#259A1B');
		c.addColorStop(1, '#21830d');
		ctx.fillStyle = c;

		ctx.fill();
		ctx.restore();
	},
	writeText() {
		ctx.save();
		ctx.font = '30px aria';
		/**
		 * ctx.textAlign = 'left center right';
		 * left: 绘制文字左侧贴着起始X坐标
		 * center: 绘制文字相对于起始X坐标X居中
		 * right：绘制文字的右侧贴着起始X坐标
		 */

		/**
		 * ctx.textBaseline=
		 * 	top: 绘制文字上方贴着起始y坐标
		 * 	middle: 绘制文字相对起始Y坐标的水平线居中，类似于删除线
		 * 	bottom: 绘制文字下方贴着其实Y坐标
		 *
		 */
		this.setShadow(ctx);
		let c = ctx.createLinearGradient(100, 400, 800, 400);
		c.addColorStop(0, 'red');
		c.addColorStop(0.15, 'orange');
		c.addColorStop(0.3, 'yellow');
		c.addColorStop(0.45, 'green');
		c.addColorStop(0.60, '#12FFC8');
		c.addColorStop(0.75, 'blue');
		c.addColorStop(1, 'purple');
		ctx.fillStyle = c;
		//ctx.strokeStyle = 'red';
		let _text = '床前明月光,疑是地上霜。举头望明月，低头思故乡。';
		ctx.fillText(_text, 100, 400);//同样地，此处也可以使用createPattern()
		let _measure = ctx.measureText(_text);
		ctx.fillText(`上面的文字绘制在Canvas中的宽度为${_measure.width}`, 100, 450);
		//ctx.strokeText('床前明月光', 100, 250, 600);
		ctx.restore();
	},
	setShadow(ctx, color = 'black', offX = 2, offY = 1, offBlur = 1) {//设置阴影
		ctx.globalAlpha = 0.3;//全局
		ctx.shadowColor = color;
		ctx.shadowOffsetX = offX;
		ctx.shadowOffsetY = offY;
		ctx.shadowBlur = offBlur;
	},
	init() {
		this.drawRect(0, 0, ctx.canvas.width, ctx.canvas.height, 5, '#03205B');
		this.drawStarrySky();
		this.drawMoon(1.2, 700, 80, 50, 45);
		this.drawLand();
		this.writeText();
	}
};

night.init();