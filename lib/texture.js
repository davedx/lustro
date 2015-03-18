var Texture = (function() {
	var textureCache = {};
	var x_offset = 0;
	var y_offset = 0;
	var atlas_width = 1024;
	var atlas_height = 1024;
	var biggest_height = 0;
	var texture;
	return {
		initTexture: function(gl, url, done) {
			if(textureCache[url]) {
				setTimeout(function() {
					console.info("Cache hit for texture");
					done(textureCache[url]);
				}, 0);
				return textureCache[url];
			}
			if(!texture) {
				console.info("Creating texture atlas");
				texture = gl.createTexture();
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, atlas_width, atlas_height, 0, gl.RGBA,
						gl.UNSIGNED_BYTE, null);
			}
			var image = new Image();
			image.onload = function() {
				//console.log("Texture loaded: ", url, texture);
				//gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
				var width = this.width;
				var height = this.height;
				console.info("Adding to atlas of texture0 with "+width+", "+height+" at "+x_offset+", "+y_offset);

				if(x_offset+width > atlas_width) {
					x_offset = 0;
					y_offset += biggest_height;
				}
				if(y_offset+height > atlas_height) {
					console.error("Doesn't fit into atlas");
				}

				gl.texSubImage2D(gl.TEXTURE_2D, 0, x_offset, y_offset,
											gl.RGBA, gl.UNSIGNED_BYTE, image);
				x_offset += width;
				if(height > biggest_height) {
					biggest_height = height;
				}

				//Note: to support NPOT textures we apply these settings.
				//For perf reasons, maybe this should be explicitly requested?
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

				// necessary?
				// gl.bindTexture(gl.TEXTURE_2D, null);
				done(texture);
			}

			image.src = url;
			textureCache[url] = texture;

			return texture;
		}
	}
})();