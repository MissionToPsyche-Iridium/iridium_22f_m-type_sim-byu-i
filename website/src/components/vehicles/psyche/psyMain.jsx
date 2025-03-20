
import React, {useEffect, useRef, forwardRef} from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import SolarArray from '../psyche/psySolarArray';

const PsycheSpacecraft = ({position}) => {
    const objectName = "PsycheSpacecraft";
    const objPath = '/assets/meshes/vehicles/psyche/psycheSpacecraft_a.obj'
    const vehicle = useLoader(OBJLoader, objPath, (loader) => {
        loader.manager.onLoad = () => console.log(`${objectName} loaded successfully`);
        loader.manager.onError = (url) => console.log(`ERROR: ${objectName} failed to load ${url}`);
    });

    const sf = 1;
    const scale = new THREE.Vector3(sf,sf,sf);

    const material = new THREE.MeshStandardMaterial({ color: 'rgb(255, 255, 255)'});
    
    const solarArrayLeftRef = useRef();
    const solarArrayRightRef = useRef();

    useEffect(() => {
        // SolarArray and Thruster will inherit material from here.
        vehicle.traverse((child) => {
            if (child.isMesh) {
                child.material = material;
            }
        });
    }, []); 


    return (
      <>
        <primitive object={vehicle} position={position} scale={scale}>
            <SolarArray key="solarArrayLeft" id="left" ref={solarArrayLeftRef} isMirrored={false} initialState={"STOWED"} beginDeploy={true}/>
            <SolarArray key="solarArrayRight" id="right" ref={solarArrayRightRef} isMirrored={true} initialState={"STOWED"} beginDeploy={true}/>
        </primitive>
      </>
    );
};

export default PsycheSpacecraft;




