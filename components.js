var Animator = {
	animate: function() {
		console.info("Animator.animate");
	}
};

var KeyInput = {
	start: function() {
		document.addEventListener('keydown', function(event) {
			if(this.def.handleKeyPress) {
				this.def.handleKeyPress(event);
			}
		}.bind(this));
	}
};