
import * as THREE from "three";
import React, { useRef, useState, useEffect, useMemo} from 'react';
import Sun from '../../celestial_bodies/sun';
import Earth from '../../celestial_bodies/earth';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import StarField from '../../celestial_bodies/starField';
import {SimulatorTime} from '../../celestial_bodies/simulatorTime';
import AnimationLogic from '../../celestial_bodies/animationLogic';


const SceneOrbits = () => {
    const cameraRef = useRef();
    const time = useRef(new SimulatorTime(new Date(2023, 9, 13, 10,19)));
    const [date, setDate] = useState(time.current.getSimulationDate().toLocaleString());

    useEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.lookAt(0, 0, 0);
        }
    }, []);

    const starField = useMemo(() => <StarField />, []);

    return (
        <>
            <div style={{ width: '800px', height: '500px' }}>
                <Canvas style={{
                    width: '100%',
                    height: '100%',
                    background: 'black',
                }}
                    gl={{ toneMapping: THREE.NoToneMapping }}
                >
                    
                    <AnimationLogic time={time} setDate={setDate}/>
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
                    {starField}
                </Canvas>
            </div>
            <div>{date}</div>
        </>
    );
};

export default SceneOrbits;



