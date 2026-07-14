import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import LazyCanvas from './LazyCanvas';

const KEY_SIZE = 0.4;
const KEY_GAP = 0.05;

// Standard 104-key US QWERTY layout representation with labels
const keyboardLayout = [
  // Row 0: Esc, F1-F12, PrintScreen, ScrollLock, Pause
  [
    { w: 1, label: 'Esc' }, { gap: 1 }, { w: 1, label: 'F1' }, { w: 1, label: 'F2' }, { w: 1, label: 'F3' }, { w: 1, label: 'F4' }, { gap: 0.5 }, { w: 1, label: 'F5' }, { w: 1, label: 'F6' }, { w: 1, label: 'F7' }, { w: 1, label: 'F8' }, { gap: 0.5 }, { w: 1, label: 'F9' }, { w: 1, label: 'F10' }, { w: 1, label: 'F11' }, { w: 1, label: 'F12' },
    { gap: 0.5 }, { w: 1, label: 'Prt' }, { w: 1, label: 'Scr' }, { w: 1, label: 'Pau' }
  ],
  // Row 1: Numbers
  [
    { w: 1, label: '`' }, { w: 1, label: '1' }, { w: 1, label: '2' }, { w: 1, label: '3' }, { w: 1, label: '4' }, { w: 1, label: '5' }, { w: 1, label: '6' }, { w: 1, label: '7' }, { w: 1, label: '8' }, { w: 1, label: '9' }, { w: 1, label: '0' }, { w: 1, label: '-' }, { w: 1, label: '=' }, { w: 2, label: 'Back' },
    { gap: 0.5 }, { w: 1, label: 'Ins' }, { w: 1, label: 'Hom' }, { w: 1, label: 'PgU' },
    { gap: 0.5 }, { w: 1, label: 'Num' }, { w: 1, label: '/' }, { w: 1, label: '*' }, { w: 1, label: '-' }
  ],
  // Row 2: QWERTY
  [
    { w: 1.5, label: 'Tab' }, { w: 1, label: 'Q' }, { w: 1, label: 'W' }, { w: 1, label: 'E' }, { w: 1, label: 'R' }, { w: 1, label: 'T' }, { w: 1, label: 'Y' }, { w: 1, label: 'U' }, { w: 1, label: 'I' }, { w: 1, label: 'O' }, { w: 1, label: 'P' }, { w: 1, label: '[' }, { w: 1, label: ']' }, { w: 1.5, label: '\\' },
    { gap: 0.5 }, { w: 1, label: 'Del' }, { w: 1, label: 'End' }, { w: 1, label: 'PgD' },
    { gap: 0.5 }, { w: 1, label: '7' }, { w: 1, label: '8' }, { w: 1, label: '9' }, { w: 1, label: '+' }
  ],
  // Row 3: ASDF
  [
    { w: 1.75, label: 'Caps' }, { w: 1, label: 'A' }, { w: 1, label: 'S' }, { w: 1, label: 'D' }, { w: 1, label: 'F' }, { w: 1, label: 'G' }, { w: 1, label: 'H' }, { w: 1, label: 'J' }, { w: 1, label: 'K' }, { w: 1, label: 'L' }, { w: 1, label: ';' }, { w: 1, label: "'" }, { w: 2.25, label: 'Enter' },
    { gap: 0.5 }, { gap: 3 },
    { gap: 0.5 }, { w: 1, label: '4' }, { w: 1, label: '5' }, { w: 1, label: '6' }, { w: 1, label: '' }
  ],
  // Row 4: ZXCV
  [
    { w: 2.25, label: 'Shift' }, { w: 1, label: 'Z' }, { w: 1, label: 'X' }, { w: 1, label: 'C' }, { w: 1, label: 'V' }, { w: 1, label: 'B' }, { w: 1, label: 'N' }, { w: 1, label: 'M' }, { w: 1, label: ',' }, { w: 1, label: '.' }, { w: 1, label: '/' }, { w: 2.75, label: 'Shift' },
    { gap: 0.5 }, { gap: 1 }, { w: 1, label: 'Up' }, { gap: 1 },
    { gap: 0.5 }, { w: 1, label: '1' }, { w: 1, label: '2' }, { w: 1, label: '3' }, { w: 2, label: 'Enter' }
  ],
  // Row 5: Bottom Row
  [
    { w: 1.25, label: 'Ctrl' }, { w: 1.25, label: 'Win' }, { w: 1.25, label: 'Alt' }, { w: 6.25, label: 'Space' }, { w: 1.25, label: 'Alt' }, { w: 1.25, label: 'Win' }, { w: 1.25, label: 'Menu' }, { w: 1.25, label: 'Ctrl' },
    { gap: 0.5 }, { w: 1, label: 'Lt' }, { w: 1, label: 'Dn' }, { w: 1, label: 'Rt' },
    { gap: 0.5 }, { w: 2, label: '0' }, { w: 1, label: '.' }, { w: 1, label: '' }
  ]
];

function KeyboardKey({ position, width = 1, activeColor = '#D4AF37', label = '' }) {
  const meshRef = useRef();
  const glowRef = useRef();
  
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  
  // Cache color objects to prevent garbage collection thrashing inside useFrame
  const activeColorObj = useMemo(() => new THREE.Color(activeColor), [activeColor]);
  const blackColorObj = useMemo(() => new THREE.Color('#1a1a1a'), []);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Reduced speed: t * 3.5 (was t * 8) for a calmer typing feel
    const wave = Math.sin(t * 3.5 + position[0] * 2 + position[2] + phase);
    const pressed = wave > 0.92;
    
    if (meshRef.current) {
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        pressed ? -(KEY_SIZE * 0.18) : 0, // subtler press depth (was 0.3)
        0.25 // softer lerp (was 0.4)
      );
    }
    
    if (glowRef.current && glowRef.current.material) {
      const targetColor = pressed ? activeColorObj : blackColorObj;
      glowRef.current.material.emissive.lerp(targetColor, 0.15);
      glowRef.current.material.emissiveIntensity = pressed ? 1.8 : 0;
    }
  });

  const exactWidth = width * KEY_SIZE + (width - 1) * KEY_GAP;

  return (
    <group position={position}>
      <group ref={meshRef}>
        {/* Key base — dark charcoal with slight warm tone */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[exactWidth, 0.22, KEY_SIZE]} />
          <meshStandardMaterial color="#222228" roughness={0.65} metalness={0.25} />
        </mesh>
        {/* Key top cap — slightly lighter, smooth surface */}
        <mesh castShadow receiveShadow position={[0, 0.16, 0]}>
          <boxGeometry args={[exactWidth - 0.06, 0.1, KEY_SIZE - 0.08]} />
          <meshStandardMaterial color="#2e2e36" roughness={0.35} metalness={0.45} />
        </mesh>
        
        {/* Key Label */}
        {label && (
          <Text
            position={[0, 0.22, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={exactWidth > 0.6 ? 0.09 : 0.13}
            color="#cccccc"
            anchorX="center"
            anchorY="middle"
            maxWidth={exactWidth * 0.8}
            textAlign="center"
            overflowWrap="break-word"
          >
            {label}
          </Text>
        )}
      </group>

      {/* Underglow on press */}
      <mesh ref={glowRef} position={[0, -0.08, 0]}>
        <boxGeometry args={[exactWidth - 0.1, 0.05, KEY_SIZE - 0.1]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#1a1a1a" />
      </mesh>
    </group>
  );
}

function FullKeyboard() {
  const keys = [];
  // Subtle warm accent colors on key press, not pure black
  const accentColors = ['#D4AF37', '#C0A030', '#B8960A', '#c8b46a'];
  
  let currentZ = 0;
  
  const TOTAL_WIDTH = 22.5 * KEY_SIZE + 22.5 * KEY_GAP;
  const TOTAL_DEPTH = 6 * KEY_SIZE + 6 * KEY_GAP;
  const START_X = -TOTAL_WIDTH / 2;
  const START_Z = -TOTAL_DEPTH / 2;

  keyboardLayout.forEach((row, rowIndex) => {
    let currentX = START_X;
    
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
            label={item.label}
          />
        );
        
        currentX += actualWidth + KEY_GAP;
      }
    });
    
    currentZ += KEY_SIZE + KEY_GAP;
  });

  return (
    <group>
      {/* Main keyboard chassis — refined dark charcoal */}
      <RoundedBox 
        position={[0, -0.28, 0]} 
        args={[TOTAL_WIDTH + 0.7, 0.45, TOTAL_DEPTH + 0.7]} 
        radius={0.28} 
        smoothness={48} 
        receiveShadow 
        castShadow
      >
        <meshStandardMaterial color="#18181f" roughness={0.75} metalness={0.55} />
      </RoundedBox>
      
      {/* Inner bezel — slight highlight separation */}
      <RoundedBox 
        position={[0, -0.04, 0]} 
        args={[TOTAL_WIDTH + 0.25, 0.06, TOTAL_DEPTH + 0.25]} 
        radius={0.12} 
        smoothness={32} 
        receiveShadow
      >
        <meshStandardMaterial color="#111118" roughness={0.85} metalness={0.3} />
      </RoundedBox>
      
      {keys}
    </group>
  );
}

export default function ThreeKeyboard() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <LazyCanvas>
        <Canvas camera={{ position: [2, 6, 10], fov: 40 }} shadows>
          {/* Softer, warmer lighting setup */}
          <ambientLight intensity={0.75} />
          <directionalLight 
            position={[10, 15, 10]} 
            intensity={1.2} 
            castShadow 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024}
          />
          {/* Warm fill light from the left to soften dark areas */}
          <pointLight position={[-8, 6, 5]} intensity={0.6} color="#fff8f0" />
          {/* Cool rim light from behind for depth */}
          <pointLight position={[5, 3, -12]} intensity={0.35} color="#c8d8ff" />
          
          <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.25}>
            <group scale={[1.5, 1.5, 1.5]} rotation={[Math.PI / 6, -Math.PI / 4.5, 0]} position={[7.5, -2.5, 0]}>
              <FullKeyboard />
            </group>
          </Float>
          
          {/* Lighter contact shadow for the new bg */}
          <ContactShadows position={[0, -2, 0]} opacity={0.45} scale={40} blur={3.5} far={10} />
        </Canvas>
      </LazyCanvas>
    </div>
  );
}
