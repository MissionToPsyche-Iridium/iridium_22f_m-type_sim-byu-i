# ThreeJS - https://threejs.org/
## Why not WebGL, or Unity (Web)
- Unity is a great game making engine, and provides a complete set of features and a gui for game development. However, Unity projects tend to have larger file sizes, which adds load time to web pages. On top of this, to use Unity you would need to spend significant time learning the GUI and built in tools, which would add unnesassary development time for our use case.
- As for WebGL, ThreeJS is actually built on top of WebGL. It just adds some features, and makes the WebGL API easier to use overall, in the same way that React is built on / around vanilla javascript.

## Our needs and the features of ThreeJS
### 3D functioanlity
- ThreeJS has built in functionality for loading 3D models. (See the linked threejs site at the top for examples)
- Documentation: https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models
### 2D functionality
- The orthographic camera feature can be used to create "2.5D" (3 dimensional scenes shown as 2D or with backgrounds and foregrounds). ThreeJS would be a good tool for our initial 2D build, since the scene would exist in 3D, making it easier to move the project to 3D in the future.
- Documentation: https://threejs.org/docs/index.html#api/en/cameras/OrthographicCamera
- Article on camera types in ThreeJS: https://medium.com/@gopisaikrishna.vuta/exploring-cameras-in-three-js-32e268a6bebd
### Interactivity
- Since ThreeJS uses javascript, we can use javascript event listeners (clicks, button presses, etc.) to "trigger" certain events or animations, such as thrusters, etc.
- There are also many libraries that allow you to add controls to the simulation without relying on event listeners, if desired.
### Physics
- ThreeJS does not have built in physics functionality. However, it has many libraries that provide this functionality. 
- Examples of physics libraries: https://threejs.org/docs/index.html#examples/en/animations/MMDPhysics, https://sbcode.net/threejs/physics-cannonjs/, https://medium.com/@bluemagnificent/intro-to-javascript-3d-physics-using-ammo-js-and-three-js-dd48df81f591
## Weaknesses of ThreeJS
- As mentioned above, ThreeJS doesn't come with built in physics functionalities. However, since asteroids have very little gravity (0.06 m/s² for psyche) our landing simulation would require basic collision handling, but not much complex physics. We should be able to get by using one of the 3 libraries I linked.
