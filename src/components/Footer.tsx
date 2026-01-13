import { Mail, Github, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <h3 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                Speak
              </span>
              <span className="text-white">Able</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Empowering 70+ million speech-impaired individuals worldwide with AI-powered gesture recognition technology. Breaking barriers, one gesture at a time.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/Alokgupta07-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-colors border border-white/10"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-colors border border-white/10"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:agupta88094@gmail.com"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-colors border border-white/10"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-purple-400">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Features
                </a>
              </li>
              <li>
                <a href="#demo" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Live Demo
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Our Team
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-pink-400">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:agupta88094@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  agupta88094@gmail.com
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                Team Chill Coders
              </li>
              <li className="text-gray-400 text-sm">
                Built for Inclusion
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 SpeakAble. Empowering communication through AI.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-pink-500 fill-current" /> by Team Chill Coders
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
