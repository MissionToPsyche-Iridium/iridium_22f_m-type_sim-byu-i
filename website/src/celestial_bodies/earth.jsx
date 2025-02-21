
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, SphereGeometry, MeshStandardMaterial } from 'three';

const Earth = () => {
    // const mesh = useRef();
    const radius = 0.5;
    const wSegment = 32;
    const hSegment = 32;
    const x = 9;
    const y = 0;
    const z = -2;
    return (
        <mesh position={[x, y, z]} receiveShadow>
            <sphereGeometry args={[radius, wSegment, hSegment]} />
            <meshStandardMaterial color='blue' />
        </mesh>
    );
};

export default Earth;