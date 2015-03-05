var Animator = {
	name: "Animator",

	animate: function() {
		console.info("Animator.animate: ", this);
	}
};

var KeyInput = {
	name: "KeyInput",

	start: function() {
		document.addEventListener('keydown', function(event) {
			if(this.handleKeyPress) {
				this.handleKeyPress(event);
			}
		}.bind(this));
	}
};