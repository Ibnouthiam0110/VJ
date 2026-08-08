import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getGallery } from '../api'
import '../styles/pages.css'
import { FaFilm, FaTimes } from 'react-icons/fa'

export default function Gallery() {
  const { data: gallery, isLoading } = useQuery({ queryKey: ['gallery'], queryFn: () => getGallery() })
  const [selectedMedia, setSelectedMedia] = useState<any>(null)

  if (isLoading) return <div className="page"><p>Chargement...</p></div>

  return (
    <div className="page">
      <div className="gallery-header">
        <h1>Galerie Photos & Vidéos</h1>
      </div>
      <div className="gallery-grid">
        {gallery?.map((media: any) => (
          <div key={media.id} className="gallery-item" onClick={() => setSelectedMedia(media)}>
            {media.type === 'photo' ? (
              <img src={media.url} alt={media.title} />
            ) : (
              <div className="video-placeholder"><FaFilm /></div>
            )}
            <div className="gallery-overlay">
              <h3>{media.title}</h3>
              {media.category && <p>{media.category}</p>}
            </div>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div className="modal-overlay" onClick={() => setSelectedMedia(null)}>
          <div className="modal-content gallery-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMedia(null)}><FaTimes /></button>
            {selectedMedia.type === 'photo' ? (
              <img src={selectedMedia.url} alt={selectedMedia.title} className="modal-image" />
            ) : (
              <div className="video-placeholder-large"><FaFilm /></div>
            )}
            <div className="modal-info">
              <h2>{selectedMedia.title}</h2>
              {selectedMedia.category && <p className="modal-category">{selectedMedia.category}</p>}
              {selectedMedia.description && <p className="modal-description">{selectedMedia.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
