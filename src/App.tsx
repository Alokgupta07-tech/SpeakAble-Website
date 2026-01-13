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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <Hero onGetStarted={scrollToDemo} />

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Features Section */}
      <section id="features">
        <Features />
      </section>

      {/* Demo Section */}
      <section ref={demoRef} id="demo" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <Demo />
      </section>

      {/* Team Section */}
      <section id="team">
        <Team />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
