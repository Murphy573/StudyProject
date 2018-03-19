const ctx = document.getElementById('canvas').getContext('2d');

const draw = {
	arrow () {
		ctx.moveTo(100, 200);
		ctx.lineTo(300, 200);
		ctx.lineTo(300, 150);
		ctx.lineTo(360, 212.5);
		ctx.lineTo(300, 275);
		ctx.lineTo(300, 225);
		ctx.lineTo(100, 225);
		ctx.closePath();

		ctx.lineWidth = 5;
		let c = ctx.createLinearGradient(100, 200, 300, 200);
		c.addColorStop(0, 'red');
		c.addColorStop(.25, 'blue');
		c.addColorStop(.5, 'green');
		c.addColorStop(.75, 'orange');
		ctx.strokeStyle = c;
		ctx.fillStyle = 'yellow';

		//ctx.fill();//fill如果在stroke之后，那么fill会把stroke的内描边填充掉，导致描边宽度不为15，只需要先fill后stroke即可
		ctx.stroke();
	},

	mutiArrow () {
		ctx.beginPath();
		ctx.moveTo(100, 100);
		ctx.lineTo(300, 300);
		ctx.lineTo(100, 500);
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'blue';
		ctx.stroke();

		ctx.beginPath();
		ctx.lineTo(500, 100);//由于有beginPath，这里可以使用lineTo
		ctx.lineTo(700, 300);
		ctx.lineTo(500, 500);

		//ctx.lineWidth = 3;//beginPath：重新开始一条路径，如果绘图状态未被该表，则会继承上一次的值
		ctx.strokeStyle = 'red';
		ctx.stroke();
	},

	drawRect ( sx, sy, w, h, bw = 5, bc = '#DF15E1', fc = '#1AE191' ) {
		//ctx.beginPath();
		/*ctx.lineTo(sx, sy);
		ctx.lineTo(sx + w, sy);
		ctx.lineTo(sx + w, sy + h);
		ctx.lineTo(sx, sy + h);*/

		//ctx.rect(sx, sy, w, h);
		ctx.lineWidth = bw;
		ctx.strokeStyle = bc;
		ctx.fillStyle = fc;
		ctx.fillRect(sx, sy, w, h);
		ctx.strokeRect(sx, sy, w, h);
		//ctx.closePath();


		//ctx.fill();
		//ctx.stroke();
	},

	drawArc (  ) {

		//ctx.arc(100, 100, 50, 0, 1.8 * Math.PI, true);

		for(let i = 0; i < 10; i ++){
			ctx.beginPath();
			ctx.arc(50 + i * 60 + 10, 30, 25, 0, 2 * Math.PI * (i + 1) / 10 , true);
			ctx.stroke();
		}

		for(let i = 0; i < 10; i ++){
			ctx.beginPath();
			ctx.arc(50 + i * 60 + 10, 100, 25, 0, 2 * Math.PI * (i + 1) / 10 , true);
			ctx.closePath();
			ctx.stroke();
		}

		for(let i = 0; i < 10; i ++){
			ctx.beginPath();
			ctx.arc(50 + i * 60 + 10, 170, 25, 0, 2 * Math.PI * (i + 1) / 10 , false);
			ctx.stroke();
		}

	},

	drawRoundRect(sx, sy, width, height, r) {
		ctx.beginPath();
		ctx.lineTo(sx + r, sy);
		ctx.lineTo(sx + width - r, sy);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(sx + width - r, sy + r, r, 0, 1.5 * Math.PI, true);
		ctx.moveTo(sx + width, sy + r);
		ctx.lineTo(sx + width, sy + height - r);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(sx + width - r, sy + height - r, r, 0, 0.5 * Math.PI, false);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(sx + width - r, sy + height);
		ctx.lineTo(sx + r, sy + height);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(sx + r, sy + height - r, r, 0.5 * Math.PI, Math.PI, false);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(sx, sy + height - r);
		ctx.lineTo(sx, sy + r);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(sx + r, sy + r, r, Math.PI, 1.5 * Math.PI, false);
		ctx.stroke();
	},

	drawRoundRect2(sx, sy, width, height, r) {
		ctx.save();
		ctx.translate(sx, sy);
		path();
		let c = ctx.createLinearGradient(sx, sy, sx + width, sy + height);
		c.addColorStop(0, 'red');
		c.addColorStop(.25, 'blue');
		c.addColorStop(.5, 'green');
		c.addColorStop(.75, 'orange');
		ctx.lineWidth = 5;
		ctx.strokeStyle = c;
		ctx.stroke();
		ctx.restore();

		function path() {
			ctx.beginPath();
			ctx.arc(r, r, r, Math.PI, 1.5 * Math.PI, false);
			//ctx.lineTo(width - r, 0);
			ctx.arc(width - r, r, r, 1.5 * Math.PI, 2 * Math.PI, false);
			//ctx.lineTo(width, height - r );
			ctx.arc(width - r, height - r, r, 0, 0.5 * Math.PI, false);
			//ctx.lineTo(r, height);
			ctx.arc(r, height - r, r, 0.5 * Math.PI, Math.PI, false);
			ctx.closePath();
		}
	},

	drawLine ( sx, sy, toX, toY, lineCap = 'butt', lc = '#2F26E1', lw = 10 ) {
		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.lineTo(toX, toY);
		ctx.strokeStyle = lc;
		ctx.lineWidth = lw;
		ctx.lineCap = lineCap;
		ctx.stroke();
	},

	init () {
		//this.arrow();
		//this.drawRect(200, 200, 200, 150, 3, 'blue', 'red');

		//this.drawRect(300, 300, 200, 150, 5, '#DF15E1', 'rgba(26, 225, 145, .5)');

		/*this.drawLine(100, 100, 200, 100);
		this.drawLine(100, 200, 200, 200, 'round');
		this.drawLine(100, 300, 200, 300, 'square');
		this.drawLine(100, 0, 100, 500, undefined, 'red', 2);
		this.drawLine(200, 0, 200, 500, undefined, 'red', 2);*/

		//this.drawStar(200, 200, 100, 200)
		//this.drawSixPolygon(200, 200, 100)
		//this.drawPolygon(200, 200, 100, 5);
		//this.drawArc();
		//this.drawRoundRect2(100, 100, 200, 150, 25);
		//this.drawBalls();
		//this.observeGlobalCompositeOperation();
		this.drawRing();
	},

	drawStar ( cx, cy, r, R, ) {
		ctx.beginPath();
		for ( let i = 0; i < 5; i++ ) {
			ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * R + cx, -Math.sin((18 + i * 72) / 180 * Math.PI) * R + cy);
			ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * r + cx, -Math.sin((54 + i * 72) / 180 * Math.PI) * r + cy);
		}
		ctx.closePath();

		ctx.fillStyle = '#E1D608';
		ctx.strokeStyle = '#e0e169';
		ctx.lineWidth = 3;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		ctx.fill();
		ctx.stroke();
	},

	drawSixPolygon ( cx, cy, r ) {
		ctx.beginPath();
		for ( let i = 0; i < 6; i++ ) {
			ctx.lineTo(Math.cos((30 + i * 60) / 180 * Math.PI) * r + cx, -Math.sin((30 + i * 60) / 180 * Math.PI) * r + cy);
		}
		ctx.closePath();
		ctx.stroke();
	},

	drawPolygon ( cx, cy, r, num ) {//绘制任意多边形
		ctx.beginPath();
		for ( let i = 0; i < num; i++ ) {
			ctx.lineTo(Math.cos(2 * Math.PI * i / num) * r + cx, Math.sin(2 * Math.PI * i / num) * r + cy);
		}
		ctx.lineJoin = 'bevel';//线与线相交的样式：miter:默认值，尖角；round：圆形
		ctx.lineWidth = 20;
		ctx.closePath();
		ctx.stroke();
	},

	drawBalls() {

		let i = 200;
		while(i--){
			ctx.save();
			let _sx = Math.random() * ctx.canvas.width,
				_sy = Math.random() * ctx.canvas.height,
				_scale = Math.random() * 50;
			ctx.globalAlpha = Math.random();
			ctx.translate(_sx, _sy);
			ctx.scale(_scale, _scale);
			ctx.beginPath();
			ctx.fillStyle = Util.getRandomRgbColor();
			ctx.arc(0, 0, 1, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();

			//ctx.globalCompositeOperation
		}
	},

	observeGlobalCompositeOperation() {
		document.querySelector('.button').addEventListener('click', (e) => {
			if(!e.target.classList.contains('button')){
				draw(e.target.innerText);
			}
		});


		function draw(globalCompositeOperation) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

			ctx.save();
			ctx.font = '25px aria';
			let c = ctx.createLinearGradient(50, 30, 600, 50);
			c.addColorStop(0, 'red');
			c.addColorStop(0.15, 'orange');
			c.addColorStop(0.3, 'yellow');
			c.addColorStop(0.45, 'green');
			c.addColorStop(0.60, '#12FFC8');
			c.addColorStop(0.75, 'blue');
			c.addColorStop(1, 'purple');
			ctx.fillStyle = c;
			ctx.fillText(`当前globalCompositeOperation =${globalCompositeOperation}`, 50, 30);
			ctx.restore();

			//rect
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = 'blue';
			ctx.fillRect(300, 200, 200, 200);
			ctx.fill();
			ctx.restore();

			//triangle

			ctx.save();
			ctx.fillStyle = 'red';
			ctx.globalCompositeOperation = globalCompositeOperation;
			ctx.beginPath();
			ctx.lineTo(500, 200);
			ctx.lineTo(300, 400);
			ctx.lineTo(700, 400);
			ctx.fill();
			ctx.restore();
		}

		draw('source-over');
	},

	drawRing() {
		ctx.beginPath();
		ctx.arc(400, 300, 150, 0, Math.PI * 2, false);
		ctx.arc(400, 300, 80, 0, Math.PI * 2, true);
		ctx.closePath();

		ctx.fillStyle = 'orange';
		ctx.shadowColor = 'black';
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		ctx.fill();


		function bindEvent() {
			ctx.canvas.addEventListener('mousemove', (e) => {
				console.log(e);
			});
		}

		bindEvent();
	}

};

draw.init();