
const renderClock = {
	radius: 3,//半径8
	gap: 1,//格子间距
	initialXY: {
		x: 10,
		y: 0
	},//初始坐标
	ctx: {
		self: null,
		ctxW: 0,
		ctxH: 0,
	},
	balls: [],
	lastSecond: 0,
	secondGap: {
		'ten': 0,
		'zero': 0
	},
	addBalls(x, y, number) {
		let _numArr = digit[number];
		_numArr.forEach((numberArr, i) => {
			numberArr.forEach((flag, j) => {
				if(flag === 1){
					this.balls.push({
						x: x + j * 2 * (this.radius + this.gap) + (this.radius + this.gap),
						y: y + i * 2 * (this.radius + this.gap) + (this.radius + this.gap),
						g: 1.5 * Math.random(),
						vx: Math.pow(-1, Math.floor(Math.random() * 1000)) * Math.random() * 4,
						vy: -Math.random() * 2,
						ff: Math.random(),
						color: Util.getRandomRgbColor(),
					});
				}
			});
		});
	},
	updateBalls() {
		let i = this.balls.length;

		while (i--) {
			let ball = this.balls[i];
			ball.x += ball.vx;
			ball.y += ball.vy;
			ball.vy += ball.g;
			//超出左右边界则删除ball
			if(ball.x <= - (2 * (this.radius + this.gap)) || ball.x >= (this.ctx.ctxW + 2 * (this.radius + this.gap))){
				this.balls.slice(i, 1);
				console.log(this.balls.length + '-----');
			}

			//超出下边界
			if(ball.y >= this.ctx.ctxH - this.radius){
				ball.y = this.ctx.ctxH - this.radius;
				ball.vy = -ball.vy * ball.ff;

				if(Math.abs(ball.vy) < 0.01){
					ball.vy = 0;
				}
			}
		}

		while(this.balls.length > Math.min(200, this.balls.length)){
			this.balls.shift();
		}
	},
	renderBalls() {
		this.balls.forEach((ball) => {
			ctx.beginPath();
			ctx.fillStyle = ball.color;
			this.ctx.self.arc(ball.x, ball.y, this.radius * .7, 0,2 * Math.PI,false);
			ctx.fill();
		});
	},
	startRenderBalls(second) {
		let _last = this.lastSecond.split(''),
			_cur = second.split('');

		if(_last[0] !== _cur[0]) {
			this.lastSecond = second;
			this.addBalls(this.secondGap.ten, this.initialXY.y, Number(_last[0]));
		}

		if(_last[1] !== _cur[1]) {
			this.lastSecond = second;
			this.addBalls(this.secondGap.zero, this.initialXY.y, Number(_last[1]));
		}

		this.renderBalls();
		this.updateBalls();

	},
	renderArc(startX, startY, numberIndex, ctx) {
		ctx.fillStyle = '#1789E1';

		if(numberIndex < 0) {
			return;
		}

		let _numArr = digit[numberIndex];

		_numArr.forEach((numArr, i) => {
			numArr.forEach((flag, j) => {
				if(flag === 1) {
					ctx.beginPath();
					ctx.arc(
						startX + j * 2 * (this.radius + this.gap) + (this.radius + this.gap),
						startY + i * 2 * (this.radius + this.gap) + (this.radius + this.gap),
						this.radius,
						0,
						2 * Math.PI,
						false
					);

					ctx.fill();
				}
			});
		});
	},
	gapMapper: {
		'null': 0,
		'-': 11,
		':': 9,
		'number': 15
	},
	render(arr, ctx) {
		let _curStartX = 0, _curNumberIndex = -1, _lastGap = 'null';
		arr.forEach((v, i) => {
			if(i === 0) {
				_curNumberIndex = +v;
				_curStartX = this.initialXY.x;
				_lastGap = 'number';
			}
			else {
				_curStartX += _lastGap === 'null' ? 50 : this.gapMapper[_lastGap] * (this.radius + 1);

				if(i === arr.length - 2) {
					this.secondGap.ten = _curStartX;
				}
				else if(i === arr.length - 1) {
					this.secondGap.zero = _curStartX;
				}

				if(v === ' ') {
					_curNumberIndex = -1;
					_lastGap = 'null';
				}
				else if (v === '-') {
					_curNumberIndex = 11;
					_lastGap = '-';
				}
				else if (v === ':') {
					_curNumberIndex = 10;
					_lastGap = ':';
				}
				else {
					_curNumberIndex = +v;
					_lastGap = 'number';
				}
			}
			this.renderArc(_curStartX, this.initialXY.y, _curNumberIndex, ctx);
		});
	},
	init(ctx) {
		([this.ctx.self, this.ctx.ctxH, this.ctx.ctxW] = [ctx, ctx.canvas.height, ctx.canvas.width]);
		this.lastSecond = Util.getCurrentTime().slice(-2);
		setInterval(() => {
			let time = Util.getCurrentTime();
			ctx.clearRect(0, 0, this.ctx.ctxW, this.ctx.ctxH);
			this.render(time.split(''), ctx);

			this.startRenderBalls(`${time.substr(-2, 1)}${time.substr(-1)}`);
		}, 50);

	}
};