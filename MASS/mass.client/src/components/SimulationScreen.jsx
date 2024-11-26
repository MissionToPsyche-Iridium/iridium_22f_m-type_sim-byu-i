import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const SimulationScreen = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        const scene = new THREE.Scene();
        //const camera = new THREE.OrthographicCamera(75, 600 / 400, 0.1, 1000); 
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        
        //Two renderers, one with anti aliasing
        //const renderer = new THREE.WebGLRenderer({ antialias: true });
        const renderer = new THREE.WebGLRenderer({ antialias: false });

        
        renderer.setSize( window.innerWidth * .7, window.innerHeight * .9);
        renderer.setPixelRatio(window.devicePixelRatio); // High resolution rendering ***
        renderer.physicallyCorrectLights = true; // Physically correct lighting ***
        mountRef.current.appendChild(renderer.domElement);

        // Add lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 10, 10);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        scene.add(hemisphereLight);

        let asteroid;

        // Load GLTF model
        const loader = new GLTFLoader();
        const assetPath = '/assets/AsteroidSlicedv2.gltf';

        loader.load(
            assetPath,
            (gltf) => {
                asteroid = gltf.scene;
        
                const box = new THREE.Box3().setFromObject(asteroid);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
        
                // Center the asteroid model
                asteroid.position.sub(center);
        
                // Move the asteroid relative to the camera
                const offsetX = -50; // Relative offset along the X-axis
                const offsetY = -size.y * 1.5; // Lower it slightly relative to its size
                const offsetZ = -100; // Move asteroid closer or farther from the camera
        
                asteroid.position.set(
                    camera.position.x + offsetX,
                    camera.position.y + offsetY,
                    camera.position.z + offsetZ
                );
        
                // Rotate and scale the asteroid
                asteroid.rotation.x = Math.PI;
                const scaleFactor = 1000;
                asteroid.scale.set(scaleFactor, scaleFactor, scaleFactor);
                asteroid.translateX(-1500);
                asteroid.translateY(220);
        
                scene.add(asteroid);
                camera.position.z -= 500;
                asteroid.traverse((child) => {
                    if (child.isMesh) {
                        child.material.roughness = 0.4;
                        child.material.metalness = 0.5;
                    }
                });
        
                console.log("Model loaded:", gltf);
                console.log("Asteroid position relative to camera:", asteroid.position);
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

export default SimulationScreen;
