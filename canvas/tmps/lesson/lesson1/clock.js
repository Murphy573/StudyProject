

const canvas = document.getElementById('canvas'),
	  ctx = canvas.getContext('2d');

canvas.setAttribute('width', '1350');
canvas.setAttribute('height', '500');

console.log(ctx);

let drawLine = function() {
	//设置绘图状态
	ctx.beginPath();
	ctx.moveTo(100, 100);
	ctx.lineTo(500, 300);
	ctx.lineTo(500, 100);
	ctx.lineTo(100, 100);
	ctx.closePath();

	ctx.lineWidth = 2;
	ctx.strokeStyle = 'red';
	//真实绘制
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(200, 200);
	ctx.lineTo(200, 400);
	ctx.closePath();

	ctx.lineWidth = 4;
	ctx.strokeStyle = 'blue';
	ctx.stroke();

};

//drawLine();

let drawMutiRect = function (  ) {
	//设置绘图状态
	ctx.moveTo(100, 100);
	ctx.lineTo(500, 300);
	ctx.lineTo(500, 100);
	ctx.lineTo(100, 100);

	ctx.fillStyle = 'blue';
	//真实绘制
	ctx.fill();
};

//调色板
let drawColorPanel = function (  ) {
	let w = 8, h = 8, startX = 20, startY = 10;
	const pieceWH = 50;

	for(let i = 1; i <= w; i++){
		for(let j = 1; j <= h; j++){
			ctx.beginPath();
			let _startX = startX + pieceWH * (i - 1),
				_startY = startY + pieceWH * (j - 1);
			ctx.moveTo(_startX, _startY);
			ctx.lineTo(_startX + pieceWH, _startY);
			ctx.lineTo(_startX + pieceWH, _startY + pieceWH);
			ctx.lineTo(_startX, _startY + pieceWH);
			ctx.lineTo(_startX, _startY);

			ctx.fillStyle = Util.getRandomRgbColor();
			ctx.fill();

			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.closePath();
		}
	}


};
//drawColorPanel();

//drawMutiRect();

let drawArc = function (  ) {
	ctx.beginPath();
	ctx.arc(500, 100, 50, 0, 0.5 * Math.PI, true);
	ctx.stroke();
	//ctx.moveTo(700, 100);
	ctx.beginPath();
	ctx.arc(700, 100, 50, 0, 2 * Math.PI, false);
	ctx.stroke();
};
//drawArc();

renderClock.init(ctx);