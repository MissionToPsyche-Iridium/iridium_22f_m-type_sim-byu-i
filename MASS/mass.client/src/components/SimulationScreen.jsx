import React, { useEffect, useRef, useContext } from "react";
import { SharedContext } from "./SharedContext";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const SimulationScreen = () => {
    const mountRef = useRef(null); // Reference for the container DOM element

    //Arrow key parameters
    const { param19 } = useContext(SharedContext); // Access param19 from SharedContext
    const param19Ref = useRef(param19); // Ref to track param19 dynamically
    const { param20 } = useContext(SharedContext); // Access param20 from SharedContext
    const param20Ref = useRef(param19); // Ref to track param20 dynamically

    //Simulation controls parameters
    const { param21 } = useContext(SharedContext); // Access param21 from SharedContext
    const param21Ref = useRef(param21); // Ref to track param21 dynamically
    const { param22 } = useContext(SharedContext); // Access param2 from SharedContext
    const param22Ref = useRef(param22); // Ref to track param22 dynamically

    // Update param19Ref whenever param19 changes
    useEffect(() => {
        param19Ref.current = param19;
    }, [param19]);

        // Update param20Ref whenever param19 changes
        useEffect(() => {
            param20Ref.current = param20;
        }, [param20]);

    // Update param21Ref whenever param21 changes
    useEffect(() => {
        param21Ref.current = param21;
    }, [param21]);

    // Update param22Ref whenever param22 changes
    useEffect(() => {
        param22Ref.current = param22;
    }, [param22]);

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
                    size.z / 1.5
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
        camera.position.set(1.5, 3, 10);

        let isMounted = true;

        // Animation function
        const animate = () => {
            var landerDirection = 0;
            if (!isMounted) return;
            // Dynamically check param19 value from ref
            if (
                lander.position.y - landerSpeed >= 2.5 &&
                param19Ref.current?.value === "On"
            ) {
                landerVelocity =  landerSpeed * -1; // Set velocity of lander
                landerDirection = -1;
            }

            // Dynamically check param20 value from ref to move up
            else if (
                camera.fov + landerSpeed * 15 <= 75 &&
                param20Ref.current?.value === "On"
            ) {
                landerVelocity = landerSpeed; // Set velocity of lander
                landerDirection = 1;
            }

            else {
                var landerVelocity = 0;

            }


            //When running, update location of lander according to current velocity
            if(param21Ref.current?.value === "True" && param22Ref.current?.value === "False") {
                lander.position.y += landerSpeed * landerDirection;

                camera.fov += landerVelocity * 15;
                camera.updateProjectionMatrix(); // Update camera projection
            }
            if(param22Ref.current?.value === "True") {
                
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
