var Square = UI.component({
	components: [Animator, KeyInput],

	animationMap: {
		moveLeft: {
			transform: [-50, 0, 0],
			time: 200,
			easing: "linear"
		},
		moveRight: {
			transform: [50, 0, 0],
			time: 200,
			easing: "linear"
		}
	},

	handleKeyPress: function(e) {
		if(e.keyCode === 37) {
			this.Animator.animate(this.animationMap.moveLeft);
		} else if(e.keyCode === 39) {
			this.Animator.animate(this.animationMap.moveRight);
		}
	},

	render: function() {
		return {};
	}
});

var BigView = UI.component({
	render: function() {
		var boxes = ["argo", "avatar", "breaking_bad", "brick_mansions", "crazy_stupid_love",
			"descendants", "gangs_of_new_york", "good_night_and_good_luck", "quantum_of_solace",
			"slumdog_millionaire", "the_kings_speech"];
		var repeats = 8;
		while(--repeats) {
			boxes = boxes.concat(boxes);
		}
		var x = 0, y = 0;
		var tex_width = 186;
		var tex_height = 270;
		var scale = 0.1;
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
