
require('js/engine/components/event.js', function () {

namespace('sg.pilgrimage.components.status_bar', (function() {

	var status_bar = function(x, y, w, h, min, max, roc, value, colour) {
		this.position = {
			x : x,
			y : y
		};
		this.size = {
			w : w,
			h : h
		};
		this.colour = colour;
		this.range = {
			min : min,
			max : max,
			size : max - min
		};
		this.next_value = value;
		this.value = value;
		this.rate_of_change = roc;
	};
	
	status_bar.prototype.set_value = function set_value(value) {
		var self = this;
		
		self.add_to_speed(value - self.next_value);
	};
	
	status_bar.prototype.add_to_value = function set_value(delta) {
		var self = this;
		
		self.next_value += delta;
		if (self.next_value > self.range.max) {
			self.next_value = self.range.max;
		}
		else if (self.next_value < self.range.min) {
			self.next_value = self.range.min;
		}
	};

	status_bar.prototype.event_handler = function(event, dt, inputman) {
		var self = this;
		
		if (event.type == 'mouse' && inputman.hittest(event, self.position.x, self.position.y, self.size.w, self.size.h)) {
			if (event.state == 'up') {
				return new sg.gam.components.engine.event(null, self.value);
			}
		}
		
		return null;
	};

	status_bar.prototype.update = function(time, dt) {
		var self = this;
		
		if (self.next_value > self.value) {
			self.value += dt * self.rate_of_change;
			if (self.next_value < self.value) {
				self.value = self.next_value;
			}
		}
		else if (self.next_value < self.value) {
			self.value -= dt * self.rate_of_change;
			if (self.next_value > self.value) {
				self.value = self.next_value;
			}
		}
	};

	status_bar.prototype.render = function(interpolation, renderman, sprites) {
		var self = this;
		
		renderman.draw_rectangle(self.position.x, self.position.y, self.size.w, self.size.h, "rgba(19,19,19,1.0)");
		
		var progress = ((self.value - self.range.min) / self.range.size) * self.size.w;
		
		renderman.draw_rectangle(self.position.x, self.position.y, progress, self.size.h, self.colour);
	};

	return status_bar;

})());

loaded('js/pilgrimage/components/status_bar.js');

}); // js/engine/components/event.js
