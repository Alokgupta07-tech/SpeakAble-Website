import { Hand, MessageSquare, Mic2 } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Icon Trio */}
        <div className="flex justify-center items-center gap-6 mb-10">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl animate-float">
            <Hand className="w-12 h-12 text-white" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl animate-float" style={{ animationDelay: '0.5s' }}>
            <MessageSquare className="w-12 h-12 text-white" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl animate-float" style={{ animationDelay: '1s' }}>
            <Mic2 className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-red-300 to-pink-300">
            Speak
          </span>
          <span className="text-white">Able</span>
        </h1>

        <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-medium mb-6 leading-tight">
          Transform Gestures into Speech
        </p>

        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
          Empowering 70M+ speech-impaired individuals worldwide with real-time AI-powered gesture recognition and natural voice synthesis
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onGetStarted}
            className="group bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3"
          >
            <span>Experience Live Demo</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <a
            href="#features"
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 border-2 border-white/30"
          >
            Learn More
          </a>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">70M+</div>
            <div className="text-white/80 text-sm">People Worldwide</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">&lt;100ms</div>
            <div className="text-white/80 text-sm">Response Time</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-white/80 text-sm">Privacy Protected</div>
          </div>
        </div>
      </div>
    </section>
  );
}
