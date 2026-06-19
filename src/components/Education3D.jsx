import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function DegreeHat({ position = [0, 0, 0], scale = 1 }) {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.5;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Top square part */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Round cap part */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.8, 32]} />
        <meshStandardMaterial color="#111" roughness={0.4} metalness={0.7} />
      </mesh>
      
      {/* Tassel */}
      <group position={[0.9, 0.4, 0.9]}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial color="#8052ff" />
        </mesh>
        <mesh position={[0, -0.8, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#8052ff" emissive="#8052ff" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function Ruler({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} castShadow>
      <boxGeometry args={[0.3, 3, 0.05]} />
      <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} emissive="#8052ff" emissiveIntensity={0.1} />
    </mesh>
  );
}

function Compass({ position = [0, 0, 0] }) {
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.5;
    ref.current.rotation.y += 0.01;
  });

  return (
    <group ref={ref} position={position}>
      {/* V shape compass */}
      <mesh position={[-0.2, 0, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.05, 1.5, 4, 8]} />
        <meshStandardMaterial color="#555" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0.2, 0, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.05, 1.5, 4, 8]} />
        <meshStandardMaterial color="#555" metalness={1} roughness={0.1} />
      </mesh>
      {/* Center hinge */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#777" metalness={1} />
      </mesh>
    </group>
  );
}

function Protractor({ position = [0, 0, 0] }) {
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.4;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.3;
  });

  return (
    <group ref={ref} position={position}>
      {/* Semi-circle ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.8, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#8052ff" emissive="#8052ff" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>
      {/* Straight edge */}
      <mesh position={[0, -0.02, 0]} castShadow>
        <boxGeometry args={[1.6, 0.05, 0.1]} />
        <meshStandardMaterial color="#333" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

export function EducationLeft3D() {
  return (
    <div className="absolute left-[-10%] top-[15%] w-[400px] h-[700px] pointer-events-none hidden xl:block overflow-visible">
      <Canvas shadows alpha gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 10, 5]} intensity={3} castShadow />
        <pointLight position={[-5, -5, -5]} color="#8052ff" intensity={1} />
        <Environment preset="night" />
        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
          <DegreeHat position={[0, 2.5, 0]} scale={1.5} />
          <Protractor position={[-1.5, -1.5, 0]} />
        </Float>
        <ContactShadows position={[0, -5, 0]} opacity={0.3} scale={15} blur={3} />
      </Canvas>
    </div>
  );
}

export function EducationRight3D() {
  return (
    <div className="absolute right-[-10%] top-[15%] w-[400px] h-[700px] pointer-events-none hidden xl:block overflow-visible">
      <Canvas shadows alpha gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        <ambientLight intensity={0.5} />
        <spotLight position={[-5, 10, 5]} intensity={3} castShadow />
        <pointLight position={[5, -5, -5]} color="#8052ff" intensity={1} />
        <Environment preset="night" />
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <Compass position={[0, 1.5, 0]} />
          <Ruler position={[1.5, -2, 0]} rotation={[0, 0, -Math.PI / 4]} />
        </Float>
        <ContactShadows position={[0, -5, 0]} opacity={0.3} scale={15} blur={3} />
      </Canvas>
    </div>
  );
}
