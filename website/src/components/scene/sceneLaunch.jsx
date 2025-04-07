
import * as THREE from "three";
import React, { useRef, useState, useEffect, useMemo, forwardRef} from 'react';
import Sun from '../../celestialBodies/sun';
import * as Planets from '../../celestialBodies/planets';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, View } from '@react-three/drei';
import StarField from '../../celestialBodies/starField';
import {SimulatorTime} from '../../celestialBodies/simulatorTime';
import AnimationLogic from '../../celestialBodies/animationLogic';
import SolarSystemPositions from '../../celestialBodies/solarSystemPositions';
import VehicleSelectorPanel from '../panels/vehicleSelectorPanel';
import FalconMainPanel from '../panels/falconMainPanel';
import PsycheMainPanel from '../panels/psycheMainPanel';
import LanderMainPanel from '../panels/landerMainPanel';
import RoverMainPanel from '../panels/roverMainPanel';
import SampleRocketMainPanel from '../panels/sampleRocketMainPanel';
import CameraSelectorPanel from '../panels/cameraSelectorPanel2';
import {EffectComposer, Bloom} from '@react-three/postprocessing';
import PsycheSpacecraft from '../vehicles/psyche/psyMain';
import AviationButton from '../buttons/aviationButton';
import FalStage2 from '../vehicles/falcon/falStage2';
import LauchPad from '../scenary/lauchpad39a/lauchpad';
import FalComposite from '../vehicles/falcon/falComposite';

import '../../css/pages/simulator.css'


const SceneLaunch = () => {
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
    const missionName = "Lauch Day";
    const psycheSpacecraftRef = useRef();
    const time = useRef(new SimulatorTime(new Date(2023, 9, 13, 10,19)));
    const [date, setDate] = useState(time.current.getSimulationDate());
    const [dateText, setDateText] = useState(time.current.getSimulationDate().toLocaleString());

    const ssp = useRef(new SolarSystemPositions());

    const trueScale = true;
    const scaleFactor = 149597870.7;  // Number of km in an AU
    const camHeight = (trueScale) ? 11000 : 40;

    const [orbits, setOrbits] = useState(ssp.current.getPositionsAUScaled(date, scaleFactor));
    
    // ********** Vehicle Panels ********************
    // const vehiclesUsed = ['FALCON', 'PSYCHE', 'LANDER', 'ROVER', 'SAMPLE ROCKET'];
    const vehiclesUsed = ['FALCON', 'PSYCHE'];
    const [activeVehicle, setActiveVehicle] = useState("none");
    const changeVehicle = (vehiclePicked) => {
        setActiveVehicle(vehiclePicked);
    }

    // ********* Camera Controls ************************
    // const [camerasUsed, setCamerasUsed] = useState([]);
    const mainCameraRef = useRef();
    const [activeCamera, setActiveCamera] = useState("Main-Out");

    const changeCamera = (cameraPicked) => {
        if (cameraPicked === null || cameraPicked === undefined){
            console.log("Camera Picked is null or undefined");
        } else {
            console.log("Camera Picked:", cameraPicked);
            setActiveCamera(cameraPicked);
        }
    };

    // const cameraRefs = useRef({}); // A collection of refs to each registered Camera
    const [registeredCameras, setRegisteredCameras] = useState([]);

    const registerCamera = (cameraID) => {
        setRegisteredCameras((prev) => {
            if (!prev.includes(cameraID)) {
                console.log("Registered: ", cameraID);
                return [...prev, cameraID]
            } else {
                console.log("Camera ID already registered: ", cameraID);
                return prev;
            }
        });
    };
    
    useEffect(() => {
        if (mainCameraRef.current) {
            mainCameraRef.current.lookAt(0, 6371.5, 0);
            registerCamera("Main-Out");
        }
        changeVehicle(vehiclesUsed[0]);
        if (registeredCameras.length > 0) {
            changeCamera(registeredCameras[0]);
        }
    }, [mainCameraRef.current, registeredCameras]);

    // useEffect(() => {
    //     if (mainCameraRef.current) {
    //         activeCamera.current = mainCameraRef.current;
    //         console.log("Initialized active camera: ", activeCamera.current);
    //     }
    // }, [mainCameraRef]);

    useEffect(() => {
        setOrbits(ssp.current.getPositionsAUScaled(date, scaleFactor));
        ssp.current.setReferenceFrame("earth");
    }, [dateText]);

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
                        <CameraSelectorPanel buttonNames={registeredCameras} changeCamera={changeCamera}/>
                    </div>
                    <div className="views" >
                        <Canvas style={{ width: '100%', height: '100%', background: 'rgb(100, 168, 196)' }}
                            gl={{ toneMapping: THREE.NoToneMapping }}
                            camera={(activeCamera.current) ? activeCamera.current.clone() : null}
                            
                            >
                            <AnimationLogic time={time} setDate={setDate} setDateText={setDateText} />
                            <OrbitControls
                             minAzimuthAngle={-Infinity}
                             maxAzimuthAngle={Infinity}
                             minPolarAngle={0}
                             maxPolarAngle={Math.PI}
                             />
                            {/* <ambientLight intensity={6} /> */}
                            <ambientLight intensity={0.1} />
                            <PerspectiveCamera
                                makeDefault={activeCamera==="Main-Out"}
                                near={0.1}
                                far={10000000}
                                position={[0, 6375, 0]}
                                fov={45}
                                ref={mainCameraRef} />
                            <Sun position={orbits.sun} trueScale={false} />
                            {/* <Planets.Earth position={orbits.earth} lightDir={orbits.sun} trueScale={true} /> */}
                            <Planets.Moon position={orbits.moon} trueScale={true} />
                            {/* <PsycheSpacecraft position={new THREE.Vector3(13588, 14588, 10088)} registerCamera={registerCamera} activeCamera={activeCamera}/> */}
                            {/* <FalStage2 position={new THREE.Vector3(13588, 13058, 10088)} registerCamera={registerCamera} activeCamera={activeCamera}/> */}
                            <LauchPad position={new THREE.Vector3(0, 6371.5, 0)} registerCamera={registerCamera} activeCamera={activeCamera}/>
                            <FalComposite position={new THREE.Vector3(0, 6371.5, 0)} />
                            {/* {starField} */}
                            <mesh position={[0,0,0]} receiveShadow>
                                <sphereGeometry args={[6371, 256, 256]} />
                                <meshStandardMaterial color='rgb(52, 99, 73)' />
                            </mesh>
                            {/* <EffectComposer>
                                <Bloom intensity={1.0}/>
                            </EffectComposer> */}
                        </Canvas>
                    </div>
                    <div className="camera2">
                        {/* <h2>Camera Offline</h2> */}
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

export default SceneLaunch;



