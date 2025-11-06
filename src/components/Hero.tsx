import { Code2, Terminal, Sparkles, ChevronDown } from 'lucide-react';

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
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8 inline-block">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-cyan-500/30">
              <Code2 className="h-20 w-20 text-cyan-400" />
            </div>
            <Sparkles className="h-8 w-8 text-emerald-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>

        <h1 className="text-6xl sm:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          ELBGG
        </h1>

        <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-8">
          <p className="text-xl sm:text-2xl text-cyan-300 font-medium">
            Desarrollador
          </p>
        </div>

        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Creando experiencias digitales excepcionales con tecnologías modernas y soluciones innovadoras.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {technologies.map((tech, index) => (
            <span
              key={tech}
              className="px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl text-sm font-medium text-gray-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-105 cursor-default"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('projects')}
            className="group relative px-8 py-4 overflow-hidden rounded-xl font-medium transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 transition-transform group-hover:scale-105" />
            <span className="relative text-white flex items-center justify-center gap-2">
              Ver Proyectos
              <Terminal className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="px-8 py-4 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/50 text-white rounded-xl font-medium transition-all border border-slate-700 hover:border-cyan-500/50 hover:scale-105"
          >
            Conocer Más
          </button>
        </div>

        <div className="mt-16 flex justify-center">
          <ChevronDown className="h-8 w-8 text-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
