import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial, Sphere } from '@react-three/drei';
import React, { useRef, useState, useEffect } from 'react';
import {SolarSystemData} from '../../src/celestialBodies/solarSystemData';
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Custom shader material
const TransparentSphereMaterial = shaderMaterial(
    { uColor: new THREE.Color(0x00ff00) },
    `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    `
    uniform vec3 uColor;
    varying vec3 vPosition;
    void main() {
      float distance = length(vPosition);
      float opacity = 1.0 - distance;
      gl_FragColor = vec4(uColor, opacity);
    }
    `
);

// Register the shader material as a native fiber object
extend({ TransparentSphereMaterial });

const Sun = ({position, trueScale}) => {
    const radius = (trueScale) ? SolarSystemData.getCelestialProfile("sun").meanRadius : 10;
    const glowRadius = radius * 1.15;
    const auraRadius = radius * 10;
    const wSegment = 256;
    const hSegment = 256;
    return (
      <>
        <mesh position={position} castShadow>
          <sphereGeometry args={[radius, wSegment, hSegment]} />
          <meshStandardMaterial
            emissive="rgb(235, 225, 148)"
            emissiveIntensity={10}
            color="#ffffff"
            toneMapped={false}
          />
          <pointLight
            color="white"
            intensity={7}
            distance={0}
            castShadow={true}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={500}
            shadow-bias={-0.01}
            decay={0.05}
            position={position}
          />
        </mesh>
      </>
    );
};

export default Sun;