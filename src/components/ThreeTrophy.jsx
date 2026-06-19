import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import LazyCanvas from './LazyCanvas';

function HighEndTrophy() {
  const trophyRef = useRef();

  // 1. Precise Lathe Profile for the Cup
  const cupProfile = useMemo(() => {
    const pts = [];
    // Ornate Stem Base
    pts.push(new THREE.Vector2(0, -0.8));
    pts.push(new THREE.Vector2(0.6, -0.8));
    pts.push(new THREE.Vector2(0.5, -0.75));
    pts.push(new THREE.Vector2(0.2, -0.65));
    // Narrow Stem
    pts.push(new THREE.Vector2(0.12, -0.4));
    pts.push(new THREE.Vector2(0.12, 0));
    // Flare into Bowl
    pts.push(new THREE.Vector2(0.3, 0.3));
    // Bowl Hull
    for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        const radius = 0.3 + Math.pow(t, 0.6) * 1.1; // Wider at top
        const y = 0.3 + t * 1.8; // Taller bowl
        pts.push(new THREE.Vector2(radius, y));
    }
    // Decorative Rim
    pts.push(new THREE.Vector2(1.45, 2.1));
    pts.push(new THREE.Vector2(1.5, 2.15));
    pts.push(new THREE.Vector2(1.4, 2.2));
    return pts;
  }, []);

  // 2. Precise Handle Curves (Mathematically attached to the hull)
  // Attached at y=0.8 (inner) and y=1.9 (outer)
  const handleCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.55, 0.6, 0),    // Lower attachment point
      new THREE.Vector3(1.6, 0.4, 0),    // Outward swing
      new THREE.Vector3(2.0, 1.8, 0),    // Top arc
      new THREE.Vector3(1.3, 2.05, 0),   // Upper attachment point
    ]);
  }, []);

  const goldMaterial = (
    <meshPhysicalMaterial
      color="#f7c000"
      metalness={1.0}
      roughness={0.12}
      reflectivity={1.0}
      clearcoat={1.0}
      clearcoatRoughness={0.05}
      iridescence={0.3}
      iridescenceIOR={1.5}
      sheen={1}
      sheenRoughness={0.5}
      sheenColor="#ffffff"
    />
  );

  return (
    <group ref={trophyRef} scale={1.1} position={[0, -0.5, 0]}>
      {/* The Cup Body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[cupProfile, 64]} />
        {goldMaterial}
      </mesh>

      {/* Synchronized Handles */}
      <group>
        <mesh castShadow>
          <tubeGeometry args={[handleCurve, 64, 0.08, 16, false]} />
          {goldMaterial}
        </mesh>
        <mesh rotation={[0, Math.PI, 0]} castShadow>
          <tubeGeometry args={[handleCurve, 64, 0.08, 16, false]} />
          {goldMaterial}
        </mesh>
      </group>

      {/* Achievement Core on Top */}
      <mesh position={[0, 2.6, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial 
          color="#00f0ff" 
          emissive="#00f0ff" 
          emissiveIntensity={4} 
          toneMapped={false}
        />
      </mesh>
      
      {/* Halo around the core */}
      <mesh position={[0, 2.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.02, 16, 100]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>

      {/* Tiered Professional Base */}
      <group position={[0, -1.2, 0]}>
        {/* Primary Marble Block */}
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.5, 0.6, 2.5]} />
          <meshStandardMaterial color="#050505" roughness={0.05} metalness={0.9} />
        </mesh>
        {/* Polished Gold Cap */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[2.2, 0.1, 2.2]} />
          {goldMaterial}
        </mesh>
        {/* Ornate Base Pedestal */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[1.8, 2.0, 0.4, 32]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
        </mesh>
        {/* Engagement Light */}
        <pointLight position={[0, 1.5, 1.5]} intensity={1.5} color="#ffd700" distance={5} />
      </group>

      {/* Global Highlight Light */}
      <pointLight position={[0, 4, 0]} intensity={2} color="#ffffff" distance={10} />
    </group>
  );
}

export default function ThreeTrophy() {
  return (
    <div className="w-full h-full relative group">
      <LazyCanvas>
        <Canvas 
          camera={{ position: [0, 1, 8.5], fov: 35 }}
          shadows
          gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping 
          }}
          onCreated={({ gl }) => {
            gl.setClearAlpha(0); // Ensure complete transparency
          }}
        >
          {/* Studio Lighting Rig */}
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[15, 20, 15]} 
            angle={0.25} 
            penumbra={1} 
            intensity={4} 
            castShadow 
            shadow-mapSize={2048}
          />
          <directionalLight position={[-10, 10, 5]} intensity={1.5} color="#bc13fe" />
          <directionalLight position={[10, -5, 5]} intensity={1.5} color="#00f0ff" />
          
          <Environment preset="studio" />

          <PresentationControls
            global
            rotation={[0.1, 0, 0]}
            polar={[-0.2, 0.3]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
            config={{ mass: 4, tension: 400 }}
            snap={{ mass: 2, tension: 150 }}
          >
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <Suspense fallback={null}>
                <HighEndTrophy />
              </Suspense>
            </Float>
          </PresentationControls>

          <ContactShadows 
            position={[0, -2.4, 0]} 
            opacity={0.6} 
            scale={15} 
            blur={2.5} 
            far={10} 
          />
        </Canvas>
      </LazyCanvas>
    </div>
  );
}


