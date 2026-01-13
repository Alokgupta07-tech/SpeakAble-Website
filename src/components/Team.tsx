// Team Section Component
// Displays team members and their roles

import { User } from 'lucide-react';

export default function Team() {
  const teamMembers = [
    { name: 'Alok Kumar', role: '1st year CSE CORE', focus:''},
    { name: 'Adrija Datta', role: '1st year CSE CORE', focus:''},
    { name: 'Yogya Gupta', role: '1st year CSE CORE', focus:''},
    { name: 'Ayush Rai', role: '1st year CSE CORE', focus: ''},
    { name: 'Aryan Kumar Singh', role: '1st year CSE AI/ML', focus:''},
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Team: Chill Coders</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A focused team of 5 developers and designers dedicated to solving real-world accessibility challenges through code
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-blue-100"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-2">{member.role}</p>
              <p className="text-xs text-gray-600">{member.focus}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Our Commitment</h3>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            We believe in the power of technology to break barriers and create meaningful impact.
            SpeakAble isn't just a project — it's our contribution to a more inclusive world.
          </p>
        </div>
      </div>
    </section>
  );
}
