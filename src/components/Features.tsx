import { Zap, Shield, Globe, Hand, Brain, Clock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Hand,
      title: 'AI-Powered Recognition',
      description: 'MediaPipe-based hand tracking with 95%+ accuracy for precise gesture detection',
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: Clock,
      title: 'Real-Time Processing',
      description: 'Sub-100ms latency ensures natural, fluid conversations without interruption',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Zero cloud dependency—all processing happens locally on your device',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Brain,
      title: 'Smart Learning',
      description: 'Adaptive AI learns your gesture patterns for personalized accuracy',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Support for multiple languages to break global communication barriers',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-50'
    },
    {
      icon: Zap,
      title: 'Web-Based',
      description: 'No installation needed—access from any device with a camera and browser',
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Powerful Technology
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Built for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Combining cutting-edge AI with intuitive design for seamless communication
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} rounded-3xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border-2 border-transparent hover:border-gray-200`}
            >
              <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 md:p-16 shadow-xl border-2 border-purple-100">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">How SpeakAble Works</h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { step: '1', title: 'Capture Gesture', desc: 'Your camera detects hand movements in real-time', icon: '📹' },
                { step: '2', title: 'AI Analysis', desc: 'MediaPipe AI processes gesture patterns instantly', icon: '🧠' },
                { step: '3', title: 'Text Conversion', desc: 'Gestures are mapped to meaningful words', icon: '✍️' },
                { step: '4', title: 'Voice Output', desc: 'Natural speech synthesis brings words to life', icon: '🔊' }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                    </div>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-12 shadow-lg">
              <div className="flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-200 rounded-full blur-2xl opacity-50"></div>
                  <div className="relative text-7xl">✋</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
                  <div className="mx-3 text-purple-600 font-bold">→</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-200 rounded-full blur-2xl opacity-50"></div>
                  <div className="relative text-7xl">💬</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
                  <div className="mx-3 text-purple-600 font-bold">→</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-200 rounded-full blur-2xl opacity-50"></div>
                  <div className="relative text-7xl">🔊</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
