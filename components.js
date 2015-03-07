var Animator = {
	name: "Animator",

	start: function() {
//		console.log("Initialising animator transforms");
		this.destTransform = vec3.create();
		this.velocity = vec3.create();
		this.destTime = 0;
	},

	animate: function(params) {
//		console.info("Animator.animate: ", params.transform);
//		var newTransform = vec3.create();
		this.destTime = params.time/1000.0;
//		vec3.set(params.transform, newTransform);
		vec3.add(this.destTransform, this.destTransform, vec3.fromValues(params.transform[0], params.transform[1], params.transform[2]));
		vec3.divide(this.velocity, this.destTransform, vec3.fromValues(this.destTime, this.destTime, this.destTime));
		console.log("V: ", this.velocity);
	},

	update: function(dt) {
		if(this.destTime > 0) {
			var delta = vec3.fromValues(dt*this.velocity[0], dt*this.velocity[1], dt*this.velocity[2]);
			mat4.translate(this.root.tm, this.root.tm, delta);
			this.destTime -= dt/1000.0;
			if(this.destTime <= 0) {
				console.warn("Stopped animating.");
				this.destTime = 0;
			}
		}
		//console.info("DELTA: ", delta);
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