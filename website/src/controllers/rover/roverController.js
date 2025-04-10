// RoverSimulator.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import '../css/pages/simulator.css'; // Use your simulator-specific styling
import Rover from './Rover';

function RoverSimulator() {
  const mountRef = useRef(null);
  const roverRef = useRef(null);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  // Button event handlers for tablet/desktop controls:
  const handleForwardStart = () => {
    if (roverRef.current) roverRef.current.throttle = 1;
  };
  const handleForwardStop = () => {
    if (roverRef.current) roverRef.current.throttle = 0;
  };

  const handleBackwardStart = () => {
    if (roverRef.current) roverRef.current.throttle = -1;
  };
  const handleBackwardStop = () => {
    if (roverRef.current) roverRef.current.throttle = 0;
  };

  const handleRotateLeftStart = () => {
    if (roverRef.current) roverRef.current.rotationSpeed = 0.5;
  };
  const handleRotateLeftStop = () => {
    if (roverRef.current) roverRef.current.rotationSpeed = 0;
  };

  const handleRotateRightStart = () => {
    if (roverRef.current) roverRef.current.rotationSpeed = -0.5;
  };
  const handleRotateRightStop = () => {
    if (roverRef.current) roverRef.current.rotationSpeed = 0;
  };

  useEffect(() => {
    // Set up Three.js scene.
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

    // Add basic lighting.
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Create a simple ground plane representing the asteroid's surface.
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Position the camera to view the rover.
    camera.position.set(0, 15, 20);
    camera.lookAt(0, 0, 0);

    // Create the rover and add it to the scene.
    const rover = new Rover(scene);
    roverRef.current = rover;

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
      rover.throttle = 0;
      rover.rotationSpeed = 0;
      
      // Use ArrowUp for forward, ArrowDown for backward,
      // ArrowLeft for rotating left, and ArrowRight for rotating right.
      if (keys['ArrowUp']) rover.throttle = 1;
      if (keys['ArrowDown']) rover.throttle = -1;
      if (keys['ArrowLeft']) rover.rotationSpeed = 0.5;
      if (keys['ArrowRight']) rover.rotationSpeed = -0.5;
    }

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    // Animation loop.
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const dt = (time - previousTimeRef.current) / 1000; // Convert ms to seconds
        rover.update(dt);
      }
      previousTimeRef.current = time;
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Cleanup on component unmount.
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
      {/* Button overlay for controlling the rover */}
      <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
        <button
          onMouseDown={handleForwardStart}
          onMouseUp={handleForwardStop}
          onTouchStart={handleForwardStart}
          onTouchEnd={handleForwardStop}
        >
          Forward
        </button>
        <button
          onMouseDown={handleBackwardStart}
          onMouseUp={handleBackwardStop}
          onTouchStart={handleBackwardStart}
          onTouchEnd={handleBackwardStop}
        >
          Backward
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

export default RoverSimulator;
