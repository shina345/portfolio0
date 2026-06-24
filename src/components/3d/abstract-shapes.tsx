"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function Icosahedron({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.4, 1]} />
        <MeshWobbleMaterial
          color={color}
          wireframe
          factor={0.2}
          speed={2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function TorusKnot({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
  });
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[0.3, 0.1, 64, 8]} />
        <meshStandardMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

function OctahedronShape({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
    </Float>
  );
}

export function AbstractShapes() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{ position: "absolute", inset: 0 }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00f5ff" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={0.8} />

      <Icosahedron position={[-2.5, 1.2, 0]} color="#00f5ff" speed={0.8} />
      <Icosahedron position={[2.8, -1.5, -1]} color="#a855f7" speed={0.5} />
      <TorusKnot position={[0, 0, 0]} />
      <OctahedronShape position={[-1.5, -1.8, 0.5]} />
      <OctahedronShape position={[2, 1.8, -0.5]} />
    </Canvas>
  );
}
