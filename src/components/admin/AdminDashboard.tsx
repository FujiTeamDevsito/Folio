import { useState } from 'react';
import { LogOut, Briefcase, Users, Share2, Mail, Music, Trophy } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ProjectsManager from './ProjectsManager';
import CollaboratorsManager from './CollaboratorsManager';
import SocialLinksManager from './SocialLinksManager';
import ContactMessagesManager from './ContactMessagesManager';
import MusicTracksManager from './MusicTracksManager';
import EventsManager from './EventsManager';

type TabType = 'projects' | 'collaborators' | 'social' | 'music' | 'events' | 'messages';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const { signOut } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsManager />;
      case 'collaborators':
        return <CollaboratorsManager />;
      case 'social':
        return <SocialLinksManager />;
      case 'messages':
        return <ContactMessagesManager />;
      case 'music':
        return <MusicTracksManager />;
      case 'events':
        return <EventsManager />;
      default:
        return <ProjectsManager />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-slate-900">
              Panel de Administración
            </h1>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex gap-4 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Briefcase className="h-5 w-5" />
              Proyectos
            </button>
            <button
              onClick={() => setActiveTab('collaborators')}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'collaborators'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="h-5 w-5" />
              Colaboradores
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'social'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Share2 className="h-5 w-5" />
              Redes Sociales
            </button>
            <button
              onClick={() => setActiveTab('music')}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'music'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Music className="h-5 w-5" />
              Música
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'messages'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Mail className="h-5 w-5" />
              Mensajes
            </button>
            

            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'events'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Trophy className="h-5 w-5" />
              Eventos
            </button>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}