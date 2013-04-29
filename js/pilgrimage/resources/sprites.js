
namespace('sg.pilgrimage.resources.sprites', (function() {
	var sprites = function() {
		this.image = new Image();
		this.image.src = 'img/sprites.png';
		
		this.sprites = new Object();
		this.sprites['unknown'] = {
			sx : 0,
			sy : 0,
			sw : 20,
			sh : 20
		};
		this.sprites['cursor'] = {
			sx : 0,
			sy : 20,
			sw : 20,
			sh : 20
		};
		this.sprites['ship'] = {
			sx : 20,
			sy : 0,
			sw : 310,
			sh : 156
		};
		this.sprites['monk_standing'] = {
			sx : 330,
			sy : 0,
			sw : 54,
			sh : 62
		};
		this.sprites['monk_praying'] = {
			sx : 330,
			sy : 62,
			sw : 54,
			sh : 62
		};
		this.sprites['monk_dead'] = {
			sx : 330,
			sy : 124,
			sw : 54,
			sh : 62
		};
	};
	
	sprites.prototype.get = function get(name) {
		if (typeof this.sprites[name] == 'undefined') {
			return this.sprites['unknown'];
		}
		return this.sprites[name];
	};
	
	return sprites;
})());

loaded('js/pilgrimage/resources/sprites.js');
