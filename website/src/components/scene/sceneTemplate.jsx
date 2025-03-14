
import * as THREE from "three";
import React, { useRef, useState, useEffect, useMemo, forwardRef} from 'react';
import Sun from '../../celestialBodies/sun';
import * as Planets from '../../celestialBodies/planets';
import * as Asteroids from '../../celestialBodies/asteroids';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, View } from '@react-three/drei';
import StarField from '../../celestialBodies/starField';
import {SimulatorTime} from '../../celestialBodies/simulatorTime';
import AnimationLogic from '../../celestialBodies/animationLogic';
import SolarSystemPositions from '../../celestialBodies/solarSystemPositions';
import TestPsyche from '../../vehicles/test/testPsyche';
import AviationButton from '../buttons/aviationButton';

import '../../css/pages/simulator.css'


const SceneOrbit16Psyche = () => {
    const backgroundStyle = {
        backgroundImage: 'url(/assets/textures/seemlessmetal.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh', 
        width: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
    };
    const missionName = "Orbit around 16-Psyche";
    const mainCameraRef = useRef();
    const psycheCameraRef = useRef();
    const time = useRef(new SimulatorTime(new Date(2023, 9, 13, 10,19)));
    const [date, setDate] = useState(time.current.getSimulationDate());
    const [dateText, setDateText] = useState(time.current.getSimulationDate().toLocaleString());

    const ssp = useRef(new SolarSystemPositions());

    const trueScale = true;
    const scaleFactor = (trueScale) ?     60000000 : 100 ;
    // const scaleFactor = (trueScale) ? 149597870.7 : 100 ;
    const camHeight = (trueScale) ? 11000 : 40;

    const [orbits, setOrbits] = useState(ssp.current.getPositionsAUScaled(date, scaleFactor));

    useEffect(() => {
        if (mainCameraRef.current) {
            mainCameraRef.current.lookAt(0, 0, 0);
        }
    }, []);

    useEffect(() => {
        setOrbits(ssp.current.getPositionsAUScaled(date, scaleFactor));
        ssp.current.setReferenceFrame("psycheAsteroid");
    }, [dateText])

    return (
        <>
            <div className="main" style={backgroundStyle}>
                <div className="missionTitle" >
                    <div className="innerDiv"><h2>Mission: {missionName}</h2></div>
                    <div className="innerDiv"><h2> {dateText}</h2></div>
                </div>
                <div className="displays" styles={{ width: '100%', height: '60%'}}>
                    <div className="camControls" >
                        <h2>Camera Controls</h2>
                        <AviationButton />
                        <AviationButton />
                        <AviationButton />
                        <AviationButton />
                        <AviationButton />
                        <AviationButton />


                    </div>
                    <div className="views" >
                        <Canvas style={{ width: '100%', height: '100%', background: 'black' }}
                            gl={{ toneMapping: THREE.NoToneMapping }}>
                            {/* <View index={0}> */}
                            <AnimationLogic time={time} setDate={setDate} setDateText={setDateText} />
                            <OrbitControls />
                            <ambientLight intensity={0.01} />

                            <PerspectiveCamera
                                makeDefault
                                near={0.0001}
                                far={100000000000}
                                position={[0, 0, camHeight]}
                                // position={[orbits.earth.x, orbits.earth.y, camHeight]}
                                fov={45}
                                ref={mainCameraRef} />
                            <Sun position={orbits.sun} trueScale={trueScale} />
                            <Asteroids.Psyche16 position={orbits.psycheAsteroid} trueScale={trueScale} />
                            <TestPsyche position={new THREE.Vector3(12500, 12500, 10000)} ref={psycheCameraRef} />
                        </Canvas>
                    </div>
                    <div className="camera2">
                        <h2>Camera Offline</h2>
                    </div>
                </div>
                <div className="panels">
                    <div className="vehicle">
                        <h2>Vehicle Selector</h2>
                        <AviationButton />
                        <AviationButton />
                        <AviationButton />
                    </div>
                    <div className="panel">
                        <h2>Vehicle Controls</h2>
                        <AviationButton />
                        <AviationButton />
                        <AviationButton />
                    </div>
                </div>
            </div>
        </>
    );
};

// const PsycheCameraView = ({ psycheCameraRef }) => {
//     const { gl, scene } = useThree();
//     useFrame(() => {
//         if (psycheCameraRef.current) {
//             gl.setClearColor('black');
//             gl.render(scene, psycheCameraRef.current);
//         }
//     });
//     return null;
// };

export default SceneOrbit16Psyche;



