import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { motion } from 'framer-motion';

// Simplified skillsData – motion parameters will be calculated via index
const skillsData = [
  { name: 'Java', color: '#D4AF37' },
  { name: 'AI/ML', color: '#C5A021' },
  { name: 'Gen AI', color: '#E6BE8A' },
  { name: 'MongoDB', color: '#D4AF37' },
  { name: 'Tailwind', color: '#C5A021' },
  { name: 'Python', color: '#E6BE8A' },
  { name: 'React', color: '#D4AF37' },
  { name: 'Next.js', color: '#C5A021' },
  { name: 'Cyber Security', color: '#E6BE8A' },
];

const staticSkillsData = [
  // Left Anchor Cluster (Data Visualization)
  { name: 'Power BI', color: '#f2c811', pos: [-23, 6, 2] },
  { name: 'Tableau', color: '#e97627', pos: [-23, -2, 2] },
  
  // Right Anchor Cluster (Cloud & Workflow)
  { name: 'GitHub', color: '#ffffff', pos: [23, 6, 2] },
  { name: 'Firebase', color: '#ffca28', pos: [23, -2, 2] },
];

function MechanicalSkillKey({ name, color, index, staticPos, isMobile }) {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  const width = Math.max(isMobile ? 2.5 : 3.5, name.length * (isMobile ? 0.45 : 0.6));
  const depth = isMobile ? 1.5 : 2.5;
  const height = isMobile ? 0.8 : 1.2;

  const [hovered, setHovered] = useState(false);

  // Dynamic orbital physics
  const baseRadiusX = isMobile ? viewport.width * 0.4 : viewport.width * 0.28;
  const baseRadiusY = isMobile ? viewport.height * 0.28 : viewport.height * 0.2;
  
  const radiusX = baseRadiusX + (index % 3) * (isMobile ? 0.5 : 1.5); 
  const radiusY = baseRadiusY + (index % 2) * (isMobile ? 0.3 : 1.0); 
  const angularSpeed = 0.08 + (index * 0.015); 
  const phaseOffset = index ? (index * (Math.PI * 2)) / 9 : 0; 

  useFrame((state) => {
    if (!meshRef.current) return;
    
    if (staticPos) {
      const t = state.clock.getElapsedTime();
      const responsivePos = isMobile ? [staticPos[0] * 0.45, staticPos[1] * 0.8, staticPos[2]] : staticPos;
      meshRef.current.position.set(responsivePos[0], responsivePos[1] + Math.sin(t * 1.5) * 0.4, responsivePos[2]);
      meshRef.current.rotation.x = Math.PI / 2.2 + Math.sin(t * 0.5) * 0.1;
    } else {
      const t = state.clock.getElapsedTime() * angularSpeed + phaseOffset;
      meshRef.current.position.x = Math.cos(t) * radiusX;
      meshRef.current.position.y = Math.sin(t) * radiusY;
      meshRef.current.position.z = Math.sin(t * 0.5) * 1.5;
      meshRef.current.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.4) * 0.12;
      meshRef.current.rotation.y = Math.cos(t * 0.2) * 0.1;
    }
  });

  return (
    <group 
      ref={meshRef}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor='pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor='auto'; }}
    >
        <group scale={hovered ? 1.15 : 1}>
          {/* Key Base - Brighter for visibility */}
          <mesh position={[0, -height * 0.2, 0]}>
            <boxGeometry args={[width, height * 0.8, depth]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.4} />
          </mesh>
          
          {/* Glowing Top Surface */}
          <mesh position={[0, height * 0.3, 0]}>
            <boxGeometry args={[width - 0.2, height * 0.2, depth - 0.2]} />
            <meshStandardMaterial 
              color="#222" 
              roughness={0.2} 
              metalness={0.9} 
              emissive={hovered ? color : '#000'}
              emissiveIntensity={hovered ? 1.5 : 0}
            />
          </mesh>
          
          {/* Bottom Edge Light */}
          <mesh position={[0, -height * 0.5, 0]}>
            <boxGeometry args={[width - 0.4, 0.08, depth - 0.4]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 6 : 1.2} />
          </mesh>

          <Text 
            position={[0, height * 0.45, 0]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            fontSize={isMobile ? 0.45 : 0.65} 
            color={hovered ? '#fff' : '#aaa'}
            anchorX="center" 
            anchorY="middle"
            fontWeight="bold"
            maxWidth={width - 0.5}
            textAlign="center"
          >
            {name}
          </Text>
        </group>
      </group>
  );
}

function ResponsiveScene({ isMobile }) {
  return (
    <React.Suspense fallback={null}>
      <ambientLight intensity={1.2} />
      <spotLight position={[10, 25, 15]} angle={0.2} penumbra={1} intensity={3} castShadow />
      <directionalLight position={[-10, 10, 5]} intensity={0.8} color="#C5A021" />
      <pointLight position={[0, 0, 10]} intensity={1} color="#E6BE8A" />
      
      <group position={[0, isMobile ? 1 : 2, 0]}>
        {skillsData.map((skill, idx) => (
          <MechanicalSkillKey key={idx} index={idx} name={skill.name} color={skill.color} isMobile={isMobile} />
        ))}
        {staticSkillsData.map((skill, idx) => (
          <MechanicalSkillKey key={`static-${idx}`} name={skill.name} color={skill.color} staticPos={skill.pos} isMobile={isMobile} />
        ))}
      </group>
    </React.Suspense>
  );
}

export default function Skills() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full flex-grow flex flex-col items-center pt-8 pb-16 px-4 relative overflow-hidden min-h-screen">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accentPrimary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accentSecondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center space-y-2 mb-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-7xl font-decorative font-bold tracking-tight uppercase"
        >
          Technical <span className="text-gradient">Skills</span>
        </motion.h2>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em]">Proprietary 3D Ecosystem</p>
      </div>
      
      {/* 3D Floating Area - Sized to leave room for content below */}
      <div className="absolute inset-x-0 top-0 bottom-[35%] z-0">
        <Canvas camera={{ position: [0, 0, isMobile ? 30 : 45], fov: 40 }} dpr={[1, 2]}>
          <ResponsiveScene isMobile={isMobile} />
        </Canvas>
      </div>

      {/* About Box - Positioned to complement the 'circle' above */}
      <div className="mt-auto w-full flex justify-center z-10 py-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass p-8 md:p-12 rounded-[2.5rem] w-full max-w-2xl text-center shadow-2xl border border-white/5 bg-black/40 backdrop-blur-3xl mx-4 group hover:border-white/10 transition-colors"
        >
          <div className="h-1 w-20 bg-gradient-to-r from-accentPrimary to-accentSecondary mx-auto mb-8 rounded-full opacity-50" />
          
          <h3 className="mb-6 text-2xl md:text-3xl font-display font-black text-white tracking-tight uppercase">
            Engineering Strategy
          </h3>
          <p className="text-sm md:text-base text-gray-400 font-sans leading-relaxed group-hover:text-gray-300 transition-colors">
            My development philosophy centers on <span className="text-white font-bold">Performance</span> and 
            <span className="text-white font-bold"> Scalability</span>. I leverage cutting-edge 
            <span className="text-accentPrimary font-bold"> AI models</span> and 
            <span className="text-accentSecondary font-bold"> immersive UI</span> to transform complex requirements into 
            intuitive user journeys. Every orbit in this ecosystem represents a pillar of my technical foundation.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
