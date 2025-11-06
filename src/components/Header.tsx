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
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Code2 className="h-8 w-8 text-emerald-400" />
            <span className="text-xl font-bold">ELBGG</span>
          </button>

          <nav className="flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentSection === item.id
                    ? 'text-emerald-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
