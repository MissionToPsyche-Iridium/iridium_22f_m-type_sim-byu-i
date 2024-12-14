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
    const conversionKm = 85.7642681; //Conversion constant to convert any simulation position to kilometers
    const gravityKms = 0.00006; //Gravity in km/s
    const psycheGravitationalConstant = 0.00000000006674 * 24100000000000000000;

    //Arrow key parameters
    const { param19 } = useContext(SharedContext); // Access param19 from SharedContext
    const param19Ref = useRef(param19); // Ref to track param19 dynamically
    const { param20 } = useContext(SharedContext); // Access param20 from SharedContext
    const param20Ref = useRef(param19); // Ref to track param20 dynamically

    //Simulation controls parameters
    const { param21 } = useContext(SharedContext); // Access param21 from SharedContext
    const param21Ref = useRef(param21); // Ref to track param21 dynamically
    const { param22 } = useContext(SharedContext); // Access param22 from SharedContext
    const param22Ref = useRef(param22); // Ref to track param22 dynamically

    //Altitude param
    const { param17, setParam17 } = useContext(SharedContext);
    const param17Ref = useRef(param17.value); // Ref to track param17 dynamically
    const landerDistance = Number(param17Ref.value);

    //Orbital speed
    const { param13, setParam13 } = useContext(SharedContext);

    //Velocity param
    const {param14, setParam14} = useContext(SharedContext);

    //Time param
    const { param18, setParam18 } = useContext(SharedContext);

    //Thruster state params for back-end
    const { param23, setParam23 } = useContext(SharedContext); // Upper thruster on true/false
    const { param24, setParam24 } = useContext(SharedContext); // Lower thruster on true/false

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

        // Create asteroid object
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

                // Add the asteroid to the scene
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
        
            const mass = 1500; // Mass of the lander in kg
            const thrust = 1000; // Thrust in newtons
            const thrusterAcceleration = (thrust / mass) / 1000; // Thrust in km/s²
        
            // Update simulation only if running
            if (param21Ref.current?.value === "True" && param22Ref.current?.value === "False") {

                // Update velocity due to gravity
                velocity -= gravityKms * deltaTime * 3; // Gravity scaled by deltaTime

                // If both thrusters or neither thruster is on, set upper and lower thruster on states to false
                if ((param20Ref.current?.value === "On" && param19Ref.current?.value === "On") ||
                    (param20Ref.current?.value === "Off" && param19Ref.current?.value === "Off")) {
                    setParam23((prev) => ({ ...prev, value: false, }));
                    setParam24((prev) => ({ ...prev, value: false, })); 
                } 

                // Apply thruster acceleration and set upper and lower thruster states
                if (param20Ref.current?.value === "On" && param19Ref.current?.value === "Off") {
                    velocity -= thrusterAcceleration * deltaTime * 6; // Downward thrust
                    setParam23((prev) => ({ ...prev, value: false, })); // Update upper thruster state to show upper thruster on is false
                    setParam24((prev) => ({ ...prev, value: true, })); // Update lower thruster state to show lower thruster on is true
                } else if (param19Ref.current?.value === "On" && param20Ref.current?.value === "Off") {
                    velocity += thrusterAcceleration * deltaTime * 6; // Upward thrust
                    setParam23((prev) => ({ ...prev, value: true, })); // Update the upper thruster state to show upper thruster on is true
                    setParam24((prev) => ({ ...prev, value: false, })); // Update the lower thruster state to show lower thruster on is false
                }

                // Update lander position
                lander.position.y += velocity * deltaTime; // Position based on velocity

                //check if lander is in view -------------------------------
                const distance = camera.position.z - lander.position.z;

                // Calculate the vertical visible height at this distance
                const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance;

                //Get lander size
                const boundingBox = new THREE.Box3().setFromObject(lander); // Create a bounding box
                const size = new THREE.Vector3();
                boundingBox.getSize(size); // Get the size of the bounding box
                
                 // Check if the lander's position is within the visible frustum
                const withinVerticalBounds =
                lander.position.y >= camera.position.y - visibleHeight / 2 &&
                lander.position.y + (size.y * 4) <= camera.position.y + visibleHeight / 2;

                // Update camera field of view (optional limit)
                if ((camera.fov > 19 && withinVerticalBounds) || velocity > 0) {
                    camera.fov += velocity * .2;
                }
                camera.updateProjectionMatrix(); // Update camera projection matrix
        
                // Increment simulation time
                simulationTime += deltaTime;
            }

            // Prevent lander from going below the surface
            if (lander.position.y < surfacePosition) {
                lander.position.y = surfacePosition;
                velocity = 0; // Reset velocity on surface contact
            }
        
            // Update formatted simulation time
            if (height !== 0) {   
                updateTime(formatTime(simulationTime));

                // Tie parameter to orbital speed display
                param13.value = Math.sqrt( psycheGravitationalConstant / (( height * 1000 ) + 113000 ) ).toFixed(2);
            }

            // Update velocity in m/s
            velocityms = velocity * conversionKm; // Convert velocity to m/s
            updateVelocity(velocityms.toFixed(2));
        
            // Update altitude in km
            height = (lander.position.y - surfacePosition) * conversionKm; // Calculate height in km
            updateAltitude(height.toFixed(2));
        
            // Render the scene and request the next animation frame
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
            value: time, // Update the value with the new time
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
