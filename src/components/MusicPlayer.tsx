import { useState, useEffect } from 'react';
import { X, ChevronUp, ChevronDown, Volume2, VolumeX, Play } from 'lucide-react';
import { supabase, type MusicTrack } from '../lib/supabase';

// Componente de visualizador de audio
function AudioVisualizer({ isPlaying = true }: { isPlaying?: boolean }) {
  return (
    <div className="flex items-end justify-center gap-1 h-6 w-10">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-1.5 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-sm ${
            isPlaying ? 'animate-audio-bar' : 'h-1'
          }`}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: `${0.6 + Math.random() * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function MusicPlayer() {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(70);
  const [showSpotifyPrompt, setShowSpotifyPrompt] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const currentTrack = tracks[currentTrackIndex];
  const isSpotify = currentTrack?.platform === 'spotify';
  const isYouTube = currentTrack?.platform === 'youtube';

  // Aplicar volumen global SOLO a YouTube
  useEffect(() => {
    const volumeLevel = isMuted ? 0 : volume / 100;
    
    const mediaElements = document.querySelectorAll('audio, video');
    mediaElements.forEach((element) => {
      if (element instanceof HTMLMediaElement) {
        element.volume = volumeLevel;
      }
    });

    const youtubeIframes = document.querySelectorAll('iframe[src*="youtube"]');
    youtubeIframes.forEach((iframe) => {
      if (iframe instanceof HTMLIFrameElement && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: 'setVolume',
              args: [volume],
            }),
            '*'
          );
        } catch (e) {
          console.error('Error setting YouTube volume:', e);
        }
      }
    });
  }, [volume, isMuted]);

  useEffect(() => {
    loadTracks();
  }, []);

  useEffect(() => {
    if (currentTrack && currentTrack.platform === 'spotify' && !hasUserInteracted) {
      setShowSpotifyPrompt(true);
    } else {
      setShowSpotifyPrompt(false);
    }
  }, [currentTrackIndex, hasUserInteracted, currentTrack]);

  const loadTracks = async () => {
    try {
      const { data, error } = await supabase
        .from('music_tracks')
        .select('*')
        .eq('is_active', true)
        .order('order_position', { ascending: true });

      if (error) throw error;
      setTracks(data || []);
    } catch (error) {
      console.error('Error loading tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setHasUserInteracted(false);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setHasUserInteracted(false);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setHasUserInteracted(false);
  };

  const handleSpotifyPlay = () => {
    setHasUserInteracted(true);
    setShowSpotifyPrompt(false);
    setIsExpanded(true);
    setIsPinned(true);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const getEmbedUrl = (track: MusicTrack) => {
    if (track.platform === 'youtube') {
      const videoId = track.url.split('v=')[1]?.split('&')[0] || track.url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&fs=0&modestbranding=1`;
    } else if (track.platform === 'spotify') {
      const trackId = track.url.split('/track/')[1]?.split('?')[0];
      return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
    }
    return '';
  };

  if (loading || tracks.length === 0) {
    return null;
  }

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      {/* Floating Music Widget */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-96' : ''
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => {
          if (!isPinned && !(isSpotify && hasUserInteracted)) {
            setIsExpanded(false);
          }
        }}
      >
        {/* Compact Mode */}
        {!isExpanded && (
          <div className="relative group cursor-pointer">
            <div className="relative px-4 py-3 bg-gradient-to-r from-cyan-500/80 to-blue-600/80 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105 border border-white/10">
              <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl animate-pulse" />
              <div className="relative z-10">
                <AudioVisualizer isPlaying={isYouTube || hasUserInteracted} />
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl opacity-75 blur group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-900/90 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
              Música para Codear 🎵
            </div>
          </div>
        )}

        {/* Expanded Mode */}
        {isExpanded && (
          <div className="bg-slate-900/30 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="px-3 py-2 bg-gradient-to-r from-cyan-500/60 to-blue-600/60 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/20">
                  <AudioVisualizer isPlaying={isYouTube || hasUserInteracted} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Ahora Sonando</h3>
                  <p className="text-xs text-gray-300">
                    {currentTrackIndex + 1} de {tracks.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPinned(!isPinned);
                  }}
                  className={`text-gray-300 hover:text-white transition-colors p-1 hover:bg-white/10 rounded ${
                    isPinned ? 'text-cyan-400' : ''
                  }`}
                  title={isPinned ? 'Desfijar' : 'Mantener abierto'}
                >
                  <svg className="h-4 w-4" fill={isPinned ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                    setIsPinned(false);
                  }}
                  className="text-gray-300 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                  title="Minimizar (la música seguirá sonando)"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Current Track Info */}
            <div className="px-4 py-3 bg-white/5 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-1">
                {isYouTube && (
                  <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                )}
                {isSpotify && (
                  <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                )}
                <span className="text-xs text-cyan-400 font-semibold uppercase">
                  {currentTrack.platform}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white truncate">{currentTrack.title}</h4>
              <p className="text-xs text-gray-300 truncate">{currentTrack.artist}</p>
            </div>

            {/* Spotify Play Prompt */}
            {showSpotifyPrompt && (
              <div className="px-4 py-3 bg-green-500/10 backdrop-blur-xl border-b border-green-500/20">
                <button
                  onClick={handleSpotifyPlay}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Reproducir en Spotify
                </button>
                <p className="text-[10px] text-gray-300 mt-2 text-center">
                  Spotify requiere interacción del usuario
                </p>
              </div>
            )}

            {/* Spotify Embed Integrado */}
            {isSpotify && hasUserInteracted && (
              <div className="px-4 py-2">
                <div className="rounded-lg overflow-hidden bg-black">
                  <iframe
                    key={`spotify-visible-${currentTrack.id}`}
                    src={getEmbedUrl(currentTrack)}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    className="w-full"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-center">
                  💡 Usa los controles de Spotify para ajustar el volumen
                </p>
              </div>
            )}

            {/* Volume Control - Solo para YouTube */}
            {isYouTube && (
              <div className="px-4 py-3 bg-white/5 backdrop-blur-xl border-b border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, rgb(6 182 212) 0%, rgb(6 182 212) ${volume}%, rgba(255,255,255,0.1) ${volume}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                  <span className="text-xs text-gray-300 w-10 text-right font-medium">{volume}%</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-center">
                  Control de volumen para YouTube
                </p>
              </div>
            )}

            {/* Controls */}
            <div className="px-4 py-3 flex items-center justify-center gap-3 bg-white/5 backdrop-blur-xl border-b border-white/10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                disabled={tracks.length <= 1}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-cyan-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-xl border border-white/10"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              
              <div className="text-xs text-gray-300 font-medium min-w-[60px] text-center">
                {currentTrackIndex + 1} / {tracks.length}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                disabled={tracks.length <= 1}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-cyan-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-xl border border-white/10"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Track List */}
            {tracks.length > 1 && (
              <div className="px-4 pb-3 pt-2">
                <div className="text-xs text-gray-300 mb-2 font-semibold">Playlist</div>
                <div className="space-y-1 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-white/5">
                  {tracks.map((track, index) => (
                    <button
                      key={track.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTrackSelect(index);
                      }}
                      className={`w-full text-left p-2 rounded-lg transition-all text-xs backdrop-blur-xl ${
                        index === currentTrackIndex
                          ? 'bg-cyan-500/20 border border-cyan-500/30'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {track.platform === 'spotify' && (
                          <svg className="h-3 w-3 text-green-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                        )}
                        {track.platform === 'youtube' && (
                          <svg className="h-3 w-3 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${
                            index === currentTrackIndex ? 'text-cyan-400' : 'text-white'
                          }`}>
                            {track.title}
                          </p>
                          <p className="text-gray-400 truncate text-[10px]">{track.artist}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hidden iframe - Solo para YouTube */}
      {isYouTube && (
        <div className="fixed invisible pointer-events-none" style={{ position: 'fixed', left: '-9999px', top: '-9999px', width: '1px', height: '1px' }}>
          <iframe
            key={`player-${currentTrack.id}`}
            src={getEmbedUrl(currentTrack)}
            width="1"
            height="1"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            title="Music Player"
          />
        </div>
      )}
    </>
  );
}