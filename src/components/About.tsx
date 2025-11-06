import { useEffect, useState } from 'react';
import { Users, Code2, Briefcase, Zap } from 'lucide-react';
import { supabase, Collaborator } from '../lib/supabase';

export default function About() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollaborators();
  }, []);

  const loadCollaborators = async () => {
    try {
      const { data, error } = await supabase
        .from('collaborators')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setCollaborators(data || []);
    } catch (error) {
      console.error('Error loading collaborators:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-2xl backdrop-blur-sm border border-cyan-500/30 mb-6">
            <Zap className="h-10 w-10 text-cyan-400" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            Sobre Mí
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Desarrollador apasionado por crear soluciones tecnológicas innovadoras
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group relative bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="inline-block p-3 bg-cyan-500/10 rounded-xl mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <Code2 className="h-12 w-12 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Desarrollador
              </h3>
              <p className="text-gray-400">
                Experiencia en frontend y modding en Minecraft
              </p>
            </div>
          </div>

          <div className="group relative bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="inline-block p-3 bg-emerald-500/10 rounded-xl mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <Briefcase className="h-12 w-12 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Proyectos Diversos
              </h3>
              <p className="text-gray-400">
                Desarrollo de aplicaciones web, APIs y soluciones empresariales
              </p>
            </div>
          </div>

          <div className="group relative bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="inline-block p-3 bg-cyan-500/10 rounded-xl mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <Users className="h-12 w-12 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Trabajo en Equipo
              </h3>
              <p className="text-gray-400">
                Colaboración efectiva y comunicación clara en proyectos
              </p>
            </div>
          </div>
        </div>

        {collaborators.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-8">
              Colaboradores
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collaborators.map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="group relative bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative flex flex-col items-center text-center">
                    {collaborator.avatar_url ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-lg opacity-50" />
                        <img
                          src={collaborator.avatar_url}
                          alt={collaborator.name}
                          className="relative w-24 h-24 rounded-full object-cover mb-4 border-2 border-cyan-400"
                        />
                      </div>
                    ) : (
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-lg opacity-50" />
                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-white text-2xl font-bold">
                          {collaborator.name.charAt(0)}
                        </div>
                      </div>
                    )}

                    <h4 className="text-xl font-bold text-white mb-1">
                      {collaborator.name}
                    </h4>
                    <p className="text-cyan-400 font-medium mb-3">
                      {collaborator.role}
                    </p>
                    <p className="text-gray-400 text-sm mb-4">
                      {collaborator.bio}
                    </p>

                    <div className="flex gap-3">
                      {collaborator.linkedin_url && (
                        <a
                          href={collaborator.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                        >
                          LinkedIn
                        </a>
                      )}
                      {collaborator.github_url && (
                        <a
                          href={collaborator.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <p className="text-cyan-400">Cargando colaboradores...</p>
          </div>
        )}
      </div>
    </section>
  );
}
