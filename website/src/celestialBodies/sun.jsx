import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial, Sphere } from '@react-three/drei';
import React, { useRef, useState, useEffect } from 'react';
import {SolarSystemData} from '../../src/celestialBodies/solarSystemData';
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// // Helper: Coerce to THREE.Vector3
// function toVector3(pos) {
//   return pos instanceof THREE.Vector3
//     ? pos.clone()
//     : new THREE.Vector3(pos.x, pos.y, pos.z);
// }

// Scales sphere to a new size at a closer distance to appear the same
// angular size in the sky
function apparentRadius(trueRadius, truePosition, desiredDistance) {
  const trueDistance = Math.sqrt(truePosition.x ** 2 + truePosition.y ** 2 + truePosition.z ** 2);
  return (trueRadius * desiredDistance) / trueDistance;
};

// function angularSizeScaler(trueRadius, trueDistance, desiredDistance) {
//   return (trueRadius * desiredDistance) / trueDistance;
// };
// Shifts sphere to scaled radius from the origin
function scaleDistanceToOrigin(truePosition, desiredDistance) {
  const trueDistance = Math.sqrt(truePosition.x ** 2 + truePosition.y ** 2 + truePosition.z ** 2);
  const scaleFactor = desiredDistance / trueDistance;
  return truePosition.clone().multiplyScalar(scaleFactor);
};

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

const Sun = ({position, trueScale=true}) => {
    const DISTANCE_FROM_ORIGIN = 1000000; // When trueScale is false
    const [truePosition, setTruePosition] = useState(new THREE.Vector3(position.x, position.y, position.z));
    const [renderedRadius, setRenderedRadius] = useState(0);
    const [renderedPosition, setRenderedPosition] = useState(new THREE.Vector3(0,0,0));

    // Look up Sun's radius
    const radius = SolarSystemData.getCelestialProfile("sun").meanRadius;
    // console.log("Radius: ", radius);
    // console.log("RenderedRadius: ", renderedRadius);
    // const glowRadius = radius * 1.15;
    // const auraRadius = radius * 10;
    let wSegment = 256;
    let hSegment = 256;


    useEffect(() => {
      setRenderedRadius((trueScale) ? radius : apparentRadius(radius, truePosition, DISTANCE_FROM_ORIGIN));
    }, []);
    
    useEffect(() => {
      setRenderedPosition((trueScale) ? truePosition : scaleDistanceToOrigin(truePosition, DISTANCE_FROM_ORIGIN));
      // Note: point light remains at true position, even when sphere is scaled and moved
    }, [position]);

    return (
      <>
        <mesh position={renderedPosition} castShadow>
          <sphereGeometry args={[renderedRadius, wSegment, hSegment]} />
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
            position={truePosition}
          />
        </mesh>
      </>
    );
};

export default Sun;