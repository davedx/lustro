var Square = UI.component({
	render: function() {
		return {};
	}
});

var BigView = UI.component({
	render: function() {
		var boxes = ["argo", "avatar", "breaking_bad", "brick_mansions", "crazy_stupid_love",
			"descendants", "gangs_of_new_york", "good_night_and_good_luck", "quantum_of_solace",
			"slumdog_millionaire", "the_kings_speech"];
		var repeats = 2;
		while(--repeats) {
			boxes = boxes.concat(boxes);
		}
		var x = 0, y = 0;
		var tex_width = 186;
		var tex_height = 270;
		var scale = 0.5;
		var box_width = tex_width * scale;
		var box_height = tex_height * scale;
		var covers = boxes.map(function(box) {
			var box = UI.new(Square, {
				top: y,
				left: x,
				width: box_width,
				height: box_height,
				background: "boxes/box_"+box+".png"
			});
			//console.info(box);
			x += box_width;
			if(x > 1000-box_width) {
				x = 0;
				y += box_height;
			}
			return box;
		});
		//console.info(covers);
		var args = [Square, {
			name: "background-colored",
			top: 0,
			left: 0,
			width: 1000,
			height: 700
		}].concat(covers);
		return UI.new.apply(this, args);
	}
});

UI.render(BigView, document.getElementById("app"));

var fps = document.getElementById("fps");
