// Footer Component
// Contains copyright, contact info, and social links

import { Mail, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-red-500">Speak</span>Able
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Empowering communication through AI. Breaking barriers, building bridges.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:agupta88094@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                agupta88094@gmail.com
              </a>
              <a
                href="https://instagram.com/yogyaagupta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                @yogyaagupta
              </a>
            </div>
          </div>

          {/* Mission */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Mission</h4>
            <p className="text-gray-400 leading-relaxed">
              Making assistive technology accessible to 70+ million people worldwide through innovative AI solutions.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 SpeakAble | Empowering Communication through AI
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Built with ❤️ by Team Chill Coders for a more inclusive world
          </p>
        </div>
      </div>
    </footer>
  );
}
