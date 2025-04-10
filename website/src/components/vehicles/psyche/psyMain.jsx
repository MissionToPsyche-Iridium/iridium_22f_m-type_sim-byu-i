
import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import SolarArray from '../psyche/psySolarArray';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

const PsycheSpacecraft = ({controller, position, registerCamera, activeCamera}) => {
    const objectName = "PsycheSpacecraft";
    const objPath = '/assets/meshes/vehicles/psyche/psycheSpacecraft_a.obj'
    const vehicle = useLoader(OBJLoader, objPath, (loader) => {
        loader.manager.onLoad = () => console.log(`${objectName} loaded successfully`);
        loader.manager.onError = (url) => console.log(`ERROR: ${objectName} failed to load ${url}`);
    });

    const [controllerData, setControllerData] = useState({
            yPlusSolarArrayState: "STOWED", 
            yPlusSolarArrayMotion: "STOPPED", 
            yMinusSolarArrayState: "STOWED", 
            yMinusSolarArrayMotion: "STOPPED", 
            xPlusIonArmState: "STOWED", 
            xPlusIonSelected: "OUTER", 
            xPlusIonPower: 0, 
            xMinusIonArmState: "STOWED", 
            xMinusIonSelected: "OUTER", 
            xMinusIonPower: 0, 
            xRotation: 0, 
            yRotation: 0, 
            zRotation: 0 
    });

    const [cameraAngle, setCameraAngle] = useState(0);
    const psycheCamera = useRef();
    const [hasRegistered, setHasRegistered] = useState(false);

    const sf = 1;
    const scale = new THREE.Vector3(sf,sf,sf);

    const material = new THREE.MeshStandardMaterial({ color: 'rgb(255, 255, 255)'});
    
    const solarArrayLeftRef = useRef();
    const solarArrayRightRef = useRef();
    // const isCameraDefault = true;
    const cameraID = "Psyche-Out"

    useEffect(() => {
        // SolarArray and Thruster will inherit material from here.
        vehicle.traverse((child) => {
            if (child.isMesh) {
                child.material = material;
            }
        });
    }, []); 

    useEffect(() => {
        const handleUpdate = (newData) => {
            console.log("PsycheSpacecraft receive an update from the controller" );
            setControllerData(newData);
            console.log("y+ State " + newData.yPlusSolarArrayState);


        };

        controller.subscribe(handleUpdate)
        // During initialization force controller to update all subscribers
        controller.notifyListeners();

        return () => {
            controller.unsubscribe(handleUpdate);
        };

    }, [controller])

    useEffect(() => {
        if (psycheCamera && psycheCamera.current && !hasRegistered) {
            // console.log("PsycheCameraReference.current preRegistration: ", psycheCamera.current);
            // console.log("PsycheCameraReference preRegistration: ", psycheCamera);
            registerCamera(cameraID);
            // registerCamera("Psyche-Out", psycheCamera.current);
            setHasRegistered(true);
            // console.log("Guard Ran");
        }
    }, [psycheCamera, hasRegistered]);



    useFrame(() => {
        setCameraAngle( prev => {
            return (prev + 0.1) % 360;
            // return 0;
        });
        if (psycheCamera.current) {
            // psycheCamera.current.lookAt(...[0,0,0]);
            psycheCamera.current.lookAt(...[position.x, position.y, position.z]);
        }
            // console.log("y+ State " + controllerData.yPlusSolarArrayState);
    });
        // rotation={[0,THREE.MathUtils.degToRad(50), 0]}

    return (
      <>
      {/* <group rotation={[0, THREE.MathUtils.degToRad(30), 0]}> */}
        <primitive object={vehicle} position={position} scale={scale} >
            <SolarArray key="solarArrayLeft" id="left" ref={solarArrayLeftRef} isMirrored={true} controller={controller}
            deployState={controllerData?.yPlusSolarArrayState} rotorState={controllerData?.yPlusSolarArrayMotion} identifier="+Y"/>
            <SolarArray key="solarArrayRight" id="right" ref={solarArrayRightRef} isMirrored={false} controller={controller}
            deployState={controllerData?.yMinusSolarArrayState} rotorState={controllerData?.yMinusSolarArrayMotion} identifier="-Y"/>
            {/* <SolarArray key="solarArrayRight" id="right" ref={solarArrayRightRef} isMirrored={true} initialState={"STOWED"} beginDeploy={true}/> */}
                <group rotation={[THREE.MathUtils.degToRad(cameraAngle), THREE.MathUtils.degToRad(cameraAngle), 0]}> 
                <group position={[0,0, 7000]}>
                <PerspectiveCamera
                    makeDefault={activeCamera===cameraID}
                    near={0.1}
                    far={10000000}
                    position={[0, 0, 0]}
                    // position={[orbits.earth.x, orbits.earth.y, camHeight]}
                    fov={25}
                    ref={psycheCamera} />
                    <OrbitControls />

            </group>
            </group>
        </primitive>

      {/* </group> */}
      </>
    );
};

export default PsycheSpacecraft;




