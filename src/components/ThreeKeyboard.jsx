import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const KEY_SIZE = 0.4;
const KEY_GAP = 0.05;

// Standard 104-key US QWERTY layout representation
const keyboardLayout = [
  // Row 0: Esc, F1-F12, PrintScreen, ScrollLock, Pause
  [
    { w: 1 }, { gap: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { gap: 0.5 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { gap: 0.5 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 },
    { gap: 0.5 }, { w: 1 }, { w: 1 }, { w: 1 }
  ],
  // Row 1: Numbers
  [
    { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 2 },
    { gap: 0.5 }, { w: 1 }, { w: 1 }, { w: 1 },
    { gap: 0.5 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }
  ],
  // Row 2: QWERTY
  [
    { w: 1.5 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1.5 },
    { gap: 0.5 }, { w: 1 }, { w: 1 }, { w: 1 },
    { gap: 0.5 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }
  ],
  // Row 3: ASDF
  [
    { w: 1.75 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 2.25 },
    { gap: 0.5 }, { gap: 3 },
    { gap: 0.5 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }
  ],
  // Row 4: ZXCV
  [
    { w: 2.25 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 2.75 },
    { gap: 0.5 }, { gap: 1 }, { w: 1 }, { gap: 1 },
    { gap: 0.5 }, { w: 1 }, { w: 1 }, { w: 1 }, { w: 1 }
  ],
  // Row 5: Bottom Row
  [
    { w: 1.25 }, { w: 1.25 }, { w: 1.25 }, { w: 6.25 }, { w: 1.25 }, { w: 1.25 }, { w: 1.25 }, { w: 1.25 },
    { gap: 0.5 }, { w: 1 }, { w: 1 }, { w: 1 },
    { gap: 0.5 }, { w: 2 }, { w: 1 }, { w: 1 }
  ]
];

function KeyboardKey({ position, width = 1, activeColor = '#00f0ff', delay = 0 }) {
  const meshRef = useRef();
  const glowRef = useRef();
  
  // Random phase for a typing wave effect
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Simulate continuous typing with a wave + random noise
    const wave = Math.sin(t * 8 + position[0] * 2 + position[2] + phase);
    const pressed = wave > 0.9;
    
    // Animate Key Depression (Mechanical travel)
    if (meshRef.current) {
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        pressed ? -(KEY_SIZE * 0.3) : 0,
        0.4
      );
    }
    
    // Animate Mechanical Switch Underglow
    if (glowRef.current && glowRef.current.material) {
      const targetColor = pressed ? new THREE.Color(activeColor) : new THREE.Color('#000');
      glowRef.current.material.emissive.lerp(targetColor, 0.2);
      glowRef.current.material.emissiveIntensity = pressed ? 2.5 : 0;
    }
  });

  const exactWidth = width * KEY_SIZE + (width - 1) * KEY_GAP;

  return (
    <group position={position}>
      {/* Moving Mechanical Keycap */}
      <group ref={meshRef}>
        {/* Keycap Bottom Base (wider) */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[exactWidth, 0.2, KEY_SIZE]} />
          <meshStandardMaterial color="#151515" roughness={0.7} metalness={0.3} />
        </mesh>
        {/* Keycap Top Bevel (slightly smaller to mimic SA/OEM profile) */}
        <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[exactWidth - 0.06, 0.1, KEY_SIZE - 0.08]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
        </mesh>
      </group>

      {/* Static Switch Underglow beneath the cap */}
      <mesh ref={glowRef} position={[0, -0.1, 0]}>
        <boxGeometry args={[exactWidth - 0.1, 0.05, KEY_SIZE - 0.1]} />
        <meshStandardMaterial color="#000" emissive="#000" />
      </mesh>
    </group>
  );
}

function FullKeyboard() {
  const keys = [];
  const accentColors = ['#00f0ff', '#bc13fe', '#00ff9d', '#ff0055'];
  
  let currentZ = 0;
  
  const TOTAL_WIDTH = 22.5 * KEY_SIZE + 22.5 * KEY_GAP;
  const TOTAL_DEPTH = 6 * KEY_SIZE + 6 * KEY_GAP;
  const START_X = -TOTAL_WIDTH / 2;
  const START_Z = -TOTAL_DEPTH / 2;

  keyboardLayout.forEach((row, rowIndex) => {
    let currentX = START_X;
    
    // Add extra gap after the function row
    if (rowIndex === 1) currentZ += KEY_SIZE * 0.5;

    row.forEach((item, itemIndex) => {
      if (item.gap) {
        currentX += (item.gap * KEY_SIZE) + (item.gap * KEY_GAP);
      } else {
        const itemWidth = item.w;
        const actualWidth = itemWidth * KEY_SIZE + (itemWidth - 1) * KEY_GAP;
        const centerX = currentX + actualWidth / 2;
        
        const randomAccent = accentColors[Math.floor(Math.random() * accentColors.length)];
        
        keys.push(
          <KeyboardKey 
            key={`${rowIndex}-${itemIndex}`} 
            position={[centerX, 0, START_Z + currentZ]} 
            width={itemWidth} 
            activeColor={randomAccent}
          />
        );
        
        currentX += actualWidth + KEY_GAP;
      }
    });
    
    currentZ += KEY_SIZE + KEY_GAP;
  });

  return (
    <group>
      {/* Chunky Mechanical Keyboard Case/Frame */}
      <mesh position={[0, -0.25, 0]} receiveShadow castShadow>
        <boxGeometry args={[TOTAL_WIDTH + 0.6, 0.4, TOTAL_DEPTH + 0.6]} />
        <meshStandardMaterial color="#0f0f13" roughness={0.8} metalness={0.7} border={0.1} />
      </mesh>
      
      {/* Sunken Deck where switches sit */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[TOTAL_WIDTH + 0.2, 0.05, TOTAL_DEPTH + 0.2]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>
      
      {/* The Keys */}
      {keys}
    </group>
  );
}

export default function ThreeKeyboard() {
  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[600px] relative pointer-events-none flex items-center justify-center translate-x-32 md:translate-x-64 translate-y-24">
      {/* Camera positioned to shoot downwards from an angle, showcasing the diagonal tilt naturally. */}
      <Canvas camera={{ position: [-2, 8, 8], fov: 40 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 15, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#00f0ff" />
        
        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.3}>
          {/* Extremely satisfying diagonal rotation spanning across the screen. Scale reduced perfectly for the fixed viewport bounds. Position shifted for left-focus. */}
          <group scale={[1.4, 1.4, 1.4]} rotation={[Math.PI / 6, -Math.PI / 4.5, 0]} position={[4, 0, 0]}>
            <FullKeyboard />
          </group>
        </Float>
        
        <ContactShadows position={[0, -2, 0]} opacity={0.7} scale={40} blur={3.0} far={10} />
      </Canvas>
    </div>
  );
}
