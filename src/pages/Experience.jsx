import React, { useRef, useState } from 'react';
import ParticleHeader from '../components/ParticleHeader';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, PresentationControls, Text } from '@react-three/drei';

function TypingAvatar() {
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const torsoRef = useRef();
  const mouseRgbRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Dynamic erratic typing - combination of fast and slow waves
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 18) * 0.12 + Math.sin(t * 35) * 0.08;
      rightArmRef.current.rotation.x = Math.cos(t * 22) * 0.12 + Math.cos(t * 40) * 0.08;
    }
    
    // Animate intense flickering scale for golden flaming eyes
    if (leftEyeRef.current && rightEyeRef.current) {
       // A sharp flickering effect
       const flicker = Math.random() > 0.8 ? 0.2 : 0;
       const flameScale = 1.0 + Math.sin(t * 20) * 0.15 + flicker;
       
       leftEyeRef.current.scale.set(flameScale, flameScale * 1.6, flameScale);
       rightEyeRef.current.scale.set(flameScale, flameScale * 1.6, flameScale);
    }
    
    // Gentle torso breathing
    if (torsoRef.current) {
      torsoRef.current.position.y = 1.35 + Math.sin(t * 2) * 0.02;
    }

    // Gaming mouse RGB effect cycle
    if (mouseRgbRef.current) {
      const hue = (t * 0.3) % 1; // Loop slowly 0 to 1
      mouseRgbRef.current.color.setHSL(hue, 1, 0.5);
      mouseRgbRef.current.emissive.setHSL(hue, 1, 0.5);
    }
  });

  // Black and Gold Materials
  const pitchBlackMat = { color: "#000000", roughness: 0.8, metalness: 0.5 };
  const goldMat = { color: "#D4AF37", roughness: 0.3, metalness: 0.8 };
  
  const skinMat = {...pitchBlackMat};
  const shirtMat = {...pitchBlackMat};
  const pantsMat = {...pitchBlackMat};
  const hairMat = {...pitchBlackMat};
  
  const deskBodyMat = { color: "#050505", roughness: 0.4, metalness: 0.6 };
  const monitorMat = { color: "#111111", roughness: 0.1, metalness: 0.9 };
  const screenGold = "#FFCC00";
  const eyeGold = "#FFAA00";
  
  const renderEye = (isRight) => {
    const flip = isRight ? 1 : -1;
    const posX = flip * 0.12;
    const rotZ = flip * -0.4;
    const bend1 = flip * -0.2;
    const bend2 = flip * -0.4;
    
    return (
      <group position={[posX, 0.06, -0.23]} ref={isRight ? rightEyeRef : leftEyeRef} key={isRight ? 'right' : 'left'}>
        <pointLight intensity={2} color={eyeGold} distance={2.0} />
        <group rotation={[0, 0, rotZ]}>
          {/* Intense Solid Core */}
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
            <meshBasicMaterial color={screenGold} />
          </mesh>

          {/* Translucent Golden Aura */}
          <mesh position={[0, 0, -0.01]} scale={1.8}>
            <sphereGeometry args={[0.028, 16, 16]} />
            <meshStandardMaterial color={eyeGold} emissive={eyeGold} emissiveIntensity={5} transparent opacity={0.4} />
          </mesh>
          <mesh position={[0, 0.05, -0.01]} rotation={[0, 0, bend1]} scale={1.8}>
            <coneGeometry args={[0.025, 0.12, 8]} />
            <meshStandardMaterial color={eyeGold} emissive={eyeGold} emissiveIntensity={5} transparent opacity={0.4} />
          </mesh>
          <mesh position={[flip * 0.02, 0.11, -0.01]} rotation={[0, 0, bend2]} scale={1.8}>
            <coneGeometry args={[0.015, 0.08, 8]} />
            <meshStandardMaterial color={eyeGold} emissive={eyeGold} emissiveIntensity={5} transparent opacity={0.4} />
          </mesh>
        </group>
      </group>
    );
  };
  
  return (
    <group position={[0, -1.0, 0]}>
      {/* Sleek Ultrawide Desk */}
      <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.04, 1.3]} />
        <meshStandardMaterial {...deskBodyMat} />
      </mesh>
      {/* Desk Gold Trims */}
      <mesh position={[0, 1.305, 0.63]} castShadow>
        <boxGeometry args={[3.22, 0.01, 0.02]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      <mesh position={[0, 1.305, -0.63]} castShadow>
        <boxGeometry args={[3.22, 0.01, 0.02]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* Standard 4-Support Desk Legs */}
      {[
        [-1.45, -0.5],
        [1.45, -0.5],
        [-1.45, 0.5],
        [1.45, 0.5]
      ].map((pos, idx) => (
        <mesh key={`desk-leg-${idx}`} position={[pos[0], 0.65, pos[1]]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.3]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
      ))}
      
      {/* Dual Monitor Setup */}
      {/* Main Center-Right Monitor */}
      <group position={[0.2, 0, 0]}>
        <mesh position={[0, 1.325, -0.4]}>
          <boxGeometry args={[0.4, 0.02, 0.25]} />
          <meshStandardMaterial {...monitorMat} />
        </mesh>
        <mesh position={[0, 1.5, -0.45]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.08, 0.4, 0.05]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
        <group position={[0, 1.85, -0.3]} rotation={[0.05, -0.05, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 1.05, 0.06]} />
            <meshStandardMaterial {...monitorMat} />
          </mesh>
          <mesh position={[0, 0, 0.031]}>
            <planeGeometry args={[1.76, 1.01]} />
            <meshBasicMaterial color={screenGold} />
          </mesh>
          <pointLight position={[0, 0, 0.8]} intensity={2.5} color={screenGold} distance={5} />
        </group>
      </group>

      {/* Left Portrait Monitor */}
      <group position={[-1.15, 0, -0.1]}>
        <mesh position={[0, 1.325, -0.3]}>
          <boxGeometry args={[0.3, 0.02, 0.25]} />
          <meshStandardMaterial {...monitorMat} />
        </mesh>
        <mesh position={[0, 1.5, -0.35]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.06, 0.4, 0.05]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
        {/* Angled heavily toward the center user */}
        <group position={[0, 1.85, -0.2]} rotation={[0.05, 0.35, 0]}>
          <mesh castShadow>
            {/* Portrait proportions (taller than wide) */}
            <boxGeometry args={[0.7, 1.25, 0.06]} />
            <meshStandardMaterial {...monitorMat} />
          </mesh>
          <mesh position={[0, 0, 0.031]}>
            <planeGeometry args={[0.66, 1.21]} />
            <meshBasicMaterial color={screenGold} />
          </mesh>
        </group>
      </group>

      {/* 3D Cyber Keyboard with individual keys */}
      <group position={[0, 1.34, 0.32]} rotation={[0.08, 0, 0]}>
        {/* Keyboard Base Plate */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.1, 0.03, 0.38]} />
          <meshStandardMaterial {...deskBodyMat} />
        </mesh>
        {/* Keyboard Top Trim */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[1.08, 0.01, 0.36]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>

        <group position={[0, 0.025, 0]}>
          {[
            ['ESC', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'DEL'],
            ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
            ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENT'],
            ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'],
            ['CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', 'WIN', 'MENU', 'CTRL']
          ].map((row, rIdx) => {
            const keySize = 0.045;
            const spacing = 0.015;
            const startZ = -0.38/2 + 0.07;
            const startX = -1.1/2 + 0.08;
            const rowZ = startZ + rIdx * (keySize + spacing);
            
            let currentX = startX;
            if (rIdx === 1) currentX += 0.02;
            if (rIdx === 2) currentX += 0.04;
            if (rIdx === 3) currentX += 0.06;

            return row.map((keyChar, kIdx) => {
              let width = keySize;
              if (keyChar === 'SPACE') width = keySize * 7.5;
              else if (['SHIFT', 'ENT', 'CAPS', 'TAB', 'DEL', 'BACK', 'CTRL'].includes(keyChar)) width = keySize * 1.8;

              const posX = currentX + width/2;
              currentX += width + spacing;

              return (
                <group key={`${rIdx}-${kIdx}`} position={[posX, 0, rowZ]}>
                  {/* Physical Key Box */}
                  <mesh castShadow receiveShadow>
                     <boxGeometry args={[width, 0.02, keySize]} />
                     <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.2} />
                  </mesh>
                  {/* Golden Letter on Key */}
                  <Text
                     position={[0, 0.011, 0]}
                     rotation={[-Math.PI/2, 0, 0]}
                     fontSize={0.018}
                     color="#FFCC00"
                     anchorX="center"
                     anchorY="middle"
                     maxWidth={width}
                     textAlign="center"
                  >
                    {keyChar}
                  </Text>
                </group>
              );
            });
          })}
        </group>
      </group>

      {/* Cyber Gaming Mouse */}
      <group position={[0.7, 1.34, 0.35]} rotation={[0.08, -0.1, 0]}>
        {/* RGB Glow Base Edge Plate */}
        <mesh position={[0, -0.01, 0]}>
          <boxGeometry args={[0.075, 0.005, 0.135]} />
          <meshStandardMaterial ref={mouseRgbRef} color="#ff0044" emissive="#ff0044" emissiveIntensity={2} />
        </mesh>
        {/* Mouse Body */}
        <mesh position={[0, 0.015, 0]} castShadow>
          <boxGeometry args={[0.065, 0.03, 0.12]} />
          <meshStandardMaterial {...deskBodyMat} />
        </mesh>
        {/* Scroll wheel */}
        <mesh position={[0, 0.03, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.01, 16]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
      </group>

      {/* Character Group */}
      <group position={[0, 0, 1.1]}>
        {/* Chair Legs */}
        {[[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]].map((pos, idx) => (
          <mesh key={idx} position={[pos[0], 0.4, pos[1]]} rotation={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.8]} />
            <meshStandardMaterial {...goldMat} />
          </mesh>
        ))}
        
        {/* Chair Seat & Back */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[0.8, 0.06, 0.8]} />
          <meshStandardMaterial {...deskBodyMat} />
        </mesh>
        <mesh position={[0, 1.25, 0.4]} rotation={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.7, 0.9, 0.06]} />
          <meshStandardMaterial {...deskBodyMat} />
        </mesh>
        {/* Chair Gold Accent Lines */}
        <mesh position={[0, 1.25, 0.43]} rotation={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 0.9, 0.02]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>

        {/* Pants / Legs Array  */}
        {[-0.2, 0.2].map((x, idx) => (
          <group key={`leg-${idx}`}>
            <mesh position={[x, 0.88, -0.1]} rotation={[Math.PI/2, 0, 0]} castShadow>
              <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
              <meshStandardMaterial {...pantsMat} />
            </mesh>
            <mesh position={[x, 0.45, -0.45]} castShadow>
              <capsuleGeometry args={[0.14, 0.7, 8, 16]} />
              <meshStandardMaterial {...pantsMat} />
            </mesh>
            <mesh position={[x, 0.08, -0.55]} castShadow>
              <boxGeometry args={[0.18, 0.15, 0.4]} />
              <meshStandardMaterial {...pitchBlackMat} />
            </mesh>
            {/* Gold Shoe Trim */}
            <mesh position={[x, 0.02, -0.55]} castShadow>
              <boxGeometry args={[0.19, 0.04, 0.42]} />
              <meshStandardMaterial {...goldMat} />
            </mesh>
          </group>
        ))}

        {/* Torso Shirt */}
        <mesh position={[0, 1.35, 0.15]} rotation={[0.05, 0, 0]} castShadow ref={torsoRef}>
          <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
          <meshStandardMaterial {...shirtMat} />
        </mesh>
        
        {/* Head Base */}
        <group position={[0, 2.0, 0.1]}>
           <mesh castShadow>
             <sphereGeometry args={[0.25, 32, 32]} />
             <meshStandardMaterial {...skinMat} />
           </mesh>
           
           {/* Cyber Angular Hair Structure */}
           <mesh position={[0, 0.1, 0.05]} castShadow>
             <sphereGeometry args={[0.26, 8, 8]} />
             <meshStandardMaterial {...hairMat} />
           </mesh>
           <mesh position={[0, 0.22, -0.12]} rotation={[0.2, 0, 0]} castShadow>
             <boxGeometry args={[0.3, 0.15, 0.2]} />
             <meshStandardMaterial {...hairMat} />
           </mesh>
           <mesh position={[0, 0.25, -0.05]} rotation={[0.4, 0, 0]} castShadow>
             <coneGeometry args={[0.15, 0.3, 4]} />
             <meshStandardMaterial {...hairMat} />
           </mesh>

           {/* Eyes */}
           {renderEye(false)}
           {renderEye(true)}
           
           {/* Angry Eyebrows offset above flames slightly higher to match arcs */}
           <mesh position={[-0.12, 0.18, -0.21]} rotation={[0, 0, -0.3]}>
              <boxGeometry args={[0.12, 0.02, 0.04]} />
              <meshStandardMaterial {...goldMat} />
           </mesh>
           <mesh position={[0.12, 0.18, -0.21]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.12, 0.02, 0.04]} />
              <meshStandardMaterial {...goldMat} />
           </mesh>
           
           {/* Nose */}
           <mesh position={[0, -0.05, -0.25]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial {...goldMat} />
           </mesh>
        </group>
        
        {/* Dynamic Typing Hands */}
        <group position={[-0.32, 1.55, 0.05]} ref={leftArmRef}>
          {/* Upper Arm */}
          <mesh position={[0, -0.08, -0.2]} rotation={[Math.PI / 4, 0, 0]} castShadow>
            <capsuleGeometry args={[0.08, 0.35, 8, 16]} />
            <meshStandardMaterial {...shirtMat} />
          </mesh>
          {/* Elbow Joint */}
          <mesh position={[0, -0.17, -0.42]} castShadow>
             <sphereGeometry args={[0.075, 16, 16]} />
             <meshStandardMaterial {...shirtMat} />
          </mesh>
          {/* Forearm */}
          <mesh position={[0.02, -0.16, -0.62]} rotation={[Math.PI / 2, 0, 0.1]} castShadow>
            <capsuleGeometry args={[0.065, 0.35, 8, 16]} />
            <meshStandardMaterial {...skinMat} />
          </mesh>
          {/* Wrist */}
          <mesh position={[0.04, -0.16, -0.80]} castShadow>
             <sphereGeometry args={[0.055, 16, 16]} />
             <meshStandardMaterial {...skinMat} />
          </mesh>
          {/* Flat Hand */}
          <mesh position={[0.06, -0.17, -0.88]} rotation={[0.05, 0.1, 0]} castShadow>
             <boxGeometry args={[0.09, 0.025, 0.14]} />
             <meshStandardMaterial {...skinMat} />
          </mesh>
        </group>

        <group position={[0.32, 1.55, 0.05]} ref={rightArmRef}>
          {/* Upper Arm */}
          <mesh position={[0, -0.08, -0.2]} rotation={[Math.PI / 4, 0, 0]} castShadow>
            <capsuleGeometry args={[0.08, 0.35, 8, 16]} />
            <meshStandardMaterial {...shirtMat} />
          </mesh>
          {/* Elbow Joint */}
          <mesh position={[0, -0.17, -0.42]} castShadow>
             <sphereGeometry args={[0.075, 16, 16]} />
             <meshStandardMaterial {...shirtMat} />
          </mesh>
          {/* Forearm */}
          <mesh position={[-0.02, -0.16, -0.62]} rotation={[Math.PI / 2, 0, -0.1]} castShadow>
            <capsuleGeometry args={[0.065, 0.35, 8, 16]} />
            <meshStandardMaterial {...skinMat} />
          </mesh>
          {/* Wrist */}
          <mesh position={[-0.04, -0.16, -0.80]} castShadow>
             <sphereGeometry args={[0.055, 16, 16]} />
             <meshStandardMaterial {...skinMat} />
          </mesh>
          {/* Flat Hand */}
          <mesh position={[-0.06, -0.17, -0.88]} rotation={[0.05, -0.1, 0]} castShadow>
             <boxGeometry args={[0.09, 0.025, 0.14]} />
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
    color: "#D4AF37",
    rotation: -2,
  },
  {
    role: "General Secretary Of AI&DS",
    company: "Angadi Institute of Technology and Management",
    date: "Sep 2025 - Feb 2026",
    desc: "Led academic and co-curricular initiatives bridging classroom learning with industry readiness.",
    color: "#C5A021",
    rotation: 2,
  },
  {
    role: "Manager of Marketing",
    company: "ACM Student Chapter",
    date: "Apr 2023 - May 2024",
    desc: "Enhanced student engagement and event visibility leveraging leadership, organizational, and marketing skills.",
    color: "#E6BE8A",
    rotation: -1,
  }
];

export default function Experience() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.7, 1.0], [1, 0]);

  return (
    <div ref={containerRef} className="w-full flex-grow flex flex-col-reverse lg:grid lg:grid-cols-12 py-10 lg:py-20 relative gap-12 lg:gap-0 min-h-screen">
      
      {/* Experience Timeline */}
      <div className="w-full lg:col-span-5 flex flex-col items-center lg:items-start justify-center relative z-10 lg:pr-6">
        
        <div className="mb-12 w-full h-24">
          <ParticleHeader 
            text="Professional Experience" 
            subtext="Career Roadmap"
            align={window.innerWidth < 1024 ? 'center' : 'left'}
          />
        </div>
        
        <div className="w-full max-w-2xl flex flex-col gap-8 pb-10">
          {expData.map((exp, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, x: 10 }}
                onHoverStart={() => setHoveredIdx(idx)}
                onHoverEnd={() => setHoveredIdx(null)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass p-8 md:p-10 rounded-[2.5rem] w-full relative group border border-white/10 bg-black/40 backdrop-blur-2xl overflow-hidden transition-all duration-500 shadow-2xl"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: exp.color }}
                />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div className="text-[11px] font-display font-black px-4 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10 w-fit uppercase tracking-wider backdrop-blur-md">
                    {exp.date}
                  </div>
                  <div className="flex gap-1.5">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: exp.color }} />
                     <div className="w-2 h-2 rounded-full opacity-40 shadow-[0_0_8px_inset]" style={{ backgroundColor: exp.color }} />
                     <div className="w-2 h-2 rounded-full opacity-20 shadow-[0_0_12px_inset]" style={{ backgroundColor: exp.color }} />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-decorative font-bold mb-3 group-hover:translate-x-1 transition-transform tracking-wider leading-tight" style={{ color: isHovered ? exp.color : '#fff' }}>
                  {exp.role}
                </h3>
                <h4 className="text-lg md:text-xl text-gray-200 font-display font-bold mb-6 flex items-center gap-3">
                  <span className="w-6 h-[1.5px] bg-gradient-to-r from-white/30 to-transparent rounded-full" />
                  {exp.company}
                </h4>
                <p className="text-gray-400 group-hover:text-gray-100 leading-relaxed font-display font-medium transition-colors text-sm md:text-base md:pr-4">
                  {exp.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3D Scene */}
      <div className="w-full lg:col-span-7 min-h-[350px] md:min-h-[500px] lg:min-h-[650px] lg:h-[80vh] sticky top-20 relative flex items-center justify-center overflow-visible">
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 w-full h-full z-0 pointer-events-auto cursor-grab active:cursor-grabbing"
        >
          <Canvas camera={{ position: [5, 4, 7], fov: 34 }} shadows dpr={[1, 2]}>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            <directionalLight position={[-5, 5, 5]} intensity={0.8} />
            
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <group position={[0.5, -0.7, 0]} scale={1.25}>
                <PresentationControls
                  global
                  config={{ mass: 1, tension: 200 }}
                  snap={{ mass: 2, tension: 150 }}
                  rotation={[0, -Math.PI / 4, 0]}
                  polar={[-Math.PI / 10, Math.PI / 10]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                  <TypingAvatar />
                </PresentationControls>
              </group>
            </Float>
            <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={12} blur={2.5} far={4} color="#000" />
          </Canvas>
        </motion.div>
        
        {/* Mobile Header Overlay */}
        <div className="absolute top-0 left-0 w-full lg:hidden pointer-events-none p-4 flex flex-col items-center">
           <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>

    </div>
  );
}
