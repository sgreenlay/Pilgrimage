
namespace('sg.gam.components.engine.event', (function() {

	var event = function(target, value) {
		this.target = target;
		this.value = value;
	};

	return event;

})());

loaded('js/engine/components/event.js');
