// About Section Component
// Explains the problem, solution, and mission

import { Users, Heart, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Breaking communication barriers through AI-powered innovation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">The Challenge</h3>
            <p className="text-gray-700">
              70+ million people worldwide face daily communication barriers due to speech impairments
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Solution</h3>
            <p className="text-gray-700">
              Real-time gesture-to-speech conversion that creates natural, flowing conversations instantly
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">The Impact</h3>
            <p className="text-gray-700">
              Breaking isolation, building inclusion, and honoring dignity for every individual
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl p-12 text-white text-center">
          <blockquote className="text-3xl font-light italic mb-4">
            "Communication is a basic human right"
          </blockquote>
          <p className="text-lg opacity-90">— UN Convention on Rights of Persons with Disabilities</p>
        </div>
      </div>
    </section>
  );
}
