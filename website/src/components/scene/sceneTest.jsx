
import * as THREE from "three";
import React, { useRef, useState, useEffect } from 'react';
import Sun from '../../celestial_bodies/sun';
import Earth from '../../celestial_bodies/earth';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import StarField from '../../celestial_bodies/starField';


const SceneTest = () => {
    const cameraRef = useRef();

    useEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.lookAt(0, 0, 0);
        }
    }, []);

    
    return (
    <div style={{ width: '800px', height: '500px' }}>
            <Canvas style={{ width: '100%', 
                            height: '100%', 
                            background: 'black',
                        }}
                gl={{ toneMapping: THREE.NoToneMapping }}
                >
                <OrbitControls />
                {/* Ambient Light */}
                <ambientLight intensity={0.3} />

                {/* Spotlight */}
                {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.1} castShadow /> */}

                {/* Sphere */}
                <PerspectiveCamera
                    makeDefault
                    position={[5, 5, 15]}
                    fov={75}
                    ref={cameraRef} />
                <Sun />
                <Earth />
                <StarField />
            </Canvas>
    </div>
    );
};

export default SceneTest;



