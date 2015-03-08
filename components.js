var Animator = {
	name: "Animator",

	start: function() {
		this.destTransform = vec3.create();
		this.velocity = vec3.create();
		this.destTime = 0;
	},

	animate: function(params) {
		this.destTime = params.time/1000.0;
		vec3.add(this.destTransform, this.destTransform, vec3.fromValues(params.transform[0], params.transform[1], params.transform[2]));
		vec3.divide(this.velocity, this.destTransform, vec3.fromValues(this.destTime, this.destTime, this.destTime));
		//console.log("V: ", this.velocity);
	},

	update: function(dt) {
		if(this.destTime > 0) {
			var delta = vec3.fromValues(dt*this.velocity[0], dt*this.velocity[1], dt*this.velocity[2]);
			vec3.add(this.root.localPosition, this.root.localPosition, delta);
			this.destTime -= dt;
			if(this.destTime <= 0) {
				vec3.set(this.destTransform, 0, 0, 0);
				//console.warn("Stopped animating. At: ", this.root.localPosition);
				this.destTime = 0;
			}
		}
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