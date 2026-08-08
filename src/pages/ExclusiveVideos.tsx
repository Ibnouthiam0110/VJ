import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getGallery } from '../api'
import '../styles/pages.css'
import { FaFilm, FaPlay, FaTimes } from 'react-icons/fa'

export default function ExclusiveVideos() {
  const { data: gallery, isLoading } = useQuery({ queryKey: ['gallery'], queryFn: () => getGallery() })
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  if (isLoading) return <div className="page"><p>Chargement...</p></div>

  // Filter only videos from gallery
  const videos = gallery?.filter((media: any) => media.type === 'video') || []

  const getYoutubeId = (url: string) => {
    if (url.includes('watch?v=')) {
      return url.split('watch?v=')[1].split('&')[0]
    }
    return url.split('/').pop()
  }

  const getYoutubeEmbedUrl = (url: string, startTime: number = 0) => {
    const videoId = getYoutubeId(url)
    const startParam = startTime > 0 ? `&start=${startTime}` : ''
    return `https://www.youtube.com/embed/${videoId}?autoplay=1${startParam}`
  }

  return (
    <div className="page">
      <div className="exclusive-header">
        <p className="exclusive-badge">CONTENU PREMIUM</p>
        <h1>VIDÉOS <span className="highlight">EXCLUSIVES</span></h1>
      </div>

      {videos.length > 0 ? (
        <div className="exclusive-grid">
          {videos.map((video: any) => (
            <div
              key={video.id}
              className="exclusive-card"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="video-thumbnail">
                {video.url.includes('youtube') ? (
                  <img
                    src={`https://img.youtube.com/vi/${getYoutubeId(video.url)}/maxresdefault.jpg`}
                    alt={video.title}
                  />
                ) : (
                  <div className="video-placeholder"><FaFilm /></div>
                )}
                <div className="play-overlay">
                  <div className="play-button"><FaPlay /></div>
                </div>
              </div>
              <div className="video-info">
                <h3>{video.title}</h3>
                {video.category && <p className="video-category">{video.category}</p>}
                {video.description && <p className="video-desc">{video.description.substring(0, 80)}...</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-videos">
          <p>Vidéos exclusives à venir...</p>
        </div>
      )}

      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="modal-content exclusive-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedVideo(null)}><FaTimes /></button>

            {selectedVideo.url.includes('youtube') ? (
              <div className="youtube-player">
                <iframe
                  width="100%"
                  height="500"
                  src={getYoutubeEmbedUrl(selectedVideo.url, selectedVideo.startTime)}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="video-placeholder-large"><FaFilm /> Vidéo locale</div>
            )}

            <div className="modal-info">
              <h2>{selectedVideo.title}</h2>
              {selectedVideo.category && <p className="modal-category">{selectedVideo.category}</p>}
              {selectedVideo.description && <p className="modal-description">{selectedVideo.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
