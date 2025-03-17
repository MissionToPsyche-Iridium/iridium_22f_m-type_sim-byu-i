
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
import VehicleSelectorPanel from '../panels/vehicleSelectorPanel';
import FalconMainPanel from '../panels/falconMainPanel';
import PsycheMainPanel from '../panels/psycheMainPanel';
import LanderMainPanel from '../panels/landerMainPanel';
import RoverMainPanel from '../panels/roverMainPanel';
import SampleRocketMainPanel from '../panels/sampleRocketMainPanel';
import CameraSelectorPanel from '../panels/cameraSelectorPanel';
import {EffectComposer, Bloom} from '@react-three/postprocessing';
import PsycheSpacecraft from '../vehicles/psyche/psyMain';
import DebuggingPanel from "../panels/debuggingPanel";


import '../../css/pages/simulator.css'


const SceneMars = () => {
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
    const missionName = "Sling shot around Mars";
    const secondaryCameraRef = useRef();
    const time = useRef(new SimulatorTime(new Date(2023, 9, 13, 10,19)));
    const [date, setDate] = useState(time.current.getSimulationDate());
    const [dateText, setDateText] = useState(time.current.getSimulationDate().toLocaleString());

    const ssp = useRef(new SolarSystemPositions());

    const trueScale = true;
    const scaleFactor = (trueScale) ?     60000000 : 100 ;
    // const scaleFactor = (trueScale) ? 149597870.7 : 100 ;
    const camHeight = (trueScale) ? 10000 : 40;

    const [orbits, setOrbits] = useState(ssp.current.getPositionsAUScaled(date, scaleFactor));

    const vehiclesUsed = ['PSYCHE'];
    const [activeVehicle, setActiveVehicle] = useState("none");
    const changeVehicle = (vehiclePicked) => {
        setActiveVehicle(vehiclePicked);
    }

    const mainCameraRef = useRef();

    useEffect(() => {
        if (mainCameraRef.current) {
            mainCameraRef.current.position.set(10000,100,7161);
            mainCameraRef.current.lookAt(10000, 0, 7000);

            console.log("mainCameraRef is valid");
        } else {
            console.log("mainCameraRef isn't valid");
        }
    }, [mainCameraRef.current]);

    useEffect(() => {
        changeVehicle(vehiclesUsed[0]);
    }, []);

    useEffect(() => {
        setOrbits(ssp.current.getPositionsAUScaled(date, scaleFactor));
        ssp.current.setReferenceFrame("mars");
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
                        <CameraSelectorPanel name={'Camera'} />
                    </div>
                    <div className="views" >
                        <Canvas style={{ width: '100%', height: '100%', background: 'black' }}
                            gl={{ toneMapping: THREE.NoToneMapping }}>
                            <AnimationLogic time={time} setDate={setDate} setDateText={setDateText} />
                            <OrbitControls />
                            <ambientLight intensity={0.1} />

                            <PerspectiveCamera
                                makeDefault
                                near={0.001}
                                far={100000000}
                                position={[0, 0, camHeight]}
                                fov={45}
                                ref={mainCameraRef} />
                            {/* <PerspectiveCamera
                                // makeDefault
                                near={0.001}
                                far={10000000000}
                                position={[10000, 9000, camHeight]}
                                fov={45}
                                ref={secondaryCameraRef} /> */}
                            <Sun position={orbits.sun} trueScale={trueScale} />
                            <Planets.Mars position={orbits.mars} trueScale={trueScale} />
                            {/* <Asteroids.Psyche16 position={orbits.psycheAsteroid} trueScale={trueScale} /> */}
                            {/* <PsycheSpacecraft position={new THREE.Vector3(0, 0, 10000)}  /> */}
                            <PsycheSpacecraft position={[10000,0,7000]}  />
                            {starField}
                            <EffectComposer>
                                <Bloom intensity={1.0}/>
                            </EffectComposer>
                        </Canvas>
                    </div>
                    <div className="debuggingMenu" >
                        <DebuggingPanel name="Debugger" />
                    </div>

                </div>
                <div className="panels">
                    <div className="vehicle">
                        <VehicleSelectorPanel buttonNames={vehiclesUsed} changeVehicle={changeVehicle}/>
                    </div>
                    <div className="panel">
                        {/* <h2>Vehicle Controls </h2> */}
                        {activeVehicle === "FALCON" && <FalconMainPanel />}
                        {activeVehicle === "PSYCHE" && <PsycheMainPanel />}
                        {activeVehicle === "LANDER" && <LanderMainPanel />}
                        {activeVehicle === "ROVER" && <RoverMainPanel />}
                        {activeVehicle === "SAMPLE ROCKET" && <SampleRocketMainPanel />}

                    </div>
                </div>
            </div>
        </>
    );
};

export default SceneMars;



