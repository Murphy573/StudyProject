
const ctx = document.querySelector('#container').getContext('2d');
console.log(ctx);




// ctx.fillStyle = "rgb(200,0,0)";
// ctx.fillRect (10, 10, 55, 50);
//
// ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
// ctx.fillRect (30, 30, 55, 50);
//
// ctx.fillStyle = 'orange';
// ctx.fillText('这是矩形', 10, 20);


// ctx.fillRect(25,25,100,100);//绘制一个填充的矩形
// ctx.clearRect(45,45,60,60);//绘制一个矩形的边框
// ctx.strokeRect(50,50,50,50);//清除指定矩形区域，让清除部分完全透明

//画三角形
let drawTriangle = function() {
	ctx.beginPath();
	ctx.moveTo(75,50);
	ctx.lineTo(100,75);
	ctx.lineTo(100,25);
	ctx.fill();
};
//drawTriangle();

//画线
let drawLine = function() {
	ctx.beginPath();
	ctx.moveTo(200, 70);
	ctx.lineTo(200,120);
	ctx.lineTo(250,120);
	//ctx.closePath();
	ctx.stroke();
};
//drawLine();

let drawArc = function() {
	ctx.beginPath();
	ctx.arc(100, 90, 10, 15, 20, false);
	ctx.fill();
};
//drawArc();

//绘制二次贝塞尔曲线
let drawQuadraticCurve = function (  ) {
	ctx.beginPath();
	ctx.moveTo(25, 25);
	ctx.quadraticCurveTo(63, 55, 100, 25);
	ctx.stroke();
};
//drawQuadraticCurve();

//绘制三次贝塞尔曲线
let drawBezierCurve = function (  ) {
	ctx.beginPath();
	ctx.moveTo(25, 25);
	ctx.bezierCurveTo(74, 100, 100, 25, 100, 75);
	ctx.stroke();
	ctx.closePath();


	//ctx.closePath();
	//控制点一
	ctx.beginPath();
	ctx.moveTo(74, 100);
	ctx.arc(74, 100, 5, 10, 15, true);
	ctx.fill();
	ctx.closePath();


	//控制点2
	ctx.beginPath();
	ctx.moveTo(100, 25);
	ctx.arc(100, 25, 5, 10, 15, true);
	ctx.fill();
	ctx.closePath();

};
//drawBezierCurve();

//绘制气泡
let drawBubble = function() {
	ctx.beginPath();
	ctx.moveTo(75,25);
	//ctx.lineTo(25,62.5);
	ctx.quadraticCurveTo(25,25,25,62.5);
	ctx.quadraticCurveTo(25,100,50,100);
	ctx.quadraticCurveTo(50,120,30,125);
	ctx.quadraticCurveTo(60,120,65,100);
	ctx.quadraticCurveTo(125,100,125,62.5);
	ctx.quadraticCurveTo(125,25,75,25);
	ctx.stroke();
};
// drawBubble();


let drawHeart = function (  ) {
	ctx.beginPath();
	ctx.moveTo(75,40);
	ctx.bezierCurveTo(75,37,70,25,50,25);
	ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
	ctx.bezierCurveTo(20,80,40,102,75,120);
	ctx.bezierCurveTo(110,102,130,80,130,62.5);
	ctx.bezierCurveTo(130,62.5,130,25,100,25);
	ctx.bezierCurveTo(85,25,75,37,75,40);
	ctx.fillStyle = "red";
	ctx.fill();
};
drawHeart();

