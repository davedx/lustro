var Shader = (function() {
	var presets = {
		fragmentStd:
			'precision mediump float;' +

			'varying vec2 vTextureCoord;' +
			'varying vec4 vColor;' +

			'uniform sampler2D uSampler;' +
			'uniform float uUseTexture;' +

			'void main(void) {' +
			'	vec4 texColor = texture2D(uSampler, vTextureCoord) * uUseTexture;' +
			'	vec4 vertColor = vColor * (1.0 - uUseTexture);' +
			'	gl_FragColor = texColor + vertColor;' +
			'}',
		vertexStd:
			'attribute vec3 aVertexPosition;' +
			'attribute vec4 aVertexColor;' +
			'attribute vec2 aTextureCoord;' +

			'uniform mat4 uMVMatrix;' +
			'uniform mat4 uPMatrix;' +

			'varying vec4 vColor;' +
			'varying vec2 vTextureCoord;' +

			'void main(void) {' +
			'	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);' +
			'	vTextureCoord = aTextureCoord;' +
			'	vColor = aVertexColor;' +
			'}'
	};

	/**
	 * gl: WebGL context
	 * type: one of GL.FRAGMENT_SHADER or GL.VERTEX_SHADER
	 * str: string containing shader source
	 */
	var	buildShader = function(gl, type, str) {
		var shader = gl.createShader(type);
		gl.shaderSource(shader, str);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error(gl.getShaderInfoLog(shader));
			return;
		}

		return shader;
	};

	return {
		createShaders: function(gl, fragmentShaderPresetId, vertexShaderPresetId) {
			var fragmentShaderSource = presets[fragmentShaderPresetId];
			var vertexShaderSource = presets[vertexShaderPresetId];
			var fragmentShader = buildShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
			var vertexShader = buildShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

			var shaderProgram = gl.createProgram();
			gl.attachShader(shaderProgram, vertexShader);
			gl.attachShader(shaderProgram, fragmentShader);
			gl.linkProgram(shaderProgram);

			if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
				console.error("Could not initialise shaders");
				return;
			}

			gl.useProgram(shaderProgram);

			shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
			gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

			shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
			gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

			shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
			shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
			shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

			shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
			gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

			shaderProgram.uUseTexture = gl.getUniformLocation(shaderProgram, "uUseTexture");

			return shaderProgram;
		}
	}
})();