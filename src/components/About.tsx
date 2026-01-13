import { Target, Sparkles, Users2 } from 'lucide-react';

export default function About() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Why SpeakAble Exists
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Breaking Barriers,<br />Building Connections
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every person deserves to be heard. We're making that possible through cutting-edge AI technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-purple-200">
            <div className="absolute -top-6 left-8">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Target className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h3>
              <p className="text-gray-600 leading-relaxed">
                Over 70 million individuals worldwide struggle with speech impairments, facing isolation and limited access to communication tools that truly understand their needs.
              </p>
            </div>
          </div>

          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-pink-200">
            <div className="absolute -top-6 left-8">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time AI gesture recognition transforms hand movements into natural speech instantly. No delays, no barriers—just seamless conversation.
              </p>
            </div>
          </div>

          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-green-200">
            <div className="absolute -top-6 left-8">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Users2 className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Creating a world where communication barriers don't exist. Where everyone can express themselves freely and be understood, regardless of their abilities.
              </p>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"></div>
          <div className="relative p-12 md:p-16 text-center">
            <svg className="w-16 h-16 text-white/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.7-.5 3.7-1.3l-2.4 7.3h4.4l3.1-9.5C18.4 14.8 18 12.9 18 12c0-3.3-2.7-6-6-6zm0 0M22 8c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.7-.5 3.7-1.3l-2.4 7.3h4.4l3.1-9.5c-.4-1.7-.8-3.6-.8-4.5 0-3.3-2.7-6-6-6zm0 0"/>
            </svg>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6 leading-relaxed">
              Communication is a fundamental human right, not a privilege
            </blockquote>
            <p className="text-lg text-white/90 font-medium">— UN Convention on the Rights of Persons with Disabilities</p>
          </div>
        </div>
      </div>
    </section>
  );
}
