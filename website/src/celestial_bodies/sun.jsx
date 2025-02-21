import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, SphereGeometry, MeshStandardMaterial, PointLight } from 'three';

const Sun = () => {
    // const mesh = useRef();
    const radius = 2;
    const wSegment = 32;
    const hSegment = 32;
    const x = 0;
    const y = 0;
    const z = 0;
    return (
        <>
            <mesh position={[x, y, z]} castShadow>
                <sphereGeometry args={[radius, wSegment, hSegment]} />
                <meshStandardMaterial emissive="yellow" emissiveIntensity={1} color='orange' />
                <pointLight
                    color="white"
                    intensity={2000}
                    distance={1000000}
                    castShadow
                    position={[x, y, z]}
                />
            </mesh>
        </>
    );
};

export default Sun;