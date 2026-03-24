import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';

// Convert scatter coordinates into tighter 3D Scene space coordinates [X, Y, Z] to strictly prevent edge clipping
const skillsData = [
  // Top row
  { name: 'Java', color: '#00ff9d', pos: [-2.8, 2.8, -1] },
  { name: 'AI/ML', color: '#bc13fe', pos: [0.0, 3.5, -3] },
  { name: 'Gen AI', color: '#00f0ff', pos: [2.8, 3.0, -2] },
  // Middle row (far left/right)
  { name: 'MongoDB', color: '#00f0ff', pos: [-4.0, 0.5, 2] },
  { name: 'Tailwind', color: '#00f0ff', pos: [4.0, -0.5, 1] },
  // Bottom row
  { name: 'Python', color: '#bc13fe', pos: [-3.5, -2.5, 1] },
  { name: 'React', color: '#ff0055', pos: [-1.8, -3.5, -1] },
  { name: 'Next.js', color: '#00ff9d', pos: [1.0, -3.8, 3] },
  { name: 'Cyber Security', color: '#ff0055', pos: [3.5, -2.8, 1] },
];

function MechanicalSkillKey({ name, color, pos }) {
  const width = Math.max(1.8, name.length * 0.28);
  const depth = 1.2;
  const height = 0.5;

  const [hovered, setHovered] = useState(false);

  // Random base tilts to make them feel truly floating randomly in space
  const tiltX = Math.PI / 6 + (Math.random() * 0.2);
  const tiltY = (Math.random() * 0.5) - 0.25;

  return (
    <Float speed={1.5 + Math.random()} rotationIntensity={1.2} floatIntensity={2.5} floatingRange={[-0.6, 0.6]}>
      <group 
        position={pos} 
        rotation={[tiltX, tiltY, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor='pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor='auto'; }}
      >
        {/* Scaled wrapper for interaction spring effect */}
        <group scale={hovered ? 1.15 : 1}>
          
          {/* Base Keycap */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[width, height * 0.6, depth]} />
            <meshStandardMaterial color="#111" roughness={0.7} metalness={0.4} />
          </mesh>
          
          {/* Top Keycap Bevel */}
          <mesh position={[0, height * 0.4, 0]}>
            <boxGeometry args={[width - 0.15, height * 0.2, depth - 0.15]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              roughness={0.3} 
              metalness={0.5} 
              emissive={hovered ? color : '#000'}
              emissiveIntensity={hovered ? 0.4 : 0}
            />
          </mesh>

          {/* Aggressive Switch Underglow (Mechanical RGB vibe) */}
          <mesh position={[0, -height * 0.35, 0]}>
            <boxGeometry args={[width - 0.3, 0.1, depth - 0.3]} />
            <meshStandardMaterial color="#000" emissive={color} emissiveIntensity={hovered ? 4 : 0.5} />
          </mesh>

          {/* Key Label */}
          <Text 
            position={[0, height * 0.52, 0]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            fontSize={0.22} 
            color={hovered ? '#fff' : '#ccc'}
            anchorX="center" 
            anchorY="middle"
            fontWeight="bold"
          >
            {name}
          </Text>

        </group>
      </group>
    </Float>
  );
}

export default function Skills() {
  return (
    <div className="w-full h-full flex flex-col items-center py-10 px-4 relative">
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center z-10 pointer-events-none drop-shadow-md">
        Technical <span className="text-gradient">Skills</span>
      </h2>
      
      {/* 3D Floating Area */}
      <div className="absolute inset-0 z-0 top-[100px] w-full h-[calc(100vh-100px)] lg:h-[90vh]">
        {/* Pulled the camera back to Z=13 so the floating keys are naturally framed and safely inside the view area without clipping */}
        <Canvas camera={{ position: [0, 0, 16], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 15, 10]} intensity={1.5} />
          <pointLight position={[0, -5, 5]} intensity={0.5} color="#bc13fe" />
          
          <group position={[0, 0, 0]}>
            {skillsData.map((skill, idx) => (
              <MechanicalSkillKey key={idx} name={skill.name} color={skill.color} pos={skill.pos} />
            ))}
          </group>
        </Canvas>
      </div>

      <div className="relative w-full flex-grow flex items-center justify-center min-h-[500px] z-10 pointer-events-none">
        <div className="glass p-8 rounded-xl max-w-sm text-center shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto border border-darkBorder bg-darkBg/80 backdrop-blur-md">
          <h3 className="mb-4 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            About My Approach
          </h3>
          <p className="text-sm text-gray-300 font-sans leading-relaxed">
            I am passionate about combining creativity with analytical problem-solving to deliver value in the real world. Over the years, I have developed numerous real-world projects addressing practical challenges—ranging from creating impactful presentation materials to designing training modules for company placements.
          </p>
        </div>
      </div>
    </div>
  );
}
