// LanderSimulator.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import '../css/pages/simulator.css';  // Import simulator-specific styling

import Lander from './Lander'; // Assumes your Lander class (physics and model) is in this file

function LanderSimulator() {
  const mountRef = useRef(null);
  const landerRef = useRef(null);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  // Button event handlers for tablet/desktop controls
  const handleThrustStart = () => {
    if (landerRef.current) {
      landerRef.current.throttle = 1;
    }
  };

  const handleThrustStop = () => {
    if (landerRef.current) {
      landerRef.current.throttle = 0;
    }
  };

  const handleRotateLeftStart = () => {
    if (landerRef.current) {
      landerRef.current.rotationSpeed = 0.5;
    }
  };

  const handleRotateLeftStop = () => {
    if (landerRef.current) {
      landerRef.current.rotationSpeed = 0;
    }
  };

  const handleRotateRightStart = () => {
    if (landerRef.current) {
      landerRef.current.rotationSpeed = -0.5;
    }
  };

  const handleRotateRightStop = () => {
    if (landerRef.current) {
      landerRef.current.rotationSpeed = 0;
    }
  };

  useEffect(() => {
    // Set up the Three.js scene.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.set(0, 10, 20);
    camera.lookAt(0, 10, 0);

    // Create the lander instance and add it to the scene.
    const lander = new Lander(scene);
    landerRef.current = lander;

    // Keyboard input handling.
    const keys = {};
    const keyDownHandler = (event) => {
      keys[event.code] = true;
      updateControls();
    };

    const keyUpHandler = (event) => {
      keys[event.code] = false;
      updateControls();
    };

    function updateControls() {
      // Reset throttle and rotation speed.
      lander.throttle = 0;
      lander.rotationSpeed = 0;

      // Full throttle when Space is pressed.
      if (keys['Space']) {
        lander.throttle = 1;
      }
      // Rotate left when ArrowLeft is pressed.
      if (keys['ArrowLeft']) {
        lander.rotationSpeed = 0.5;
      }
      // Rotate right when ArrowRight is pressed.
      if (keys['ArrowRight']) {
        lander.rotationSpeed = -0.5;
      }
    }

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    // Animation loop for the simulation.
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const dt = (time - previousTimeRef.current) / 1000; // Convert milliseconds to seconds
        lander.update(dt);
      }
      previousTimeRef.current = time;
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Cleanup when the component unmounts.
    return () => {
      cancelAnimationFrame(requestRef.current);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      if (mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} />
      {/* Button overlay for controlling the lander */}
      <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
        <button
          onMouseDown={handleThrustStart}
          onMouseUp={handleThrustStop}
          onTouchStart={handleThrustStart}
          onTouchEnd={handleThrustStop}
        >
          Thrust
        </button>
        <button
          onMouseDown={handleRotateLeftStart}
          onMouseUp={handleRotateLeftStop}
          onTouchStart={handleRotateLeftStart}
          onTouchEnd={handleRotateLeftStop}
        >
          Rotate Left
        </button>
        <button
          onMouseDown={handleRotateRightStart}
          onMouseUp={handleRotateRightStop}
          onTouchStart={handleRotateRightStart}
          onTouchEnd={handleRotateRightStop}
        >
          Rotate Right
        </button>
      </div>
    </div>
  );
}

export default LanderSimulator;