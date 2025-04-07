
import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import SolarArray from './psySolarArray';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

const PsycheSpacecraft = ({position}) => {
    const objectName = "PsycheSpacecraft";
    const objPath = '/assets/meshes/vehicles/psyche/psycheSpacecraft_a.obj'
    const vehicle = useLoader(OBJLoader, objPath, (loader) => {
        loader.manager.onLoad = () => console.log(`${objectName} loaded successfully`);
        loader.manager.onError = (url) => console.log(`ERROR: ${objectName} failed to load ${url}`);
    });
    const [cameraAngle, setCameraAngle] = useState(0);
    const psycheCamera = useRef();

    const sf = 1;
    const scale = new THREE.Vector3(sf,sf,sf);

    const material = new THREE.MeshStandardMaterial({ color: 'rgb(255, 255, 255)'});
    
    const solarArrayLeftRef = useRef();
    const solarArrayRightRef = useRef();
    const isCameraDefault = true;

    useEffect(() => {
        // SolarArray and Thruster will inherit material from here.
        vehicle.traverse((child) => {
            if (child.isMesh) {
                child.material = material;
            }
        });
    }, []); 

    // useEffect(() => {
    //     if (psycheCamera.current) {
    //         // psycheCamera.current.lookAt([position.x, position.y, position.z]);
    //         psycheCamera.current.lookAt(...[12000,-3000,1000]);
    //         // console.log("x :", position.x);
    //         // console.log("y :", position.y);
    //         // console.log("z :", position.z);
    //         // console.log("Camera focus set");
    //     }

    // }, [psycheCamera.current, cameraAngle]);


    useFrame(() => {
        setCameraAngle( prev => {
            return (prev + 0.1) % 360;
        });
        if (psycheCamera.current) {
            psycheCamera.current.lookAt(...[position.x, position.y, position.z]);
        }
    });


    return (
      <>
        <primitive object={vehicle} position={position} scale={scale}>
            <SolarArray key="solarArrayLeft" id="left" ref={solarArrayLeftRef} isMirrored={false} initialState={"STOWED"} beginDeploy={true}/>
            <SolarArray key="solarArrayRight" id="right" ref={solarArrayRightRef} isMirrored={true} initialState={"STOWED"} beginDeploy={true}/>
                <group rotation={[THREE.MathUtils.degToRad(cameraAngle), THREE.MathUtils.degToRad(cameraAngle), 0]}> 
                <group position={[0,0,3000]}>
                <PerspectiveCamera
                    makeDefault={isCameraDefault}
                    near={1}
                    far={100000000}
                    position={[0, 0, 0]}
                    // position={[orbits.earth.x, orbits.earth.y, camHeight]}
                    fov={45}
                    ref={psycheCamera} />
                    <OrbitControls />

            </group>
            </group>
        </primitive>
      </>
    );
};

export default PsycheSpacecraft;




