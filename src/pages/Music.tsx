import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAlbums } from '../api'
import '../styles/pages.css'
import { FaTimes, FaFilm } from 'react-icons/fa'

export default function Music() {
  const { data: albums, isLoading } = useQuery({ queryKey: ['albums'], queryFn: getAlbums })
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null)
  const [selectedSong, setSelectedSong] = useState<any>(null)

  if (isLoading) return <div className="page"><p>Chargement...</p></div>

  return (
    <div className="page">
      <h1>Albums</h1>
      <div className="grid">
        {albums?.map((album: any) => (
          <div key={album.id} className="card">
            <div onClick={() => setSelectedAlbum(album)} style={{ cursor: 'pointer', width: '100%' }}>
              {album.coverImage && (
                <img
                  src={album.coverImage}
                  alt={album.title}
                />
              )}
              <h2>{album.title}</h2>
              {album.description && <p>{album.description.substring(0, 120)}...</p>}
              <p className="year">{new Date(album.releaseDate).getFullYear()}</p>
              {album.songs && <p>{album.songs.length} chansons</p>}
            </div>
          </div>
        ))}
      </div>

      {selectedAlbum && (
        <div className="modal-overlay" onClick={() => setSelectedAlbum(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedAlbum(null)}><FaTimes /></button>
            {selectedAlbum.coverImage && (
              <img src={selectedAlbum.coverImage} alt={selectedAlbum.title} className="modal-image" />
            )}
            <div className="modal-info">
              <h2>{selectedAlbum.title}</h2>
              <p className="modal-year">Sortie: {new Date(selectedAlbum.releaseDate).toLocaleDateString('fr-FR')}</p>
              {selectedAlbum.description && <p className="modal-description">{selectedAlbum.description}</p>}
              {selectedAlbum.songs && selectedAlbum.songs.length > 0 && (
                <div className="modal-songs">
                  <h3>Chansons ({selectedAlbum.songs.length})</h3>
                  <ul>
                    {selectedAlbum.songs.map((song: any, idx: number) => (
                      <li
                        key={song.id}
                        onClick={() => setSelectedSong(song)}
                        style={{ cursor: 'pointer', opacity: selectedSong?.id === song.id ? 1 : 0.7 }}
                      >
                        <div>{idx + 1}. {song.title}</div>
                        {song.youtubeUrl && (
                          <a href={song.youtubeUrl} target="_blank" rel="noopener noreferrer" className="song-link" onClick={(e) => e.stopPropagation()}>
                            <FaFilm style={{ marginRight: '0.5rem', display: 'inline' }} />Regarder sur YouTube
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>

                  {selectedSong && selectedSong.youtubeUrl && (() => {
                    const youtubeId = selectedSong.youtubeUrl.includes('watch?v=')
                      ? selectedSong.youtubeUrl.split('watch?v=')[1].split('&')[0]
                      : selectedSong.youtubeUrl.split('/').pop();
                    return (
                      <div className="modal-player">
                        <div className="youtube-player">
                          <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title={selectedSong.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        {selectedSong.lyrics && (
                          <div className="song-lyrics">
                            <h4>Paroles</h4>
                            <p>{selectedSong.lyrics}</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
