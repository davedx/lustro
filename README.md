# Lustro
A reactive, declarative, immediate mode WebGL UI system

## Principles

* A UI should be primarily declarative, with lifecycle methods to facilitate imperative logic and react to changes in the data model over time. Inspired by Facebook's React.
* The DOM is too slow. Let's give up on it completely and get as close to the hardware as we can: render everything with WebGL.
* WebGL is stateful and difficult to use, especially for people without graphics programming backgrounds. Instead of building API's on top of WebGL like other common libraries, let's abstract it away completely. Programmers should never have to think about the renderer, matrix stacks, blending modes, and instead be able to use familiar concepts like rgba colors, web images, and so on.
* Keep it simple. Immediate mode means simpler rendering when we introduce animations. Just blit everything to the screen every frame. Don't worry, even your laptop's GPU will be able to handle it, at 60fps. If it doesn't, Lustro is doing something wrong.
