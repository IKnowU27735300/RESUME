import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows, Text, useFBX, useAnimations, Environment } from '@react-three/drei';
import * as THREE from 'three';

const KEY_SIZE = 0.38;
const KEY_GAP = 0.04;

const NEBULA_SYMBOLS = ['{', '}', '<', '>', '/', '[', ']', '=', 'Esc', 'Fn', 'A', 'Ctrl', 'Shift', '&&', '||', '#', '$'];

// Keep old layouts as fallback if needed
const mainBlockLayout = [
  [
    { w: 1, label: 'Esc', isSpecial: true }, { gap: 1 },
    { w: 1, label: 'F1' }, { w: 1, label: 'F2' }, { w: 1, label: 'F3' }, { w: 1, label: 'F4' }, { gap: 0.5 },
    { w: 1, label: 'F5' }, { w: 1, label: 'F6' }, { w: 1, label: 'F7' }, { w: 1, label: 'F8' }, { gap: 0.5 },
    { w: 1, label: 'F9' }, { w: 1, label: 'F10' }, { w: 1, label: 'F11' }, { w: 1, label: 'F12' }
  ],
  [
    { w: 1, label: '`' }, { w: 1, label: '1' }, { w: 1, label: '2' }, { w: 1, label: '3' }, { w: 1, label: '4' }, { w: 1, label: '5' },
    { w: 1, label: '6' }, { w: 1, label: '7' }, { w: 1, label: '8' }, { w: 1, label: '9' }, { w: 1, label: '0' }, { w: 1, label: '-' },
    { w: 1, label: '=' }, { w: 2, label: 'Backspace' }
  ],
  [
    { w: 1.5, label: 'Tab' }, { w: 1, label: 'Q' }, { w: 1, label: 'W', isSpecial: true }, { w: 1, label: 'E' }, { w: 1, label: 'R' }, { w: 1, label: 'T' },
    { w: 1, label: 'Y' }, { w: 1, label: 'U' }, { w: 1, label: 'I' }, { w: 1, label: 'O' }, { w: 1, label: 'P' }, { w: 1, label: '[' },
    { w: 1, label: ']' }, { w: 1.5, label: '\\' }
  ],
  [
    { w: 1.75, label: 'Caps' }, { w: 1, label: 'A', isSpecial: true }, { w: 1, label: 'S', isSpecial: true }, { w: 1, label: 'D', isSpecial: true }, { w: 1, label: 'F' }, { w: 1, label: 'G' },
    { w: 1, label: 'H' }, { w: 1, label: 'J' }, { w: 1, label: 'K' }, { w: 1, label: 'L' }, { w: 1, label: ';' }, { w: 1, label: "'" },
    { w: 2.25, label: 'Enter', isSpecial: true }
  ],
  [
    { w: 2.25, label: 'Shift' }, { w: 1, label: 'Z' }, { w: 1, label: 'X' }, { w: 1, label: 'C' }, { w: 1, label: 'V' }, { w: 1, label: 'B' },
    { w: 1, label: 'N' }, { w: 1, label: 'M' }, { w: 1, label: ',' }, { w: 1, label: '.' }, { w: 1, label: '/' }, { w: 2.75, label: 'Shift' }
  ],
  [
    { w: 1.25, label: 'Ctrl' }, { w: 1.25, label: 'Win' }, { w: 1.25, label: 'Alt' }, { w: 6.25, label: 'Space', isSpecial: true },
    { w: 1.25, label: 'Alt' }, { w: 1.25, label: 'Win' }, { w: 1.25, label: 'Menu' }, { w: 1.25, label: 'Ctrl' }
  ]
];

const navBlockLayout = [
  [
    { w: 1, label: 'Prt' }, { w: 1, label: 'Scr' }, { w: 1, label: 'Pau' }
  ],
  [
    { w: 1, label: 'Ins' }, { w: 1, label: 'Hom' }, { w: 1, label: 'PgU' }
  ],
  [
    { w: 1, label: 'Del' }, { w: 1, label: 'End' }, { w: 1, label: 'PgD' }
  ],
  [],
  [
    { gap: 1 }, { w: 1, label: 'Up' }
  ],
  [
    { w: 1, label: 'Lt' }, { w: 1, label: 'Dn' }, { w: 1, label: 'Rt' }
  ]
];

const numpadBlockLayout = [
  [],
  [
    { w: 1, label: 'Num' }, { w: 1, label: '/' }, { w: 1, label: '*' }, { w: 1, label: '-' }
  ],
  [
    { w: 1, label: '7' }, { w: 1, label: '8' }, { w: 1, label: '9' }, { w: 1, label: '+', h: 2 }
  ],
  [
    { w: 1, label: '4' }, { w: 1, label: '5' }, { w: 1, label: '6' }
  ],
  [
    { w: 1, label: '1' }, { w: 1, label: '2' }, { w: 1, label: '3' }, { w: 1, label: 'Ent', h: 2 }
  ],
  [
    { w: 2, label: '0' }, { w: 1, label: '.' }
  ]
];

function KeyboardKey({ position, width = 1, depthMultiplier = 1, label = '', isSpecial = false }) {
  const meshRef = useRef();
  const glowRef = useRef();
  
  const startOffset = useMemo(() => [
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 30 - 15,
    (Math.random() - 0.5) * 40 - 20
  ], []);

  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  
  const exactWidth = width * KEY_SIZE + (width - 1) * KEY_GAP;
  const exactDepth = depthMultiplier * KEY_SIZE + (depthMultiplier - 1) * KEY_GAP;

  const keycapColor = useMemo(() => {
    if (label === 'Esc') return '#15846e';
    if (label === 'Enter' || label === 'Ent') return '#8052ff';
    if (['W', 'A', 'S', 'D'].includes(label)) return '#ffb829';
    if (label === 'Space') return '#111114';
    return '#1c1c1f';
  }, [label]);

  const keycapBaseColor = useMemo(() => {
    if (label === 'Esc') return '#0a4237';
    if (label === 'Enter' || label === 'Ent') return '#6038df';
    if (['W', 'A', 'S', 'D'].includes(label)) return '#d89415';
    return '#101012';
  }, [label]);

  const textColor = useMemo(() => {
    if (['W', 'A', 'S', 'D'].includes(label)) return '#000000';
    return '#ffffff';
  }, [label]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const assemblyDuration = 2.4;
    const progress = Math.min(1, elapsed / assemblyDuration);
    const tEase = 1 - Math.pow(1 - progress, 3);

    const baseHeight = isSpecial ? 0.6 : 0;
    const targetY = baseHeight + (isSpecial ? Math.sin(elapsed * 2.5 + phase) * 0.08 : 0);
    
    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(startOffset[0], position[0], tEase);
      meshRef.current.position.y = THREE.MathUtils.lerp(startOffset[1], targetY, tEase);
      meshRef.current.position.z = THREE.MathUtils.lerp(startOffset[2], position[2], tEase);
      
      if (progress < 1) {
        meshRef.current.rotation.x = (1 - tEase) * Math.PI * 2;
        meshRef.current.rotation.y = (1 - tEase) * Math.PI * 4;
      } else {
        meshRef.current.rotation.x = 0;
        meshRef.current.rotation.y = 0;
      }
    }

    if (glowRef.current && glowRef.current.material) {
      const activeColor = new THREE.Color('#8052ff');
      const offColor = new THREE.Color('#050505');
      if (progress >= 1) {
        const pulse = 0.55 + Math.sin(elapsed * 4 + phase) * 0.25;
        glowRef.current.material.emissive.lerp(activeColor, 0.1);
        glowRef.current.material.emissiveIntensity = pulse * 2.5;
      } else {
        glowRef.current.material.emissive.lerp(offColor, 0.1);
        glowRef.current.material.emissiveIntensity = 0;
      }
    }
  });

  return (
    <group ref={meshRef}>
      {isSpecial && (
        <group position={[0, -0.3, 0]}>
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[0.15, 0.35, 0.06]} />
            <meshStandardMaterial color="#8052ff" roughness={0.2} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[0.06, 0.35, 0.15]} />
            <meshStandardMaterial color="#8052ff" roughness={0.2} metalness={0.7} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[0.3, 0.16, 0.3]} />
            <meshStandardMaterial color="#15846e" roughness={0.3} metalness={0.9} />
          </mesh>
        </group>
      )}

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[exactWidth, 0.16, exactDepth]} />
        <meshStandardMaterial color={keycapBaseColor} roughness={0.4} metalness={0.3} />
      </mesh>
      
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[exactWidth - 0.05, 0.08, exactDepth - 0.06]} />
        <meshStandardMaterial color={keycapColor} roughness={0.3} metalness={0.4} />
      </mesh>
      
      {label && (
        <Text
          position={[0, 0.13, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={exactWidth > 0.6 ? 0.08 : 0.11}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          maxWidth={exactWidth * 0.8}
        >
          {label}
        </Text>
      )}

      <mesh ref={glowRef} position={[0, -0.08, 0]}>
        <boxGeometry args={[exactWidth - 0.08, 0.02, exactDepth - 0.08]} />
        <meshStandardMaterial color="#000" emissive="#000" />
      </mesh>
    </group>
  );
}

function FullKeyboard() {
  const START_Z = -((6 * KEY_SIZE + 5 * KEY_GAP) / 2);

  const renderBlock = (layout, startX) => {
    const list = [];
    let currentZ = START_Z;

    layout.forEach((row, rowIndex) => {
      let currentX = startX;

      row.forEach((item, itemIndex) => {
        if (item.gap) {
          currentX += (item.gap * KEY_SIZE) + (item.gap * KEY_GAP);
        } else {
          const itemWidth = item.w || 1;
          const depthMultiplier = item.h || 1;
          const actualWidth = itemWidth * KEY_SIZE + (itemWidth - 1) * KEY_GAP;
          const centerX = currentX + actualWidth / 2;
          
          let centerZ = currentZ + KEY_SIZE / 2;
          if (depthMultiplier > 1) {
            centerZ += (depthMultiplier - 1) * (KEY_SIZE + KEY_GAP) / 2;
          }

          list.push(
            <KeyboardKey 
              key={`${startX}-${rowIndex}-${itemIndex}`}
              position={[centerX, 0, centerZ]} 
              width={itemWidth} 
              depthMultiplier={depthMultiplier}
              label={item.label}
              isSpecial={item.isSpecial || false}
            />
          );
          
          currentX += actualWidth + KEY_GAP;
        }
      });
      
      currentZ += KEY_SIZE + KEY_GAP;
    });

    return list;
  };

  const keys = useMemo(() => {
    return [
      ...renderBlock(mainBlockLayout, -5.06),
      ...renderBlock(navBlockLayout, 1.70),
      ...renderBlock(numpadBlockLayout, 3.42)
    ];
  }, []);

  const caseRef = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const baseProgress = Math.min(1, elapsed / 2.4);
    const tEase = 1 - Math.pow(1 - baseProgress, 3);
    if (caseRef.current) {
      caseRef.current.position.y = THREE.MathUtils.lerp(-10, 0, tEase);
    }
  });

  const baseWidth = 10.12 + 0.5;
  const baseDepth = 2.48 + 0.4;

  return (
    <group>
      <group ref={caseRef}>
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[baseWidth, 0.3, baseDepth]} />
          <meshStandardMaterial color="#08080a" roughness={0.8} metalness={0.7} />
        </mesh>
        
        <mesh position={[0, -0.10, 0]}>
          <boxGeometry args={[baseWidth + 0.02, 0.02, baseDepth + 0.02]} />
          <meshStandardMaterial color="#8052ff" roughness={0.15} metalness={0.9} />
        </mesh>

        <mesh position={[0, -0.09, 0]}>
          <boxGeometry args={[baseWidth - 0.1, 0.04, baseDepth - 0.1]} />
          <meshStandardMaterial color="#040405" roughness={0.9} />
        </mesh>

        <mesh position={[0, -0.402, 0]}>
          <boxGeometry args={[4.5, 0.01, 1.2]} />
          <meshStandardMaterial color="#b89742" roughness={0.15} metalness={0.9} />
        </mesh>
        
        <Text
          position={[0, -0.408, 0]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          fontSize={0.16}
          color="#151518"
          anchorX="center"
          anchorY="middle"
        >
          CUSTOM KB-104 // CORE ENGINE
        </Text>

        {/* Rubber Feet */}
        <mesh position={[-baseWidth/2 + 0.4, -0.402, -baseDepth/2 + 0.3]}>
          <boxGeometry args={[0.5, 0.02, 0.2]} />
          <meshStandardMaterial color="#121212" roughness={0.9} />
        </mesh>
        <mesh position={[baseWidth/2 - 0.4, -0.402, -baseDepth/2 + 0.3]}>
          <boxGeometry args={[0.5, 0.02, 0.2]} />
          <meshStandardMaterial color="#121212" roughness={0.9} />
        </mesh>
        <mesh position={[-baseWidth/2 + 0.4, -0.402, baseDepth/2 - 0.3]}>
          <boxGeometry args={[0.5, 0.02, 0.2]} />
          <meshStandardMaterial color="#121212" roughness={0.9} />
        </mesh>
        <mesh position={[baseWidth/2 - 0.4, -0.402, baseDepth/2 - 0.3]}>
          <boxGeometry args={[0.5, 0.02, 0.2]} />
          <meshStandardMaterial color="#121212" roughness={0.9} />
        </mesh>

        <mesh position={[-baseWidth/2 + 0.05, -0.32, 0]}>
          <boxGeometry args={[0.02, 0.06, baseDepth - 0.6]} />
          <meshStandardMaterial color="#8052ff" emissive="#8052ff" emissiveIntensity={3.5} />
        </mesh>
        <mesh position={[baseWidth/2 - 0.05, -0.32, 0]}>
          <boxGeometry args={[0.02, 0.06, baseDepth - 0.6]} />
          <meshStandardMaterial color="#8052ff" emissive="#8052ff" emissiveIntensity={3.5} />
        </mesh>
      </group>
      
      {keys}
    </group>
  );
}

function KeyboardNebula() {
  const points = useMemo(() => {
    const list = [];
    for (let i = 0; i < 150; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.pow(Math.random(), 2.0) * 12.0; 
      list.push({
        char: NEBULA_SYMBOLS[Math.floor(Math.random() * NEBULA_SYMBOLS.length)],
        pos: [
          Math.cos(theta) * radius,
          (Math.random() - 0.5) * 8.0,
          Math.sin(theta) * radius
        ],
        speed: 0.15 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        size: 0.15 + Math.random() * 0.25,
        color: i % 4 === 0 ? '#8052ff' : (i % 5 === 0 ? '#ffb829' : '#ffffff')
      });
    }
    return list;
  }, []);

  return (
    <group>
      {points.map((pt, idx) => (
        <FloatingSymbol key={idx} data={pt} />
      ))}
    </group>
  );
}

function FloatingSymbol({ data }) {
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * data.speed + data.phase;
    if (ref.current) {
      ref.current.position.y = data.pos[1] + Math.sin(t) * 0.4;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group ref={ref} position={data.pos}>
      <Text
        fontSize={data.size}
        color={data.color}
        anchorX="center"
        anchorY="middle"
      >
        {data.char}
      </Text>
    </group>
  );
}

function CanvasController({ mouseRef }) {
  useFrame((state) => {
    const isStacked = typeof window !== 'undefined' && window.innerWidth < 1024;
    const baseTargetX = isStacked ? 0 : -2;
    const lookAtX = isStacked ? 0 : 0.8;
    
    const targetX = baseTargetX + mouseRef.current.x * 2.5;
    const targetY = 7.5 + mouseRef.current.y * 1.5;
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(lookAtX, 0, 0);
  });
  return null;
}

function RotatingKeyboardGroup({ children }) {
  const groupRef = useRef();
  const { viewport } = useThree();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dynamicScale = useMemo(() => {
    const calculated = (viewport.width * 0.80) / 10.62;
    return Math.min(0.58, Math.max(0.24, calculated));
  }, [viewport.width]);

  const dynamicPositionX = useMemo(() => {
    if (windowWidth < 1024) {
      return 0;
    }
    if (viewport.width < 14) {
      return 0.5 + (14 - viewport.width) * 0.18;
    }
    return 0.2;
  }, [viewport.width, windowWidth]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = -Math.PI / 4.8 + elapsed * 0.18;
      groupRef.current.rotation.x = Math.PI / 7.2 + Math.sin(elapsed * 0.5) * 0.06;
      groupRef.current.rotation.z = Math.sin(elapsed * 0.4) * 0.04;
      groupRef.current.position.y = Math.sin(elapsed * 0.6) * 0.18;
      groupRef.current.position.x = dynamicPositionX;
    }
  });

  return (
    <group ref={groupRef} scale={[dynamicScale, dynamicScale, dynamicScale]}>
      {children}
    </group>
  );
}

// ----------------------------------------------------
// New FBX Typing Component
// ----------------------------------------------------
function TypingFBXModel() {
  const fbx = useFBX('/3d_model_typing.fbx');
  const { actions, names } = useAnimations(fbx.animations, fbx);
  
  useEffect(() => {
    if (fbx) {
      console.log("FBX Model Loaded:", fbx);
      const box = new THREE.Box3().setFromObject(fbx);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);
      console.log("FBX Model Bounding Box Size:", size);
      console.log("FBX Model Bounding Box Center:", center);
      console.log("Animation Names:", names);
      
      // Play the first animation action if available
      if (names.length > 0) {
        const action = actions[names[0]];
        if (action) action.reset().fadeIn(0.5).play();
      }

      fbx.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          console.log("Child mesh:", child.name);
          
          // Let's set materials based on names
          if (child.name.toLowerCase().includes('body') || child.name.toLowerCase().includes('skin') || child.name.toLowerCase().includes('hand') || child.name.toLowerCase().includes('arm')) {
            child.material = new THREE.MeshPhysicalMaterial({
              color: '#1c1c24',
              roughness: 0.35,
              metalness: 0.1,
              clearcoat: 0.5,
              clearcoatRoughness: 0.2
            });
          } else if (child.name.toLowerCase().includes('keyboard') || child.name.toLowerCase().includes('key') || child.name.toLowerCase().includes('cap')) {
            child.material = new THREE.MeshStandardMaterial({
              color: '#08080a',
              roughness: 0.4,
              metalness: 0.8
            });
          } else {
            child.material = new THREE.MeshStandardMaterial({
              color: '#1a1a20',
              roughness: 0.5,
              metalness: 0.2
            });
          }
        }
      });
    }
  }, [fbx, actions, names]);

  return (
    <primitive 
      object={fbx} 
      scale={0.038} 
      position={[0, -2.8, -1]} 
      rotation={[0.1, Math.PI, 0]} 
    />
  );
}

function Loader() {
  return (
    <group position={[0, 0, 0]}>
      {/* Simple glassmorphic loading ring in 3D space */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.08, 16, 100]} />
        <meshBasicMaterial color="#8052ff" wireframe />
      </mesh>
      <Text
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Initializing 3D Core...
      </Text>
    </group>
  );
}

export default function ThreeKeyboard() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full min-h-[550px] lg:min-h-[700px] relative pointer-events-none flex items-center justify-center">
      <Canvas 
        camera={{ position: [0, 4, 9], fov: 40 }} 
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Cinematic Studio Lighting */}
        <ambientLight intensity={0.4} />
        
        <directionalLight 
          position={[10, 15, 10]} 
          intensity={3.5} 
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <pointLight position={[-10, 8, -5]} intensity={2.5} color="#8052ff" />
        <pointLight position={[8, -4, 6]} intensity={1.8} color="#ffb829" />
        <spotLight 
          position={[0, 15, 2]} 
          angle={0.4} 
          penumbra={1} 
          intensity={4} 
          color="#8052ff" 
          castShadow 
        />

        {/* Ambient Environment Map for rich reflections */}
        <Environment preset="studio" />

        <CanvasController mouseRef={mouseRef} />

        <Suspense fallback={<Loader />}>
          <group position={[0, 0, 0]}>
            <TypingFBXModel />
          </group>
        </Suspense>

        <KeyboardNebula />

        <ContactShadows position={[0, -2.9, 0]} opacity={0.5} scale={20} blur={3.0} far={10} />
      </Canvas>
    </div>
  );
}

