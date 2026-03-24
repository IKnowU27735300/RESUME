import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Float, PerspectiveCamera, Environment, ContactShadows, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function TelephoneModel({ position = [0, 0, 0] }) {
  const group = useRef();
  const dialRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      group.current.rotation.x = Math.cos(t * 0.2) * 0.05;
    }
    if (dialRef.current) {
      dialRef.current.material.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <group ref={group} position={position} scale={0.85}>
      {/* Base of old telephone - more ergonomic shape */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.6, 0.8, 40]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
      </mesh>
      
      {/* Middle body */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.3, 0.7, 1.3]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={1} />
      </mesh>
      
      {/* Handset cradle */}
      <mesh position={[0, 0.65, 0]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[2.0, 0.2, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={1} />
      </mesh>
      
      {/* Handset */}
      <group position={[0, 0.9, -0.1]}>
        {/* Handle */}
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.18, 2.2, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#111" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Speaker & Mic caps */}
        <mesh position={[-1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <sphereGeometry args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#080808" roughness={0.1} metalness={1} />
        </mesh>
        <mesh position={[1.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <sphereGeometry args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#080808" roughness={0.1} metalness={1} />
        </mesh>
      </group>

      {/* Futuristic glowing dial */}
      <mesh ref={dialRef} position={[0, 0.15, 0.8]} rotation={[-Math.PI / 3.5, 0, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
        <meshStandardMaterial color="#000" emissive="#D4AF37" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Center point of dial */}
      <mesh position={[0, 0.22, 0.85]} rotation={[-Math.PI / 3.5, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      <pointLight position={[0, 3, 2]} intensity={1.5} color="#D4AF37" distance={10} />
    </group>
  );
}

function SmartphoneModel({ position = [0, 0, 0] }) {
  const group = useRef();
  const screenRef = useRef();
  const texture = useTexture('/AVATAR.png');
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.cos(t * 0.4) * 0.15;
      group.current.rotation.z = Math.sin(t * 0.2) * 0.05;
    }
  });

  return (
    <group ref={group} position={position} scale={1.25}>
      {/* Modern Phone Chassis */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 3.2, 0.12]} />
        <meshStandardMaterial color="#050505" roughness={0.01} metalness={1} />
      </mesh>
      
      {/* Bezel / Screen Area */}
      <mesh ref={screenRef} position={[0, 0, 0.06]}>
        <planeGeometry args={[1.42, 3.12]} />
        <meshBasicMaterial 
          map={texture}
          transparent={true}
        />
      </mesh>

      {/* Screen background glow */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.42, 3.12]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          emissive="#D4AF37" 
          emissiveIntensity={0.2}
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* Edge highlight / reflection */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[1.48, 3.18, 0.01]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0} transparent opacity={0.5} />
      </mesh>

      {/* Dynamic light from screen */}
      <pointLight position={[0, 0, 0.6]} intensity={1} color="#C5A021" distance={5} />
      
      {/* Front sensors */}
      <mesh position={[0, 1.45, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.01, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
}

export function TelephoneView() {
  return (
    <div className="w-full h-[400px] cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={35} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, 5, -5]} intensity={1} color="#D4AF37" />
        <Environment preset="night" />
        <PresentationControls global rotation={[0.1, 0, 0]} polar={[-0.3, 0.3]} azimuth={[-Math.PI / 6, Math.PI / 6]} config={{ mass: 4, tension: 400 }} snap={{ mass: 2, tension: 150 }}>
          <Float speed={3} rotationIntensity={0.4} floatIntensity={0.6}>
            <Suspense fallback={null}>
              <TelephoneModel position={[0, 0, 0]} />
            </Suspense>
          </Float>
        </PresentationControls>
        <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={3} far={5} />
      </Canvas>
    </div>
  );
}

export function SmartphoneView() {
  return (
    <div className="w-full h-[400px] cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={35} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[10, -5, -5]} intensity={1} color="#C5A021" />
        <Environment preset="night" />
        <PresentationControls global rotation={[0.1, 0, 0]} polar={[-0.3, 0.3]} azimuth={[-Math.PI / 6, Math.PI / 6]} config={{ mass: 4, tension: 400 }} snap={{ mass: 2, tension: 150 }}>
          <Float speed={3} rotationIntensity={0.4} floatIntensity={0.6}>
            <Suspense fallback={null}>
              <SmartphoneModel position={[0, 0, 0]} />
            </Suspense>
          </Float>
        </PresentationControls>
        <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={3} far={5} />
      </Canvas>
    </div>
  );
}

export default function Contact3D() {
  return (
    <div className="w-full h-[450px] cursor-grab active:cursor-grabbing">
      {/* Default combined view if needed, but we'll use TelephoneView and SmartphoneView in Contact.jsx */}
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, 5, -5]} intensity={1} color="#D4AF37" />
        <pointLight position={[10, -5, -5]} intensity={1} color="#C5A021" />
        <Environment preset="night" />
        <PresentationControls global rotation={[0.1, 0, 0]} polar={[-0.3, 0.3]} azimuth={[-Math.PI / 6, Math.PI / 6]} config={{ mass: 4, tension: 400 }} snap={{ mass: 2, tension: 150 }}>
          <Float speed={3} rotationIntensity={0.4} floatIntensity={0.6}>
            <Suspense fallback={null}>
              <group position={[0, 0, 0]}>
                <TelephoneModel position={[-2.8, 0, 0]} />
                <SmartphoneModel position={[2.8, 0, 0]} />
              </group>
            </Suspense>
          </Float>
        </PresentationControls>
        <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={15} blur={3} far={5} />
      </Canvas>
    </div>
  );
}
