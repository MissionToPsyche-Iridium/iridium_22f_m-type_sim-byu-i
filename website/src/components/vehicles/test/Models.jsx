import { useState } from 'react'
import { useGLTF } from '@react-three/drei'

export function Soda({ wireframe, ...props }) {
  return (
    <group >
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} /> {/* Width, Height, Depth */}
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  )
}

