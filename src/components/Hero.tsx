// Hero Section Component
// Displays the main landing section with tagline and CTA button

import { Volume2 } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-300 overflow-hidden">
      {/* Animated Background Waves */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8 flex justify-center">
          <Volume2 className="w-20 h-20 text-white animate-bounce" />
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
          <span className="text-red-500">Speak</span>Able
        </h1>

        <p className="text-3xl md:text-4xl text-white font-light mb-4">
          Giving Voice to the Voiceless
        </p>

        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
          Real-time gesture-to-speech communication platform empowering speech-impaired individuals through AI
        </p>

        <button
          onClick={onGetStarted}
          className="bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-2xl"
        >
          Try Live Demo
        </button>
      </div>

    </section>
  );
}
