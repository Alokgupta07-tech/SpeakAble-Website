// Main Application Component
// Integrates all sections: Hero, About, Features, Demo, Team, Footer
// Provides smooth scrolling navigation

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
    demoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero onGetStarted={scrollToDemo} />

      {/* About Section */}
      <About />

      {/* Features Section */}
      <Features />

      {/* Demo Section */}
      <div ref={demoRef}>
        <Demo />
      </div>

      {/* Team Section */}
      <Team />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
