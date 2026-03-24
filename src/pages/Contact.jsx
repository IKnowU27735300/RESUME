import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  const [userEmail, setUserEmail] = useState('');
  const [subjectOption, setSubjectOption] = useState('Want to work with you');

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
    <div className="w-full flex-grow flex flex-col items-center justify-center py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">
        Get In <span className="text-gradient">Touch</span>
      </h2>
      
      <motion.div 
        className="glass w-full max-w-2xl p-8 md:p-12 rounded-3xl shadow-xlg relative overflow-hidden flex flex-col items-center border border-gray-800/50"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-accentPrimary rounded-full blur-[100px] opacity-20 pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accentSecondary rounded-full blur-[100px] opacity-20 pointer-events-none" />
        
        <p className="text-lg md:text-xl text-gray-300 font-sans mb-8 text-center w-full">
          Open for new opportunities and interesting projects. <br className="hidden md:block"/>
          Let's connect and build something extraordinary!
        </p>

        <form onSubmit={handleSendMail} className="w-full max-w-md flex flex-col gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-400 text-sm font-bold tracking-wide">
              YOUR EMAIL
            </label>
            <input
              id="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accentPrimary transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-gray-400 text-sm font-bold tracking-wide">
              WHAT'S ON YOUR MIND?
            </label>
            <select
              id="subject"
              value={subjectOption}
              onChange={(e) => setSubjectOption(e.target.value)}
              className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accentPrimary transition-colors appearance-none cursor-pointer"
              required
            >
              <option value="Want to work with you" className="bg-darkBg text-white">Want to work with you</option>
              <option value="Just chit-chat about the projects" className="bg-darkBg text-white">Just chit-chat about the projects</option>
            </select>
            {/* Custom dropdown arrow to replace default browser styling if needed, keeping it simple for now */}
          </div>

          <button
            type="submit"
            className="mt-6 w-full flex items-center justify-center px-8 py-4 bg-accentPrimary hover:bg-accentTertiary text-black rounded-xl font-bold text-lg transition-all group shadow-[0_0_20px_rgba(var(--color-accentPrimary),0.4)] hover:shadow-[0_0_30px_rgba(var(--color-accentTertiary),0.6)] hover:scale-[1.02]"
          >
            <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Send Mail
          </button>
        </form>

        <div className="mt-12 pt-8 w-full border-t border-gray-700/50 flex justify-center gap-8 relative z-10">
          <a
             href="https://github.com/IKnowU27735300"
             target="_blank"
             rel="noopener noreferrer"
             className="w-14 h-14 flex items-center justify-center glass rounded-full hover:bg-white hover:text-black transition-all group border-gray-600/50 hover:border-white shadow-lg"
             title="GitHub"
          >
             <Github className="w-6 h-6 group-hover:scale-110 transition-transform text-accentPrimary group-hover:text-black" />
          </a>

          <a
             href="https://www.linkedin.com/in/anish-inamadar-858461303"
             target="_blank"
             rel="noopener noreferrer"
             className="w-14 h-14 flex items-center justify-center glass rounded-full hover:bg-white hover:text-black transition-all group border-gray-600/50 hover:border-white shadow-lg"
             title="LinkedIn"
          >
             <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform text-[#0a66c2] group-hover:text-black" />
          </a>
        </div>
      </motion.div>
      
      <footer className="mt-20 text-gray-500 font-mono text-sm text-center">
        &copy; 2026 Anish Tanaji Inamadar. Built with ❤️ and <span className="text-accentPrimary">AI</span>.
      </footer>
    </div>
  );
}
