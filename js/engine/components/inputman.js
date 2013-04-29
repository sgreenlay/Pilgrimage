
namespace('sg.gam.components.engine.inputman', (function() {

	var inputman = function(canvas) {
		this.canvas = canvas;
		this.event_queue = new Array();
		this.mouse_state = 'up';
	};

	inputman.prototype.capture_input = function capture_input() {
		this.canvas.onselectstart = this.onselectstart();
		this.canvas.onmousedown = this.onmousedown();
		this.canvas.onmousemove = this.onmousemove();
		this.canvas.onmouseup = this.onmouseup();
		document.onkeydown = this.onkeydown();
		document.onkeyup = this.onkeyup();
	};
	
	inputman.prototype.release_input = function release_input() {
		this.canvas.onselectstart = null;
		this.canvas.onmousedown = null;
		this.canvas.onmousemove = null;
		this.canvas.onmouseup = null;
		document.onkeydown = null;
		document.onkeyup = null;
	}
	
	inputman.prototype.is_valid_event = function is_valid_event(event) {
		if (event.type == 'mouse' && event.state == 'down' && this.mouse_state == 'down') {
			return false;
		}
		else if (event.type == 'mouse' && event.state == 'up' && this.mouse_state == 'up') {
			return false;
		}
		return true;
	};
	
	inputman.prototype.peek = function peek_next_event() {
		while (this.event_queue && this.event_queue.length > 0) {
			if (!this.is_valid_event(this.event_queue[0])) {
				this.event_queue.shift();
			}
			else {
				return this.event_queue[0];
			}
		}
		return null;
	};
	
	inputman.prototype.next = function next_event() {
		while (this.event_queue && this.event_queue.length > 0) {
			if (!this.is_valid_event(this.event_queue[0])) {
				this.event_queue.shift();
			}
			else {
				var event = this.event_queue.shift();
				if (event.type == 'mouse' && (event.state == 'up' || event.state == 'down')) {
					this.mouse_state = event.state;
				}
				return event;
			}
		}
		return null;
	};
	
	inputman.prototype.hittest = function(event, x, y, w, h) {
		return (event.position.x >= x && event.position.x < x + w && event.position.y >= y && event.position.y < y + h);
	};
	
	inputman.prototype.onselectstart = function onselectstart() {
		var onselectstarthandler = function() {
			return false;
		};
		return onselectstarthandler;
	};
	
	inputman.prototype.onmousedown = function onmousedown() {
		var self = this;
		var onmousedownhandler = function(evt) {
		 	var event = {
			 	type : 'mouse',
			 	state : 'down',
			 	time : new Date(),
			 	position : {
				 	x : evt.pageX - evt.target.offsetLeft,
				 	y : evt.pageY - evt.target.offsetTop
			 	}
		 	};
		 	self.event_queue.push(event);
		 	
		 	evt.cancelBubble = true;
	 	};
	 	return onmousedownhandler;
	};
	
	inputman.prototype.onmousemove = function onmousemove() {
		var self = this;
		var onmousemovehandler = function(evt) {
	 		var event = {
	 			type : 'mouse',
	 			state : 'move',
	 			time : new Date(),
	 			position : {
	 				x : evt.pageX - evt.target.offsetLeft,
	 				y : evt.pageY - evt.target.offsetTop
	 			}
	 		};
	 		self.event_queue.push(event);
	 		
	 		evt.cancelBubble = true;
	 	};
	 	return onmousemovehandler;
 	};
	
	inputman.prototype.onmouseup = function onmouseup() {
		var self = this;
		var onmouseuphandler = function(evt) {
		 	var event = {
		 		type : 'mouse',
		 		state : 'up',
		 		time : new Date(),
		 		position : {
		 			x : evt.pageX - evt.target.offsetLeft,
		 			y : evt.pageY - evt.target.offsetTop
		 		}
		 	};
		 	self.event_queue.push(event);
		 	
		 	evt.cancelBubble = true;
	 	};
	 	return onmouseuphandler;
 	};
	
	inputman.prototype.onkeydown = function onkeydown(evt) {
 		var self = this;
 		var onkeydownhandler = function(evt) {
	 		var event = {
	 			type : 'key',
	 			state : 'down',
	 			time : new Date(),
	 			key : evt.keyCode
	 		};
	 		self.event_queue.push(event);
	 		
	 		evt.cancelBubble = true;
	 	};
	 	return onkeydownhandler;
 	};
 	
	inputman.prototype.onkeyup = function onkeyup(evt) {
		var self = this;
		var onkeyuphandler = function(evt) {
	 		var event = {
	 			type : 'key',
	 			state : 'up',
	 			time : new Date(),
	 			key : evt.keyCode
	 		};
	 		self.event_queue.push(event);
	 		
	 		evt.cancelBubble = true;
	 	};
	 	return onkeyuphandler;
 	};

	return inputman;

})());

loaded('js/engine/components/inputman.js');
