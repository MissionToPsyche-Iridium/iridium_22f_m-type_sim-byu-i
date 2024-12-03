import React, { useEffect, useRef, useContext } from "react";
import { SharedContext } from "./SharedContext";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { sharedUniformGroup } from "three/webgpu";


const SimulationScreen = () => {
    const mountRef = useRef(null); // Reference for the container DOM element

    const surfacePosition = 2.5; //Position of surface of asteroid



    //Conversion from units to m: 2.5659541411028437 / (220 * 1000), or a conversion unit of 85764.2681
    //Conversion from units to km: 2.5659541411028437 / 220, or a conversion unit of 85.7642681
    const conversionKm = 85.7642681 //Conversion constant to convert any simulation position to kilometers
    const gravityKms = 0.00006 //Gravity in km/s

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

    //Altitude param
    const { param17, setParam17 } = useContext(SharedContext);

    //Velocity param
    const {param14, setParam14} = useContext(SharedContext);

    //Time param
    const {param18, setParam18} = useContext(SharedContext);


    
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
        const landerGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const landerMaterial = new THREE.MeshBasicMaterial({ color: 0x007bff });
        const lander = new THREE.Mesh(landerGeometry, landerMaterial);
        scene.add(lander);


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
                console.log(size.y)
                lander.position.set(
                    size.x / 2,
                    surfacePosition + (400 / conversionKm), //Set lander to 400km over landing position
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
        camera.position.set(1.5, surfacePosition, 10);

        let isMounted = true;
        
        //Check fps of simulation for simulating acceleration / s
        let lastTime = performance.now();
        let velocity = 0 //starting velocity of 0 before gravity
        let height = 400; //current height of the lander
        let velocityms = 0;
        let simulationTime = 0;
        
        //let velocity = 0.015; //current speed of lander (velocity actually)
        // Animation function
        const animate = () => {

            if (!isMounted) return;
            
            const currentTime = performance.now();
            const deltaTime = (currentTime - lastTime) / 1000; // Delta time in seconds
            lastTime = currentTime; // Update lastTime immediately


            const mass = 1300; // mass of our lander
            const thrust = 2000; // thrust in newtons
            const thrusterAcceleration = (((thrust / mass) / 1000) / conversionKm); // Acceleration in simulation units
        
            // When running, update location of lander according to current velocity, and update velocity.
            if (param21Ref.current?.value === "True" && param22Ref.current?.value === "False") {

            // Update velocity with acceleration due to gravity
            velocity -= gravityKms * deltaTime * 3;
            // Apply thruster acceleration
            if (param20Ref.current?.value === "On" && param19Ref.current?.value === "Off") {
                velocity -= thrusterAcceleration * 6; // Downward thrust
            } else if (param19Ref.current?.value === "On" && param20Ref.current?.value === "Off") {
                velocity += thrusterAcceleration * 6; // Upward thrust
            }        

                lander.position.y += velocity * deltaTime; // Update position
                camera.fov += velocity * .2; // Adjust camera field of view
                camera.updateProjectionMatrix(); // Update camera projection

                simulationTime += deltaTime;
            }

            if (lander.position.y < surfacePosition) {
                lander.position.y = surfacePosition;
                velocity = 0;
            }
            

            updateTime(formatTime(simulationTime));
            //calculate lander velocity in m/s
            velocityms = velocity * conversionKm;
            updateVelocity(velocityms.toFixed(2));

            // Get the km height of the lander
            height = (lander.position.y - surfacePosition) * conversionKm;
            updateAltitude(height.toFixed(2)); //update height, rounded to 2 dec for now
        
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

    const updateAltitude = (height) => {
        setParam17((prev) => ({
            ...prev,
            value: height, // Update the value with the new height
        }));
    };

    const updateVelocity = (velocity) => {
        setParam14((prev) => ({
            ...prev,
            value: velocity, // Update the value with the new velocity
        }));
    };

    const updateTime = (time) => {
        setParam18((prev) => ({
            ...prev,
            value: time, // Update the value with the new velocity
        }));
    };

    return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

const formatTime = (timeInSeconds) => {
    // Extract hours, minutes, and seconds
    const hours = Math.floor(timeInSeconds / 3600); // 3600 seconds in an hour
    const minutes = Math.floor((timeInSeconds % 3600) / 60); // Remaining minutes
    const seconds = Math.floor(timeInSeconds % 60); // Remaining seconds
    const milliseconds = Math.floor((timeInSeconds % 1) * 1000); // Fractional part as milliseconds

    // Format with leading zeros if necessary
    const pad = (num, size = 2) => String(num).padStart(size, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
};


export default SimulationScreen;
