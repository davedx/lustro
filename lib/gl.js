var GL = (function() {
	var lastBoundTexture;
	return {
		setMatrixUniforms: function(gl, shaderProgram, pMatrix, mvMatrix, texture) {
			gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
			gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
			gl.uniform1f(shaderProgram.uUseTexture, texture ? 1.0 : 0.0);
		},

		createBuffers: function(gl, width, height, backgroundColor, customUvs) {
			var squareVertexPositionBuffer;
			var squareVertexColorBuffer;
			var squareVertexTextureCoordBuffer;

			squareVertexPositionBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);

			var vertices = [
				width, 	height, 0.0,
				0.0,  	height, 0.0,
				width, 	0.0,  	0.0,
				0.0, 	0.0,  	0.0
			];

			//console.info("Verts: ", vertices);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			squareVertexPositionBuffer.itemSize = 3;
			squareVertexPositionBuffer.numItems = 4;

			squareVertexTextureCoordBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTextureCoordBuffer);
			var textureCoords = customUvs || [
				0.0, 0.0,
				1.0, 0.0,
				0.0, 1.0,
				1.0, 1.0];
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
			squareVertexTextureCoordBuffer.itemSize = 2;
			squareVertexTextureCoordBuffer.numItems = 4;

			squareVertexColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
			colors = [];
			var color = [0.5, 0.5, 1.0, 1.0];
			if(backgroundColor) {
				color = backgroundColor;
			}
			for (var i=0; i < 4; i++) {
				colors = colors.concat(color);
			}
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
			squareVertexColorBuffer.itemSize = 4;
			squareVertexColorBuffer.numItems = 4;
			return {position: squareVertexPositionBuffer, color: squareVertexColorBuffer, texture: squareVertexTextureCoordBuffer};
		},

		clear: function(gl) {
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		},

		initDraw: function(gl, pMatrix, mvMatrix) {
			gl.clearColor(0.0, 0.0, 0.0, 1.0);
			gl.enable(gl.DEPTH_TEST);
			gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			mat4.ortho(pMatrix, 0, gl.viewportWidth, 0, gl.viewportHeight, 0.1, 100.0);
		},

		drawBuffers: function(gl, pMatrix, mvMatrix, shaderProgram, buffers, texture) {
			window.drawCalls++;
			var positionBuffer = buffers.position;
			var colorBuffer = buffers.color;
			var textureBuffer = buffers.texture;

			gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, positionBuffer.itemSize, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
			gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
			
			if(lastBoundTexture && texture.url !== lastBoundTexture.url) {
				window.textureBinds++;
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, texture.texture);
				lastBoundTexture = texture;
			}
			gl.uniform1i(shaderProgram.samplerUniform, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

			GL.setMatrixUniforms(gl, shaderProgram, pMatrix, mvMatrix, texture);

			gl.drawArrays(gl.TRIANGLE_STRIP, 0, positionBuffer.numItems);
		}
	}
})();