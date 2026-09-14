import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Settings2, Upload, RotateCcw, X, Play, Pause } from 'lucide-react';
import { APP_CONFIG } from '../config.ts';

interface AudioControllerProps {
  hasStarted: boolean;
  onUserTriggerStart?: () => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({
  hasStarted,
  onUserTriggerStart,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(APP_CONFIG.music.defaultStartSecond);
  const [startTime, setStartTime] = useState<number>(APP_CONFIG.music.defaultStartSecond);
  const [endTime, setEndTime] = useState<number>(APP_CONFIG.music.defaultEndSecond);
  const [songName, setSongName] = useState<string>(APP_CONFIG.music.defaultSongTitle);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isUsingSynth, setIsUsingSynth] = useState<boolean>(false);

  // Synthesized romantic piano chords as fallback
  const startRomanticSynth = () => {
    try {
      if (synthCtxRef.current) return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      synthCtxRef.current = ctx;

      const chords = [
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
        [220.0, 261.63, 329.63, 392.0],  // Am7
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [196.0, 246.94, 293.66, 349.23], // G7
      ];

      let chordIndex = 0;
      const playChime = () => {
        if (!ctx || ctx.state === 'suspended') return;
        const notes = chords[chordIndex % chords.length];
        chordIndex++;

        notes.forEach((freq, i) => {
          setTimeout(() => {
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            gain.gain.setValueAtTime(0.001, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 1.8);
          }, i * 180);
        });
      };

      playChime();
      synthIntervalRef.current = window.setInterval(playChime, 2400);
      setIsUsingSynth(true);
      setIsPlaying(true);
    } catch {
      // Audio context policy fallback
    }
  };

  const stopRomanticSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (synthCtxRef.current) {
      synthCtxRef.current.close().catch(() => {});
      synthCtxRef.current = null;
    }
    setIsUsingSynth(false);
  };

  // Attempt to play audio
  const startAudioPlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.currentTime < startTime || audio.currentTime >= endTime) {
        audio.currentTime = startTime;
      }
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        return;
      }

      console.warn('Audio playback failed, activating romantic audio synthesizer fallback', error);
      startRomanticSynth();
    }
  };

  // Initialize playback when hasStarted becomes true
  useEffect(() => {
    if (hasStarted) {
      startAudioPlayback();
    }
  }, [hasStarted, startTime, endTime]);

  useEffect(() => {
    const retryAudioAfterInteraction = () => {
      if (!isPlaying) {
        startAudioPlayback();
      }
    };

    window.addEventListener('pointerdown', retryAudioAfterInteraction, { once: true });
    window.addEventListener('keydown', retryAudioAfterInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', retryAudioAfterInteraction);
      window.removeEventListener('keydown', retryAudioAfterInteraction);
    };
  }, [isPlaying, startTime, endTime]);

  useEffect(() => {
    const stopAudioOnExit = () => {
      audioRef.current?.pause();
      stopRomanticSynth();
    };

    window.addEventListener('pagehide', stopAudioOnExit);
    window.addEventListener('beforeunload', stopAudioOnExit);

    return () => {
      window.removeEventListener('pagehide', stopAudioOnExit);
      window.removeEventListener('beforeunload', stopAudioOnExit);
      stopAudioOnExit();
    };
  }, []);

  // Loop checking & time enforcement
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const now = audio.currentTime;
      setCurrentTime(now);

      // Loop condition: if past endTime, jump back to startTime!
      if (endTime > 0 && endTime < audio.duration && now >= endTime) {
        audio.currentTime = startTime;
        if (audio.paused && isPlaying) {
          audio.play().catch(() => {});
        }
      }
    };

    const handleEnded = () => {
      audio.currentTime = startTime;
      audio.play().catch(() => {});
    };

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration)) {
        setEndTime(audio.duration);
      }
    };

    const handleError = () => {
      console.warn('HTML Audio file failed to load. Starting romantic ambient synthesizer.');
      startRomanticSynth();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
    };
  }, [startTime, endTime, isPlaying]);

  const togglePlayPause = () => {
    if (!hasStarted && onUserTriggerStart) {
      onUserTriggerStart();
    }

    if (isUsingSynth) {
      if (isPlaying) {
        stopRomanticSynth();
        setIsPlaying(false);
      } else {
        startRomanticSynth();
      }
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      startAudioPlayback();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
    }
    setIsMuted(!isMuted);

    if (synthCtxRef.current) {
      if (!isMuted) {
        synthCtxRef.current.suspend();
      } else {
        synthCtxRef.current.resume();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    stopRomanticSynth();
    const objectUrl = URL.createObjectURL(file);
    setCustomAudioUrl(objectUrl);
    setSongName(file.name.replace(/\.[^/.]+$/, ''));

    const audio = audioRef.current;
    if (audio) {
      audio.src = objectUrl;
      audio.load();
      audio.currentTime = startTime;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const resetAudio = () => {
    setStartTime(APP_CONFIG.music.defaultStartSecond);
    setEndTime(APP_CONFIG.music.defaultEndSecond);
    setSongName(APP_CONFIG.music.defaultSongTitle);
    setCustomAudioUrl(null);
    const audio = audioRef.current;
    if (audio) {
      audio.src = APP_CONFIG.music.fallbackAudioUrl;
      audio.load();
      audio.currentTime = APP_CONFIG.music.defaultStartSecond;
      if (isPlaying) {
        audio.play().catch(() => {});
      }
    }
  };

  return (
    <>
      {/* Persistent Audio Tag (Never remounts on route or step change) */}
      <audio
        ref={audioRef}
        src={customAudioUrl || APP_CONFIG.music.fallbackAudioUrl}
        preload="auto"
        autoPlay
        loop
        playsInline
      />

      {/* Floating Ambient Music Pill (Top Right, responsive, elegant) */}
      <div className="hidden">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 shadow-[0_0_15px_rgba(236,72,153,0.3)] text-white text-xs">
          {/* Animated Equalizer Waves */}
          <button
            id="music-play-pause-btn"
            onClick={togglePlayPause}
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition-opacity"
            title={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                <span className="w-1 bg-pink-300 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
                <span className="w-1 bg-fuchsia-300 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2/3" />
                <span className="w-1 bg-purple-200 rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-4/5" />
              </div>
            ) : (
              <Play className="w-3.5 h-3.5 text-pink-200 fill-pink-200" />
            )}
            <span className="text-[10px] text-pink-200/80 font-mono">
              ({Math.floor(currentTime)}s / {endTime}s)
            </span>
          </button>

          {/* Mute Button */}
          <button
            id="music-mute-toggle-btn"
            onClick={toggleMute}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-pink-100"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Settings Button */}
          <button
            id="music-settings-btn"
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-pink-100"
            title="Configure Song & Loop Interval"
          >
            <Settings2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Music Settings Modal */}
      {showSettings && (
        <div className="hidden">
          <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-[#4a044e]/90 to-[#2e1065]/95 border border-pink-400/40 p-5 shadow-2xl text-white">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-3.5 right-3.5 p-1 rounded-full text-pink-200 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 text-pink-200 font-semibold">
              <Music className="w-5 h-5 text-pink-400" />
              <span>Romantic Music Settings</span>
            </div>

            <div className="space-y-4 text-xs">
              {/* Loop Interval Controls */}
              <div className="p-3 rounded-xl bg-white/10 border border-white/15 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-pink-200 font-medium">Loop Interval:</span>
                  <span className="text-white font-mono bg-pink-500/30 px-2 py-0.5 rounded">
                    {startTime}s → {endTime}s
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-pink-200/80 mb-1">
                    <span>Start Time:</span>
                    <span>{startTime}s</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={Math.max(endTime - 2, 0)}
                    value={startTime}
                    onChange={(e) => setStartTime(Number(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-pink-200/80 mb-1">
                    <span>End Time (Loops Back):</span>
                    <span>{endTime}s</span>
                  </div>
                  <input
                    type="range"
                    min={startTime + 2}
                    max="180"
                    value={endTime}
                    onChange={(e) => setEndTime(Number(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                </div>
                <p className="text-[10px] text-pink-200/70 italic">
                  *Default requirement: 45s to 60s, automatically loops back to 45s!
                </p>
              </div>

              {/* Upload Custom Audio */}
              <div className="p-3 rounded-xl bg-white/10 border border-white/15 space-y-2">
                <span className="text-pink-200 font-medium block">Upload Favorite Song:</span>
                <label className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg border border-dashed border-pink-300/40 bg-pink-500/15 hover:bg-pink-500/25 cursor-pointer transition-colors text-pink-100">
                  <Upload className="w-4 h-4" />
                  <span>Choose MP3 / Audio File</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={resetAudio}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-pink-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 font-medium transition-all shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
