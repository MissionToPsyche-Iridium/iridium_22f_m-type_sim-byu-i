import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import Grass from '../lauchpad39a/grass';
import Buildings from '../lauchpad39a/buildings';
import Ramp from '..//lauchpad39a/ramp';
import Tower from '..//lauchpad39a/tower';
import CrawlerBase from '..//lauchpad39a/crawler_base';
import CrawlerStand from '..//lauchpad39a/crawler_stand';
import Roads from '..//lauchpad39a/roads';

const LauchPad = ({position, registerCamera, activeCamera}) => {
    const oversized = false;
    const fallBack = false; 
    // const fallBack = true; 
    // const sf = 1;
    const sf = (oversized)? 1 : 0.00001;
    const scale = new THREE.Vector3(sf,sf,sf);

    const standAngle = (fallBack) ? 30 : 0;

    

    const cameraID_WT = "Water Tower";
    const waterTowerCamera = useRef();
    const [cameraAngle_WT, setCameraAngle_WT] = useState(0);
    const [hasRegistered_WT, setHasRegistered_WT] = useState(false);


    const cameraID_VA = "Viewing Area";
    const viewingAreaCamera = useRef();
    const [cameraAngle_VA, setCameraAngle_VA] = useState(0);
    const [hasRegistered_VA, setHasRegistered_VA] = useState(false);

    const cameraID_HV = "Helicopter View";
    const helicopterViewCamera = useRef();
    const [cameraAngle_HV, setCameraAngle_HV] = useState(0);
    const [hasRegistered_HV, setHasRegistered_HV] = useState(false);

    useEffect(() => {
        if (waterTowerCamera && waterTowerCamera.current && !hasRegistered_WT) {
            registerCamera(cameraID_WT);
            setHasRegistered_WT(true);
        }
    }, [waterTowerCamera, hasRegistered_WT]);

    useEffect(() => {
        if (viewingAreaCamera && viewingAreaCamera.current && !hasRegistered_VA) {
            registerCamera(cameraID_VA);
            setHasRegistered_WT(true);
        }
    }, [viewingAreaCamera, hasRegistered_VA]);

    useEffect(() => {
        if (helicopterViewCamera && helicopterViewCamera.current && !hasRegistered_HV) {
            registerCamera(cameraID_HV);
            setHasRegistered_HV(true);
        }
    }, [helicopterViewCamera, hasRegistered_HV]);

    useFrame(() => {
        // setCameraAngle( prev => {
        //     return (prev + 0.1) % 360;
        // });
        if (waterTowerCamera.current) {
            waterTowerCamera.current.lookAt(...[position.x, position.y + (1900 * sf), position.z]);
            // waterTowerCamera.current.lookAt(...[position.x, position.y, position.z]);
        }
        if (viewingAreaCamera.current) {
            viewingAreaCamera.current.lookAt(...[position.x, position.y + (1900 * sf), position.z]);
            // waterTowerCamera.current.lookAt(...[position.x, position.y, position.z]);
        }
        if (helicopterViewCamera.current) {
            helicopterViewCamera.current.lookAt(...[position.x, position.y + (-2500 * sf), position.z]);
            setCameraAngle_HV(prev => {
                return (prev + 0.1) % 360;
            })
            // waterTowerCamera.current.lookAt(...[position.x, position.y, position.z]);
        }
    });

    return (
      <>
      <group position={position}>
        <Grass position={[0,0,0]} scaleFactor={sf} receiveShadow/>
        <Buildings position={[0,0,0]} castShadow={true} scaleFactor={sf}/>
        <Ramp position={[0,0,0]} scaleFactor={sf}/>
        <Tower position={[0,0,0]} scaleFactor={sf}/>
        <CrawlerBase position={[0,0,0]} scaleFactor={sf}/>
        <group position={[0,sf * 40,0]}>
            <Roads position={[0,0,0]} scaleFactor={sf}/>
        </group>
        <group rotation={[THREE.MathUtils.degToRad(standAngle), 0, 0]}>
            <group position={[0,sf * 210,0]}>
                <CrawlerStand position={[0,0,0]} scaleFactor={sf}/>
            </group>
        </group>
        <group position={[10400 * sf, 6200 * sf, -12700 * sf]}>
            <PerspectiveCamera
                ref={waterTowerCamera} 
                makeDefault={activeCamera===cameraID_WT}
                near={(oversized) ? 1 : 0.1}
                far={(oversized) ? 100000000 : 10000000}
                position={[0, 0, 0]}
                fov={45}
                />
        </group>
        <group position={[-42400 * sf, 2200 * sf, 27700 * sf]}>
            <PerspectiveCamera
                ref={viewingAreaCamera} 
                makeDefault={activeCamera===cameraID_VA}
                near={(oversized) ? 1 : 0.1}
                far={(oversized) ? 100000000 : 10000000}
                position={[0, 0, 0]}
                fov={30}
                />
        </group>
        <group rotation={[0, THREE.MathUtils.degToRad(cameraAngle_HV), 0]}>
            <group position={[0 * sf, 20000 * sf, 35000 * sf]}>
                <PerspectiveCamera
                    ref={helicopterViewCamera} 
                    makeDefault={activeCamera===cameraID_HV}
                    near={(oversized) ? 1 : 0.1}
                    far={(oversized) ? 100000000 : 10000000}
                    position={[0, 0, 0]}
                    fov={35}
                    />
            </group>
        </group>

      </group>

      </>
    );
};

export default LauchPad;