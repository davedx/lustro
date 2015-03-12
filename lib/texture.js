var Texture = (function() {
	var textureCache = {};
	return {
		initTexture: function(gl, url, done) {
			if(textureCache[url]) {
				setTimeout(function() {
					done(textureCache[url]);
				}, 0);
				return textureCache[url];
			}
			var texture = gl.createTexture();
			texture.image = new Image();
			texture.image.onload = function() {
				//console.log("Texture loaded: ", url, texture);
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);

				//Note: to support NPOT textures we apply these settings.
				//For perf reasons, maybe this should be explicitly requested?
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

				gl.bindTexture(gl.TEXTURE_2D, null);
				done(texture);
			}

			texture.image.src = url;
			textureCache[url] = texture;

			return texture;
		}
	}
})();