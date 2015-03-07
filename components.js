var Animator = {
	name: "Animator",

	start: function() {
//		console.log("Initialising animator transforms");
		this.destTransform = vec3.create();
		this.destTime = 0;
	},

	animate: function(params) {
//		console.info("Animator.animate: ", params.transform);
		var newTransform = vec3.create();
		this.destTime = params.time;
		vec3.set(params.transform, newTransform);
		vec3.add(newTransform, this.destTransform, this.destTransform);
		vec3.scale(this.destTransform, params.time, this.velocity);
		console.log("V: ", this.velocity);
	},

	update: function(dt) {
		//var speed 
		//console.info(this.root.tm);
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