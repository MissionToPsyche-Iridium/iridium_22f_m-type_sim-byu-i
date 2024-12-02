import React, { useEffect, useRef, useContext } from "react";
import { ControlContext } from "./ControlContext";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const SimulationScreen = () => {
    const mountRef = useRef(null); // Reference for the container DOM element
    const { isRunning } = useContext(ControlContext); // Access `isRunning` from context
    const isRunningRef = useRef(isRunning); // Track `isRunning` state with a ref

    useEffect(() => {
        isRunningRef.current = isRunning;
        console.log("SimulationScreen knows isRunning:", isRunning);
    }, [isRunning]);

    useEffect(() => {
        // Initialize Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // Set up renderer and append to DOM
        renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.9);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Add lights
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 10, 10);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        scene.add(hemisphereLight);

        // Create lander object
        const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const lander = new THREE.Mesh(geometry, material);
        scene.add(lander);

        let landerSpeed = 0.015;
        let asteroid;

        // Load asteroid model
        const loader = new GLTFLoader();
        loader.load(
            "/assets/Asteroid.gltf",
            (gltf) => {
                asteroid = gltf.scene;
                const boundingBox = new THREE.Box3().setFromObject(asteroid);
                const size = new THREE.Vector3();
                boundingBox.getSize(size);

                // Position the lander above the asteroid
                lander.position.set(
                    size.x / 2,
                    size.y + size.y * 1.57142857143,
                    size.z / 2
                );
                scene.add(asteroid);

                // Update material properties
                asteroid.traverse((child) => {
                    if (child.isMesh) {
                        child.material.roughness = 0.4;
                        child.material.metalness = 0.5;
                    }
                });
            },
            undefined,
            (error) => console.error("Error loading asteroid:", error)
        );

        // Set camera position
        camera.position.set(1.5, 4.5, 10);

        let isMounted = true;

        // Animation function
        const animate = () => {
            if (!isMounted) return;

            // Dynamically check the current state of isRunning
            if (isRunningRef.current) {
                lander.position.y -= landerSpeed; // Move the lander
                camera.fov -= landerSpeed * 15; // Adjust camera field of view
                camera.updateProjectionMatrix(); // Update camera projection
            }

            // Render the scene and request the next frame
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        // Start the animation loop
        animate();

        // Cleanup on unmount
        return () => {
            isMounted = false;
            if (renderer.domElement && mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach((mat) => mat.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
            renderer.dispose();
        };
    }, []); // Run only on mount

    return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default SimulationScreen;
