import { Github, Linkedin } from 'lucide-react';

export default function Team() {
  const teamMembers = [
    { name: 'Alok Kumar', role: 'Full Stack Developer', year: '1st Year CSE Core' },
    { name: 'Adrija Datta', role: 'AI/ML Engineer', year: '1st Year CSE Core' },
    { name: 'Yogya Gupta', role: 'Frontend Developer', year: '1st Year CSE Core' },
    { name: 'Ayush Rai', role: 'Backend Developer', year: '1st Year CSE Core' },
    { name: 'Aryan Kumar Singh', role: 'AI Specialist', year: '1st Year CSE AI/ML' },
  ];

  const colors = [
    'from-purple-500 to-indigo-600',
    'from-pink-500 to-rose-600',
    'from-orange-500 to-amber-600',
    'from-green-500 to-emerald-600',
    'from-blue-500 to-cyan-600'
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-bold mb-4">
            Team Chill Coders
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Meet the Builders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A passionate team of first-year students turning ideas into impact through code and innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border-2 border-gray-100 hover:border-purple-200"
            >
              <div className="relative mb-6">
                <div className={`bg-gradient-to-br ${colors[index]} w-24 h-24 rounded-2xl flex items-center justify-center mx-auto transform group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                  <span className="text-4xl font-bold text-white">{member.name.charAt(0)}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm font-semibold text-purple-600 mb-2">{member.role}</p>
              <p className="text-xs text-gray-500 mb-4">{member.year}</p>
              <div className="flex justify-center gap-3">
                <a href="#" className="bg-gray-100 p-2 rounded-lg hover:bg-purple-100 transition-colors">
                  <Github className="w-4 h-4 text-gray-600" />
                </a>
                <a href="#" className="bg-gray-100 p-2 rounded-lg hover:bg-purple-100 transition-colors">
                  <Linkedin className="w-4 h-4 text-gray-600" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"></div>
          <div className="relative p-12 md:p-16 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment</h3>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-95">
              We're not just building an app—we're creating impact. SpeakAble represents our belief that technology should empower everyone, breaking barriers and building a more inclusive future for all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
