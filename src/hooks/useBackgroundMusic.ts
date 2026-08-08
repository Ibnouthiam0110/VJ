import { useRef, useEffect, useState } from 'react'

export function useBackgroundMusic(musicPath: string = '/VJ - Kaay Waay (clip officiel).mp3') {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(musicPath)
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [musicPath])

  const playMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const pauseMusic = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic()
    } else {
      playMusic()
    }
  }

  return { playMusic, pauseMusic, toggleMusic, isPlaying }
}
