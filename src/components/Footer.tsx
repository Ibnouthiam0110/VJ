import { FaFacebook, FaInstagram, FaYoutube, FaSpotify, FaTiktok } from 'react-icons/fa'
import { SiSnapchat } from 'react-icons/si'
import '../styles/Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>À propos</h3>
          <p>Mouhamed VJ - Prince de la ville. Découvrez ma musique, mes actualités et mes concerts.</p>
        </div>

        <div className="footer-section">
          <h3>Navigation</h3>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/bio">Biographie</a></li>
            <li><a href="/music">Musique</a></li>
            <li><a href="/blog">Actualités</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Réseaux Sociaux</h3>
          <div className="social-links-footer">
            <a href="https://www.facebook.com/profile.php?id=100089011514426" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://www.instagram.com/mouhamed_vj?igsh=MWNycHZnazZ6NWJwZQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.youtube.com/channel/UCNiTCM_vGvvr8iJ8EsmtRaw" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            <a href="https://open.spotify.com/intl-fr/artist/5MDNhC2R2lHAGrUg0ztgao" target="_blank" rel="noopener noreferrer" aria-label="Spotify"><FaSpotify /></a>
            <a href="https://www.tiktok.com/@mouhamed_vj?_r=1&_t=ZS-98QACNEXVR3" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok /></a>
            <a href="https://www.snapchat.com/add/mouhamedvj7" target="_blank" rel="noopener noreferrer" aria-label="Snapchat"><SiSnapchat /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: <a href="mailto:contact@mouhamedev.sn">contact@mouhamedev.sn</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Mouhamed VJ. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
