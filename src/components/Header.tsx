import { Code2 } from 'lucide-react';

interface HeaderProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export default function Header({ onNavigate, currentSection }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'about', label: 'Sobre Mí' },
    { id: 'social', label: 'Social' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl text-white shadow-lg z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
              <Code2 className="relative h-8 w-8 text-cyan-400" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              ELBGG
            </span>
          </button>

          <nav className="flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                  currentSection === item.id
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {currentSection === item.id && (
                  <span className="absolute inset-0 bg-cyan-500/10 rounded-lg border border-cyan-500/30" />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
