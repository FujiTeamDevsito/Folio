import { useEffect, useState } from 'react';
import { Users, Code2, Briefcase } from 'lucide-react';
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
    <section className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Sobre Mí</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desarrollador apasionado por crear soluciones tecnológicas innovadoras
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 p-8 rounded-xl border border-emerald-200">
            <Code2 className="h-12 w-12 text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Desarrollo Full Stack
            </h3>
            <p className="text-gray-600">
              Experiencia en frontend y backend con tecnologías modernas
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-xl border border-cyan-200">
            <Briefcase className="h-12 w-12 text-cyan-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Proyectos Diversos
            </h3>
            <p className="text-gray-600">
              Desarrollo de aplicaciones web, APIs y soluciones empresariales
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-xl border border-blue-200">
            <Users className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Trabajo en Equipo
            </h3>
            <p className="text-gray-600">
              Colaboración efectiva y comunicación clara en proyectos
            </p>
          </div>
        </div>

        {collaborators.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Colaboradores
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collaborators.map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col items-center text-center">
                    {collaborator.avatar_url ? (
                      <img
                        src={collaborator.avatar_url}
                        alt={collaborator.name}
                        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-emerald-400"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 mb-4 flex items-center justify-center text-white text-2xl font-bold">
                        {collaborator.name.charAt(0)}
                      </div>
                    )}

                    <h4 className="text-xl font-bold text-slate-900 mb-1">
                      {collaborator.name}
                    </h4>
                    <p className="text-emerald-600 font-medium mb-3">
                      {collaborator.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      {collaborator.bio}
                    </p>

                    <div className="flex gap-3">
                      {collaborator.linkedin_url && (
                        <a
                          href={collaborator.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          LinkedIn
                        </a>
                      )}
                      {collaborator.github_url && (
                        <a
                          href={collaborator.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-slate-700 text-sm font-medium"
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
            <p className="text-gray-600">Cargando colaboradores...</p>
          </div>
        )}
      </div>
    </section>
  );
}
