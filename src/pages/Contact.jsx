import React, { useState, useRef } from 'react';
import ParticleHeader from '../components/ParticleHeader';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, Github, Linkedin, Smartphone, Phone } from 'lucide-react';
import { SmartphoneView } from '../components/Contact3D';

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
    <div ref={containerRef} className="w-full min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#C5A021]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center mb-16 px-4 w-full h-24">
        <ParticleHeader 
          text="Get In Touch" 
          subtext="Let's Build the Future"
        />
      </div>

      <div className="w-full max-w-7xl flex flex-col xl:flex-row items-center justify-center gap-12 lg:gap-20">

        {/* Center: Contact Form */}
        <div className="w-full max-w-xl xl:w-2/4 order-1 xl:order-2">
          <motion.div 
            className="glass p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col items-center border border-white/5"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base md:text-lg text-gray-300 font-sans mb-6 text-center leading-relaxed">
              I'm always open to discussing <span className="text-white font-bold underline decoration-accentPrimary/50">AI solutions</span>, 
              full-stack development, or creative partnerships.
            </p>
            <div className="flex items-center gap-2 text-gray-400 font-mono text-xs uppercase tracking-widest mb-10">
              <Phone className="w-4 h-4 text-accentSecondary" />
              <a href="tel:+918762352662" className="hover:text-accentSecondary transition-colors">+91 8762352662</a>
            </div>

            <form onSubmit={handleSendMail} className="w-full flex flex-col gap-6">
              <div className="group space-y-2">
                <label htmlFor="email" className="text-gray-500 text-[10px] font-black tracking-[0.2em] uppercase ml-1">
                  Your Satellite Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-accentPrimary focus:bg-white/10 transition-all shadow-inner"
                  required
                />
              </div>

              <div className="group space-y-2">
                <label htmlFor="subject" className="text-gray-500 text-[10px] font-black tracking-[0.2em] uppercase ml-1">
                  Message Frequency
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    value={subjectOption}
                    onChange={(e) => setSubjectOption(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accentPrimary focus:bg-white/10 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="Want to work with you" className="bg-darkBg text-white">Project Collaboration</option>
                    <option value="Just chit-chat about the projects" className="bg-darkBg text-white">General Inquiry</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    ▼
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full flex items-center justify-center px-8 py-5 bg-white text-black rounded-2xl font-black text-lg transition-all group hover:bg-accentPrimary hover:scale-[1.02] active:scale-95 shadow-xl hover:shadow-accentPrimary/30"
              >
                Launch Message
                <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>

            <div className="mt-12 pt-8 w-full border-t border-white/5 flex justify-center gap-6">
              {[
                { icon: Github, href: "https://github.com/IKnowU27735300", color: "#fff" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/anish-inamadar-858461303", color: "#00f0ff" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-white hover:text-black transition-all group border border-white/10 hover:border-white shadow-lg"
                >
                  <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side Model: Smartphone */}
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
            <Smartphone className="w-3 h-3 text-accentPrimary" /> Digital Pulse
          </div>
        </motion.div>
      </div>
      
      <footer className="mt-24 text-gray-600 font-mono text-[10px] uppercase tracking-[0.4em] text-center pb-10">
        Anish Inamadar <span className="mx-4 text-white/20">|</span> 2026 Creative Lab
      </footer>
    </div>
  );
}
