import { useEffect, useState } from 'react';
import { Mail, Trash2, CheckCircle, Circle } from 'lucide-react';
import { supabase, ContactMessage } from '../../lib/supabase';

export default function ContactMessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      loadMessages();
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Error al actualizar el mensaje');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este mensaje?')) return;

    try {
      const { error } = await supabase.from('contact_messages').delete().eq('id', id);

      if (error) throw error;
      loadMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Error al eliminar el mensaje');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Mensajes de Contacto</h2>
          {unreadCount > 0 && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              {unreadCount} sin leer
            </span>
          )}
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No hay mensajes aún.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`bg-white rounded-xl shadow-sm border p-6 transition-all ${
                message.read
                  ? 'border-gray-200'
                  : 'border-emerald-200 bg-emerald-50/30'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-slate-900 text-lg">
                      {message.name}
                    </h3>
                    {!message.read && (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                        Nuevo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{message.email}</p>
                  {message.subject && (
                    <p className="text-sm text-gray-500 mt-1">
                      Asunto: {message.subject}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(message.created_at).toLocaleString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => toggleRead(message.id, message.read)}
                    className={`p-2 rounded-lg transition-colors ${
                      message.read
                        ? 'text-gray-600 hover:bg-gray-100'
                        : 'text-emerald-600 hover:bg-emerald-50'
                    }`}
                    title={message.read ? 'Marcar como no leído' : 'Marcar como leído'}
                  >
                    {message.read ? (
                      <Circle className="h-5 w-5" />
                    ) : (
                      <CheckCircle className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
