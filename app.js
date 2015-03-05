var Square = UI.component({
	components: [Animator, KeyInput],

	animationMap: {
		moveLeft: {
			transform: "translate3d(-30, 0, 0)",
			transition: "200ms linear"
		},
		moveRight: {
			transform: "translate3d(30, 0, 0)",
			transition: "200ms linear"
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
		return UI.new(Square, {
			name: "background-colored",
			top: 50,
			left: 50,
			width: 100,
			height: 300,
			backgroundColor: [1.0, 0, 0, 1.0]
		},
			UI.new(Square, {
				name: "doged",
				top: 100,
				left: 100,
				width: 128,
				height: 128,
				background: "doge.jpg"
			}),
			UI.new(Square, {
				name: "child1",
				top: 550,
				left: 850,
				width: 99,
				height: 99,
				background: "doge.jpg"
			},
				UI.new(Square, {
					name: "child2",
					top: -50,
					left: 0,
					width: 30,
					height: 260
				})
			)
		);
	}
});

UI.render(BigView, document.getElementById("app"));
