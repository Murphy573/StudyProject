const ctx = document.querySelector('canvas').getContext('2d');

class CanvasImage {
	constructor () {
		this._canvasW = ctx.canvas.width;
		this._canvasH = ctx.canvas.height;
	}
	init() {
		console.log(`canvas画布大小width=${this._canvasW}, height=${this._canvasH}`);
	}
}


new CanvasImage().init();