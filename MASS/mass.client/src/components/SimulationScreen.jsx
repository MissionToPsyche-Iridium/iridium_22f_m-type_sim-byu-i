import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const SimulationScreen = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        const scene = new THREE.Scene();
        //const camera = new THREE.OrthographicCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000); 
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);


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

        //Lander
        const geometry = new THREE.BoxGeometry( .1, .1, .1 ); 
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        const lander = new THREE.Mesh( geometry, material );

        // Load GLTF model
        const loader = new GLTFLoader();
        const assetPath = '/assets/Asteroid.gltf';

        //Set initial camera position
        camera.position.set(1.5, 3.9, 10); // Set starting camera position


        //Animation / logic
        loader.load(
            assetPath,
            (gltf) => {
                asteroid = gltf.scene;
                
                //Get size of asteroid to convert to km
                const boundingBox = new THREE.Box3().setFromObject(asteroid);

                // Get the size of the bounding box
                const size = new THREE.Vector3();
                boundingBox.getSize(size); // Populates size with width, height, and depth
        
                console.log("Asteroid size:", size); // Logs the dimensions of the asteroid
                console.log("Width:", size.x, "Height:", size.y, "Depth:", size.z);
                
                lander.position.set(size.x / 2, size.y * 2.5, 0)
                
                scene.add( lander );
                scene.add(asteroid);
                asteroid.traverse((child) => {
                    if (child.isMesh) {
                        child.material.roughness = 0.4;
                        child.material.metalness = 0.5;
                    }
                });
        
                console.log("Model loaded:", gltf);
                console.log("Asteroid position:", asteroid.position);
                console.log("Camera position: ", camera.position)
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
