import { Code2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-8 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg blur-md opacity-50" />
              <Code2 className="relative h-6 w-6 text-cyan-400" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              ELBGG
            </span>
          </div>

          <p className="text-gray-400 text-sm flex items-center gap-2">
            <span>© {new Date().getFullYear()} ELBGG. Todos los derechos reservados.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline flex items-center gap-1">
              Hecho con <Heart className="h-3 w-3 text-cyan-400" /> y código
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
