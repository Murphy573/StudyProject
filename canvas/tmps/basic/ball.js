
let ball = {
	x: 1000,
	y: 20,
	ctxW: 0,
	ctxH: 0,
	radius: 25,
	vx: -2,
	vy: 2,
	g: 0.7,
	color: 'blue',
	draw(ctx) {
		this.ctxH = ctx.canvas.height;
		this.ctxW = ctx.canvas.width;

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
	},
	update() {
		this.x += this.vx;
		this.y += this.vy;
		//this.vy += this.g;

		if(this.y >= this.ctxH - this.radius){
			this.y = this.ctxH - this.radius;
			this.vy = -this.vy;
		}

		if(this.y <= this.radius){
			this.y = this.radius;
			this.vy = -this.vy;
		}

		if(this.x <= this.radius){
			this.x = this.radius;
			this.vx = -this.vx;
		}

		if(this.x >= this.ctxW - this.radius){
			this.x = this.ctxW - this.radius;
			this.vx = - this.vx;
		}
	},
	startAnimation(ctx) {
		this.draw(ctx);
		this.update();
		window.requestAnimationFrame(() => {
			this.startAnimation(ctx);
		});
	}
};