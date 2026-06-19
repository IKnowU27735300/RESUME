import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

function OrbitingKeycap({ label, radius, speed, phase }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + phase;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 2) * 0.4;
      ref.current.rotation.y = -t;
      ref.current.rotation.x = Math.sin(t) * 0.2;
    }
  });

  return (
    <group ref={ref}>
      {/* Mini Keycap Box */}
      <mesh>
        <boxGeometry args={[0.6, 0.35, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.7} />
      </mesh>
      <Text
        position={[0, 0.22, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.2}
        color="#8052ff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function MechanicalSwitch() {
  const switchRef = useRef();
  const stemRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Slow float and rotation
    if (switchRef.current) {
      switchRef.current.rotation.y = t * 0.2;
      switchRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }

    // Periodic satisfying keystroke compression
    if (stemRef.current) {
      const cycle = t % 3; // Press every 3 seconds
      let pressY = 0.45; // Default unpressed height
      if (cycle > 1 && cycle < 1.5) {
        // Depress
        const progress = (cycle - 1) / 0.5;
        pressY = THREE.MathUtils.lerp(0.45, 0.15, Math.sin(progress * Math.PI));
      }
      stemRef.current.position.y = pressY;
    }
  });

  const orbData = useMemo(() => [
    { label: 'Esc', radius: 3.2, speed: 0.5, phase: 0 },
    { label: '{}', radius: 2.8, speed: -0.6, phase: Math.PI / 2 },
    { label: 'Fn', radius: 3.5, speed: 0.4, phase: Math.PI },
    { label: '<>', radius: 3.0, speed: -0.5, phase: (3 * Math.PI) / 2 }
  ], []);

  return (
    <group
      ref={switchRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Switch Outer Housing Lower Base */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[2.2, 0.4, 2.2]} />
        <meshStandardMaterial color="#0f0f13" roughness={0.7} metalness={0.8} />
      </mesh>
      
      {/* Switch Upper Body Housing (Teal Accent Accent) */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[2.0, 0.6, 2.0]} />
        <meshStandardMaterial 
          color={hovered ? '#15846e' : '#111111'} 
          roughness={0.4} 
          metalness={0.9} 
          transparent 
          opacity={0.9} 
        />
      </mesh>

      {/* Switch Stem Guide Collar */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.2, 0.15, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>

      {/* Switch Stem (Plus Sign Shape) - Electric Violet */}
      <group ref={stemRef} position={[0, 0.45, 0]}>
        {/* Horizontal bar */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.5, 0.28]} />
          <meshStandardMaterial color="#8052ff" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Vertical bar */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.28, 0.5, 0.8]} />
          <meshStandardMaterial color="#8052ff" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Center column */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color="#7042ef" />
        </mesh>
      </group>

      {/* Orbiting keycaps */}
      {orbData.map((orb, i) => (
        <OrbitingKeycap 
          key={i} 
          label={orb.label} 
          radius={orb.radius} 
          speed={orb.speed} 
          phase={orb.phase} 
        />
      ))}
    </group>
  );
}

export default function ThreeSwitch() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center">
      <Canvas camera={{ position: [0, 2.5, 6.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} />
        <pointLight position={[-4, 2, -4]} color="#8052ff" intensity={1.5} />
        <pointLight position={[4, -2, 4]} color="#15846e" intensity={1.0} />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <MechanicalSwitch />
        </Float>
      </Canvas>
    </div>
  );
}
