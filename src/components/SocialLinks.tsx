import { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon_name: string;
  order_position: number;
}

export default function SocialLinks() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSocialLinks();
  }, []);

  const loadSocialLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setSocialLinks(data || []);
    } catch (error) {
      console.error('Error loading social links:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.Link;
  };

  if (loading || socialLinks.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-3">
            Conecta Conmigo
          </h2>
          <p className="text-gray-400">Sígueme en mis redes sociales</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => {
            const IconComponent = getIcon(link.icon_name);
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                  <IconComponent className="h-8 w-8 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
                  <p className="text-white font-medium mt-3 text-sm">{link.platform}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
