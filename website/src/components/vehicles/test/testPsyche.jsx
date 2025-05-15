import React, {useEffect, useRef, forwardRef} from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { PerspectiveCamera } from '@react-three/drei';

const TestPsyche = forwardRef(({position}, ref) => {
    const objectName = "testPsyche";
    const modelPath = '/iridium_22f_m-type_sim-byu-i/assets/meshes/spacecraftWIP.glb';
    
    // Replace OBJLoader with useGLTF
    const { scene: vehicle } = useGLTF(modelPath, (loader) => {
        loader.manager.onLoad = () => console.log(`${objectName} loaded successfully`);
        loader.manager.onError = (url) => console.log(`ERROR: ${objectName} failed to load ${url}`);
    });

    const sf = 10;
    const scale = new THREE.Vector3(sf,sf,sf);

    useEffect(() => {
        if (ref.current) {
            // Offset the camera
            ref.current.position.set(0,0,20);
        }
    }, [ref]);

    const cameraGimbalRef = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.lookAt(new THREE.Vector3(position));
        }
    }, [position, ref]);

    return (
        <>
            <primitive object={vehicle} position={position} scale={scale}/>
            <group ref={cameraGimbalRef} position={position}>
                <PerspectiveCamera
                    near={0.0005}
                    far={10000000}
                    fov={45}
                    ref={ref} />
            </group>
        </>
    );
});

// Optional: Preload the model for better performance
useGLTF.preload('/iridium_22f_m-type_sim-byu-i/assets/meshes/spacecraftWIP.glb');

export default TestPsyche;