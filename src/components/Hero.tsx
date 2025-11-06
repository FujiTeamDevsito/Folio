import { Code2, Terminal, Sparkles } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const technologies = [
    'Java',
    'JavaScript',
    'HTML',
    'CSS',
    'Node.js',
    'Python',
    'TypeScript',
    'VSC',
    'IntelliJ IDEA',
    'Git',
    'GitHub',
    'MongoDB',
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 inline-block">
          <div className="relative">
            <Code2 className="h-20 w-20 text-emerald-400 animate-pulse" />
            <Sparkles className="h-6 w-6 text-emerald-300 absolute -top-2 -right-2" />
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          ELBGG
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mb-8">
          Desarrollador Full Stack
        </p>

        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Creando experiencias digitales excepcionales con tecnologías modernas y soluciones innovadoras.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-gray-300 hover:border-emerald-400 hover:text-emerald-400 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('projects')}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-emerald-500/30"
          >
            Ver Proyectos
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700"
          >
            Conocer Más
          </button>
        </div>

        <div className="mt-16 flex justify-center">
          <Terminal className="h-6 w-6 text-emerald-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
