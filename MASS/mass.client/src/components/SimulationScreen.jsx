import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const SimulationScreen = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
        
        //Two renderers, one with anti aliasing
        //const renderer = new THREE.WebGLRenderer({ antialias: true });
        const renderer = new THREE.WebGLRenderer({ antialias: false });

        
        renderer.setSize(500, 300);
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
        const assetPath = '/assets/Asteroid.gltf';

        loader.load(
            assetPath,
            (gltf) => {
                asteroid = gltf.scene;

                // Center the model
                const box = new THREE.Box3().setFromObject(asteroid);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                asteroid.position.sub(center); // Center the model
                asteroid.position.y -= size.y * .8; //Move the asteroid down from the center
                scene.add(asteroid);

                // Adjust camera to fit the model
                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                const cameraZ = Math.abs(maxDim / Math.sin(fov / 2));

                camera.position.z = cameraZ;
                camera.lookAt(new THREE.Vector3(0, 0, 0));

                //Extensinve lighting
                asteroid.traverse((child) => {
                    if (child.isMesh) {
                        child.material.roughness = 0.4;
                        child.material.metalness = 0.5;
                    }
                });

                //BASIC, UGLY render
                // asteroid.traverse((child) => {
                //     if (child.isMesh) {
                //         child.material = new THREE.MeshBasicMaterial({ color: 0x888888 });
                //     }
                // });

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

export default SimulationScreen;
