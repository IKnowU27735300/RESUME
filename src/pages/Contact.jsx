import React, { useState, useRef } from 'react';
import ParticleHeader from '../components/ParticleHeader';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Smartphone, Phone, CornerDownLeft } from 'lucide-react';
import { TelephoneView, SmartphoneView } from '../components/Contact3D';

export default function Contact() {
  const [userEmail, setUserEmail] = useState('');
  const [subjectOption, setSubjectOption] = useState('Want to work with you');
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const modelOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const handleSendMail = (e) => {
    e.preventDefault();
    if (!userEmail) {
      alert("Please enter your email");
      return;
    }
    const toEmail = "anishinamadar11111@gmail.com";
    const bodyContent = `From: ${userEmail}\n\nHello Anish,\n\n`;
    const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subjectOption)}&body=${encodeURIComponent(bodyContent)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden bg-black">
      
      {/* Page Header */}
      <div className="relative z-10 text-center mb-16 px-4 w-full h-24">
        <ParticleHeader 
          text="Get In Touch" 
          subtext="Initiate Connection Sequence"
        />
      </div>

      <div className="w-full max-w-7xl flex flex-col xl:flex-row items-center justify-center gap-12 lg:gap-20 px-6 relative z-10">
        
        {/* Left Side: Telephone 3D Model */}
        <motion.div 
          style={{ opacity: modelOpacity }}
          className="hidden md:flex xl:w-1/4 flex-col items-center order-2 xl:order-1"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-64 h-64 lg:w-80 lg:h-80">
            <TelephoneView />
          </div>
          <div className="flex items-center gap-2 text-gray-500 font-mono text-[10px] uppercase tracking-widest mt-4">
            <Phone className="w-3.5 h-3.5 text-accentPrimary" /> +91 8762352662
          </div>
        </motion.div>

        {/* Center: Contact Form (Keyboard Cluster Themed) */}
        <div className="w-full max-w-xl xl:w-2/4 order-1 xl:order-2">
          <motion.div 
            className="border border-neutral-800 bg-black p-8 md:p-12 rounded-[2rem] relative overflow-hidden flex flex-col items-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base text-gray-400 font-sans mb-10 text-center leading-relaxed">
              I am open to discussing <span className="text-white font-semibold underline decoration-accentPrimary/50">AI solutions</span>, 
              full-stack applications, or cyber partnerships.
            </p>

            <form onSubmit={handleSendMail} className="w-full flex flex-col gap-6">
              {/* Email Input Keycap Container */}
              <div className="group space-y-2">
                <label htmlFor="email" className="text-gray-500 text-[10px] font-mono tracking-[0.2em] uppercase ml-1">
                  [SATELLITE_ADDR]
                </label>
                <input
                  id="email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-transparent border border-neutral-800 rounded-xl px-6 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-accentPrimary transition-all"
                  required
                />
              </div>

              {/* Subject Input Keycap Container */}
              <div className="group space-y-2">
                <label htmlFor="subject" className="text-gray-500 text-[10px] font-mono tracking-[0.2em] uppercase ml-1">
                  [INTENT_TYPE]
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    value={subjectOption}
                    onChange={(e) => setSubjectOption(e.target.value)}
                    className="w-full bg-transparent border border-neutral-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accentPrimary transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="Want to work with you" className="bg-black text-white">Project Collaboration</option>
                    <option value="Just chit-chat about the projects" className="bg-black text-white">General Inquiry</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600 font-mono text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* ENTER KEY Submit Button with Animated Keystroke Effect */}
              <div className="relative w-full pt-4">
                {/* Physical Under-key stem border for 3D look */}
                <div className="absolute inset-x-0 bottom-0 top-6 border border-neutral-900 rounded-xl pointer-events-none bg-neutral-950 translate-y-1.5" />
                
                <motion.button
                  type="submit"
                  whileHover={{ y: 4 }}
                  whileTap={{ y: 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="relative w-full flex items-center justify-between px-8 py-5 border border-neutral-800 hover:border-accentPrimary hover:text-accentPrimary bg-black text-white rounded-xl font-mono text-lg uppercase tracking-widest cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-neutral-900 text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded mr-1">Fn</span>
                    <span>ENTER</span>
                  </div>
                  <CornerDownLeft className="w-5 h-5" />
                </motion.button>
              </div>
            </form>

            {/* Social Icons (No glass/shadows) */}
            <div className="mt-12 pt-8 w-full border-t border-neutral-900 flex justify-center gap-6">
              {[
                { icon: Github, href: "https://github.com/IKnowU27735300" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/anish-inamadar-858461303" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center border border-neutral-800 hover:border-accentPrimary hover:text-accentPrimary rounded-xl transition-all"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Smartphone 3D Model */}
        <motion.div 
          style={{ opacity: modelOpacity }}
          className="flex xl:w-1/4 flex-col items-center order-3"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-64 h-64 lg:w-80 lg:h-80">
            <SmartphoneView />
          </div>
          <div className="flex items-center gap-2 text-gray-500 font-mono text-[10px] uppercase tracking-widest mt-4">
            <Smartphone className="w-3.5 h-3.5 text-accentPrimary" /> Digital Pulse
          </div>
        </motion.div>
      </div>
      
      <footer className="mt-24 text-neutral-600 font-mono text-[10px] uppercase tracking-[0.4em] text-center pb-10">
        Anish Inamadar <span className="mx-4 text-neutral-800">|</span> 2026 Creative Lab
      </footer>
    </div>
  );
}
