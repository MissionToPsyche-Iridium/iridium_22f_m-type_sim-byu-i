
import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

function loadObject(identifier, objPath) {
    return useLoader(OBJLoader, objPath, (loader) => {
        loader.manager.onLoad = () => console.log(`${identifier} loaded successfully`);
        loader.manager.onError = (url) => console.log(`ERROR: PsycheSpacecraft failed to load ${url}`);
    }).clone();
}

function addMaterial(object, material) {
  object.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });
}

function moveTo(functionPtr, min, max, current, target, rate) {
    if (current > max) {
        current = max;
    } else if (curren < min) {
        current = min;
    }
}

function applyScaling(factor, array) {
  // Scale x,y,z
  const newArray = array.map(x => x * factor);
  // if (factor < 0 ){
  //   // Swap x and y
  //   [newArray[0], newArray[1]] = [newArray[1], newArray[0]];
  // }
  return newArray;
}

const SolarArray = ({isMirrored}) => {
    const scaleFactor = 1 * ((isMirrored) ? -1 : 1 ); // negative = mirror
    const scale = new THREE.Vector3(scaleFactor,scaleFactor,scaleFactor);

    const rotorTargetAngle = useRef(0);
    const barsTargetAngle = useRef(0);
    const panel1TargetAngle = useRef(0);
    const panel2TargetAngle = useRef(0);
    const panel3TargetAngle = useRef(0);
    const panel4TargetAngle = useRef(0);
    const panel5TargetAngle = useRef(0);

    const [rotorAngle, setRotorAngle] = useState(0);
    const [barsAngle, setBarsAngle] = useState(0);
    const [panel1Angle, setPanel1Angle] = useState(0);
    const [panel2Angle, setPanel2Angle] = useState(0);
    const [panel3Angle, setPanel3Angle] = useState(0);
    const [panel4Angle, setPanel4Angle] = useState(0);
    const [panel5Angle, setPanel5Angle] = useState(0);

    const solarRotor = loadObject("Solar Rotor",'/assets/meshes/vehicles/psyche/psycheSolarRotor1_a.obj');
    const solarBars = loadObject("Solar Bars", '/assets/meshes/vehicles/psyche/psycheSolarBars1_a.obj');
    const solarPanel1 = loadObject("Solar Bars", '/assets/meshes/vehicles/psyche/psycheSolarPanel1-1_a.obj');
    const solarPanel2 = loadObject("Solar Bars", '/assets/meshes/vehicles/psyche/psycheSolarPanel1-2_a.obj');
    const solarPanel3 = loadObject("Solar Bars", '/assets/meshes/vehicles/psyche/psycheSolarPanel1-3_a.obj');
    const solarPanel4 = loadObject("Solar Bars", '/assets/meshes/vehicles/psyche/psycheSolarPanel1-4_a.obj');
    const solarPanel5 = loadObject("Solar Bars", '/assets/meshes/vehicles/psyche/psycheSolarPanel1-5_a.obj');

    useFrame (() => {
        setRotorAngle((prev) => prev + 0.25);

    });

    rotorTargetAngle.current = 90; // 90 to stow, 

    const rotorShift = useRef(applyScaling(scaleFactor, [0,0,142]));
    const barsShift =  useRef(applyScaling(scaleFactor, [0,2.8,159]));
    const panel1Shift = useRef(applyScaling(scaleFactor, [0,-5.6,220]));
    const panel2Shift = useRef(applyScaling(scaleFactor, [0,2.8,393.5]));
    const panel3Shift = useRef(applyScaling(scaleFactor, [0,-2.8,394]));
    const panel4Shift = useRef(applyScaling(scaleFactor, [-158,-3,195]));
    const panel5Shift = useRef(applyScaling(scaleFactor, [157,-1.5,195]));

    // useEffect(() => {
    //   rotorShift.current = applyScaling(scaleFactor, [0,0,142]);
    //   console.log("RotoShift: ", rotorShift);
    // }, []);

    useEffect(() => {
        console.log("Roter Angle: ", rotorAngle)
        setRotorAngle(rotorTargetAngle.current);
        console.log("Roter Angle: ", rotorAngle)

    }, [rotorTargetAngle.current]);


    // console.log("panel4 : ", panel4Shift.current);
    // console.log("panel5 : ", panel5Shift.current);

    return (
      <>
        <group rotation={[0, 0, THREE.MathUtils.degToRad(rotorAngle)]}>
        <primitive object={solarRotor} position={rotorShift.current} scale={scale} /> {/*[0,0,142] */}
          <group position={barsShift.current}> {/*[0,2.8,159] */}
          <group rotation={[THREE.MathUtils.degToRad(0), 0, 0]} > {/* closed -90, open 0 */}
            <primitive object={solarBars} scale={scale} />
              <group position={panel1Shift.current}>{/*[0,-5.6,220] */}
              <group rotation={[THREE.MathUtils.degToRad(0), 0, 0]}> {/* closed 180, open 0 */}
                <primitive object={solarPanel1} scale={scale}  />
                  <group position={panel2Shift.current}>{/*[0,2.8,393.5] */}
                  <group rotation={[THREE.MathUtils.degToRad(0), 0, 0]}> {/* closed -180, open 0 */}
                    <primitive object={solarPanel2} scale={scale} />
                      <group position={panel3Shift.current}>{/*[0,-2.8,394] */}
                      <group rotation={[THREE.MathUtils.degToRad(0), 0, 0]}> {/* closed 180, open 0 */}
                        <primitive object={solarPanel3} scale={scale} />
                      </group>
                      </group>
                      <group position={panel4Shift.current}>{/*[-158,-3,195] */}
                      <group rotation={[0,0,THREE.MathUtils.degToRad(0)]}> {/* closed 180, open 0 */}
                        <primitive object={solarPanel4} scale={scale} />
                      </group>
                      </group>
                      <group position={panel5Shift.current}>{/*[157,-1.5,195] */}
                      <group rotation={[0,0,THREE.MathUtils.degToRad(0)]}> {/* closed 180, open 0 */}
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
