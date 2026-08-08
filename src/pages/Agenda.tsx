import { useQuery } from '@tanstack/react-query'
import { getConcerts } from '../api'
import '../styles/pages.css'
import { FaCalendar, FaMapPin } from 'react-icons/fa'

export default function Agenda() {
  const { data: concerts, isLoading } = useQuery({ queryKey: ['concerts'], queryFn: getConcerts })

  if (isLoading) return <div className="page"><p>Chargement...</p></div>

  const upcomingConcerts = concerts?.filter((c: any) => c.status === 'upcoming') || []
  const pastConcerts = concerts?.filter((c: any) => c.status === 'past') || []

  return (
    <div className="page">
      <div className="agenda-header">
        <p className="agenda-badge">TOURNÉES & CONCERTS</p>
        <h1>TOURNÉES & CONCERTS <span className="highlight">À VENIR</span></h1>
      </div>

      {upcomingConcerts.length > 0 && (
        <section className="concerts-section">
          <div className="concerts-list">
            {upcomingConcerts.map((concert: any) => (
              <div key={concert.id} className="concert-card-large">
                {concert.image && (
                  <div className="concert-image">
                    <img src={concert.image} alt={concert.title} />
                  </div>
                )}
                <div className="concert-details">
                  <h2>{concert.title}</h2>
                  <p className="concert-meta">
                    <FaCalendar style={{ marginRight: '0.5rem', display: 'inline' }} />{new Date(concert.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="concert-location">
                    <FaMapPin style={{ marginRight: '0.5rem', display: 'inline' }} />{concert.location}
                  </p>
                  {concert.description && (
                    <p className="concert-description">{concert.description}</p>
                  )}
                  {concert.ticketUrl && (
                    <a href={concert.ticketUrl} target="_blank" rel="noopener noreferrer" className="btn-tickets">
                      Réserver Tickets
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {upcomingConcerts.length === 0 && (
        <section className="concerts-section">
          <p className="no-concerts">Concerts à venir...</p>
        </section>
      )}

      {pastConcerts.length > 0 && (
        <section className="concerts-section past-section">
          <h2>Concerts Passés</h2>
          <div className="concerts-list-past">
            {pastConcerts.slice(0, 5).map((concert: any) => (
              <div key={concert.id} className="concert-card-past">
                {concert.image && <img src={concert.image} alt={concert.title} />}
                <div className="concert-past-info">
                  <h3>{concert.title}</h3>
                  <p>{new Date(concert.date).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
