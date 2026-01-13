// App.tsx
// Main Application Component
// Integrates all sections: Hero, About, Features, Demo, Team, Footer
// Provides smooth scrolling navigation and section composition

import { useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Demo from './components/Demo';
import Team from './components/Team';
import Footer from './components/Footer';

function App() {
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
      {/* Hero Section */}
      <Hero onGetStarted={scrollToDemo} />

      {/* About Section */}
      <About />

      {/* Features Section */}
      <Features />

      {/* Demo Section */}
      <section ref={demoRef} className="pt-10 pb-20 bg-gray-100">
        <Demo />
      </section>

      {/* Team Section */}
      <Team />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
