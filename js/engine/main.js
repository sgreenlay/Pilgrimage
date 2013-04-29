
require('js/engine/components/fps.js', function () {
require('js/engine/components/inputman.js', function () {
require('js/engine/components/renderman.js', function () {

namespace('sg.gam.engine', (function() {

	var engine = function (canvas) {
		this.renderman = new sg.gam.components.engine.renderman(canvas);
		this.inputman = new sg.gam.components.engine.inputman(canvas);
		this.simulationTime = (new Date).getTime();
	};

	engine.prototype.update = function(time) {
		var event = this.inputman.peek();
		while (event != null && event.time - time < this.dt) {
			this.game.event_handler(this.inputman.next(), this.dt, this.inputman);
			event = this.inputman.peek();
		}
		this.game.update(time, this.dt, this.inputman);
	};

	engine.prototype.render = function() {
		this.renderman.clear();

		this.game.render(this.accumulator, this.renderman);
		
		if (this.game.debugMode) {
			this.fps_counter.render(this.accumulator, this.renderman);
		}
	};

	// Ref: http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/index.html
	function setup_game_loop() {
		var onEachFrame;
		if (window.requestAnimationFrame) {
			onEachFrame = function(cb) {
				var _cb = function() {
					cb();
					requestAnimationFrame(_cb);
				}
				_cb();
			};
		}
		else if (window.webkitRequestAnimationFrame) {
			onEachFrame = function(cb) {
				var _cb = function() {
					cb();
					webkitRequestAnimationFrame(_cb);
				}
				_cb();
			};
		}
		else if (window.mozRequestAnimationFrame) {
			onEachFrame = function(cb) {
				var _cb = function() {
					cb();
					mozRequestAnimationFrame(_cb);
				}
				_cb();
			};
		} else {
			onEachFrame = function(cb) {
				setInterval(cb, 1000 / 60);
			}
		}
		window.onEachFrame = onEachFrame;
	}

	engine.prototype.run = function(game) {
		setup_game_loop();

		this.dt = 100;
		this.currentTime = (new Date).getTime();
		this.accumulator = 0;

		this.fps_counter = new sg.gam.components.engine.fps();
		this.inputman.capture_input();

		this.game = game;
		this.game.init(this.renderman);

		var self = this;

		// Ref: http://gafferongames.com/game-physics/fix-your-timestep/
		window.onEachFrame(function() {
			var newTime = (new Date).getTime();
			var frameTime = newTime - self.currentTime;
			if (frameTime > 300) {
				frameTime = 300;
			}

			var accumulatorTime = self.currentTime - self.accumulator;
			self.currentTime = newTime;
			self.accumulator += frameTime;

			var loops = 0;
			while (self.accumulator >= self.dt)
			{
				 self.update(accumulatorTime);
				 self.accumulator -= self.dt;
				 accumulatorTime += self.dt;
				 loops++;
			}
			self.render();
			self.fps_counter.tick(frameTime);
		});
	};

	return engine;

})());

loaded('js/engine/main.js');

}); // js/engine/components/renderman.js
}); // js/engine/components/inputman.js
}); // js/engine/components/fps.js
