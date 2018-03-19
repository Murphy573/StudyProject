
let Pie = {
	data: [],
	radius: 200,
	center: {
		cx: 400,
		cy: 300
	},
	init(ctx, data) {
		const sum = data.reduce( (l, c) => {
			return l + c;
		}, 0);
		this.data = data.map( (d) => {
			return (d /sum) * (Math.PI * 2);
		});
		this.draw(ctx);
	},

	draw (ctx) {
		let _sAngle = 0, _eAngle = 0;
		this.data.forEach( (v, i) => {
			_sAngle = _eAngle;
			if(i === this.data.length -1) {
				_eAngle = Math.PI * 2
			}
			else {
				_eAngle += v;
			}
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(this.center.cx, this.center.cy);
			ctx.arc(this.center.cx, this.center.cy, this.radius, _sAngle, _eAngle);
			ctx.fillStyle = Util.getRandomRgbColor();
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		});

	}
};