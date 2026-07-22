'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, CheckCircle2, Subtitles, Settings, Sparkles } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
  onPlay?: () => void;
}

export function VideoPlayer({ url, title, onPlay }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSubtitles, setShowSubtitles] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      if (onPlay) onPlay();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
    if (onPlay) onPlay();
  };

  const changeSpeed = (speed: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl group select-none">
      
      {/* Video Element */}
      <video
        ref={videoRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onClick={togglePlay}
        className="w-full h-auto max-h-[480px] object-cover cursor-pointer"
      />

      {/* Video Title Header Overlay */}
      <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-zinc-950/90 via-zinc-950/40 to-transparent flex items-center justify-between text-xs font-semibold text-white backdrop-blur-sm opacity-90 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
          <span className="truncate max-w-sm">{title}</span>
        </div>

        {hasEnded && (
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl">
            <CheckCircle2 className="h-3.5 w-3.5" /> Video Complete
          </span>
        )}
      </div>

      {/* Center Play Overlay Trigger Button */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-zinc-950/30 backdrop-blur-[2px] cursor-pointer"
        >
          <button className="h-16 w-16 rounded-full bg-white/90 text-zinc-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
            <Play className="h-7 w-7 fill-zinc-950 ml-1" />
          </button>
        </div>
      )}

      {/* Subtitles Overlay Banner */}
      {isPlaying && showSubtitles && (
        <div className="absolute bottom-16 inset-x-0 flex justify-center pointer-events-none px-4">
          <span className="bg-zinc-950/90 border border-zinc-800 text-zinc-200 text-xs font-semibold px-4 py-1.5 rounded-xl backdrop-blur-md text-center max-w-md">
            &quot;In this module, we will explore asynchronous evaluation patterns...&quot;
          </span>
        </div>
      )}

      {/* Bottom Control Bar */}
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent flex flex-col gap-2">
        
        {/* Progress Bar Track */}
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden cursor-pointer">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between text-xs text-zinc-300 font-semibold pt-1">
          
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
            </button>

            <button
              onClick={toggleMute}
              className="hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-0.5 text-[10px]">
              {[1.0, 1.25, 1.5, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => changeSpeed(s)}
                  className={s === playbackSpeed ? 'text-blue-400 font-bold' : 'text-zinc-500 hover:text-zinc-300'}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Subtitles Toggle */}
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={showSubtitles ? 'text-blue-400' : 'text-zinc-500 hover:text-zinc-300'}
              title="Toggle Subtitles"
            >
              <Subtitles className="h-4 w-4" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800"
              aria-label="Fullscreen"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
