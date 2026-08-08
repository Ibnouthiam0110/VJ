import { useQuery } from '@tanstack/react-query'
import { getArtist } from '../api'
import '../styles/pages.css'

export default function Bio() {
  const { data: artist, isLoading } = useQuery({ queryKey: ['artist'], queryFn: getArtist })

  if (isLoading) return <div className="page"><p>Chargement...</p></div>

  return (
    <div className="page">
      <div className="bio-container">
        {artist?.profileImage && (
          <img src={artist.profileImage} alt={artist.name} className="bio-image" />
        )}
        <div className="bio-content">
          <h1>{artist?.name || 'Mouhamed VJ'}</h1>
          <div className="bio-text">
            {artist?.bio ? (
              <p>{artist.bio}</p>
            ) : (
              <p>Biographie à venir...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
