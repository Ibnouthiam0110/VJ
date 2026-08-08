import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSongs } from '../api/songs.api'
import '../styles/pages.css'
import { FaTimes } from 'react-icons/fa'

export default function Clips() {
  const { data: songsData, isLoading } = useQuery({ queryKey: ['songs'], queryFn: getSongs })
  const [selectedSong, setSelectedSong] = useState<any>(null)

  // Filter songs that have a YouTube URL
  const clips = songsData?.data?.filter((song: any) => song.youtubeUrl) || []

  const getYoutubeId = (url: string) => {
    if (url.includes('watch?v=')) {
      return url.split('watch?v=')[1].split('&')[0]
    }
    return url.split('/').pop()
  }

  if (isLoading) return <div className="page"><p>Chargement...</p></div>

  return (
    <div className="page">
      <div className="clips-header">
        <p className="clips-badge">DERNIÈRES SORTIES</p>
        <h1>VIDÉOS & CLIPS <span className="highlight">CLIPS</span></h1>
      </div>

      <div className="clips-grid">
        {clips.length > 0 ? (
          clips.map((song: any) => {
            const youtubeId = getYoutubeId(song.youtubeUrl)
            const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`

            return (
              <div
                key={song.id}
                className="clip-card"
                onClick={() => setSelectedSong(song)}
                style={{ cursor: 'pointer' }}
              >
                <div className="clip-thumbnail">
                  <img src={thumbnailUrl} alt={song.title} />
                  <div className="play-button">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="clip-badge">CLIP</div>
                </div>
                <h3>{song.title}</h3>
              </div>
            )
          })
        ) : (
          <p>Aucun clip disponible</p>
        )}
      </div>

      {selectedSong && (() => {
        const youtubeId = getYoutubeId(selectedSong.youtubeUrl)
        return (
          <div className="modal-overlay" onClick={() => setSelectedSong(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedSong(null)}><FaTimes /></button>
              <div className="youtube-player">
                <iframe
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={selectedSong.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="modal-info">
                <h2>{selectedSong.title}</h2>
                {selectedSong.lyrics && (
                  <div className="song-lyrics">
                    <h4>Paroles</h4>
                    <p>{selectedSong.lyrics}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
