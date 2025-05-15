
import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import solarTexture from '/iridium_22f_m-type_sim-byu-i/assets/textures/solar_panel.jpg';

function loadObject(identifier, objPath) {
    return useLoader(OBJLoader, objPath, (loader) => {
        loader.manager.onLoad = () => console.log(`${identifier} loaded successfully`);
        loader.manager.onError = (url) => console.log(`ERROR: PsycheSpacecraft failed to load ${url}`);
    }).clone();
}

function applyScaling(factor, array) {
  // Scale x,y,z
  const newArray = array.map(x => x * factor);
  return newArray;
}

const SolarArray = ({isMirrored, panelAngle=90, controller, deployState, rotorState="STOPPED", identifier}) => {
// const SolarArray = ({isMirrored, panelAngle=90, controller, deployState="DEPLOYED", rotorState="STOPPED", identifier}) => {
    const scaleFactor = 1 * ((isMirrored) ? -1 : 1 ); // negative = mirror
    const scale = new THREE.Vector3(scaleFactor,scaleFactor,scaleFactor);
    const panelTexture = useLoader(THREE.TextureLoader, solarTexture);
    // console.log("Panel Texture ", panelTexture);

    const [foldState, setFoldState] = useState("");
    const [rotorAngle, setRotorAngle] = useState(panelAngle);
    const [rotorTargetAngle, setRotorTargetAngle] = useState(panelAngle);

    const [barsTargetAngle, setBarsTargetAngle] = useState(0);
    const [phase1TargetAngle, setPhase1TargetAngle] = useState(0);
    const [phase2TargetAngle, setPhase2TargetAngle] = useState(0);
    const [phase3TargetAngle, setPhase3TargetAngle] = useState(0);

    const [barsAngle, setBarsAngle] = useState(0);
    const [phase1Angle, setPhase1Angle] = useState(0);
    const [phase2Angle, setPhase2Angle] = useState(0);
    const [phase3Angle, setPhase3Angle] = useState(0);

    useEffect(() => {
      switch (deployState) {
        case "STOWED":
          setBarsAngle(90);
          setBarsTargetAngle(90);
          setPhase1Angle(180)
          setPhase1TargetAngle(180)
          setPhase2Angle(180)
          setPhase2TargetAngle(180)
          setPhase3Angle(180)
          setPhase3TargetAngle(180)
          break;
        case "DEPLOYED":
          setBarsAngle(0);
          setBarsTargetAngle(0);
          setPhase1Angle(0)
          setPhase1TargetAngle(0)
          setPhase2Angle(0)
          setPhase2TargetAngle(0)
          setPhase3Angle(0)
          setPhase3TargetAngle(0)
          break;
        case "DEPLOYING":
          // Do nothing
          break;
        default:
          // Should default to DEPLOYED state
          console.log("ERROR: Unexpected Solar Array Initialization: ", foldState);
          break;
      };
    }, [deployState]);

    useState(() => {
      console.log("Solar Panel : " + deployState);
      setFoldState(deployState);
    }, [deployState]);

    useState(() => {
      setRotorTargetAngle(panelAngle % 360);
    }, [panelAngle]);

    // Load CAD models
    const solarRotor = loadObject("Solar Rotor",'/iridium_22f_m-type_sim-byu-i/assets/meshes/vehicles/psyche/psycheSolarRotor1_a.obj');
    const solarBars = loadObject("Solar Bars", '/iridium_22f_m-type_sim-byu-i/assets/meshes/vehicles/psyche/psycheSolarBars1_a.obj');
    const solarPanel1 = loadObject("Solar Bars", '/iridium_22f_m-type_sim-byu-i/assets/meshes/vehicles/psyche/psycheSolarPanel1-1_a.obj');
    const solarPanel2 = loadObject("Solar Bars", '/iridium_22f_m-type_sim-byu-i/assets/meshes/vehicles/psyche/psycheSolarPanel1-2_a.obj');
    const solarPanel3 = loadObject("Solar Bars", '/iridium_22f_m-type_sim-byu-i/assets/meshes/vehicles/psyche/psycheSolarPanel1-3_a.obj');
    const solarPanel4 = loadObject("Solar Bars", '/iridium_22f_m-type_sim-byu-i/assets/meshes/vehicles/psyche/psycheSolarPanel1-4_a.obj');
    const solarPanel5 = loadObject("Solar Bars", '/iridium_22f_m-type_sim-byu-i/assets/meshes/vehicles/psyche/psycheSolarPanel1-5_a.obj');

    const barsRotationRate = 1; // deg per frame
    const panelRotationRate = 2 * barsRotationRate; // deg per frame
    const rotorRotationRate = 0.5; // deg per frame

    useFrame (() => {
      // Start the Panel deployment
      if (deployState === "DEPLOYING"){
        setFoldState("START-PHASE1");
      }
      // Only run if panels are being deploy
      if (deployState !== "STOWED" && deployState !=="DEPLOYED") {
        switch (foldState) {
          case "START-PHASE1":
            setBarsTargetAngle(0);
            setPhase1TargetAngle(0);
            setFoldState("PHASE1");
            break;
          case "PHASE1":
            if (barsAngle > barsTargetAngle) {
              // Move mounting bars
              setBarsAngle(prev => {
                const newAngle = prev - barsRotationRate;
                // Check and correct for overshooting the target
                return (newAngle > barsTargetAngle) ? newAngle : barsTargetAngle;
              });
            }
            if (phase1Angle > phase1TargetAngle) {
              // Unfold Solar Panels 1, 2, 3
              setPhase1Angle(prev => {
                const newAngle = prev - panelRotationRate;
                // Check and correct for overshooting the target
                return (newAngle > phase1TargetAngle) ? newAngle : phase1TargetAngle;
              });
            }
            if (barsAngle === barsTargetAngle 
              && phase1Angle === phase1TargetAngle) {
              setFoldState("START-PHASE2");
            }
            break;
          case "START-PHASE2":
            setPhase2TargetAngle(0);
            setFoldState("PHASE2");
            break;
          case "PHASE2":
            if (phase2Angle > phase2TargetAngle) {
              // Unfold Solar Panel 4
              setPhase2Angle(prev => {
                const newAngle = prev - panelRotationRate;
                return (newAngle > phase2TargetAngle) ? newAngle : phase2TargetAngle;
              });
            }
            if (phase2Angle === phase2TargetAngle) {
              setFoldState("START-PHASE3");
            }
            break;
          case "START-PHASE3":
            setPhase3TargetAngle(0);
            setFoldState("PHASE3");
            break;
          case "PHASE3":
            if (phase3Angle > phase3TargetAngle) {
              // Unfold Solar Panel 5
              setPhase3Angle(prev => {
                const newAngle = prev - panelRotationRate;
                return (newAngle > phase3TargetAngle) ? newAngle : phase3TargetAngle;
              });
            }
            if (phase3Angle === phase3TargetAngle) {
              setFoldState("DEPLOYED");
              controller.feedBack("SOLAR " + identifier + "_DEPLOYED");
            }
            break;
          default:
            console.log("ERROR: Unexpected foldState during panel deployment:", foldState);
            break;
        }

      }
      // if (foldState==="DEPLOYED" && rotorAngle !== rotorTargetAngle) {
      //   const isClockwise = shouldRotateClockwise(rotorAngle, rotorTargetAngle);

        // setRotorAngle(prev => {
        //   let newAngle = prev + angleChange;
        //   if (newAngle)
        //   // Check for shortest direction


        // });

      // }
      // if (foldState==="DEPLOYED") {
      //   setRotorAngle((prev) => (prev + 0.05) % 360);
      // }
        // console.log("barsAngle : ", barsAngle);
        // console.log("phase1Angle : ", phase1Angle);
        // console.log("phase2Angle : ", phase2Angle);
        // console.log("phase3Angle : ", phase3Angle);
      if (rotorState === "CW" && deployState === "DEPLOYED") {
        setRotorAngle((prev) => (prev + rotorRotationRate) % 360);
      } else if (rotorState === "CCW" && deployState === "DEPLOYED") {
        setRotorAngle((prev) => (prev - rotorRotationRate) % 360);
      }

    });


    const rotorShift = useRef(applyScaling(scaleFactor, [0,0,142]));
    const barsShift =  useRef(applyScaling(scaleFactor, [0,2.8,159]));
    const panel1Shift = useRef(applyScaling(scaleFactor, [0,-5.6,220]));
    const panel2Shift = useRef(applyScaling(scaleFactor, [0,2.8,393.5]));
    const panel3Shift = useRef(applyScaling(scaleFactor, [0,-2.8,394]));
    const panel4Shift = useRef(applyScaling(scaleFactor, [-158,-3,195]));
    const panel5Shift = useRef(applyScaling(scaleFactor, [157,-1.5,195]));




    return (
      <>
        <group rotation={[0, 0, THREE.MathUtils.degToRad(rotorAngle)]}>
        <primitive object={solarRotor} position={rotorShift.current} scale={scale} /> {/*[0,0,142] */}
          <group position={barsShift.current}> {/*[0,2.8,159] */}
          <group rotation={[THREE.MathUtils.degToRad(-barsAngle), 0, 0]} > {/* closed -90, open 0 */}
          {/* <group rotation={[THREE.MathUtils.degToRad(0), 0, 0]} > closed -90, open 0 */}
            <primitive object={solarBars} scale={scale} />
              <group position={panel1Shift.current}>{/*[0,-5.6,220] */}
              <group rotation={[THREE.MathUtils.degToRad(phase1Angle), 0, 0]}> {/* closed 180, open 0 */}
              {/* <group rotation={[THREE.MathUtils.degToRad(0), 0, 0]}> closed 180, open 0 */}
              {/* // **************************TEST ***********************************/}
                <primitive object={solarPanel1} scale={scale} />
                  <group position={panel2Shift.current}>{/*[0,2.8,393.5] */}
                  <group rotation={[THREE.MathUtils.degToRad(-phase1Angle), 0, 0]}> {/* closed -180, open 0 */}
                  {/* <group rotation={[THREE.MathUtils.degToRad(0), 0, 0]}> closed -180, open 0 */}
                    <primitive object={solarPanel2} scale={scale} />
                      <group position={panel3Shift.current}>{/*[0,-2.8,394] */}
                      <group rotation={[THREE.MathUtils.degToRad(phase1Angle), 0, 0]}> {/* closed 180, open 0 */}
                      {/* <group rotation={[THREE.MathUtils.degToRad(0), 0, 0]}> closed 180, open 0 */}
                        <primitive object={solarPanel3} scale={scale} />
                      </group>
                      </group>
                      <group position={panel4Shift.current}>{/*[-158,-3,195] */}
                      <group rotation={[0,0,THREE.MathUtils.degToRad(phase2Angle)]}> {/* closed 180, open 0 */}
                      {/* <group rotation={[0,0,THREE.MathUtils.degToRad(0)]}> closed 180, open 0 */}
                        <primitive object={solarPanel4} scale={scale} />
                      </group>
                      </group>
                      <group position={panel5Shift.current}>{/*[157,-1.5,195] */}
                      <group rotation={[0,0,THREE.MathUtils.degToRad(phase3Angle)]}> {/* closed 180, open 0 */}
                      {/* <group rotation={[0,0,THREE.MathUtils.degToRad(0)]}> closed 180, open 0 */}
                        <primitive object={solarPanel5} scale={scale} />
                      </group>
                      </group>
                  </group>
                  </group>
                </group>
                </group>
              </group>
          </group>
        </group>
      </>
    );
};

export default SolarArray;


function shouldRotateClockwise( current, target) {
  const isTargetGreater = target > current;
  let cw = 0;
  let ccw = 0;
  if (isTargetGreater) {
    cw = target - current;
    ccw = 360 - cw;
  } else {
    ccw = current - target;
    cw = 360 - ccw;
  }
  // favor cw in tie
  return (cw <= 180)
};