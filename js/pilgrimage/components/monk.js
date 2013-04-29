
require('js/engine/components/event.js', function () {
require('js/pilgrimage/resources/sprites.js', function () {
require('js/pilgrimage/resources/colours.js', function () {
	
namespace('sg.pilgrimage.components.monk', (function() {
	
	var monk_state = {
		MONK_STANDING : 0,
		MONK_PRAYING : 1,
		MONK_DEAD : 2
	};

	var monk = function(x, y) {
		this.position = {
			x : x,
			y : y
		};
		this.state = monk_state.MONK_PRAYING;
		this.status_bars = new Array();
		this.status_bars.push(new sg.pilgrimage.components.status_bar(x + 62, y + 4, 60, 18, 0, 10, 0.008, 10, sg.pilgrimage.resources.colours.water));
		this.status_bars.push(new sg.pilgrimage.components.status_bar(x + 62, y + 26, 60, 18, 0, 10, 0.008, 10, sg.pilgrimage.resources.colours.food));
		this.status_bars.push(new sg.pilgrimage.components.status_bar(x + 62, y + 48, 60, 18, 0, 10, 0.008, 10, sg.pilgrimage.resources.colours.spirit));
	};
	
	monk.prototype.add = function(i, dr) {
		var self = this;
		
		if (i < 2) {
			self.status_bars[i].add_to_value(dr);
		}
	};

	monk.prototype.event_handler = function(event, dt, inputman) {
		var self = this;
		
		if (event.type == 'mouse' && inputman.hittest(event, self.position.x, self.position.y, 126, 70)) {
			if (event.position.x < self.position.x + 60) {
				if (event.state == 'up') {
					if (self.state == monk_state.MONK_STANDING) {
						self.state = monk_state.MONK_PRAYING;
					}
					else if (self.state == monk_state.MONK_PRAYING) {
						self.state = monk_state.MONK_STANDING;
					}
				}
			}
			else {
				for (var i = 0; i < 2; i++) {
					var result = self.status_bars[i].event_handler(event, dt, inputman);
					if (result != null && result.target == null) {
						return new sg.gam.components.engine.event(null, i);
					}
				}
			}
		}
		
		return null;
	};

	monk.prototype.update = function(time, dt) {
		var self = this;
		
		if (self.state != monk_state.MONK_DEAD) {
			
			if (self.state == monk_state.MONK_PRAYING) {
				self.status_bars[0].add_to_value(-0.00005 * dt);
				self.status_bars[1].add_to_value(-0.00001 * dt);
				self.status_bars[2].add_to_value(+0.0002 * dt);
			}
			else {
				self.status_bars[0].add_to_value(-0.0004 * dt);
				self.status_bars[1].add_to_value(-0.0002 * dt);
				self.status_bars[2].add_to_value(-0.00005 * dt);
			}
			
			var empty_statuses = 0;
			self.status_bars.forEach(function (status_bar, index) {
				status_bar.update(time, dt);
				if (status_bar.value == 0) {
					empty_statuses++;
				}
			});
			if (empty_statuses > 0) {
				self.state = monk_state.MONK_DEAD;
			}
		}
	};

	monk.prototype.render = function(interpolation, renderman, sprites) {
		var self = this;
		
		renderman.draw_rectangle(self.position.x, self.position.y, 126, 70, sg.pilgrimage.resources.colours.background);
		
		var monk_sprite = sprites.get('monk_standing');
		if (this.state == monk_state.MONK_PRAYING) {
			monk_sprite = sprites.get('monk_praying');
		}
		else if (this.state == monk_state.MONK_DEAD) {
			monk_sprite = sprites.get('monk_dead');
		}
		renderman.draw_sprite(self.position.x + 4, self.position.y + 4, monk_sprite.sw, monk_sprite.sh, sprites.image, monk_sprite);
		
		self.status_bars.forEach(function (status_bar) {
			status_bar.render(interpolation, renderman, sprites);
		});
	};

	return monk;

})());

loaded('js/pilgrimage/components/monk.js');
	
}); // js/pilgrimage/resources/colours.js
}); // js/pilgrimage/resources/sprites.js
}); // js/engine/components/event.js
