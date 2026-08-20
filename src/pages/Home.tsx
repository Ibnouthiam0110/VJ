import { useQuery } from '@tanstack/react-query'
import { getArtist, getAlbums, getBlogPosts, getConcerts, getGallery } from '../api'
import '../styles/pages.css'
import { FaSpotify, FaInstagram, FaYoutube, FaPlay, FaCalendar, FaTrophy, FaMask, FaGlobe, FaChartBar, FaFilm, FaStar, FaMedal, FaMobileAlt, FaMicrophone, FaFutbol, FaExpand, FaShareAlt, FaTimes, FaFacebook, FaComment, FaLink, FaLock, FaChevronLeft, FaChevronRight, FaShare, FaArrowUp } from 'react-icons/fa'
import { SiSnapchat, SiTwitter } from 'react-icons/si'
import DOMPurify from 'isomorphic-dompurify'
import { useState, useEffect, useRef } from 'react'
import { useBackgroundMusic } from '../hooks/useBackgroundMusic'

export default function Home() {
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null)
  const [selectedSong, setSelectedSong] = useState<any>(null)
  const [showBioModal, setShowBioModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showSongModal, setShowSongModal] = useState(false)
  const [modalSong, setModalSong] = useState<any>(null)
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number | null>(null)
  const [showAllGallery, setShowAllGallery] = useState(false)
  const [playingExclusiveVideo, setPlayingExclusiveVideo] = useState(false)
  const [exclusiveVideoFullscreen, setExclusiveVideoFullscreen] = useState(false)
  const [showExclusiveShareModal, setShowExclusiveShareModal] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)
  const clipsRef = useRef<HTMLDivElement>(null)
  const exclusiveRef = useRef<HTMLDivElement>(null)
  const [clipsToShow, setClipsToShow] = useState(6)
  const { toggleMusic, isPlaying: isHeroMusicPlaying } = useBackgroundMusic()

  useEffect(() => {
    if (!exclusiveRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isHeroMusicPlaying) {
        setPlayingExclusiveVideo(true)
      } else {
        setPlayingExclusiveVideo(false)
        setExclusiveVideoFullscreen(false)
      }
    }, { threshold: 0.1 })
    observer.observe(exclusiveRef.current)
    return () => observer.disconnect()
  }, [isHeroMusicPlaying])

  const { data: artist } = useQuery({ queryKey: ['artist'], queryFn: () => getArtist() })
  const { data: albums } = useQuery({ queryKey: ['albums'], queryFn: () => getAlbums() })
  const { data: songs } = useQuery({ queryKey: ['songs'], queryFn: () => fetch(`${import.meta.env.VITE_API_URL || 'https://mouhamed-vj-backend.onrender.com'}/api/songs?limit=100`).then(r => r.json()).then(d => d.data || []) })
  const { data: blog } = useQuery({ queryKey: ['blog'], queryFn: async () => getBlogPosts() })
  const { data: concerts } = useQuery({ queryKey: ['concerts'], queryFn: () => getConcerts() })
  const { data: gallery } = useQuery({ queryKey: ['gallery'], queryFn: () => getGallery() })

  useEffect(() => {
    const interval = setInterval(() => {
      if (concerts && concerts.length > 0) {
        // Countdown timer for concerts
        concerts.forEach((concert: any) => {
          const now = new Date().getTime()
          const concertDate = new Date(concert.date).getTime()
          const distance = concertDate - now

          if (distance > 0) {
            // Countdown is active
          }
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [concerts])

const songsWithoutAlbum = songs
    ?.filter((song: any) => !song.albumId)
    .sort((a: any, b: any) => {
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
      return dateB - dateA;
    }) || []

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero" id="accueil">
        <div className="hero-image">
          <img
            src="/images/hero/mouhamed.jfif"
            alt="Mouhamed VJ"
            onClick={toggleMusic}
            style={{ cursor: 'pointer' }}
            title="Cliquez pour écouter la musique"
          />
          <div className="hero-image-indicator" onClick={toggleMusic}>
            <FaPlay /> Cliquez pour écouter
          </div>
        </div>
        <div className="hero-content">
          <h1>Mouhamed VJ</h1>
          <p className="tagline tagline-desktop">Marabout de la Jeunesse</p>
          <p className="tagline tagline-mobile">PRINCE DE LA VILLE</p>
          <div className="hero-actions">
            <a href="#musique" className="hero-btn primary"><FaPlay style={{ marginRight: '0.5rem', display: 'inline' }} /> Écouter</a>
            <a href="#concerts" className="hero-btn"><FaCalendar style={{ marginRight: '0.5rem', display: 'inline' }} /> Agenda</a>
          </div>
        </div>
      </section>

{/* BIOGRAPHIE */}
      <section className="bio-section" id="biographie">
        <div className="bio-container-wally">
          <div className="bio-image-container">
            <img src="/images/VJ2.png" alt={artist?.name} className="bio-image-large" />
          </div>
          <div className="bio-content">
            <p className="bio-label">BIOGRAPHIE</p>
            <h1 className="bio-title">Mouhamed VJ</h1>
            <div className="bio-paragraphs">
              {artist?.bio ? (
                <p>{artist.bio}</p>
              ) : (
                <>
                  <p>Mouhamed VJ, prodige de la musique sénégalaise, commence à chanter dès l'âge de 13 ans. À 17 ans, il fait sensation avec son premier single, "Dans tes bras", qui rencontre un grand succès. Grâce à une audience déjà bien établie sur ses réseaux sociaux, il réussit à organiser un concert à guichets fermés avec seulement quelques titres à son actif.</p>
                  <p>En 2022, il sort son premier EP intitulé "En Vrai" sous le label Hoside, consolidant ainsi sa présence sur la scène musicale sénégalaise. Il enchaîne ensuite les succès en remplissant les plus grandes scènes du pays, comme l'esplanade du Grand Théâtre de Dakar, le Canal Olympia et l'esplanade du Musée des Civilisations Noires.</p>
                  <p>En 2023, VJ franchit une nouvelle étape en signant avec le label Rec 118 de Warner Music, en collaboration avec Hoside et BLZ. Avec plus de 90 millions de vues sur YouTube et des millions de streams, il s'impose comme une figure incontournable de la scène musicale sénégalaise.</p>
                </>
              )}
            </div>
            <button onClick={() => setShowBioModal(true)} className="btn btn-bio"><FaPlay style={{ marginRight: '0.5rem', display: 'inline' }} /> LIRE LA BIOGRAPHIE COMPLÈTE</button>
          </div>
        </div>
      </section>

      {/* ACCOMPLISSEMENTS */}
      <section className="accomplishments-section">
        <div className="accomplishments-container">

          {/* PALMARÈS & DISTINCTIONS */}
          <div className="accomplishments-subsection">
            <div className="section-label">SES ACCOMPLISSEMENTS</div>
            <h2>PALMARÈS & <span className="highlight">DISTINCTIONS</span></h2>

            <div className="certifications-grid">
              <div className="certification-card">
                <div className="certification-badge">
                  <div className="badge-inner">PLATINE</div>
                </div>
                <h4>Kaay Waay</h4>
                <p>Single de Platine AMC</p>
              </div>

              <div className="certification-card">
                <div className="certification-badge">
                  <div className="badge-inner">OR</div>
                </div>
                <h4>Ya Meun</h4>
                <p>Disque d'Or AMC</p>
              </div>

              <div className="certification-card">
                <div className="certification-badge">
                  <div className="badge-inner">100M+</div>
                </div>
                <h4>YouTube</h4>
                <p>100 millions de vues</p>
              </div>

              <div className="certification-card">
                <div className="certification-badge">
                  <div className="badge-inner">63M+</div>
                </div>
                <h4>Kaay Waay</h4>
                <p>Record YouTube Sénégal</p>
              </div>
            </div>
          </div>

          {/* RECORDS ET CERTIFICATIONS DÉTAIL */}
          <div className="accomplishments-subsection">
            <h2>RECORDS & <span className="highlight">CERTIFICATIONS</span></h2>

            <div className="records-detail">
              <div className="record-item">
                <div className="record-icon"><FaFilm /></div>
                <div className="record-content">
                  <h4>Record Historique YouTube</h4>
                  <p>Son morceau Kaay Waay est le clip le plus vu de l'histoire pour un artiste solo sénégalais, cumulant plus de 63 millions de vues.</p>
                </div>
              </div>

              <div className="record-item">
                <div className="record-icon"><FaStar /></div>
                <div className="record-content">
                  <h4>Single de Platine AMC</h4>
                  <p>Obtenu avec son tube incontournable Kaay Waay, faisant de lui le tout premier single sénégalais à atteindre cette certification.</p>
                </div>
              </div>

              <div className="record-item">
                <div className="record-icon"><FaMedal /></div>
                <div className="record-content">
                  <h4>Disque d'Or AMC</h4>
                  <p>Obtenu grâce au succès de son titre Ya Meun, consolidant sa position de leader musical.</p>
                </div>
              </div>

              <div className="record-item">
                <div className="record-icon"><FaMobileAlt /></div>
                <div className="record-content">
                  <h4>Audience Digitale Impressionnante</h4>
                  <p>Il cumule plus de 100 millions de vues sur sa chaîne YouTube officielle et rassemble des millions de streams sur toutes les plateformes.</p>
                </div>
              </div>

              <div className="record-item">
                <div className="record-icon"><FaMicrophone /></div>
                <div className="record-content">
                  <h4>Ambassadeur Dakar 2026</h4>
                  <p>En juillet 2026, VJ a été officiellement nommé Ambassadeur des Jeux Olympiques de la Jeunesse (JOJ) Dakar 2026 par le comité d'organisation pour promouvoir l'événement auprès de la jeunesse.</p>
                </div>
              </div>

              <div className="record-item">
                <div className="record-icon"><FaFutbol /></div>
                <div className="record-content">
                  <h4>Performances Légendaires</h4>
                  <p>Il détient des records de précocité en remplissant des esplanades massives à l'âge de 17-18 ans (Esplanade du Grand Théâtre de Dakar, Canal Olympia) et s'est produit à guichets fermés dans la salle mythique de La Cigale à Paris.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* VIDÉOS EXCLUSIVES SECTION */}
      <section className="section" id="exclusive" style={{ paddingTop: '4rem' }} ref={exclusiveRef}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ borderTop: '2px solid #d4af37', margin: '0 0 1rem 0' }}></div>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: 0, letterSpacing: '2px' }}>
            VIDÉO <span style={{ color: '#d4af37' }}>EXCLUSIVE</span>
          </h2>
        </div>
        <div className="video-container-wrapper" style={{ paddingBottom: '4rem' }}>
          {gallery?.filter((m: any) => m.type === 'video')?.slice(0, 1).map((video: any) => {
            const getYoutubeId = (url: string) => {
              if (url.includes('watch?v=')) return url.split('watch?v=')[1].split('&')[0];
              return url.split('/').pop();
            };
            const youtubeId = getYoutubeId(video.url);
            const startTime = video.startTime || 0;
            return (
              <>
                {/* DESCRIPTION */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <p style={{ color: '#999', fontSize: '1rem', marginBottom: '0', fontStyle: 'italic', lineHeight: 1.6 }}>
                    {video.description}
                  </p>
                </div>

                {/* VIDEO PLAYER + INFO (2-column on desktop, 1-column on mobile) */}
                <div key={video.id} className="video-container">
                  <div className="video-player" style={{ position: 'relative' }}>
                  {!playingExclusiveVideo ? (
                    <div
                      style={{
                        backgroundImage: `url(https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%',
                        position: 'relative'
                      }}
                    >
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }} onClick={() => setPlayingExclusiveVideo(true)}>
                        <div style={{ width: '80px', height: '80px', background: '#d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '35px', fontWeight: 'bold', cursor: 'pointer' }}><FaPlay style={{ color: '#000' }} /></div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${youtubeId}?start=${startTime}&autoplay=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                  )}
                </div>

                {/* INFO SECTION */}
                <div className="video-info">
                  <h3 style={{ color: '#fff', fontWeight: 700, margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {video.title}
                  </h3>
                  <p style={{ color: '#d4af37', fontSize: '0.95rem', fontWeight: 600, margin: '0 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {video.category}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button onClick={() => { setPlayingExclusiveVideo(true); setExclusiveVideoFullscreen(true); }} style={{ padding: '0.7rem 1.4rem', background: '#d4af37', color: '#000', border: 'none', borderRadius: '0.4rem', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <FaExpand /> PLEIN ÉCRAN
                    </button>
                    <button onClick={() => setShowExclusiveShareModal(true)} style={{ padding: '0.7rem 1.4rem', background: 'transparent', color: '#d4af37', border: '2px solid #d4af37', borderRadius: '0.4rem', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <FaShareAlt /> Partager
                    </button>
                  </div>
                </div>
                </div>
              </>
            );
          })}
        </div>
      </section>

      {/* EXCLUSIVE VIDEO SHARE MODAL */}
      {showExclusiveShareModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1500 }} onClick={() => setShowExclusiveShareModal(false)}>
          <button onClick={() => setShowExclusiveShareModal(false)} style={{ position: 'fixed', top: '80px', right: '50px', background: '#d4af37', border: 'none', color: '#000', width: '60px', height: '60px', borderRadius: '50%', fontSize: '40px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, lineHeight: 1 }}><FaTimes /></button>
          <div style={{ position: 'relative', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.02) 100%)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '0.8rem', padding: '2rem', maxWidth: '450px', textAlign: 'center', backdropFilter: 'blur(10px)' }} onClick={(e) => e.stopPropagation()}>

            <h2 style={{ color: '#d4af37', fontSize: '1.3rem', fontWeight: 700, margin: '0 0 0.8rem 0', letterSpacing: '1px' }}>PARTAGER</h2>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
              <button onClick={() => { const url = window.location.href; window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'); }} style={{ padding: '0.8rem 1.2rem', background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', border: '1px solid #d4af37', borderRadius: '0.4rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaFacebook /> FB
              </button>
              <button onClick={() => { const url = window.location.href; window.open(`https://wa.me/?text=${encodeURIComponent('Regarde cette vidéo exclusive: ' + url)}`, '_blank'); }} style={{ padding: '0.8rem 1.2rem', background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', border: '1px solid #d4af37', borderRadius: '0.4rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaComment /> WA
              </button>
              <button onClick={() => { const url = window.location.href; window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Regarde cette vidéo exclusive!')}`, '_blank'); }} style={{ padding: '0.8rem 1.2rem', background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', border: '1px solid #d4af37', borderRadius: '0.4rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SiTwitter /> X
              </button>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('✓ Lien copié'); }} style={{ padding: '0.8rem 1.2rem', background: 'rgba(212, 175, 55, 0.2)', color: '#d4af37', border: '1px solid #d4af37', borderRadius: '0.4rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaLink /> Lien
              </button>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '0.4rem', padding: '0.8rem', fontSize: '0.75rem', color: '#999', wordBreak: 'break-all' }}>
              {window.location.href}
            </div>
          </div>
        </div>
      )}

      {/* EXCLUSIVE VIDEO FULLSCREEN MODAL */}
      {exclusiveVideoFullscreen && gallery?.filter((m: any) => m.type === 'video')?.slice(0, 1).map((video: any) => {
        const getYoutubeId = (url: string) => {
          if (url.includes('watch?v=')) return url.split('watch?v=')[1].split('&')[0];
          return url.split('/').pop();
        };
        const youtubeId = getYoutubeId(video.url);
        const startTime = video.startTime || 0;
        return (
          <div key={video.id} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setExclusiveVideoFullscreen(false)}>
            <div style={{ position: 'relative', width: '95%', height: '95%', background: '#000' }} onClick={(e) => e.stopPropagation()}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?start=${startTime}&autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button onClick={() => setExclusiveVideoFullscreen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#d4af37', color: '#000', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '28px', fontWeight: 'bold', zIndex: 2001, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaTimes /></button>
            </div>
          </div>
        );
      })}

      {/* MUSIQUE/ALBUMS */}
      <section className="section" id="musique">
        <h2>Discographie</h2>
        {albums?.length > 0 ? (
          <div className="grid">
            {albums.map((album: any) => (
              <div key={album.id} className="card">
                <img src={album.coverImage || '/images/placeholder.png'} alt={album.title} onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23333%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23666%22%3EAlbum Cover%3C/text%3E%3C/svg%3E'; }} />
                <h3>{album.title}</h3>
                <p className="year">{new Date(album.releaseDate).getFullYear()}</p>
                <button className="card-button" onClick={() => setSelectedAlbum(album)}><FaPlay /></button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--secondary)', fontSize: '1.2rem' }}>Albums à venir...</p>
        )}
      </section>

      {/* CLIPS & VIDÉOS */}
      {songsWithoutAlbum.length > 0 && (
        <section className="clips-section" id="clips" ref={clipsRef}>
          <div className="clips-badge">DERNIÈRES SORTIES</div>
          <h2>VIDÉOS & CLIPS <span className="clips-highlight">CLIPS</span></h2>
          <div className="gallery-grid">
            {songsWithoutAlbum.slice(0, clipsToShow).map((song: any) => {
              const youtubeId = song.youtubeUrl?.split('v=')[1]?.split('&')[0];
              const thumbnailUrl = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg` : '/images/placeholder.png';
              return (
                <div key={song.id} className="gallery-item" style={{ cursor: 'pointer' }} onClick={() => {
                  setModalSong(song)
                  setShowSongModal(true)
                }}>
                  <img src={thumbnailUrl} alt={song.title} />
                  <div className="gallery-overlay">
                    <h3>{song.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <p>CLIP</p>
                      {song.releaseDate && <p style={{ fontSize: '0.9rem', color: 'var(--secondary)' }}>{new Date(song.releaseDate).getFullYear()}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {songsWithoutAlbum.length > 6 && (
            <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              {clipsToShow < songsWithoutAlbum.length && (
                <button
                  onClick={() => setClipsToShow(clipsToShow + 6)}
                  style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: 'var(--secondary)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Voir plus
                </button>
              )}
              {clipsToShow > 6 && (
                <button
                  onClick={() => {
                    setClipsToShow(6)
                    setTimeout(() => {
                      clipsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }, 0)
                  }}
                  style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: 'var(--secondary)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Voir moins
                </button>
              )}
            </div>
          )}
        </section>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2001,
          padding: '2rem'
        }} onClick={() => setShowShareModal(false)}>
          <div style={{
            background: 'rgba(20, 20, 20, 0.95)',
            border: '2px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowShareModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--secondary)',
                fontSize: '1.8rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FaTimes />
            </button>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}><FaShare style={{ color: 'var(--secondary)' }} /></div>
            <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>Partager la vidéo</h3>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Partagez cette exclusivité avec vos proches</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <button style={{
                background: '#0A66C2',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }} onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}>
                f<br/>Facebook
              </button>
              <button style={{
                background: '#25D366',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }} onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank')}>
                <FaComment /><br/>WhatsApp
              </button>
              <button style={{
                background: '#1DA1F2',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }} onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank')}>
                <SiTwitter /><br/>Twitter
              </button>
              <button style={{
                background: 'var(--secondary)',
                color: '#000',
                border: 'none',
                padding: '1rem',
                borderRadius: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }} onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Lien copié!');
              }}>
                <FaLink /><br/>Copier
              </button>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <input type="text" value={window.location.href} readOnly style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--secondary)',
                flex: 1,
                fontSize: '0.85rem',
                outline: 'none'
              }} />
              <button style={{
                background: 'var(--secondary)',
                color: '#000',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem'
              }} onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Lien copié!');
              }}>
                Copier
              </button>
            </div>

            <div style={{
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '0.75rem',
              padding: '1rem',
              color: 'var(--secondary)',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaLock /> Vidéo exclusive disponible uniquement sur ce site
            </div>
          </div>
        </div>
      )}

      {/* CONCERTS */}
      <section className="concerts-section" id="concerts">
        <h2 className="section-title-concerts">Tournées & Concerts à Venir</h2>
        {concerts?.length > 0 ? (
          <>
            {/* Top section: Image + Title + Description */}
            <div className="concerts-top-section">
              {/* Image */}
              <div className="concerts-image-featured">
                {concerts[0]?.image && (
                  <img src={concerts[0].image} alt={concerts[0].title} />
                )}
              </div>

              {/* Title and description */}
              <div className="concerts-info-section">
                <h2>PRINCE DE LA VILLE<br /><span className="tour-gold">EUROPEAN</span> TOUR</h2>
                <div className="concerts-dates-list">
                  {concerts.length > 0 && (
                    <>
                      {concerts[0].description && (
                        <p className="concert-description">{concerts[0].description}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--secondary)', fontSize: '1.2rem' }}>Concerts à venir...</p>
        )}
      </section>

      {/* ACTUALITES */}
      <section className="section" id="actualites">
        <h2>Actualités</h2>
        {(blog as any)?.data?.length > 0 ? (
          <div className="blog-grid">
            {(blog as any).data.map((post: any) => (
              <article key={post.id} className="blog-card">
                <img src={post.featuredImage || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3EBlog Image%3C/text%3E%3C/svg%3E'} alt={post.title} onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3EBlog Image%3C/text%3E%3C/svg%3E'; }} />
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <p className="date">{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</p>
              </article>
            ))}
          </div>
        ) : (
          <p>Actualités à venir...</p>
        )}
      </section>

      {/* GALERIE */}
      <section className="section" id="galerie" ref={galleryRef}>
        <h2>Galerie Photos & Vidéos</h2>
        {gallery?.length > 0 ? (
          <>
            <div className="gallery-grid">
              {(showAllGallery ? gallery?.filter((item: any) => item.type === 'photo') : gallery?.filter((item: any) => item.type === 'photo').slice(0, 3)).map((item: any) => (
              <div key={item.id} className="gallery-item" onClick={() => setSelectedGalleryIdx(gallery.indexOf(item))} style={{ cursor: 'pointer' }}>
                {item.youtubeUrl || item.url?.includes('youtu') ? (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: 'var(--secondary)' }}><FaFilm /></div>
                ) : (
                  <img src={item.url} alt="gallery" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22300%22/%3E%3C/svg%3E'; }} />
                )}
              </div>
            ))}
            </div>

            {gallery.length > 3 && (
              <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                <button
                  onClick={() => {
                    if (showAllGallery) {
                      setTimeout(() => {
                        galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }, 0)
                    }
                    setShowAllGallery(!showAllGallery)
                  }}
                  style={{
                    backgroundColor: 'var(--secondary)',
                    color: '#000',
                    border: 'none',
                    padding: '12px 30px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d4a842')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--secondary)')}
                >
                  {showAllGallery ? '← Voir moins' : 'Voir plus →'}
                </button>
              </div>
            )}

          </>
        ) : (
          <p>Galerie à venir...</p>
        )}

        {/* Lightbox */}
        {selectedGalleryIdx !== null && gallery && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer'
          }} onClick={() => setSelectedGalleryIdx(null)}>
            <div style={{
              position: 'relative',
              width: '90%',
              height: '90%',
              maxWidth: '1200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} onClick={(e) => e.stopPropagation()}>
              {gallery[selectedGalleryIdx]?.youtubeUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${gallery[selectedGalleryIdx].youtubeUrl.split('v=')[1]?.split('&')[0]}${gallery[selectedGalleryIdx].startTime ? `?start=${gallery[selectedGalleryIdx].startTime}` : ''}`}
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              ) : (
                <img src={gallery[selectedGalleryIdx]?.url} alt="gallery" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              )}

              {/* Navigation buttons */}
              <button onClick={(e) => { e.stopPropagation(); setSelectedGalleryIdx((selectedGalleryIdx - 1 + gallery.length) % gallery.length); }} style={{
                position: 'absolute',
                left: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                color: 'white',
                fontSize: '2rem',
                padding: '10px 15px',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}><FaChevronLeft /></button>

              <button onClick={(e) => { e.stopPropagation(); setSelectedGalleryIdx((selectedGalleryIdx + 1) % gallery.length); }} style={{
                position: 'absolute',
                right: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                color: 'white',
                fontSize: '2rem',
                padding: '10px 15px',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}><FaChevronRight /></button>

              {/* Close button */}
              <button onClick={() => setSelectedGalleryIdx(null)} style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                padding: '10px 15px',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}><FaTimes /></button>
            </div>
          </div>
        )}
      </section>

      {/* SOCIAL STATS */}
      <section className="social-stats-section">
        <h2>Statistiques</h2>
        <div className="social-stats-grid">
          <div className="social-stat-card">
            <FaSpotify className="stat-logo" />
            <div className="stat-number">138K</div>
            <div className="stat-growth"><FaArrowUp style={{ marginRight: '0.25rem', display: 'inline' }} />+12.5%</div>
            <div className="stat-platform">SPOTIFY</div>
          </div>
          <div className="social-stat-card">
            <SiSnapchat className="stat-logo" />
            <div className="stat-number">563K</div>
            <div className="stat-growth"><FaArrowUp style={{ marginRight: '0.25rem', display: 'inline' }} />+18.3%</div>
            <div className="stat-platform">SNAPCHAT</div>
          </div>
          <div className="social-stat-card">
            <FaInstagram className="stat-logo" />
            <div className="stat-number">623K</div>
            <div className="stat-growth"><FaArrowUp style={{ marginRight: '0.25rem', display: 'inline' }} />+21.7%</div>
            <div className="stat-platform">INSTAGRAM</div>
          </div>
          <div className="social-stat-card">
            <FaYoutube className="stat-logo" />
            <div className="stat-number">974K</div>
            <div className="stat-growth"><FaArrowUp style={{ marginRight: '0.25rem', display: 'inline' }} />+28.9%</div>
            <div className="stat-platform">YOUTUBE</div>
          </div>
        </div>
      </section>

      {/* MODAL ALBUM */}
      {selectedAlbum && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }} onClick={() => { setSelectedAlbum(null); setSelectedSong(null); }}>
          <div style={{
            backgroundColor: '#0a0a0a',
            borderRadius: '1.5rem',
            overflowY: 'scroll',
            maxWidth: '1000px',
            width: '100%',
            height: '650px',
            position: 'relative',
            boxShadow: '0 20px 80px rgba(212, 175, 55, 0.3)',
            display: 'flex',
            border: '1px solid rgba(212, 175, 55, 0.3)'
          }} onClick={(e) => e.stopPropagation()} className="modal-scroll">
            <button
              onClick={() => { setSelectedAlbum(null); setSelectedSong(null); }}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(212, 175, 55, 0.2)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#d4af37',
                fontSize: '1.5rem',
                cursor: 'pointer',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212, 175, 55, 0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)'; }}
            >
              <FaTimes />
            </button>

            {/* LEFT - COVER & NOW PLAYING */}
            <div style={{ flex: '0 0 50%', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <img
                src={selectedAlbum.coverImage}
                alt={selectedAlbum.title}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  aspectRatio: '1',
                  objectFit: 'cover',
                  borderRadius: '1rem',
                  marginBottom: '2rem',
                  boxShadow: '0 10px 40px rgba(212, 175, 55, 0.2)'
                }}
              />

              <h2 style={{ margin: '0 0 0.5rem 0', color: '#d4af37', fontSize: '1.5rem', fontWeight: 700, textAlign: 'center' }}>{selectedAlbum.title}</h2>
              <p style={{ color: '#999', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center' }}>
                {new Date(selectedAlbum.releaseDate).getFullYear()}
              </p>

              {selectedSong && (
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(212, 175, 55, 0.2)', width: '100%', textAlign: 'center' }}>
                  <p style={{ color: '#999', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.75rem 0' }}>EN LECTURE</p>
                  <p style={{ color: '#d4af37', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{selectedSong.title}</p>
                </div>
              )}
            </div>

            {/* RIGHT - SONGS LIST */}
            {selectedAlbum.songs && selectedAlbum.songs.length > 0 && (
              <div style={{ flex: '0 0 50%', padding: '2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <h3 style={{ color: '#d4af37', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Chansons ({selectedAlbum.songs.length})
                </h3>

                {selectedSong && (
                  <>
                    {selectedSong.youtubeUrl && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <iframe
                          width="100%"
                          height="140"
                          src={`https://www.youtube.com/embed/${selectedSong.youtubeUrl.split('v=')[1]?.split('&')[0]}?autoplay=0`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ borderRadius: '0.5rem' }}
                        />
                      </div>
                    )}

                    {selectedSong.lyrics && (
                      <div style={{
                        marginBottom: '1rem',
                        maxHeight: '200px',
                        overflowY: 'scroll',
                        padding: '1rem',
                        backgroundColor: 'rgba(212, 175, 55, 0.05)',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(212, 175, 55, 0.2)'
                      }} className="lyrics-scroll">
                        <p style={{ color: '#999', fontSize: '0.7rem', textTransform: 'uppercase', margin: '0 0 0.75rem 0' }}>Paroles</p>
                        <p style={{ color: '#ddd', fontSize: '0.85rem', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>
                          {selectedSong.lyrics}
                        </p>
                      </div>
                    )}
                  </>
                )}

                <div style={{
                  flex: 1,
                  overflowY: 'scroll',
                  paddingRight: '0.75rem',
                  scrollBehavior: 'smooth'
                }}
                className="songs-scroll"
                >
                  {selectedAlbum.songs.map((song: any, idx: number) => (
                    <div
                      key={song.id}
                      onClick={() => setSelectedSong(song)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.85rem',
                        borderRadius: '0.5rem',
                        marginBottom: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        backgroundColor: selectedSong?.id === song.id ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = selectedSong?.id === song.id ? 'rgba(212, 175, 55, 0.15)' : 'transparent'; }}
                    >
                      <span style={{ color: '#d4af37', fontSize: '1rem', fontWeight: 700, minWidth: '1.5rem' }}>{String(idx + 1).padStart(2, '0')}</span>
                      <div style={{ flex: 1, marginLeft: '1rem' }}>
                        <p style={{ color: selectedSong?.id === song.id ? '#d4af37' : '#fff', fontWeight: selectedSong?.id === song.id ? 700 : 500, margin: 0, fontSize: '0.9rem' }}>{song.title}</p>
                      </div>
                      {song.youtubeUrl && (
                        <span style={{ color: selectedSong?.id === song.id ? '#d4af37' : '#666', fontSize: '1rem', marginLeft: '0.75rem', fontWeight: 'bold', transition: 'color 0.15s', display: 'flex', alignItems: 'center' }}>
                          <FaPlay />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SONG MODAL */}
      {showSongModal && modalSong && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem' }} onClick={() => setShowSongModal(false)}>
          <div style={{ position: 'relative', background: 'linear-gradient(135deg, rgba(13, 27, 42, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)', border: '2px solid rgba(212, 175, 55, 0.3)', borderRadius: '1rem', padding: '2rem', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button onClick={() => setShowSongModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#d4af37', border: 'none', color: '#000', width: '40px', height: '40px', borderRadius: '50%', fontSize: '24px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, lineHeight: 1 }}>
              <FaTimes />
            </button>

            {/* Song Title with Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '24px', fontWeight: 'bold', flexShrink: 0 }}>
                ♪
              </div>
              <div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 700 }}>{modalSong.title}</h3>
                <p style={{ margin: '0.25rem 0 0 0', color: '#999', fontSize: '0.85rem' }}>Mouhamed VJ</p>
              </div>
            </div>

            {/* YouTube Video */}
            {modalSong.youtubeUrl && (
              <div style={{ marginBottom: '1.5rem', borderRadius: '0.75rem', overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${modalSong.youtubeUrl.split('v=')[1]?.split('&')[0]}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: 'block' }}
                />
              </div>
            )}

            {/* Fallback Message */}
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <p style={{ color: '#999', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                SI LA VIDÉO NE DÉMARRE PAS,<br />
                <a href={modalSong.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}>CLIQUEZ ICI</a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT SECTION */}
      <section className="section" id="contact" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <h2>NOUS <span style={{ color: '#d4af37' }}>CONTACTER</span></h2>
        <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ color: '#d4af37', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nom</label>
              <input type="text" placeholder="Votre nom" style={{ width: '100%', padding: '0.75rem', background: '#1a1a1a', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '0.5rem', color: '#fff' }} />
            </div>
            <div>
              <label style={{ color: '#d4af37', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
              <input type="email" placeholder="votre@email.com" style={{ width: '100%', padding: '0.75rem', background: '#1a1a1a', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '0.5rem', color: '#fff' }} />
            </div>
            <div>
              <label style={{ color: '#d4af37', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Message</label>
              <textarea placeholder="Votre message..." rows={5} style={{ width: '100%', padding: '0.75rem', background: '#1a1a1a', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '0.5rem', color: '#fff', fontFamily: 'inherit' }} />
            </div>
            <button type="submit" style={{ padding: '0.75rem 2rem', background: '#d4af37', color: '#000', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase' }}>Envoyer</button>
          </form>
        </div>
      </section>

      {/* MODAL BIO */}
      {showBioModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            backgroundColor: '#0a0a0a',
            borderRadius: '0.75rem',
            maxWidth: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '3rem',
            position: 'relative',
            border: '1px solid rgba(212, 175, 55, 0.2)'
          }}>
            <button onClick={() => setShowBioModal(false)} style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: '#d4af37',
              fontSize: '2rem',
              cursor: 'pointer',
              padding: 0,
              width: '2rem',
              height: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaTimes />
            </button>

            <h2 style={{ color: '#d4af37', fontSize: '2rem', marginBottom: '1.5rem', marginTop: 0 }}>BIOGRAPHIE</h2>
            <div style={{ color: '#fff', lineHeight: '1.8', fontSize: '1rem' }}>
              {artist?.bio ? (
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(artist.bio) }} />
              ) : (
                <>
                  <p>Mouhamed VJ, prodige de la musique sénégalaise, commence à chanter dès l'âge de 13 ans. À 17 ans, il fait sensation avec son premier single, "Dans tes bras", qui rencontre un grand succès. Grâce à une audience déjà bien établie sur ses réseaux sociaux, il réussit à organiser un concert à guichets fermés avec seulement quelques titres à son actif.</p>

                  <p>En 2022, il sort son premier EP intitulé "En Vrai" sous le label Hoside, consolidant ainsi sa présence sur la scène musicale sénégalaise. Il enchaîne ensuite les succès en remplissant les plus grandes scènes du pays, comme l'esplanade du Grand Théâtre de Dakar, le Canal Olympia et l'esplanade du Musée des Civilisations Noires.</p>

                  <p>En 2023, VJ franchit une nouvelle étape en signant avec le label Rec 118 de Warner Music, en collaboration avec Universal Music Group, renforçant ainsi sa position sur la scène musicale africaine et internationale. Depuis, il continue de repousser les limites de son art et de conquérir de nouveaux territoires musicaux.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
