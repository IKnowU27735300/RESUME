import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function RealisticTrophy() {
  const trophyRef = useRef();

  // Points for a classical cup shape
  const points = useMemo(() => {
    const pts = [];
    // Base - Tier 1
    pts.push(new THREE.Vector2(0.8, -1.1));
    pts.push(new THREE.Vector2(0.85, -1.05));
    pts.push(new THREE.Vector2(0.7, -1.0));
    // Base - Tier 2
    pts.push(new THREE.Vector2(0.5, -0.9));
    pts.push(new THREE.Vector2(0.4, -0.8));
    // Stem (Ornate)
    pts.push(new THREE.Vector2(0.15, -0.7));
    pts.push(new THREE.Vector2(0.1, -0.4));
    pts.push(new THREE.Vector2(0.12, -0.1));
    pts.push(new THREE.Vector2(0.1, 0.2));
    // Cup Bowl Transition
    pts.push(new THREE.Vector2(0.3, 0.4));
    // Bowl Body
    for (let i = 0; i <= 15; i++) {
      const t = i / 15;
      const r = 0.3 + Math.pow(t, 0.7) * 0.8;
      const y = 0.4 + t * 1.0;
      pts.push(new THREE.Vector2(r, y));
    }
    // Rim
    pts.push(new THREE.Vector2(1.1, 1.4));
    pts.push(new THREE.Vector2(1.15, 1.45));
    pts.push(new THREE.Vector2(1.05, 1.5));
    return pts;
  }, []);

  // Handle curve points
  const handleCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.6, 0.5, 0),    // Connect to lower bowl
      new THREE.Vector3(1.1, 0.6, 0),    // Outward
      new THREE.Vector3(1.3, 1.2, 0),    // Upward
      new THREE.Vector3(0.9, 1.4, 0),    // Connect to rim
    ]);
  }, []);

  const goldMaterial = (
    <meshPhysicalMaterial
      color="#FFD700"
      metalness={1}
      roughness={0.08}
      reflectivity={1}
      clearcoat={1}
      clearcoatRoughness={0.05}
      emissive="#996600"
      emissiveIntensity={0.2}
    />
  );

  return (
    <group ref={trophyRef} scale={0.8}>
      {/* Main Body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 64]} />
        {goldMaterial}
      </mesh>

      {/* Classical Ornate Handles */}
      <group>
        {/* Left Handle */}
        <mesh position={[0, 0, 0]} castShadow>
          <tubeGeometry args={[handleCurve, 64, 0.05, 12, false]} />
          {goldMaterial}
        </mesh>
        {/* Right Handle (Mirrored) */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]} castShadow>
          <tubeGeometry args={[handleCurve, 64, 0.05, 12, false]} />
          {goldMaterial}
        </mesh>
      </group>

      {/* Professional Multi-tiered Base */}
      <group position={[0, -1.3, 0]}>
        {/* Marble Base (larger) */}
        <mesh receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.4, 1.8]} />
          <meshStandardMaterial color="#0b0b0d" roughness={0.1} metalness={0.5} />
        </mesh>
        {/* Gold Trim on base */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.6, 0.05, 1.6]} />
          {goldMaterial}
        </mesh>
        {/* Nameplate placeholder */}
        <mesh position={[0, 0, 0.91]}>
          <planeGeometry args={[1.2, 0.2]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      
      <pointLight position={[0, 1.5, 0]} intensity={1.5} color="#FFD700" distance={3} />
    </group>
  );
}

export default function ThreeTrophy() {
  return (
    <div className="w-full h-80 md:h-[500px] relative cursor-grab active:cursor-grabbing">
      <Canvas 
        camera={{ position: [0, 0.5, 6.5], fov: 30 }}
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={['transparent']} />
        
        {/* High-End Production Lighting */}
        <ambientLight intensity={0.4} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.2} 
          penumbra={1} 
          intensity={3} 
          castShadow 
          shadow-mapSize={1024}
        />
        <pointLight position={[-8, 4, -5]} intensity={1.5} color="#bc13fe" />
        <pointLight position={[8, -2, -5]} intensity={1} color="#00f0ff" />
        <pointLight position={[0, 5, 0]} intensity={2} color="#ffffff" />
        
        <Environment preset="city" />

        <PresentationControls
          global
          rotation={[0.1, 0.2, 0]}
          polar={[-0.2, 0.4]}
          azimuth={[-Math.PI / 1.5, Math.PI / 1.5]}
          config={{ mass: 3, tension: 500 }}
          snap={{ mass: 2, tension: 100 }}
        >
          <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <RealisticTrophy />
          </Float>
        </PresentationControls>

        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.5} 
          scale={12} 
          blur={3} 
          far={5} 
        />
      </Canvas>
    </div>
  );
}


