
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

import '../../css/pages/simulator.css'

const RenderWithActiveCamera = ({ activeCamera }) => {
    const { invalidate, gl, scene} = useThree(); // Access WebGLRenderer and scene

    // useEffect(() => {
    //     if (activeCamera.current) {
    //         console.log("Rendering with active camera: ", activeCamera.current);
    //         gl.setRenderTarget(null); // Render to the canvas
    //         gl.render(scene, activeCamera.current); // Render using the active camera
    //         invalidate();
    //         console.log("**************Invalidate Called****************");
    //         // setDefaultCamera(activeCamera.current);
    //     }
    // }, [activeCamera.current, gl, scene]);

    useEffect(() => {
        if (activeCamera.current) {
            activeCamera.current.makeDefault=true;
            console.log("Active Camera is ", activeCamera.current)
            console.log("****************RenderWithActiveCamera ***************");
            invalidate();
        }

    }, [activeCamera.current])

    return null; // This component doesn't render anything visually
}

const ScenePsycheSeparation = () => {
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
    const missionName = "Power Up Psyche";
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
    const [camerasUsed, setCamerasUsed] = useState([]);
    const mainCameraRef = useRef();
    const activeCamera = useRef();
    const changeCamera = (cameraPicked) => {
        if (cameraPicked === null || cameraPicked === undefined){
            console.log("Camera Picked is null or undefined");
        } else {
            console.log("Camera Picked:", cameraPicked);
            console.log("CameraRefs Array contains: ", cameraRefs.current);
            console.log("Camera Reference is: ", cameraRefs.current[cameraPicked]);
            console.log("Next: ", cameraRefs.current[cameraPicked].current);
            if (activeCamera.current) {
                activeCamera.current.makeDefault="false";
            }
            activeCamera.current=cameraRefs.current[cameraPicked].current;
        }
    };

    const cameraRefs = useRef({}); // A collection of refs to each registered Camera

    const registerCamera = (cameraID, cameraRef) => {
        if (!cameraRefs.current[cameraID]) {
            console.log("Received CameraRef is: ", cameraRef);
            cameraRefs.current[cameraID] = cameraRef; // Make sure each id is unique
            console.log("Camera is registered: ", cameraID);
            console.log("Reference List", cameraRefs.current);
            // Add button
            setCamerasUsed(prev => [...prev, cameraID]);
            console.log("Added new ref", cameraRefs.current);
        }
    };
    
    useEffect(() => {
        if (mainCameraRef.current) {
            mainCameraRef.current.lookAt(0, 0, 0);
            // mainCameraRef.up.set(1,0,0);
            registerCamera("Main-Out", mainCameraRef);
        }
        changeVehicle(vehiclesUsed[0]);
        if (camerasUsed.length > 0) {
            changeCamera(camerasUsed[0]);
        }
    }, [mainCameraRef.current, camerasUsed]);

    useEffect(() => {
        if (mainCameraRef.current) {
            activeCamera.current = mainCameraRef.current;
            console.log("Initialized active camera: ", activeCamera.current);
        }
    }, [mainCameraRef]);

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
                        <CameraSelectorPanel buttonNames={camerasUsed} changeCamera={changeCamera}/>
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
                            <RenderWithActiveCamera activeCamera={activeCamera} />
                            <PerspectiveCamera
                                // makeDefault
                                near={1}
                                far={100000000}
                                position={[0, 0, camHeight]}
                                fov={45}
                                ref={mainCameraRef} />
                            <Sun position={orbits.sun} trueScale={false} />
                            <Planets.Earth position={orbits.earth} lightDir={orbits.sun} trueScale={true} />
                            <Planets.Moon position={orbits.moon} trueScale={true} />
                            <PsycheSpacecraft position={new THREE.Vector3(13588, 14588, 10088)} registerCamera={registerCamera}/>
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

export default ScenePsycheSeparation;



