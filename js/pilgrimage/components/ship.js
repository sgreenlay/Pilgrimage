
require('js/pilgrimage/resources/sprites.js', function () {

namespace('sg.pilgrimage.components.ship', (function() {

	var ship = function(x, y) {
		this.position = {
			x : x,
			y : y
		};
	};

	ship.prototype.update = function(time, dt) {
		// TODO
	};

	ship.prototype.render = function(interpolation, renderman, sprites) {
		var ship_sprite = sprites.get('ship');
		renderman.draw_sprite(this.position.x, this.position.y, ship_sprite.sw, ship_sprite.sh, sprites.image, ship_sprite);
	};

	return ship;

})());

loaded('js/pilgrimage/components/ship.js');

}); // js/pilgrimage/resources/sprites.js

