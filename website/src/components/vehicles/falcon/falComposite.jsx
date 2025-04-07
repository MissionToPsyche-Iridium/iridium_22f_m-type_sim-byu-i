
import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import FalStage1 from '../falcon/falStage1';
import FalStage2_NC from '../falcon/falStage2_NC';
import FalFairing from '../falcon/falFairing';
import FalBooster from '../falcon/falBooster';


const FalComposite = ({position}) => {
    const oversized = false;
    const sf = (oversized)? 1 : 0.00001;
    const scale = new THREE.Vector3(sf,sf,sf);
    // const scale_neg = new THREE.Vector3(sf,sf,sf);

    const fairingOffset = 5100;
    const stage2Offset = 4250;
    const boosterOffset = 460;
    

    return (
      <>
      <group position={position} rotation={[0, Math.PI/2, 0]}>
        <FalStage1 position={[0,0,0]} scaleFactor={sf}/>
        <FalStage2_NC position={[0,stage2Offset * sf,0]} scaleFactor={sf}/>
        <FalFairing position={[0,fairingOffset * sf,0]} scaleFactor={sf}/>
        <FalFairing position={[0,fairingOffset * sf,0]} scaleFactor={-sf}/>
        <FalBooster position={[0,0,boosterOffset * sf]} scaleFactor={sf}/>
        <FalBooster position={[0,0,-boosterOffset * sf]} scaleFactor={sf}/>

      </group>
      </>
    );
};

export default FalComposite;