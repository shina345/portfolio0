"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function HologramMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;

    if (ringRef1.current) {
      ringRef1.current.rotation.x = state.clock.elapsedTime * 1.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = state.clock.elapsedTime * 0.8;
      ringRef2.current.rotation.x = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} floatIntensity={0.4}>
        <RoundedBox args={[1.4, 1.4, 1.4]} radius={0.1} smoothness={4}>
          <MeshDistortMaterial
            color="#00f5ff"
            wireframe
            distort={0.15}
            speed={2}
            transparent
            opacity={0.35}
          />
        </RoundedBox>
      </Float>

      {/* Orbit rings */}
      <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.01, 8, 64]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ringRef2} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[2.1, 0.01, 8, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
      </mesh>

      {/* Core glow sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

export function HologramCard() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#00f5ff" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#a855f7" intensity={1} />
      <HologramMesh />
    </Canvas>
  );
}
