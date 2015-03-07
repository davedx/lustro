var Animator = {
	name: "Animator",

	start: function() {
//		console.log("Initialising animator transforms");
		this.destTransform = vec3.create();
	},

	animate: function(params) {
//		console.info("Animator.animate: ", params.transform);
		var newTransform = vec3.create();
		vec3.set(params.transform, newTransform);
		vec3.add(newTransform, this.destTransform, this.destTransform);
		console.log("Dest transform: ", this.destTransform);
	},

	update: function(dt) {
		//console.info("Update: ", dt);
	}
};

var KeyInput = {
	name: "KeyInput",

	start: function() {
		document.addEventListener('keydown', function(event) {
			if(this.root.handleKeyPress) {
				this.root.handleKeyPress(event);
			}
		}.bind(this));
	}
};