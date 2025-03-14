import React, { useRef, useEffect, useState } from 'react';
import * as THREE from "three";
import {SolarSystemData} from './solarSystemData';
import { useLoader, useThree, useFrame } from '@react-three/fiber';

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

import mercuryTexture from '/assets/textures/mercuryTexture.jpg';
export const Mercury = ({position, trueScale}) => {
    const planetTexture = useLoader(THREE.TextureLoader, mercuryTexture);
    const radius = (trueScale) ? SolarSystemData.getCelestialProfile("mercury").meanRadius : 0.5;
    const wSegment = 32;
    const hSegment = 32;
    return (
        <mesh position={position} receiveShadow>
            <sphereGeometry args={[radius, wSegment, hSegment]} />
            <meshStandardMaterial color='gray' map={planetTexture}/>
        </mesh>
    );
};

import venusTexture from '/assets/textures/venusTexture.jpg';
export const Venus = ({position, trueScale}) => {
    const planetTexture = useLoader(THREE.TextureLoader, venusTexture);
    const radius = (trueScale) ? SolarSystemData.getCelestialProfile("venus").meanRadius : 0.5;
    const wSegment = 32;
    const hSegment = 32;
    return (
        <mesh position={position} receiveShadow>
            <sphereGeometry args={[radius, wSegment, hSegment]} />
            <meshStandardMaterial color='white' map={planetTexture} />
        </mesh>
    );
};


const earthVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldNormal;

void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalMatrix * normal;
    vWorldNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    gl_Position = projectionMatrix * mvPosition;
}

`;

const earthFragmentShader = `
uniform sampler2D dayTexture;
uniform sampler2D nightTexture;

uniform vec3 sunDirection;

varying vec2 vUv;
varying vec3 vWorldNormal;

void main(void) {
    vec3 dayColor = texture2D(dayTexture, vUv).rgb;
    vec3 nightColor = texture2D(nightTexture, vUv).rgb;

    float cosineAngleSunToNormal = dot(normalize(vWorldNormal), sunDirection);
    cosineAngleSunToNormal = clamp(cosineAngleSunToNormal * 10.0, -1.0, 1.0);
    float mixAmount = cosineAngleSunToNormal * 0.5 + 0.5;
    vec3 color = mix(nightColor, dayColor, mixAmount);

    gl_FragColor = vec4(color, 1.0);
}

`;

// import VertexShader from "../shaders/earthSurfaceFragmentShader.glsl";
// import FragmentShader from "../shaders/earthSurfaceVertexShader.glsl";
import earthTexture from '/assets/textures/earthDay.jpg';
import earthTextureNight from '/assets/textures/earthNight.jpg';
import earthClouds from '/assets/textures/earthClouds2.png';
import earthNormals from '/assets/textures/earthNormal.jpg';

export const Earth = ({position, lightDir, trueScale}) => {
    const planetTexture = useLoader(THREE.TextureLoader, earthTexture);
    const planetTextureNight = useLoader(THREE.TextureLoader, earthTextureNight);
    const planetClouds = useLoader(THREE.TextureLoader, earthClouds);
    const planetNormals = useLoader(THREE.TextureLoader, earthNormals);

    const radius = (trueScale) ? SolarSystemData.getCelestialProfile("earth").meanRadius : 5;
    const cloudRadius = radius * 1.019;

    const planetRef = useRef();
    const cloudsRef = useRef();

    useEffect(() => {
        if(planetRef.current) {
            // planetRef.current.rotation.z = Math.PI /4;
            // planetRef.current.rotation.x = THREE.MathUtils.degToRad(10);
            // planetRef.current.rotation.z = THREE.MathUtils.degToRad(90);
        }

    }, []);

    useEffect(() => {
        uniformsRef.current = {
            sunDirection: { value: new THREE.Vector3(lightDir.x, lightDir.y, lightDir.z).normalize()},
            dayTexture: { value: planetTexture},
            nightTexture: { value: planetTextureNight}
        };
        earthMaterialRef.current = new THREE.ShaderMaterial({
            uniforms: uniformsRef.current,
            vertexShader: earthVertexShader,
            fragmentShader: earthFragmentShader,
        });

    }, [])
    
    const xAdj = 67.5;  // 67.5 summer, 112.5 winter
    const yAdj = 0;
    const zAdj = 0;
    const correctedAxis = QuaternionAdjustment(xAdj, yAdj, zAdj);

    const earthProfile = SolarSystemData.getCelestialProfile('earth');
    // const degreesPerSecond = 1;
    const degreesPerSecond = earthProfile.rot;
    const lastExecutionTimeRef = useRef(0);
    const uniformsRef = useRef(null);
    const earthMaterialRef = useRef(null);

    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime();
        const intervalInSeconds = 10;

        if (elapsedTime - lastExecutionTimeRef.current >= intervalInSeconds) {
            lastExecutionTimeRef.current = elapsedTime;
            if (planetRef.current) {
                // console.log("rotated earth");
                planetRef.current.quaternion.copy(correctedAxis);
                planetRef.current.rotation.y += elapsedTime * THREE.MathUtils.degToRad(degreesPerSecond);
            }
            if (cloudsRef.current)  {
                if (cloudsRef.current?.rotation) {
                    cloudsRef.current.quaternion.copy(correctedAxis);
                    cloudsRef.current.rotation.y += elapsedTime * THREE.MathUtils.degToRad(degreesPerSecond * 1.1);
                }
            }
            // update shader only when ready
            if (uniformsRef.current) {
                uniformsRef.current.sunDirection.value.set(lightDir.x, lightDir.y, lightDir.z).normalize();
                uniformsRef.current.dayTexture.value = planetTexture;
                uniformsRef.current.nightTexture.value = planetTextureNight;
            }
        }
    });




    const wSegment = 512;
    const hSegment = 512;
    return (
        <>
            <mesh position={position} 
            // Earth
            ref={planetRef} 
            castShadow 
            receiveShadow>
                <sphereGeometry args={[radius, wSegment, hSegment]} />
                {earthMaterialRef.current && (
                    // Render primative only when material is ready
                <primitive attach="material" object={earthMaterialRef.current} normalMap={planetNormals} />
                )}
            </mesh>


            <mesh position={position} 
            // Clouds
            ref={cloudsRef} 
            receiveShadow 
            // renderOrder={2}
            >
                <sphereGeometry args={[cloudRadius, wSegment, hSegment]} />
                <meshStandardMaterial 
                color='white'  
                transparent={true} 
                map={planetClouds} 
                depthWrite={false}
                opacity={1} 
                />
            </mesh>
        </>
    );
};

import moonTexture from '/assets/textures/moonTexture.jpg';

export const Moon = ({position, trueScale}) => {
    const radius = (trueScale) ? SolarSystemData.getCelestialProfile("moon").meanRadius : 0.03;
    const wSegment = 32;
    const hSegment = 32;
    const moonSurface = useLoader(THREE.TextureLoader, moonTexture);

    return (
        <mesh position={position} receiveShadow>
            <sphereGeometry args={[radius, wSegment, hSegment]} />
            <meshStandardMaterial color='LightGray' transparent={false} map={moonSurface} />
        </mesh>
    );
};



import marsTexture from '/assets/textures/marsTexture.jpg';
export const Mars = ({position, trueScale}) => {
    const planetTexture = useLoader(THREE.TextureLoader, marsTexture);
    const radius = (trueScale) ? SolarSystemData.getCelestialProfile("mars").meanRadius : 3;
    const wSegment = 128;
    const hSegment = 128;
    const planetRef = useRef();
    const xAdj = 64.81;  
    const yAdj = 0;
    const zAdj = 0;
    const correctedAxis = QuaternionAdjustment(xAdj, yAdj, zAdj);

    const planetRotationRate = 0.03;


    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime();
            if (planetRef.current) {
              planetRef.current.quaternion.copy(correctedAxis);
              planetRef.current.rotation.y += elapsedTime * planetRotationRate;
            }
    });
    return (
        <mesh position={position} ref={planetRef} castShadow={true} receiveShadow>
            <sphereGeometry args={[radius, wSegment, hSegment]} />
            <meshStandardMaterial 
            color='gray' 
            map={planetTexture} 
            transparent={false} 
            opacity={1}
            // depthWrite={true}
            // depthTest={true}
            />
        </mesh>
    );
};

import jupiterTexture from '/assets/textures/jupiterTexture.jpg';
export const Jupiter = ({position, trueScale}) => {
    const planetTexture = useLoader(THREE.TextureLoader, jupiterTexture);
    const radius = (trueScale) ? SolarSystemData.getCelestialProfile("jupiter").meanRadius : 3;
    const wSegment = 128;
    const hSegment = 128;
    return (
        <mesh position={position} receiveShadow>
            <sphereGeometry args={[radius, wSegment, hSegment]} />
            <meshStandardMaterial color='DarkKhaki' map={planetTexture} />
        </mesh>
    );
};

import saturnTexture from '/assets/textures/saturnTexture.jpg';
import saturnTextureRing from '/assets/textures/saturnTextureRingPolar.png';
export const Saturn = ({ position, trueScale }) => {
    const planetTexture = useLoader(THREE.TextureLoader, saturnTexture);
    const planetTextureRing = useLoader(THREE.TextureLoader, saturnTextureRing);
    planetTextureRing.wrapS = THREE.RepeatWrapping;
    planetTextureRing.flipY = false;
    const radius = (trueScale) ? SolarSystemData.getCelestialProfile("saturn").meanRadius : 3;
    const wSegment = 32;
    const hSegment = 32;
    const ringInner = radius * 1.46;
    const ringOuter = radius * 2.23;


    return (
        <>
            <mesh position={position} castShadow receiveShadow>
                <sphereGeometry args={[radius, wSegment, hSegment]} />
                <meshStandardMaterial color='gray' map={planetTexture} />
            </mesh>
            <mesh position={position} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow >
                <ringGeometry args={[ringInner, ringOuter, 64]} />
                <meshStandardMaterial map={planetTextureRing} transparent={true} side={THREE.DoubleSide} opacity={1} />
            </mesh>
        </>
    );
};

import uranusTexture from '/assets/textures/uranusTexture.png';
export const Uranus = ({position, trueScale}) => {
    const planetTexture = useLoader(THREE.TextureLoader, uranusTexture);
    const radius = (trueScale) ? SolarSystemData.getCelestialProfile("uranus").meanRadius : 0.7;
    const wSegment = 32;
    const hSegment = 32;
    return (
        <mesh position={position} receiveShadow>
            <sphereGeometry args={[radius, wSegment, hSegment]} />
            <meshStandardMaterial color='gray' map={planetTexture} />
        </mesh>
    );
};

import neptuneTexture from '/assets/textures/neptuneTexture.jpg';
export const Neptune = ({position, trueScale}) => {
    const planetTexture = useLoader(THREE.TextureLoader, neptuneTexture);
    const radius = (trueScale) ? SolarSystemData.getCelestialProfile("neptune").meanRadius : 0.8;
    const wSegment = 32;
    const hSegment = 32;
    return (
        <mesh position={position} receiveShadow>
            <sphereGeometry args={[radius, wSegment, hSegment]} />
            <meshStandardMaterial color='gray' map={planetTexture} />
        </mesh>
    );
};
