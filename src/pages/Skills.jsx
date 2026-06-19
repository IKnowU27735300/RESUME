import React, { useState, useRef, useEffect } from 'react';
import ParticleHeader from '../components/ParticleHeader';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const clusters = {
  frontend: {
    title: 'Frontend Cluster',
    skills: ['React', 'Next.js', 'Tailwind', 'JavaScript'],
    pos: [-4.2, 0, 0]
  },
  backend: {
    title: 'Backend Cluster',
    skills: ['Node.js', 'Python', 'Java', 'MySQL'],
    pos: [0, 0, 0]
  },
  ai_security: {
    title: 'AI & Security Cluster',
    skills: ['ML/AI', 'Gen AI', 'Cybersecurity', 'Net Security'],
    pos: [4.2, 0, 0]
  }
};

function SkillKeycap({ name, gridPos, isClusterHovered, onHover, onUnhover }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const [keyHovered, setKeyHovered] = useState(false);

  const keyWidth = 1.6;
  const keyHeight = 0.5;
  const keyDepth = 1.0;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    // Default position in grid
    const targetX = gridPos[0];
    const targetZ = gridPos[1];
    
    // Smooth animate height based on hover states
    let targetY = 0;
    if (isClusterHovered) {
      // Float up and down as a wave when cluster is active
      targetY = 0.35 + Math.sin(t * 5 + gridPos[0] * 2 + gridPos[1]) * 0.12;
    } else if (keyHovered) {
      targetY = 0.2;
    }

    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);

    // Glow intensity
    if (glowRef.current && glowRef.current.material) {
      const activeColor = new THREE.Color('#8052ff'); // Violet
      const defaultColor = new THREE.Color('#101010');
      
      if (isClusterHovered || keyHovered) {
        glowRef.current.material.emissive.lerp(activeColor, 0.1);
        glowRef.current.material.emissiveIntensity = 3.0;
      } else {
        glowRef.current.material.emissive.lerp(defaultColor, 0.1);
        glowRef.current.material.emissiveIntensity = 0;
      }
    }
  });

  return (
    <group 
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setKeyHovered(true);
        onHover();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setKeyHovered(false);
        onUnhover();
      }}
    >
      {/* Matte black Keycap Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[keyWidth, keyHeight, keyDepth]} />
        <meshStandardMaterial color="#141414" roughness={0.6} metalness={0.4} />
      </mesh>
      
      {/* Slightly smaller Keycap Top */}
      <mesh position={[0, 0.26, 0]}>
        <boxGeometry args={[keyWidth - 0.15, 0.1, keyDepth - 0.15]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Legend text */}
      <Text
        position={[0, 0.32, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.18}
        color={isClusterHovered || keyHovered ? '#ffffff' : '#bdbdbd'}
        anchorX="center"
        anchorY="middle"
        maxWidth={keyWidth - 0.2}
      >
        {name}
      </Text>

      {/* Emissive LED underneath */}
      <mesh ref={glowRef} position={[0, -0.22, 0]}>
        <boxGeometry args={[keyWidth - 0.2, 0.05, keyDepth - 0.2]} />
        <meshStandardMaterial color="#000" emissive="#000" />
      </mesh>
    </group>
  );
}

function SkillCluster3D({ clusterKey, data, hoveredCluster, setHoveredCluster }) {
  const isHovered = hoveredCluster === clusterKey;

  // Lay out 4 skills in a 2x2 grid around the cluster center
  const gridPositions = [
    [-0.95, -0.6], // top-left
    [0.95, -0.6],  // top-right
    [-0.95, 0.6],  // bottom-left
    [0.95, 0.6]   // bottom-right
  ];

  return (
    <group position={data.pos}>
      {/* Cluster Plate */}
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[3.6, 0.12, 2.4]} />
        <meshStandardMaterial color="#080808" roughness={0.8} metalness={0.7} />
      </mesh>

      {/* Cluster Title */}
      <Text
        position={[0, 0.8, -1.6]}
        rotation={[-Math.PI / 7, 0, 0]}
        fontSize={0.28}
        color={isHovered ? '#8052ff' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
      >
        {data.title.toUpperCase()}
      </Text>

      {data.skills.map((skill, idx) => (
        <SkillKeycap
          key={skill}
          name={skill}
          gridPos={gridPositions[idx]}
          isClusterHovered={isHovered}
          onHover={() => setHoveredCluster(clusterKey)}
          onUnhover={() => setHoveredCluster(null)}
        />
      ))}
    </group>
  );
}

function Scene({ hoveredCluster, setHoveredCluster, isMobile }) {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={2.0} />
      
      {/* Violet pulses depending on hovered cluster */}
      <pointLight 
        position={[-4, 1, 2]} 
        color="#8052ff" 
        intensity={hoveredCluster === 'frontend' ? 4 : 0.5} 
      />
      <pointLight 
        position={[0, 1, 2]} 
        color="#8052ff" 
        intensity={hoveredCluster === 'backend' ? 4 : 0.5} 
      />
      <pointLight 
        position={[4, 1, 2]} 
        color="#8052ff" 
        intensity={hoveredCluster === 'ai_security' ? 4 : 0.5} 
      />

      <group 
        rotation={[Math.PI / 6, 0, 0]} 
        scale={isMobile ? [0.65, 0.65, 0.65] : [1, 1, 1]}
        position={isMobile ? [0, 0.8, 0] : [0, 0, 0]}
      >
        {Object.entries(clusters).map(([key, data]) => (
          <SkillCluster3D
            key={key}
            clusterKey={key}
            data={data}
            hoveredCluster={hoveredCluster}
            setHoveredCluster={setHoveredCluster}
          />
        ))}
      </group>
    </>
  );
}

export default function Skills() {
  const [hoveredCluster, setHoveredCluster] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full flex-grow flex flex-col items-center pt-8 pb-16 relative overflow-hidden min-h-screen">
      
      {/* Title */}
      <div className="relative z-10 text-center space-y-4 mb-20 w-full h-24">
        <ParticleHeader 
          text="Technical Skills" 
          subtext="Illuminated Keyboard Groups"
        />
      </div>
      
      {/* 3D Clusters Scene */}
      <div className="absolute inset-x-0 top-[150px] bottom-[350px] z-0">
        <Canvas camera={{ position: [0, 2.5, 8.5], fov: 45 }}>
          <Scene 
            hoveredCluster={hoveredCluster} 
            setHoveredCluster={setHoveredCluster} 
            isMobile={isMobile}
          />
        </Canvas>
      </div>

      {/* Engineering Strategy Text Box (Flat border style, no glass/shadow) */}
      <div className="mt-auto w-full flex justify-center z-10 py-6 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-neutral-800 bg-black p-8 md:p-12 rounded-[2rem] w-full max-w-2xl text-center mx-4 group hover:border-accentPrimary transition-colors"
        >
          <div className="h-0.5 w-16 bg-accentPrimary mx-auto mb-8 rounded-full" />
          
          <h3 className="mb-6 text-2xl md:text-3xl font-display font-light text-white tracking-tight uppercase">
            Engineering Strategy
          </h3>
          <p className="text-sm md:text-base text-gray-400 font-sans leading-relaxed transition-colors">
            My development philosophy centers on <span className="text-white font-bold">Performance</span> and 
            <span className="text-white font-bold"> Scalability</span>. I leverage cutting-edge 
            <span className="text-accentPrimary font-bold"> AI models</span> and 
            <span className="text-accentPrimary font-bold"> immersive UI</span> to transform complex requirements into 
            intuitive user journeys. Every orbit in this ecosystem represents a pillar of my technical foundation.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
