
import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

const FalStage2 = ({position, registerCamera, activeCamera}) => {
    const objectName = "Fal2ndStage";
    const objPath = '/iridium_22f_m-type_sim-byu-i/assets/meshes/vehicles/falcon/falcon2ndStage.obj'
    const vehicle = useLoader(OBJLoader, objPath, (loader) => {
        loader.manager.onLoad = () => console.log(`${objectName} loaded successfully`);
        loader.manager.onError = (url) => console.log(`ERROR: ${objectName} failed to load ${url}`);
    });
    const [cameraAngleX, setCameraAngleX] = useState(115);
    const [cameraAngleY, setCameraAngleY] = useState(15);
    const [cameraAngleZ, setCameraAngleZ] = useState(10);

    const externalCamera = useRef();
    const [hasRegistered, setHasRegistered] = useState(false);

    const sf = 1;
    const scale = new THREE.Vector3(sf,sf,sf);

    const material = new THREE.MeshStandardMaterial({ color: 'rgb(174, 179, 196)'});
    
    const cameraID = "Falcon2 Extn";

    useEffect(() => {
        // Add material
        vehicle.traverse((child) => {
            if (child.isMesh) {
                child.material = material;
            }
        });
    }, []); 

    useEffect(() => {
        if (externalCamera && externalCamera.current && !hasRegistered) {
            registerCamera(cameraID);
            setHasRegistered(true);
        }
    }, [externalCamera, hasRegistered]);
    useFrame(() => {
        // setCameraAngle( prev => {
        //     return (prev + 0.1) % 360;
        // });
        if (externalCamera.current) {
            externalCamera.current.lookAt(...[position.x, position.y, position.z]);
        }
    });
    return (
      <>
        <primitive object={vehicle} position={position} scale={scale}>
                <group rotation={[THREE.MathUtils.degToRad(cameraAngleX), THREE.MathUtils.degToRad(cameraAngleY), THREE.MathUtils.degToRad(cameraAngleZ)]}> 
                <group position={[-2000,3500,5000]}>
                <PerspectiveCamera
                    makeDefault={activeCamera===cameraID}
                    near={1}
                    far={100000000}
                    position={[0, 0, 0]}
                    fov={15}
                    ref={externalCamera} />
                    <OrbitControls />

            </group>
            </group>
        </primitive>
      </>
    );
};

export default FalStage2;



