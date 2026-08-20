import { useQuery } from '@tanstack/react-query'
import { getConcerts } from '../api'
import { useTranslation } from 'react-i18next'
import '../styles/pages.css'

export default function Agenda() {
  const { t } = useTranslation()
  const { data: concerts, isLoading } = useQuery({ queryKey: ['concerts'], queryFn: getConcerts })

  if (isLoading) return <div className="page"><p>{t('common.loading')}</p></div>

  const upcomingConcerts = concerts?.filter((c: any) => c.status === 'upcoming') || []
  const pastConcerts = concerts?.filter((c: any) => c.status === 'past') || []

  return (
    <div className="page">
      <h1>{t('concerts.title')}</h1>

      {upcomingConcerts.length > 0 && (
        <section className="section">
          <h2>{t('concerts.upcoming_concerts')}</h2>
          <div className="concerts-list">
            {upcomingConcerts.map((concert: any) => (
              <div key={concert.id} className="concert-card">
                <div className="concert-date">
                  {new Date(concert.date).toLocaleDateString('fr-FR')}
                </div>
                <div className="concert-info">
                  <h3>{concert.title}</h3>
                  <p>{concert.location}</p>
                  {concert.description && <p>{concert.description}</p>}
                </div>
                {concert.ticketUrl && (
                  <a href={concert.ticketUrl} target="_blank" rel="noopener noreferrer" className="btn">
                    {t('concerts.buy_ticket')}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {pastConcerts.length > 0 && (
        <section className="section">
          <h2>{t('concerts.title')} {t('common.close')}</h2>
          <div className="concerts-list">
            {pastConcerts.slice(0, 5).map((concert: any) => (
              <div key={concert.id} className="concert-card past">
                <div className="concert-date">
                  {new Date(concert.date).toLocaleDateString('fr-FR')}
                </div>
                <div className="concert-info">
                  <h3>{concert.title}</h3>
                  <p>{concert.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
