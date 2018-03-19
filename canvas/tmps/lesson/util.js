
const Util = {
	getRandomHexColor() {
		return `#${Math.floor(Math.random()*0xffffff).toString(16)}`;
	},

	getRandomRgbColor() {
		return `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;
	},

	getStringDate(date) {
		let _y = date.getFullYear(),
			_m = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1),
			_d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
			_h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
			_mm = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
			_s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

		return `${_y}-${_m}-${_d} ${_h}:${_mm}:${_s}`;
	},

	getCurrentTime() {
		return this.getStringDate(new Date());
	}
};