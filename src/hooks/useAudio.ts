import { useState, useEffect, useRef, useCallback } from 'react';

export function useAudio(audioSrc: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioSrc) return;

    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.45; // Gentle pleasant background volume
    audioRef.current = audio;

    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setHasInteracted(true);
    } catch (err) {
      console.warn('Audio playback was prevented by browser policy or error:', err);
      setIsPlaying(false);
    }
  }, []);

  /**
   * iOS/Safari solo deja reproducir audio iniciado por un toque. Llamar a esto dentro del
   * toque (p. ej. "Abrir invitación") "desbloquea" el audio para poder darle play más tarde.
   */
  const unlock = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = true;
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
      })
      .catch(() => {})
      .finally(() => {
        audio.muted = false;
      });
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return {
    isPlaying,
    hasInteracted,
    play,
    pause,
    toggle,
    unlock,
  };
}
