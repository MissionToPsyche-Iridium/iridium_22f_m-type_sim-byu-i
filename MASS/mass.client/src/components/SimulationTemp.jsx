// Simulation.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Simulation = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 300 / 200, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(300, 200);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(15, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 50;

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Clean up on component unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Simulation;
