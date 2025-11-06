import { useEffect, useState } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">Cargando proyectos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Proyectos</h2>
          <p className="text-lg text-gray-600">
            Algunos de mis trabajos más destacados
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No hay proyectos disponibles aún.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-200"
              >
                {project.image_url && (
                  <div className="h-48 bg-gradient-to-br from-emerald-500 to-cyan-500 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-700 font-medium"
                      >
                        <Github className="h-4 w-4" />
                        Código
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
