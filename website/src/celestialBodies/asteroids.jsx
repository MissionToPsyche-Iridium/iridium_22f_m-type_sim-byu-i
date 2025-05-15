import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import { SolarSystemData } from './solarSystemData';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function QuaternionAdjustment(xRotationDeg, yRotationDeg, zRotationDeg) {
    // Convert to Radians
    const xRotation = THREE.MathUtils.degToRad(xRotationDeg);
    const yRotation = THREE.MathUtils.degToRad(yRotationDeg);
    const zRotation = THREE.MathUtils.degToRad(zRotationDeg);
    // Define the rotation axes
    const axisX = new THREE.Vector3(1, 0, 0);
    const axisY = new THREE.Vector3(0, 1, 0);
    const axisZ = new THREE.Vector3(0, 0, 1);
    // Create quaternions for each axis
    const quaternionX = new THREE.Quaternion().setFromAxisAngle(axisX, xRotation);
    const quaternionY = new THREE.Quaternion().setFromAxisAngle(axisY, yRotation);
    const quaternionZ = new THREE.Quaternion().setFromAxisAngle(axisZ, zRotation);
    // Combine the quaternions
    const combinedQuaternion = new THREE.Quaternion()
        .copy(quaternionX)
        .multiply(quaternionY)
        .multiply(quaternionZ);
    return combinedQuaternion;
}

export const Psyche16 = ({position, trueScale}) => {
    const objPath = '/iridium_22f_m-type_sim-byu-i/assets/meshes/psycheAsteroid.obj';
    const asteroid = useLoader(OBJLoader, objPath, (loader) => {
        loader.manager.onLoad = () => console.log('Psyche asteroid loaded successfully');
        loader.manager.onError = (url) => console.log('ERROR: Psyche asteroid failed to load ${url}');
    });

    // const radius = (trueScale) ? SolarSystemData.getCelestialProfile("psycheAsteroid").meanRadius : 0.1;
    const sf = 93;
    // const sf = 0.1;
    const scale = new THREE.Vector3(sf,sf,sf);

    const material = new THREE.MeshStandardMaterial({ color: 'rgb(192, 168, 141)'});
    const astroRef = useRef();
    
    // let frameCount = 0;
    // useFrame(() => {
    //     frameCount++;
    //     let astroRotationRate = THREE.MathUtils.degToRad(0.2);
    //     if (frameCount % 3 === 0) {
    //         if (astroRef.current) {
    //             astroRef.current.rotation.y += astroRotationRate;
    //         }
    //     }
    // });

    const xAdj = 0;  
    const yAdj = 0; // season adjustment
    const zAdj = 95;
    const correctedAxis = QuaternionAdjustment(xAdj, yAdj, zAdj);

    const asteroidProfile = SolarSystemData.getCelestialProfile('psycheAsteroid');
    const degreesPerSecond = asteroidProfile.rot;
    const lastExecutionTimeRef = useRef(0);

    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime();
        const intervalInSeconds = 0.5;

        if (elapsedTime - lastExecutionTimeRef.current >= intervalInSeconds) {
            lastExecutionTimeRef.current = elapsedTime;
            if (astroRef.current) {
                console.log("rotated asteroid");
                astroRef.current.quaternion.copy(correctedAxis);
                astroRef.current.rotation.x += elapsedTime * THREE.MathUtils.degToRad(degreesPerSecond);
            }
        }
    });

    useEffect(() => {
        asteroid.traverse((child) => {
            if (child.isMesh) {
                child.material = material;
            }
        });
    }, [asteroid, material]); // may remove this?

    return (
        <>
            <primitive object={asteroid} position={position} scale={scale} ref={astroRef} />
        </>

    );
};