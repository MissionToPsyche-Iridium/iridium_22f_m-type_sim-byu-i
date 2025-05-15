

import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

const FalBooster = ({position, scaleFactor=1}) => {
    const objectName = "FalBooster";
    const objPath = '/iridium_22f_m-type_sim-byu-i/assets/meshes/vehicles/falcon/falconBooster.obj'
    const vehicle = useLoader(OBJLoader, objPath, (loader) => {
        loader.manager.onLoad = () => console.log(`${objectName} loaded successfully`);
        loader.manager.onError = (url) => console.log(`ERROR: ${objectName} failed to load ${url}`);
    }).clone(); // Needs to be cloned for duplicates to be used

    const sf = scaleFactor;
    const scale = new THREE.Vector3(sf,sf,sf);

    const material = new THREE.MeshStandardMaterial({ color: 'rgb(255, 255, 255)'});
    
    useEffect(() => {
        // Add material
        vehicle.traverse((child) => {
            if (child.isMesh) {
                child.material = material;
            }
        });
    }, []); 

    return (
      <>
        <primitive object={vehicle} position={position} scale={scale}>
        </primitive>
      </>
    );
};

export default FalBooster;



