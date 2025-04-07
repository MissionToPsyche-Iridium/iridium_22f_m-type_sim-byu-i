import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const Buildings = ({position, scaleFactor}) => {
    const objectName = "buildings";
    const objPath = '/assets/meshes/locations/launchPad49a/buildings.obj'
    const scenary = useLoader(OBJLoader, objPath, (loader) => {
        loader.manager.onLoad = () => console.log(`${objectName} loaded successfully`);
        loader.manager.onError = (url) => console.log(`ERROR: ${objectName} failed to load ${url}`);
    });

    const sf = scaleFactor;
    const scale = new THREE.Vector3(sf,sf,sf);

    const material = new THREE.MeshStandardMaterial({ color: 'rgb(192, 180, 180)'});
    
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

export default Buildings;