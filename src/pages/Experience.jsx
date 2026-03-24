import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, PresentationControls } from '@react-three/drei';

function TypingAvatar() {
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 15) * 0.15 - 0.4;
      rightArmRef.current.rotation.x = Math.cos(t * 18) * 0.15 - 0.4;
    }
    
    // Animate intense flickering scale for flaming eyes
    if (leftEyeRef.current && rightEyeRef.current) {
       const flameScale = 1.0 + Math.sin(t * 30) * 0.2 + Math.random() * 0.1;
       leftEyeRef.current.scale.set(flameScale, flameScale * 1.5, flameScale);
       rightEyeRef.current.scale.set(flameScale, flameScale * 1.5, flameScale);
    }
  });

  const pitchBlackMat = { color: "#000000", roughness: 0.9, metalness: 0.1 };
  
  const skinMat = {...pitchBlackMat};
  const shirtMat = {...pitchBlackMat};
  const pantsMat = {...pitchBlackMat};
  const hairMat = {...pitchBlackMat};
  const metalMat = { color: "#aaaaaa", roughness: 0.3, metalness: 0.6 };
  const deskMat = { color: "#ffffff", roughness: 0.5 };
  
  const renderEye = (isRight) => {
    const flip = isRight ? 1 : -1;
    // Base position
    const posX = flip * 0.12;
    // Base tilt outwards
    const rotZ = flip * -0.4;
    // Successive outward bends for a curved hook
    const bend1 = flip * -0.2;
    const bend2 = flip * -0.4;
    
    return (
      <group position={[posX, 0.06, -0.23]} ref={isRight ? rightEyeRef : leftEyeRef} key={isRight ? 'right' : 'left'}>
        <pointLight intensity={2} color="#ffffff" distance={1.5} />
        <group rotation={[0, 0, rotZ]}>
          {/* Intense Solid White Core Arc */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0.05, 0]} rotation={[0, 0, bend1]}>
            <coneGeometry args={[0.02, 0.12, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[flip * 0.02, 0.11, 0]} rotation={[0, 0, bend2]}>
            <coneGeometry args={[0.01, 0.08, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Translucent Glowing Aura Layer */}
          <mesh position={[0, 0, -0.01]} scale={1.8}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={4} transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, 0.05, -0.01]} rotation={[0, 0, bend1]} scale={1.8}>
            <coneGeometry args={[0.02, 0.12, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={4} transparent opacity={0.3} />
          </mesh>
          <mesh position={[flip * 0.02, 0.11, -0.01]} rotation={[0, 0, bend2]} scale={1.8}>
            <coneGeometry args={[0.01, 0.08, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={4} transparent opacity={0.3} />
          </mesh>
        </group>
      </group>
    );
  };
  
  return (
    <group position={[0, -1.0, 0]}>
      {/* Desk */}
      <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.05, 1.4]} />
        <meshStandardMaterial {...deskMat} />
      </mesh>
      {/* Desk Legs */}
      <mesh position={[-1.3, 0.65, -0.5]} castShadow>
         <cylinderGeometry args={[0.03, 0.03, 1.3]} />
         <meshStandardMaterial {...metalMat} />
      </mesh>
      <mesh position={[1.3, 0.65, -0.5]} castShadow>
         <cylinderGeometry args={[0.03, 0.03, 1.3]} />
         <meshStandardMaterial {...metalMat} />
      </mesh>
      <mesh position={[-1.3, 0.65, 0.5]} castShadow>
         <cylinderGeometry args={[0.03, 0.03, 1.3]} />
         <meshStandardMaterial {...metalMat} />
      </mesh>
      <mesh position={[1.3, 0.65, 0.5]} castShadow>
         <cylinderGeometry args={[0.03, 0.03, 1.3]} />
         <meshStandardMaterial {...metalMat} />
      </mesh>
      
      {/* Monitor */}
      <mesh position={[0, 1.325, -0.4]}>
        <boxGeometry args={[0.4, 0.02, 0.3]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>
      <mesh position={[0, 1.5, -0.47]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.1, 0.4, 0.05]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>
      <group position={[0, 1.85, -0.3]} rotation={[0.05, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.0, 1.2, 0.05]} />
          <meshStandardMaterial color="#eeeeee" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.9, 1.1]} />
          <meshBasicMaterial color="#ff7eb3" />
        </mesh>
        <pointLight position={[0, 0, 0.5]} intensity={2.5} color="#ff7eb3" distance={4} />
      </group>

      {/* Keyboard */}
      <mesh position={[0, 1.35, 0.3]} rotation={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[1.0, 0.04, 0.35]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0, 1.37, 0.3]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.95, 0.01, 0.3]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      {/* Character Group */}
      <group position={[0, 0, 1.1]}>
        {/* Chair Legs */}
        <mesh position={[-0.3, 0.4, -0.3]} rotation={[0, 0, Math.PI/12]}>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial {...metalMat} />
        </mesh>
        <mesh position={[0.3, 0.4, -0.3]} rotation={[0, 0, -Math.PI/12]}>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial {...metalMat} />
        </mesh>
        <mesh position={[-0.3, 0.4, 0.3]} rotation={[-Math.PI/12, 0, Math.PI/12]}>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial {...metalMat} />
        </mesh>
        <mesh position={[0.3, 0.4, 0.3]} rotation={[-Math.PI/12, 0, -Math.PI/12]}>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial {...metalMat} />
        </mesh>
        
        {/* Chair Seat & Back */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[0.8, 0.05, 0.8]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        <mesh position={[0, 1.25, 0.4]} rotation={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.7, 0.9, 0.05]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>

        {/* Pants / Legs Array  */}
        <mesh position={[-0.2, 0.88, -0.1]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
          <meshStandardMaterial {...pantsMat} />
        </mesh>
        <mesh position={[0.2, 0.88, -0.1]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
          <meshStandardMaterial {...pantsMat} />
        </mesh>
        <mesh position={[-0.2, 0.45, -0.45]} castShadow>
          <capsuleGeometry args={[0.14, 0.7, 8, 16]} />
          <meshStandardMaterial {...pantsMat} />
        </mesh>
        <mesh position={[0.2, 0.45, -0.45]} castShadow>
          <capsuleGeometry args={[0.14, 0.7, 8, 16]} />
          <meshStandardMaterial {...pantsMat} />
        </mesh>
        
        {/* Shoes */}
        <mesh position={[-0.2, 0.08, -0.55]} castShadow>
          <boxGeometry args={[0.18, 0.15, 0.4]} />
          <meshStandardMaterial color="#999" />
        </mesh>
        <mesh position={[0.2, 0.08, -0.55]} castShadow>
          <boxGeometry args={[0.18, 0.15, 0.4]} />
          <meshStandardMaterial color="#999" />
        </mesh>

        {/* Torso Shirt */}
        <mesh position={[0, 1.35, 0.15]} rotation={[0.05, 0, 0]} castShadow>
          <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
          <meshStandardMaterial {...shirtMat} />
        </mesh>
        
        {/* Head Base */}
        <group position={[0, 2.0, 0.1]}>
           <mesh castShadow>
             <sphereGeometry args={[0.25, 32, 32]} />
             <meshStandardMaterial {...skinMat} />
           </mesh>
           
           {/* Hair Structure */}
           <mesh position={[0, 0.1, 0.05]} castShadow>
             <sphereGeometry args={[0.26, 16, 16]} />
             <meshStandardMaterial {...hairMat} />
           </mesh>
           <mesh position={[0, 0.2, -0.15]} castShadow>
             <boxGeometry args={[0.3, 0.1, 0.1]} />
             <meshStandardMaterial {...hairMat} />
           </mesh>

           {/* Eyes implementation using the complex component arc logic */}
           {renderEye(false)}
           {renderEye(true)}
           
           {/* Angry Eyebrows offset above flames slightly higher to match arcs */}
           {/* Left Brow */}
           <mesh position={[-0.12, 0.18, -0.21]} rotation={[0, 0, -0.3]}>
              <boxGeometry args={[0.12, 0.02, 0.04]} />
              <meshStandardMaterial {...hairMat} />
           </mesh>
           {/* Right Brow */}
           <mesh position={[0.12, 0.18, -0.21]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.12, 0.02, 0.04]} />
              <meshStandardMaterial {...hairMat} />
           </mesh>
           
           {/* Nose */}
           <mesh position={[0, -0.05, -0.25]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial {...skinMat} />
           </mesh>
        </group>
        
        {/* Dynamic Typing Hands */}
        <group position={[-0.38, 1.65, 0.15]} ref={leftArmRef}>
          <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, -0.1]} castShadow>
            <capsuleGeometry args={[0.1, 0.6, 8, 16]} />
            <meshStandardMaterial {...shirtMat} />
          </mesh>
          <mesh position={[-0.04, 0, -0.75]} castShadow>
             <sphereGeometry args={[0.08, 16, 16]} />
             <meshStandardMaterial {...skinMat} />
          </mesh>
        </group>

        <group position={[0.38, 1.65, 0.15]} ref={rightArmRef}>
          <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0.1]} castShadow>
            <capsuleGeometry args={[0.1, 0.6, 8, 16]} />
            <meshStandardMaterial {...shirtMat} />
          </mesh>
          <mesh position={[0.04, 0, -0.75]} castShadow>
             <sphereGeometry args={[0.08, 16, 16]} />
             <meshStandardMaterial {...skinMat} />
          </mesh>
        </group>

      </group>
    </group>
  );
}

const expData = [
  {
    role: "Intern",
    company: "TAP Academy",
    date: "Feb 2026 - Present",
    desc: "Working on advanced projects and gaining full-stack exposure.",
    color: "#ff9a9e",
    rotation: -2,
  },
  {
    role: "General Secretary Of AI&DS",
    company: "Angadi Institute of Technology and Management",
    date: "Sep 2025 - Feb 2026",
    desc: "Led academic and co-curricular initiatives bridging classroom learning with industry readiness.",
    color: "#a18cd1",
    rotation: 2,
  },
  {
    role: "Manager of Marketing",
    company: "ACM Student Chapter",
    date: "Apr 2023 - May 2024",
    desc: "Enhanced student engagement and event visibility leveraging leadership, organizational, and marketing skills.",
    color: "#fbc2eb",
    rotation: -1,
  }
];

export default function Experience() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="w-full h-full min-h-[90vh] flex flex-col-reverse lg:grid lg:grid-cols-2 px-4 lg:px-12 py-10 lg:py-16 relative">
      
      {/* Experience Timeline Flowing on Left Column (Switched) */}
      <div className="w-full h-full flex flex-col items-center lg:items-start justify-center gap-8 relative z-10 col-span-1 lg:pr-10">
        
        <h2 className="hidden lg:block w-full text-4xl xl:text-5xl font-display font-bold mb-6 text-left max-w-xl">
           Professional <br/><span className="text-gradient leading-tight">Experience</span>
        </h2>
        
        <div className="w-full max-w-xl flex flex-col gap-8 md:gap-12 pb-10">
          {expData.map((exp, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                onHoverStart={() => setHoveredIdx(idx)}
                onHoverEnd={() => setHoveredIdx(null)}
                initial={{ rotate: exp.rotation, opacity: 0, y: 50 }}
                animate={{ rotate: isHovered ? 0 : exp.rotation, opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: isHovered ? `0 0 30px ${exp.color}40, 0 0 10px ${exp.color}` : 'none',
                  borderColor: isHovered ? exp.color : 'rgba(255, 255, 255, 0.1)'
                }}
                className="glass p-6 md:p-8 rounded-xl w-full relative cursor-default"
              >
                {/* Pin Decoration */}
                <div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full shadow-md z-10"
                  style={{ backgroundColor: '#222', border: `2px solid ${exp.color}` }}
                />
                
                <div 
                  className="absolute inset-0 rounded-xl opacity-20 -z-10 transition-colors"
                  style={{ backgroundColor: isHovered ? exp.color : 'transparent' }}
                />
                
                <div className="text-xs font-mono text-gray-400 mb-2">{exp.date}</div>
                <h3 className="text-2xl font-bold mb-1" style={{ color: isHovered ? exp.color : '#fff' }}>
                  {exp.role}
                </h3>
                <h4 className="text-lg text-gray-300 font-medium mb-4">{exp.company}</h4>
                <p className="text-gray-400 leading-relaxed font-sans">{exp.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3D Worker Representation mapped strictly to Right Column (Switched) */}
      <div className="w-full min-h-[400px] lg:h-full relative col-span-1 flex items-center justify-center pointer-events-none mb-10 lg:mb-0">
        <h2 className="absolute top-4 left-4 lg:hidden text-4xl md:text-5xl font-display font-bold text-left z-10 w-full mb-16 shadow-black drop-shadow-lg">
           Professional <span className="text-gradient">Experience</span>
        </h2>
        <div className="absolute inset-0 w-full h-full lg:scale-110 xl:scale-125 z-0 pointer-events-auto cursor-grab active:cursor-grabbing">
          {/* Flipped camera position to the right side so it looks inward */}
          <Canvas camera={{ position: [3, 3, 5], fov: 45 }} shadows>
            <ambientLight intensity={0.3} />
            <directionalLight position={[-5, 10, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
              <group position={[0, -0.5, 0]}>
                {/* Flipped default rotation so the avatar turns slightly towards the content on the left */}
                <PresentationControls
                  global
                  config={{ mass: 2, tension: 400 }}
                  snap={{ mass: 4, tension: 300 }}
                  rotation={[0, -Math.PI / 5, 0]}
                  polar={[-Math.PI / 6, Math.PI / 6]}
                  azimuth={[-Math.PI / 3, Math.PI / 3]}
                >
                  <TypingAvatar />
                </PresentationControls>
              </group>
            </Float>
            <ContactShadows position={[0, -1.6, 0]} opacity={0.6} scale={15} blur={3} far={4} />
          </Canvas>
        </div>
      </div>

    </div>
  );
}
