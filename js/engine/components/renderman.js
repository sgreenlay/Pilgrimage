
namespace('sg.gam.components.engine.renderman', (function() {

	var renderman = function(canvas) {
		this.context = canvas.getContext('2d');
		this.width = canvas.width;
		this.height = canvas.height;
	};

	renderman.prototype.clear = function clear() {
		this.context.clearRect(0, 0, this.width, this.height);
	};
	
	renderman.prototype.set_alpha = function set_alpha(alpha) {
		this.context.globalAlpha = alpha;
	};

	renderman.prototype.draw_rectangle = function draw_rectangle(x, y, w, h, colour) {
		this.context.fillStyle = colour;
		this.context.fillRect(x, y, w, h);
	};

	renderman.prototype.draw_text = function draw_text(x, y, text, size, colour) {
		this.context.lineWidth = 1;
		this.context.fillStyle = colour;
		this.context.font = size.toString() + "px Helvetica";
		this.context.fillText(text, x, y);
	};
	
	renderman.prototype.draw_image = function draw_image(x, y, w, h, src) {
		this.context.drawImage(src, x, y, w, h);
	}; 
	
	renderman.prototype.draw_sprite = function draw_sprite(x, y, w, h, src, sprite) {
		this.context.drawImage(src, sprite.sx, sprite.sy, sprite.sw, sprite.sh, x, y, w, h);
	};

	return renderman;

})());

loaded('js/engine/components/renderman.js');
