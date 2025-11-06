import { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    setSuccess(false);

    try {
      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error al enviar el mensaje. Por favor, intenta de nuevo.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-emerald-500/10" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-2xl backdrop-blur-sm border border-cyan-500/30 mb-6">
            <Mail className="h-12 w-12 text-cyan-400" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Contacto
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl" />

          {success && (
            <div className="mb-6 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/50 text-emerald-300 px-6 py-4 rounded-xl backdrop-blur-sm">
              ¡Mensaje enviado con éxito! Te responderé pronto.
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-300 px-6 py-4 rounded-xl backdrop-blur-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-cyan-300 mb-2">
                <User className="h-4 w-4" />
                Nombre *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tu nombre completo"
                required
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-cyan-300 mb-2">
                <Mail className="h-4 w-4" />
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-cyan-300 mb-2">
                <MessageSquare className="h-4 w-4" />
                Asunto
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="¿De qué quieres hablar?"
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-cyan-300 mb-2">
                <MessageSquare className="h-4 w-4" />
                Mensaje *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Cuéntame sobre tu proyecto..."
                required
                rows={6}
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all backdrop-blur-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 group"
            >
              {sending ? (
                'Enviando...'
              ) : (
                <>
                  Enviar Mensaje
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
