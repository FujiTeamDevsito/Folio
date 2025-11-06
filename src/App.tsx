import { useState, useEffect, useRef } from 'react';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import MusicPlayer from './components/MusicPlayer';  // Mantén el import
import SocialLinks from './components/SocialLinks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginForm from './components/admin/LoginForm';
import AdminDashboard from './components/admin/AdminDashboard';
import Events from './components/Events';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [showAdmin, setShowAdmin] = useState(false);
  const { user, loading } = useAuth();
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({
    home: null,
    projects: null,
    about: null,
    events: null,
    social: null,
    contact: null,

  });

  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setShowAdmin(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (section: string) => {
    const element = sectionsRef.current[section];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Cargando...</div>
      </div>
    );
  }

  if (showAdmin) {
    return user ? <AdminDashboard /> : <LoginForm />;
  }

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} currentSection={currentSection} />

      <main>
        <section id="home" ref={(el) => (sectionsRef.current.home = el)}>
          <Hero onNavigate={handleNavigate} />
        </section>

        <section id="projects" ref={(el) => (sectionsRef.current.projects = el)}>
          <Projects />
        </section>

        <section id="events" ref={(el) => (sectionsRef.current.events = el)}>
          <Events />
        </section>
        
        <section id="about" ref={(el) => (sectionsRef.current.about = el)}>
          <About />
        </section>



        <section id="social" ref={(el) => (sectionsRef.current.social = el)}>
          <SocialLinks />
        </section>

        <section id="contact" ref={(el) => (sectionsRef.current.contact = el)}>
          <Contact />
        </section>
      </main>

      <Footer />
      
      {/* 🎵 Floating Music Player */}
      <MusicPlayer />
    </div>
  );
}

export default App;