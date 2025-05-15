import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const Roads = ({position, scaleFactor=1}) => {
    const objectName = "roads";
    const objPath = '/iridium_22f_m-type_sim-byu-i/assets/meshes/locations/launchPad49a/roads1-2d.obj'
    const scenary = useLoader(OBJLoader, objPath, (loader) => {
        loader.manager.onLoad = () => console.log(`${objectName} loaded successfully`);
        loader.manager.onError = (url) => console.log(`ERROR: ${objectName} failed to load ${url}`);
    });

    const sf = scaleFactor;
    const scale = new THREE.Vector3(sf,sf,sf);

    const material = new THREE.MeshStandardMaterial({ color: 'rgb(46, 45, 45)'});
    
    useEffect(() => {
        // Add material
        scenary.traverse((child) => {
            if (child.isMesh) {
                child.material = material;
            }
        });
    }, []); 

    return (
      <>
        <primitive object={scenary} position={position} scale={scale}>
        </primitive>
      </>
    );
};

export default Roads;