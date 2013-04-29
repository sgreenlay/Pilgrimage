
require('js/engine/main.js', function() {
require('js/pilgrimage/main.js', function() {

var game_canvas = document.getElementById("game-canvas");
(new sg.gam.engine(game_canvas)).run(new sg.pilgrimage.game());

loaded('js/main.js');

}); // js/game/main.js
}); // js/engine/main.js
