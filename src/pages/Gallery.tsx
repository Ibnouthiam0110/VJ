import { useQuery } from '@tanstack/react-query'
import { getGallery } from '../api'
import { useTranslation } from 'react-i18next'
import '../styles/pages.css'

export default function Gallery() {
  const { t } = useTranslation()
  const { data: gallery, isLoading } = useQuery({ queryKey: ['gallery'], queryFn: () => getGallery() })

  if (isLoading) return <div className="page"><p>{t('common.loading')}</p></div>

  return (
    <div className="page">
      <h1>{t('gallery_section.title')}</h1>
      <div className="gallery-grid">
        {gallery?.map((media: any) => (
          <div key={media.id} className="gallery-item">
            <img src={media.url} alt={media.title} />
            <div className="gallery-overlay">
              <h3>{media.title}</h3>
              <p>{media.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
