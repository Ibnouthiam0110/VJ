import { FaFacebook, FaInstagram, FaYoutube, FaSpotify, FaTwitter, FaTiktok } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import '../styles/Footer.css'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{t('footer.about')}</h3>
          <p>{t('hero.name')} - {t('about.description')}</p>
        </div>

        <div className="footer-section">
          <h3>{t('footer.navigation')}</h3>
          <ul>
            <li><a href="/">{t('footer.home')}</a></li>
            <li><a href="/bio">{t('footer.bio')}</a></li>
            <li><a href="/music">{t('footer.music')}</a></li>
            <li><a href="/blog">{t('footer.news')}</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>{t('footer.social_links')}</h3>
          <div className="social-links-footer">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" aria-label="Spotify"><FaSpotify /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>{t('footer.contact')}</h3>
          <p>{t('footer.contact_email').replace('Email: contact@mouhamedev.sn', 'Email: ')}<a href="mailto:contact@mouhamedev.sn">contact@mouhamedev.sn</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} {t('hero.name')}. {t('footer.copyright')}.</p>
      </div>
    </footer>
  )
}
