

import React, {useEffect, useMemo, useRef, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

const FalFairing = ({position, scaleFactor}) => {
    const objectName = "falFairing";
    const objPath = '/iridium_22f_m-type_sim-byu-i/assets/meshes/vehicles/falcon/falconFairing.obj'
    const vehicle = useLoader(OBJLoader, objPath, (loader) => {
        loader.manager.onLoad = () => console.log(`${objectName} loaded successfully`);
        loader.manager.onError = (url) => console.log(`ERROR: ${objectName} failed to load ${url}`);
    }).clone(); // Need to clone so duplicate can be displayed

    const sf = scaleFactor;
    const scale = new THREE.Vector3(sf,Math.abs(sf),Math.abs(sf));

    // const material =  new THREE.MeshStandardMaterial({ color: 'rgb(204, 68, 68)'});

    // useEffect(() => {
    //     // Add material
    //     if (material) {
    //         vehicle.traverse((child) => {
    //             if (child.isMesh) {
    //                 child.material = material;
    //                 console.log("Material Added");
    //             }
    //         });
    //     }
    // }, [material]); 

    return (
      <>
        <primitive object={vehicle} position={position} scale={scale}>
        </primitive>
      </>
    );
};

export default FalFairing;



