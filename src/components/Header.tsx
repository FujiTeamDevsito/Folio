interface HeaderProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export default function Header({ onNavigate, currentSection }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'about', label: 'Sobre Mí' },
    { id: 'events', label: 'Eventos' },
    { id: 'social', label: 'Social' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl text-white shadow-lg z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 hover:opacity-80 transition-all group"
          >
            <div className="relative">
              {/* Efecto de glow alrededor del GIF */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity" />
              
              {/* GIF Container con border animado */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400 group-hover:border-emerald-400 transition-colors shadow-lg shadow-cyan-500/50">
                {/* Coloca tu GIF aquí */}
                <img 
                  src="https://media.tenor.com/jwFIA8V1_7MAAAAM/mambo-ume-usume.gif" 
                  alt="ELBGG Logo" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent pointer-events-none" />
              </div>
            </div>
            
            {/* Nombre con efecto */}
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-emerald-400 group-hover:via-cyan-400 group-hover:to-emerald-400 transition-all duration-300">
                ELBGG
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Developer
              </span>
            </div>
          </button>

          <nav className="hidden md:flex space-x-1">
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
                  <>
                    <span className="absolute inset-0 bg-cyan-500/10 rounded-lg border border-cyan-500/30" />
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  </>
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => {
              // Aquí podrías añadir un menú móvil si lo necesitas
              console.log('Mobile menu');
            }}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}