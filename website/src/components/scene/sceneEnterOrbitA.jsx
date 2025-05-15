
import * as THREE from "three";
import React, { useRef, useState, useEffect, useMemo, forwardRef} from 'react';
import Sun from '../../celestialBodies/sun.jsx';
import * as Planets from '../../celestialBodies/planets.jsx';
import * as Asteroids from '../../celestialBodies/asteroids';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, View } from '@react-three/drei';
import StarField from '../../celestialBodies/starField.jsx';
import {SimulatorTime} from '../../celestialBodies/simulatorTime.js';
import AnimationLogic from '../../celestialBodies/animationLogic.jsx';
import SolarSystemPositions from '../../celestialBodies/solarSystemPositions.js';
import VehicleSelectorPanel from '../panels/vehicleSelectorPanel.jsx';
import PsycheMainPanel from '../panels/psycheMainPanel.jsx';
import CameraSelectorPanel from '../panels/cameraSelectorPanel2.jsx';
import {EffectComposer, Bloom} from '@react-three/postprocessing';
import PsycheSpacecraft from '../vehicles/psyche/psyMain.jsx';
import AviationButton from '../buttons/aviationButton.jsx';
import {PsycheController} from '../../controllers/psyche/psycheController.js';

import '../../css/pages/simulator.css'


const SceneEnterOrbitA = () => {
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
    const missionName = "Psyche Separation";
    // const psycheSpacecraftRef = useRef();
    const [psycheController] = useState(() => new PsycheController());
    const [psycheControllerState, setPsycheControllerState] = useState();


    const time = useRef(new SimulatorTime(new Date(2023, 9, 13, 10,19)));
    const [date, setDate] = useState(time.current.getSimulationDate());
    const [dateText, setDateText] = useState(time.current.getSimulationDate().toLocaleString());

    // A r=821, period = 32.6 (0.0003067) per 1/10 sec
    // B r=415, period = 11.6 (0.0008617)
    // C r=302, period = 7.2 hour (0.001389)
    // D r=187, period = 3.6   (0.002778), +70'

    const spacecraftOrbitRate = 0.0003067; 
    const spacecraftDistance = 821;
    const [spacecraftOrbitAngle, setSpacecraftOrbitAngle] = useState(0);

    useEffect(() => {
        setSpacecraftOrbitAngle(prev => {
            const newAngle = (prev + spacecraftOrbitRate) % 360;
            return newAngle;
        })
    }, [dateText]);

    const ssp = useRef(new SolarSystemPositions());

    const trueScale = true;
    const scaleFactor = 149597870.7;  // Number of km in an AU
    const camHeight = (trueScale) ? 11000 : 40;

    const [orbits, setOrbits] = useState(ssp.current.getPositionsAUScaled(date, scaleFactor));
    
    // ********** Vehicle Panels ********************
    // const vehiclesUsed = ['FALCON', 'PSYCHE', 'LANDER', 'ROVER', 'SAMPLE ROCKET'];
    const vehiclesUsed = ['PSYCHE'];
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
            mainCameraRef.current.lookAt(0, 0, 0);
            registerCamera("Main-Out");
        }
        changeVehicle(vehiclesUsed[0]);
        if (registeredCameras.length > 0) {
            changeCamera(registeredCameras[0]);
        }
    }, [mainCameraRef.current, registeredCameras]);


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
                        <Canvas style={{ width: '100%', height: '100%', background: 'black' }}
                            gl={{ toneMapping: THREE.NoToneMapping }}
                            camera={(activeCamera.current) ? activeCamera.current.clone() : null}
                            
                            >
                            <AnimationLogic time={time} setDate={setDate} setDateText={setDateText} />
                            {/* <OrbitControls
                             minAzimuthAngle={-Infinity}
                             maxAzimuthAngle={Infinity}
                             minPolarAngle={0}
                             maxPolarAngle={Math.PI}
                             /> */}
                            <ambientLight intensity={0.01} />
                            <PerspectiveCamera
                                makeDefault={activeCamera==="Main-Out"}
                                near={0.01}
                                far={1000000}
                                position={[0, 0, 400]}
                                fov={45}
                                ref={mainCameraRef} />
                            <Sun position={orbits.sun} trueScale={false} />
                            {/* <Planets.Earth position={orbits.earth} lightDir={orbits.sun} trueScale={true} /> */}
                            {/* <Planets.Moon position={orbits.moon} trueScale={true} /> */}
                            <Asteroids.Psyche16 />
                            <group rotation={[THREE.MathUtils.degToRad(spacecraftOrbitAngle), 0, 0]}>
                                <PsycheSpacecraft controller={psycheController} position={new THREE.Vector3(0, 0, spacecraftDistance)} registerCamera={registerCamera} activeCamera={activeCamera}/>
                            </group>
                            {starField}
                            <EffectComposer>
                                <Bloom intensity={1.0}/>
                            </EffectComposer>
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
                        {activeVehicle === "PSYCHE" && <PsycheMainPanel controller={psycheController} />}
                        {activeVehicle === "LANDER" && <LanderMainPanel />}
                        {activeVehicle === "ROVER" && <RoverMainPanel />}
                        {activeVehicle === "SAMPLE ROCKET" && <SampleRocketMainPanel />}

                    </div>
                </div>
            </div>
        </>
    );
};

export default SceneEnterOrbitA;



