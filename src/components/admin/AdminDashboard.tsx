import { useState } from 'react';
import { LogOut, Briefcase, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ProjectsManager from './ProjectsManager';
import CollaboratorsManager from './CollaboratorsManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'collaborators'>('projects');
  const { signOut } = useAuth();

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
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
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
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'collaborators'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="h-5 w-5" />
              Colaboradores
            </button>
          </div>
        </div>

        {activeTab === 'projects' ? <ProjectsManager /> : <CollaboratorsManager />}
      </div>
    </div>
  );
}
