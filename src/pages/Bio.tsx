import { useQuery } from '@tanstack/react-query'
import { getArtist } from '../api'
import { useTranslation } from 'react-i18next'
import '../styles/pages.css'

export default function Bio() {
  const { t } = useTranslation()
  const { data: artist, isLoading } = useQuery({ queryKey: ['artist'], queryFn: getArtist })

  if (isLoading) return <div className="page"><p>{t('common.loading')}</p></div>

  return (
    <div className="page">
      <div className="bio-container">
        {artist?.profileImage && (
          <img src={artist.profileImage} alt={artist.name} className="bio-image" />
        )}
        <div className="bio-content">
          <h1>{artist?.name || t('hero.name')}</h1>
          <div className="bio-text">
            {artist?.bio ? (
              <p>{artist.bio}</p>
            ) : (
              <p>{t('bio.read_less')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
