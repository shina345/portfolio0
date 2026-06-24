"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ContactOrbs() {
  const group = useRef<THREE.Group>(null);
  const count = 12;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const angle = (i / count) * Math.PI * 2 + t * 0.3;
      const radius = 2 + Math.sin(t * 0.5 + i) * 0.3;
      child.position.x = Math.cos(angle) * radius;
      child.position.y = Math.sin(angle * 0.7 + t * 0.2) * 0.8;
      child.position.z = Math.sin(angle) * radius;
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#00f5ff" : "#a855f7"}
            emissive={i % 2 === 0 ? "#00f5ff" : "#a855f7"}
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}

export function ContactForm3D() {
  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} color="#00f5ff" intensity={3} />
      <ContactOrbs />
    </Canvas>
  );
}
