import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const SimulationTemp = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 300 / 200, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(600, 400);
        mountRef.current.appendChild(renderer.domElement);

        // Debug helpers
        const axesHelper = new THREE.AxesHelper(50);
        const gridHelper = new THREE.GridHelper(100, 10);
        scene.add(axesHelper);
        scene.add(gridHelper);

        // Log scene initialization
        console.log("Scene and helpers initialized");

        // Add light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 10, 10);
        scene.add(light);
        console.log("Directional light added");

        // Load GLTF model
        const loader = new GLTFLoader();
        const assetPath = '/assets/Asteroid.gltf';
        let asteroid;

        loader.load(
            assetPath,
            (gltf) => {
                asteroid = gltf.scene;

                // Center the model
                const box = new THREE.Box3().setFromObject(asteroid);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                asteroid.position.sub(center); // Center the model
                scene.add(asteroid);

                // Adjust camera to fit the model
                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                const cameraZ = Math.abs(maxDim / Math.sin(fov / 2));

                camera.position.z = cameraZ;
                camera.lookAt(new THREE.Vector3(0, 0, 0));

                // Debug logs
                console.log("Model loaded:", gltf);
                console.log("Model centered with bounding box:", box);
                console.log("Camera adjusted to position:", camera.position);
            },
            (xhr) => {
                console.log(`Model loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
            },
            (error) => {
                console.error("An error occurred while loading the model:", error);
            }
        );

        // Animate the scene
        const animate = () => {
            requestAnimationFrame(animate);

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

export default SimulationTemp;
