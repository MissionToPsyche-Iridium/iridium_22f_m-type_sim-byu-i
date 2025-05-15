
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



import '../../css/pages/simulator.css'


const SceneMultiTest2 = () => {
    const backgroundStyle = {
        // backgroundImage: 'url(/iridium_22f_m-type_sim-byu-i/assets/textures/seemlessmetal.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh', 
        width: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
    };
    const missionName = "Sling shot around Mars";
    const time = useRef(new SimulatorTime(new Date(2023, 9, 13, 10,19)));
    const [date, setDate] = useState(time.current.getSimulationDate());
    const [dateText, setDateText] = useState(time.current.getSimulationDate().toLocaleString());

    const trueScale = true;
    const scaleFactor = (trueScale) ?     60000000 : 100 ;
    // const scaleFactor = (trueScale) ? 149597870.7 : 100 ;
    const camHeight = (trueScale) ? 11000 : 40;


    const vehiclesUsed = ['PSYCHE'];
    const [activeVehicle, setActiveVehicle] = useState("none");
    const changeVehicle = (vehiclePicked) => {
        setActiveVehicle(vehiclePicked);
    }

    useEffect(() => {
        changeVehicle(vehiclesUsed[0]);
    }, []);

    const leftCameraRef = useRef();
    const rightCameraRef = useRef();
    const container = useRef();

    useEffect(() => {
        if (leftCameraRef.current) {
            console.log("Left Camera is valid")
            leftCameraRef.current.lookAt(0, 0, 0);
        }
        if (rightCameraRef.current) {
            console.log("Right Camera is valid")
            rightCameraRef.current.lookAt(0, 0, 0);
        }
        console.log("DOM root: ", document.getElementById('root'));
    }, [leftCameraRef.current, rightCameraRef.current]);


    return (
      <>
        {/* <div className="main" style={backgroundStyle}> */}
        {/* <div className="missionTitle">
            <div className="innerDiv">
              <h2>Mission: {missionName}</h2>
            </div>
            <div className="innerDiv">
              <h2> {dateText}</h2>
            </div>
          </div> */}
        {/* <div className="displays" styles={{ width: "100%", height: "60%" }}> */}
        {/* <div className="camControls">
              <CameraSelectorPanel name={"Left Camera"} />
              <CameraSelectorPanel name={"Right Camera"} />
            </div> */}

        <main
          ref={container}
          className="canvas-border"
          //   style={{ width: "90%", height: "100%", background: "black" }}
        >
          <Canvas
            className="canvas"
            eventSource={document.getElementById("root")}
            // style={{ width: "90%", height: "100%" }}
            // style={{ width: "90%", height: "100%", background: "black" }}
            // gl={{ toneMapping: THREE.NoToneMapping }}
          >
            <View.Port />
          </Canvas>

          {/***** [VIEW 1] *************************************************************/}
          <View
            className="views-left"
            index={1}
            // style={{ position: "left", width: "100%", height: "100%" }}
            style={{
              position: "absolute",
              top: 0,
              left: 200,
              width: 800,
              height: 300,
            }}
          >
            <PerspectiveCamera
              makeDefault
              position={[2, 2, 5]}
              //   position={[0, 0, camHeight]}
              fov={50}
              ref={leftCameraRef}
            />
            {console.log("Left Camera Ref: ", leftCameraRef.current)}
            <OrbitControls camera={leftCameraRef.current} />
            {/* <AnimationLogic
                  time={time}
                  setDate={setDate}
                  setDateText={setDateText}
                /> */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="blue" />
            </mesh>
            {/* <SceneContent
                  props={{ date, dateText, scaleFactor, trueScale }}
                /> */}
          </View>

          {/***** [VIEW 2] *************************************************************/}
          <View
            className="views-right"
            index={2}
            // style={{ position: "right", width: "100%", height: "100%" }}
            style={{
              position: "absolute",
              top: 600,
              left: 1000,
              width: 800,
              height: 300,
            }}
          >
            <PerspectiveCamera
              makeDefault
              fov={50}
              ref={rightCameraRef}
              position={[-2, 2, 5]}
              //   position={[10000, 10000, camHeight]}
            />
            {console.log("Right Camera Ref: ", rightCameraRef.current)}
            <OrbitControls camera={rightCameraRef.current} />
            <SceneContent props={{ date, dateText, scaleFactor, trueScale }} />
          </View>
        </main>

        {/* </div> */}
        {/* <div className="panels">
            <div className="vehicle">
              <VehicleSelectorPanel
                buttonNames={vehiclesUsed}
                changeVehicle={changeVehicle}
              />
            </div>
            <div className="panel">
              {activeVehicle === "FALCON" && <FalconMainPanel />}
              {activeVehicle === "PSYCHE" && <PsycheMainPanel />}
              {activeVehicle === "LANDER" && <LanderMainPanel />}
              {activeVehicle === "ROVER" && <RoverMainPanel />}
              {activeVehicle === "SAMPLE ROCKET" && <SampleRocketMainPanel />}
            </div>
          </div> */}
        {/* </div> */}
      </>
    );
};

export default SceneMultiTest2;


const SceneContent = ({props: {date, dateText, scaleFactor, trueScale}}) => {
    const ssp = useRef(new SolarSystemPositions());

    const [orbits, setOrbits] = useState(ssp.current.getPositionsAUScaled(date, dateText, scaleFactor));
    const starField = useMemo(() => <StarField />, []);
    useEffect(() => {
        setOrbits(ssp.current.getPositionsAUScaled(date, scaleFactor));
        ssp.current.setReferenceFrame("mars");
    }, [dateText])

    return (
      <>
        <ambientLight intensity={0.1} />
        <Sun position={orbits.sun} trueScale={trueScale} />
        <Planets.Mars position={orbits.mars} trueScale={trueScale} />
        {/* <Asteroids.Psyche16
          position={orbits.psycheAsteroid}
          trueScale={trueScale}
        /> */}
        {/* <PsycheSpacecraft position={new THREE.Vector3(12500, 12500, 10000)} /> */}
        {/* {starField} */}
        <EffectComposer>
          <Bloom intensity={1.0} />
        </EffectComposer>
      </>
    );

}

            {/* <div className="views" >
                        <Canvas style={{ width: '100%', height: '100%', background: 'black' }}
                            gl={{ toneMapping: THREE.NoToneMapping }}>
                            <AnimationLogic time={time} setDate={setDate} setDateText={setDateText} />
                            <OrbitControls />
                            <ambientLight intensity={0.1} />
                            <SceneContent props={{date, dateText, scaleFactor, trueScale}}/>

                            <PerspectiveCamera
                                makeDefault
                                near={0.001}
                                far={10000000000}
                                position={[0, 0, camHeight]}
                                fov={45}
                                ref={mainCameraRef} />
                            <PerspectiveCamera
                                makeDefault
                                near={0.001}
                                far={10000000000}
                                position={[10000, 10000, camHeight]}
                                fov={45}
                                ref={secondaryCameraRef} />
                        </Canvas>
                    </div> */}