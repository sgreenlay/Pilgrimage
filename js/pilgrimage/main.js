
require('js/engine/components/event.js', function () {
require('js/engine/components/inputman.js', function () {
require('js/engine/components/renderman.js', function () {
require('js/pilgrimage/resources/sprites.js', function () {
require('js/pilgrimage/components/monk.js', function () {
require('js/pilgrimage/components/ship.js', function () {
require('js/pilgrimage/components/ship_status.js', function () {
require('js/pilgrimage/components/starfield.js', function () {

namespace('sg.pilgrimage.game', (function() {
	
	var game = function() {
		this.debugMode = true;
	};

	game.prototype.init = function(renderman) {
		var self = this;
		
		self.resources = new Object();
		
		self.resources.sprites = new sg.pilgrimage.resources.sprites();
		
		self.components = new Object();
		
		self.components.starfield = new sg.pilgrimage.components.starfield(0, 0, renderman.width, renderman.height, 1);
		
		var ship_sprite = self.resources.sprites.get('ship');
		self.components.ship = new sg.pilgrimage.components.ship(renderman.width / 2 - ship_sprite.sw / 2, renderman.height / 2 - ship_sprite.sh / 2);
		
		self.components.ship_status = new sg.pilgrimage.components.ship_status(10, 10);
		
		self.components.monks = new Array();
		self.components.monks.push(new sg.pilgrimage.components.monk(10, 400));
		self.components.monks.push(new sg.pilgrimage.components.monk(146, 400));
		self.components.monks.push(new sg.pilgrimage.components.monk(282, 400));
		self.components.monks.push(new sg.pilgrimage.components.monk(418, 400));
	};

	game.prototype.event_handler = function(event, dt, inputman) {
		var self = this;
		
		var handled = false;
		for (var i = 0; i < 4; i++) {
			var monk = self.components.monks[i];
			var result = monk.event_handler(event, dt, inputman);
			if (result != null && result.value < 2) {
				var remaining = self.components.ship_status.remaining(result.value);
				if (remaining > 0) {
					monk.add(result.value, 1);
					self.components.ship_status.update_remaining(result.value, -1);
				}
			}
		}
		
		return handled;
	};

	game.prototype.update = function(time, dt) {
		var self = this;
		
		var working_monks = 0;
		var dead_monks = 0;
		self.components.monks.forEach(function (monk) {
			monk.update(time, dt);
			if (monk.state == 0) {
				working_monks++;
			}
			else if (monk.state == 2) {
				dead_monks++;
			}
		});
		
		self.components.starfield.set_speed(working_monks);
		
		self.components.ship_status.update(time, dt, self.components.starfield.get_speed());
		self.components.ship.update(time, dt);
		self.components.starfield.update(time, dt);
	};

	game.prototype.render = function(interpolation, renderman) {
		var self = this;
		
		self.components.starfield.render(interpolation, renderman, self.resources.sprites);
		self.components.ship.render(interpolation, renderman, self.resources.sprites);
		self.components.ship_status.render(interpolation, renderman, self.resources.sprites);
		self.components.monks.forEach(function (monk) {
			monk.render(interpolation, renderman, self.resources.sprites);
		});
		
		/*
		var mouse_sprite = self.resources.sprites.get('cursor');
		renderman.draw_sprite(self.mouse.x, self.mouse.y, mouse_sprite.sw, mouse_sprite.sh, self.resources.sprites.image, mouse_sprite);
		 */
	};

	return game;

})());

loaded('js/pilgrimage/main.js');

}); // js/pilgrimage/components/starfield.js
}); // js/pilgrimage/components/ship_status.js
}); // js/pilgrimage/components/ship.js
}); // js/pilgrimage/components/monk.js
}); // js/pilgrimage/resources/sprites.js
}); // js/engine/components/renderman.js
}); // js/engine/components/inputman.js
}); // js/engine/components/event.js
