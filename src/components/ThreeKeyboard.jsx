import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Text } from '@react-three/drei';
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
  const blackColorObj = useMemo(() => new THREE.Color('#000000'), []);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const wave = Math.sin(t * 8 + position[0] * 2 + position[2] + phase);
    const pressed = wave > 0.9;
    
    if (meshRef.current) {
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        pressed ? -(KEY_SIZE * 0.3) : 0,
        0.4
      );
    }
    
    if (glowRef.current && glowRef.current.material) {
      const targetColor = pressed ? activeColorObj : blackColorObj;
      glowRef.current.material.emissive.lerp(targetColor, 0.2);
      glowRef.current.material.emissiveIntensity = pressed ? 2.5 : 0;
    }
  });

  const exactWidth = width * KEY_SIZE + (width - 1) * KEY_GAP;

  return (
    <group position={position}>
      <group ref={meshRef}>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[exactWidth, 0.2, KEY_SIZE]} />
          <meshStandardMaterial color="#151515" roughness={0.7} metalness={0.3} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[exactWidth - 0.06, 0.1, KEY_SIZE - 0.08]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
        </mesh>
        
        {/* Key Label */}
        {label && (
          <Text
            position={[0, 0.21, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={exactWidth > 0.6 ? 0.1 : 0.14}
            color="#ffffff"
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

      <mesh ref={glowRef} position={[0, -0.1, 0]}>
        <boxGeometry args={[exactWidth - 0.1, 0.05, KEY_SIZE - 0.1]} />
        <meshStandardMaterial color="#000" emissive="#000" />
      </mesh>
    </group>
  );
}

function FullKeyboard() {
  const keys = [];
  const accentColors = ['#000000', '#111111', '#222222', '#333333'];
  
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
      <mesh position={[0, -0.25, 0]} receiveShadow castShadow>
        <boxGeometry args={[TOTAL_WIDTH + 0.6, 0.4, TOTAL_DEPTH + 0.6]} />
        <meshStandardMaterial color="#0f0f13" roughness={0.8} metalness={0.7} />
      </mesh>
      
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[TOTAL_WIDTH + 0.2, 0.05, TOTAL_DEPTH + 0.2]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>
      
      {keys}
    </group>
  );
}

export default function ThreeKeyboard() {
  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[600px] relative pointer-events-none flex items-center justify-center translate-x-16 sm:translate-x-32 md:translate-x-64 translate-y-24 scale-75 md:scale-100 origin-right">
      <LazyCanvas>
        <Canvas camera={{ position: [-2, 8, 8], fov: 40 }} shadows>
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 15, 10]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ffffff" />
          
          <Float speed={2} rotationIntensity={0.15} floatIntensity={0.3}>
            <group scale={[1.4, 1.4, 1.4]} rotation={[Math.PI / 6, -Math.PI / 4.5, 0]} position={[4, 0, 0]}>
              <FullKeyboard />
            </group>
          </Float>
          
          <ContactShadows position={[0, -2, 0]} opacity={0.7} scale={40} blur={3.0} far={10} />
        </Canvas>
      </LazyCanvas>
    </div>
  );
}
