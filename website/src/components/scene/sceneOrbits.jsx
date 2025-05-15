
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
import TestPsyche from '../vehicles/test/testPsyche';
import AviationButton from '../buttons/aviationButton';

import '../../css/pages/simulator.css'


const SceneOrbits = () => {
    const backgroundStyle = {
        backgroundImage: 'url(/iridium_22f_m-type_sim-byu-i/assets/textures/seemlessmetal.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh', 
        width: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
    };
    const missionName = "Mission Name";
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
            // cameraRef.current.layers.enable(0);
            // cameraRef.current.layers.enable(2);
        }
    }, []);

    useEffect(() => {
        setOrbits(ssp.current.getPositionsAUScaled(date, scaleFactor));
        // ssp.current.setReferenceFrame("sun");
        // ssp.current.setReferenceFrame("mercury");
        // ssp.current.setReferenceFrame("venus");
        // ssp.current.setReferenceFrame("earth");
        // ssp.current.setReferenceFrame("mars");
        // ssp.current.setReferenceFrame("jupiter");
        // ssp.current.setReferenceFrame("saturn");
        // ssp.current.setReferenceFrame("uranus");
        // ssp.current.setReferenceFrame("neptune");
        ssp.current.setReferenceFrame("psycheAsteroid");


    }, [dateText])

    const starField = useMemo(() => <StarField />, []);

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
                            <Planets.Mercury position={orbits.mercury} trueScale={trueScale}/>
                            <Planets.Venus position={orbits.venus} trueScale={trueScale}/>
                            <Planets.Earth position={orbits.earth} lightDir={orbits.sun} trueScale={trueScale} />
                            <Planets.Moon position={orbits.moon} trueScale={trueScale} />
                            <Planets.Mars position={orbits.mars} trueScale={trueScale} />
                            <Planets.Jupiter position={orbits.jupiter} trueScale={trueScale}/>
                            <Planets.Saturn position={orbits.saturn} trueScale={trueScale}/>
                            <Planets.Uranus position={orbits.uranus} trueScale={trueScale}/>
                            <Planets.Neptune position={orbits.neptune} trueScale={trueScale}/>
                            <Asteroids.Psyche16 position={orbits.psycheAsteroid} trueScale={trueScale} />
                            <TestPsyche position={new THREE.Vector3(12500, 12500, 10000)} ref={psycheCameraRef} />
                            {/* {starField} */}

                            {/* </View> */}
                            {/* <View index={1}>
                        <OrbitControls /> */}
                            {/* <primitive object={psycheCameraRef.current} /> */}
                            {/* <PsycheCameraView psycheCameraRef={psycheCameraRef} /> */}
                            {/* <PerspectiveCamera
                            near={0.0005}
                            far={10000000}
                            position={[0, 0, 5000]}
                            fov={45}
                             />
                    </View> */}
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

export default SceneOrbits;



