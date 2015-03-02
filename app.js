var Square = UI.component({
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
