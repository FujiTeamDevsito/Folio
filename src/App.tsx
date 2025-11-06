import { useState, useEffect, useRef } from 'react';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Footer from './components/Footer';
import LoginForm from './components/admin/LoginForm';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [showAdmin, setShowAdmin] = useState(false);
  const { user, loading } = useAuth();
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({
    home: null,
    projects: null,
    about: null,
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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
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

        <section id="about" ref={(el) => (sectionsRef.current.about = el)}>
          <About />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
