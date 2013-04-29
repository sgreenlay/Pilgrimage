
require('js/pilgrimage/resources/sprites.js', function () {
require('js/pilgrimage/resources/colours.js', function () {
require('js/pilgrimage/components/status_bar.js', function () {

namespace('sg.pilgrimage.components.ship_status', (function() {

	var ship_status = function(x, y) {
		this.position = {
			x : x,
			y : y
		};
		this.status_bars = new Array();
		this.status_bars.push(new sg.pilgrimage.components.status_bar(x + 4, y + 4, 242, 18, 0, 121, 0.08, 121, sg.pilgrimage.resources.colours.water));
		this.status_bars.push(new sg.pilgrimage.components.status_bar(x + 4, y + 26, 242, 18, 0, 121, 0.08, 121, sg.pilgrimage.resources.colours.food));
		this.distance = 0;
	};
	
	ship_status.prototype.remaining = function(i) {
		if (i < 2) {
			return this.status_bars[i].next_value;
		}	
	};
	
	ship_status.prototype.update_remaining = function(i, dr) {
		if (i < 2) {
			this.status_bars[i].add_to_value(dr);
		}	
	};

	ship_status.prototype.update = function(time, dt, speed) {
		var self = this;
		
		self.distance += speed * dt / 10000;
		
		self.status_bars.forEach(function (status_bar) {
			status_bar.update(time, dt);
		});
	};

	ship_status.prototype.render = function(interpolation, renderman, sprites) {
		var self = this;
		
		renderman.draw_rectangle(self.position.x, self.position.y, 250, 48, sg.pilgrimage.resources.colours.background);
		
		self.status_bars.forEach(function (status_bar) {
			status_bar.render(interpolation, renderman, sprites);
		});
		
		renderman.draw_text(self.position.x + 258, self.position.y + 18, Math.floor(self.distance).toString() + " light years travelled", 18, "rgba(255,255,255,0.5)");
	};

	return ship_status;

})());

loaded('js/pilgrimage/components/ship_status.js');

}); // js/pilgrimage/components/status_bar.js
}); // js/pilgrimage/resources/colours.js
}); // js/pilgrimage/resources/sprites.js

