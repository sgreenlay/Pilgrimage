
require('js/pilgrimage/resources/sprites.js', function () {

namespace('sg.pilgrimage.components.starfield', (function() {
	
	var star = function(x, y, w, alpha, speed) {
		this.position = {
			x : x,
			y : y
		};
		this.size = {
			w : w,
			h : 1
		};
		this.alpha = alpha;
		this.remove = false;
	};
	
	star.prototype.update = function(time, dt) {
		this.position.x -= 0.1 * dt;
		if (this.position.x + this.size.w < 0) {
			this.remove = true;
		}
	};
	
	star.prototype.render = function(interpolation, renderman, sprites, speed) {
		var self = this;
		
		var width = Math.max(self.size.w * speed, 1);
		
		renderman.set_alpha(self.alpha);
		renderman.draw_rectangle(self.position.x, self.position.y, width, self.size.h, "#fff");
		renderman.set_alpha(1.0);
	};
	
	var starfield = function(x, y, w, h) {
		this.position = {
			x : x,
			y : y
		};
		this.size = {
			w : w,
			h : h
		};
		this.stars = new Array();
		for (var i = 0; i < 3; i++) {
			this.create_star();
		}
		this.speed = 0;
		this.next_speed = 5;
	};
	
	starfield.prototype.create_star = function() {
		var alpha = Math.random() * (0.8 - 0.2) + 0.2;
		var length = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
		var y = Math.floor(Math.random() * (this.size.h - 1 + 1)) + 1;
		this.stars.push(new star(this.size.w, y, length * 5, alpha));
	}
	
	starfield.prototype.get_speed = function() {
		return this.next_speed;
	}
	
	starfield.prototype.set_speed = function set_speed(speed) {
		var self = this;
		self.add_to_speed(speed - self.next_speed);
	};
	
	starfield.prototype.add_to_speed = function set_speed(delta) {
		var self = this;
		
		self.next_speed += delta;
		if (self.next_speed < 0) {
			self.next_speed = 0;
		}
	};

	starfield.prototype.update = function(time, dt) {
		var self = this;
		var removed = 0;
		
		self.stars.forEach(function (star, index) {
			star.update(time, dt * self.speed);
			if (star.remove) {
				self.stars.splice(index, 1);
				removed++;
			}
		});
		
		var create = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
		while (create == 1) {
			this.create_star();
			create = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
		}
		
		if (self.next_speed > self.speed) {
			self.speed += dt * 0.002;
			if (self.next_speed < self.speed) {
				self.speed = self.next_speed;
			}
		}
		else if (self.next_speed < self.speed) {
			self.speed -= dt * 0.002;
			if (self.next_speed > self.speed) {
				self.speed = self.next_speed;
			}
		}
	};

	starfield.prototype.render = function(interpolation, renderman, sprites) {
		var self = this;
		
		renderman.draw_rectangle(self.position.x, self.position.y, self.size.w, self.size.h, "#000");
		this.stars.forEach(function (star) {
			star.render(interpolation, renderman, sprites, self.speed);
		});
	};

	return starfield;

})());

loaded('js/pilgrimage/components/starfield.js');

}); // js/pilgrimage/resources/sprites.js

