import React, { useRef, useEffect, useState, createContext, useContext} from 'react';
import { Canvas, useThree, extend } from '@react-three/fiber';
import { View, 
    PerspectiveCamera, 
    OrbitControls,
    Bounds,
    Environment,

 } from '@react-three/drei';
 import * as THREE from 'three';
 import { PointLightHelper } from 'three';
 

const SceneMultiTest1 = () => {
  const cameraOneRef = useRef();
  const cameraTwoRef = useRef();

  // maintain a div reference
  const container = useRef();


  useEffect(() => {
    if (cameraOneRef.current) {
        console.log("Camera One is valid");
    }
    if (cameraOneRef.current && cameraTwoRef.current) {
        console.log("Camera Two is valid");
    }
    console.log("DOM root: ", document.getElementById('root'));
  }, [cameraOneRef.current, cameraTwoRef.current]);

  return (
    <main ref={container} className="canvas-border">
      <Canvas eventSource={document.getElementById("root")} className="canvas"
        gl={{ toneMapping: THREE.NoToneMapping }}
      >
        <View.Port 
        
        />
      </Canvas>
      <View
      className="views-left"

        index={1}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 400,
          height: 400,
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[2, 2, 5]}
          fov={50}
          ref={cameraOneRef}
        />
        {console.log("Camera One Ref: ", cameraOneRef.current)}
        <OrbitControls camera={cameraOneRef.current} />
        <SceneContent />
      </View>
      <View
      className='views-right'
        index={2}
        style={{
          position: "absolute",
          top: 0,
          left: 400,
          width: 400,
          height: 400,
          // background: "black"
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[-2, 2, 5]}
          fov={50}
          ref={cameraTwoRef}
        />
        {console.log("Camera Two Ref: ", cameraTwoRef.current)}
        <OrbitControls camera={cameraTwoRef.current} />
        <ambientLight intensity={0.1} />
        <SceneContent />
      </View>
    </main>
  );
};

export default SceneMultiTest1;

    //style={{ width: "100vw", height: "100vh", background: "blue" }}>
const SceneContent = () => {
    console.log("SceneContent rendered");
    console.log("Rendering Context: ", !!window.WebGLRenderingContext);
  const pointLightRef = useRef();
  const helperRef = useRef();

  return (
    <>
      {/* Add ambient and point lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[-3, 3, 2]} intensity={1} color="white" ref={pointLightRef}/>
      {/* <primative object={new PointLightHelper(pointLightRef.current)} /> */}
      {/* Add a cube */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  );
};


