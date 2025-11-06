import { useState, useEffect } from 'react';

interface DiscordUser {
  discord_user: {
    username: string;
    discriminator: string;
    avatar: string;
    id: string;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Array<{
    emoji: any;
    type: number;
    name: string;
    details?: string;
    state?: string;
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
  }>;
  listening_to_spotify: boolean;
  spotify?: {
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
  };
}

interface DiscordStatusProps {
  userId: string;
}

export default function DiscordStatus({ userId }: DiscordStatusProps) {
  const [userData, setUserData] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscordStatus = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await response.json();
        
        if (data.success) {
          setUserData(data.data);
        }
      } catch (error) {
        console.error('Error fetching Discord status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscordStatus();
    const interval = setInterval(fetchDiscordStatus, 30000);

    return () => clearInterval(interval);
  }, [userId]);

  if (loading || !userData) {
    return (
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-slate-800 rounded-full" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-800 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  const statusColors = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
  };

  const statusText = {
    online: 'En línea',
    idle: 'Ausente',
    dnd: 'No molestar',
    offline: 'Desconectado',
  };

  const customActivity = userData.activities.find((a) => a.type === 4);
  const gameActivity = userData.activities.find((a) => a.type === 0);
  const vscodeActivity = userData.activities.find((a) => a.name === 'Visual Studio Code');

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-cyan-500/50 transition-all group max-w-md">
      <div className="flex items-start gap-4">
        {/* Discord Avatar - Larger */}
        <div className="relative flex-shrink-0">
          <img
            src={`https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.png?size=256`}
            alt="Discord Avatar"
            className="w-20 h-20 rounded-2xl ring-4 ring-slate-700 group-hover:ring-cyan-500/50 transition-all"
          />
          {/* Status Indicator - Larger */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-slate-900 flex items-center justify-center">
            <div className={`w-4 h-4 rounded-full ${statusColors[userData.discord_status]}`}>
              {userData.discord_status === 'online' && (
                <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75" />
              )}
            </div>
          </div>
        </div>

        {/* Discord Info - Larger */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <svg className="h-5 w-5 text-[#5865F2] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <p className="text-lg font-bold text-white truncate">
              {userData.discord_user.username}
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-2 h-2 rounded-full ${statusColors[userData.discord_status]}`} />
            <p className="text-sm text-gray-300 font-medium">
              {statusText[userData.discord_status]}
            </p>
          </div>

          {/* Custom Status */}
          {customActivity && customActivity.state && (
            <div className="bg-slate-800/50 rounded-xl p-3 mb-2">
              <p className="text-sm text-gray-300 line-clamp-2">
                {customActivity.emoji && (
                  <span className="mr-2">{customActivity.emoji.name}</span>
                )}
                {customActivity.state}
              </p>
            </div>
          )}

          {/* Visual Studio Code Activity */}
          {vscodeActivity && (
            <div className="bg-[#007ACC]/10 border border-[#007ACC]/30 rounded-xl p-3 mb-2">
              <div className="flex items-center gap-2 mb-1">
                <svg className="h-4 w-4 text-[#007ACC]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
                </svg>
                <p className="text-xs font-semibold text-[#007ACC]">Visual Studio Code</p>
              </div>
              <p className="text-xs text-gray-300 truncate">
                {vscodeActivity.details || 'Editando código'}
              </p>
              {vscodeActivity.state && (
                <p className="text-xs text-gray-400 truncate">
                  {vscodeActivity.state}
                </p>
              )}
            </div>
          )}

          {/* Game Activity */}
          {gameActivity && !vscodeActivity && (
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">🎮</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-cyan-400 truncate">
                    {gameActivity.name}
                  </p>
                  {gameActivity.details && (
                    <p className="text-xs text-gray-400 truncate">
                      {gameActivity.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Spotify */}
          {userData.listening_to_spotify && userData.spotify && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-green-400 truncate">
                    {userData.spotify.song}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {userData.spotify.artist}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}