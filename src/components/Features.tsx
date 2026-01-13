// Features Section Component
// Showcases key features of SpeakAble

import { Zap, Shield, Globe, Hand } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Hand,
      title: 'Instant Gesture Recognition',
      description: 'Advanced AI detects hand gestures in real-time using MediaPipe technology',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Zero Latency',
      description: 'Conversations flow naturally without frustrating delays',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Shield,
      title: 'Complete Privacy',
      description: 'All processing happens locally - no video data is stored or transmitted',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Globe,
      title: 'Universal Access',
      description: 'language support breaking barriers worldwide with affordable technology',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technology designed for seamless, natural communication
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h3>
              <div className="space-y-6">
                {[
                  { step: '1', title: 'Detect Gesture', desc: 'Camera captures hand movements' },
                  { step: '2', title: 'Process Motion', desc: 'AI analyzes gesture patterns' },
                  { step: '3', title: 'Convert to Text', desc: 'Gesture mapped to words' },
                  { step: '4', title: 'Synthesize Voice', desc: 'Natural speech output' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">{item.title}</div>
                      <div className="text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">✋</div>
              <div className="text-3xl font-bold text-blue-900 mb-2">→</div>
              <div className="text-6xl mb-4">💬</div>
              <div className="text-3xl font-bold text-blue-900 mb-2">→</div>
              <div className="text-6xl">🔊</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
