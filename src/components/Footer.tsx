import { Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Code2 className="h-6 w-6 text-emerald-400" />
            <span className="text-lg font-bold">ELBGG</span>
          </div>

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ELBGG. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
