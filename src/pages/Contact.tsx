import { useTranslation } from 'react-i18next'
import '../styles/pages.css'

export default function Contact() {
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(t('contact.title'))
  }

  return (
    <div className="page">
      <h1>{t('contact.title')}</h1>
      <div className="contact-container">
        <div className="contact-info">
          <h2>{t('contact.get_in_touch')}</h2>
          <p>
            <strong>{t('contact.email')}:</strong> <a href="mailto:contact@mouhamedev.sn">contact@mouhamedev.sn</a>
          </p>
          <div className="social-links-contact">
            <a href="#facebook">{t('share.facebook')}</a>
            <a href="#instagram">{t('share.whatsapp')}</a>
            <a href="#youtube">YouTube</a>
            <a href="#spotify">Spotify</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>{t('contact.send_message')}</h2>
          <div className="form-group">
            <label htmlFor="name">{t('contact.name')}</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('contact.email')}</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="subject">{t('contact.subject')}</label>
            <input type="text" id="subject" name="subject" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">{t('contact.message')}</label>
            <textarea id="message" name="message" rows={5} required></textarea>
          </div>

          <button type="submit" className="btn">{t('contact.send')}</button>
        </form>
      </div>
    </div>
  )
}
