import { useQuery } from '@tanstack/react-query'
import { getAlbums } from '../api'
import { useTranslation } from 'react-i18next'
import '../styles/pages.css'

export default function Music() {
  const { t } = useTranslation()
  const { data: albums, isLoading } = useQuery({ queryKey: ['albums'], queryFn: getAlbums })

  if (isLoading) return <div className="page"><p>{t('common.loading')}</p></div>

  return (
    <div className="page">
      <h1>{t('music.title')}</h1>
      <div className="grid">
        {albums?.map((album: any) => (
          <div key={album.id} className="card">
            {album.coverImage && <img src={album.coverImage} alt={album.title} />}
            <h2>{album.title}</h2>
            {album.description && <p>{album.description}</p>}
            <p className="year">{new Date(album.releaseDate).getFullYear()}</p>
            {album.songs && <p>{album.songs.length} {t('music.songs')}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
