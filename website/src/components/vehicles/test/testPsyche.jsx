
import React, {useEffect, useRef, forwardRef} from 'react';
import * as THREE from 'three';
// import { SolarSystemData } from './solarSystemData';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

const TestPsyche = forwardRef(({position}, ref) => {
    const objectName = "testPsyche";
    const objPath = '/assets/meshes/tempSpacecraft.obj';
    const vehicle = useLoader(OBJLoader, objPath, (loader) => {
        loader.manager.onLoad = () => console.log(`${objectName} loaded successfully`);
        loader.manager.onError = (url) => console.log(`ERROR: ${objectName} failed to load ${url}`);
    });

    const sf = 100;
    const scale = new THREE.Vector3(sf,sf,sf);

    useEffect(() => {
        if (ref.current) {
            // Offset the camera
            ref.current.position.set(0,0,20);
        }
    }, [ref]) //added ref

    const material = new THREE.MeshStandardMaterial({ color: 'lightblue'});
    const cameraGimbalRef = useRef();
    // const cameraRef = useRef();

    useEffect(() => {
        vehicle.traverse((child) => {
            if (child.isMesh) {
                child.material = material;
            }
        });
    }, [vehicle, material]); // may remove this?

    

    useEffect(() => {
        if (ref.current) {
            ref.current.lookAt(new THREE.Vector3(position));
        }
    }, [position, ref]);

    return (
        <>
            <primitive object={vehicle} position={position} scale={scale}/>
            <group ref={cameraGimbalRef} position={position} >
            <PerspectiveCamera
                near={0.0005}
                far={10000000}
                // position={[0, 0, 0]}
                fov={45}
                ref={ref} />
            </group >
        </>
    );
});

export default TestPsyche;