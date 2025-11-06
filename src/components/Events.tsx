import { useState, useEffect } from 'react';
import { Calendar, MapPin, Award, ExternalLink, Trophy } from 'lucide-react';
import { supabase, type Event } from '../lib/supabase';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      hackathon: 'from-purple-500 to-pink-500',
      conference: 'from-blue-500 to-cyan-500',
      workshop: 'from-green-500 to-emerald-500',
      competition: 'from-orange-500 to-red-500',
      meetup: 'from-yellow-500 to-orange-500',
    };
    return colors[type.toLowerCase()] || 'from-gray-500 to-slate-500';
  };

  const getEventTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'hackathon':
        return '💻';
      case 'conference':
        return '🎤';
      case 'workshop':
        return '🛠️';
      case 'competition':
        return '🏆';
      case 'meetup':
        return '👥';
      default:
        return '📅';
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-cyan-400">Cargando eventos...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-cyan-500/10 rounded-2xl mb-4">
            <Trophy className="h-8 w-8 text-cyan-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Eventos y Participaciones
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Eventos en los que participe como desarrollador
          </p>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay eventos registrados todavía.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="group bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  {event.image_url ? (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {getEventTypeIcon(event.event_type)}
                    </div>
                  )}
                  {/* Event Type Badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getEventTypeColor(
                      event.event_type
                    )} shadow-lg`}
                  >
                    {event.event_type}
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {event.title}
                  </h3>

                  {/* Organization */}
                  {event.organization && (
                    <p className="text-sm text-gray-400 mb-3 font-medium">
                      {event.organization}
                    </p>
                  )}

                  {/* Role */}
                  <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm text-cyan-400 mb-3">
                    {event.role}
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>


                  {/* Technologies */}
                  {event.technologies && event.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-slate-800 text-xs text-gray-300 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                      {event.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-slate-800 text-xs text-gray-300 rounded-lg">
                          +{event.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Link */}
                  {event.link_url && (
                    <a
                      href={event.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                    >
                      Ver más
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}