import '../styles/pages.css'

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Formulaire de contact — fonctionnalité à venir')
  }

  return (
    <div className="page">
      <h1>Contact</h1>
      <div className="contact-container">
        <div className="contact-info">
          <h2>Informations</h2>
          <p>
            <strong>Email:</strong> <a href="mailto:contact@mouhamedev.sn">contact@mouhamedev.sn</a>
          </p>
          <div className="social-links-contact">
            <a href="#facebook">Facebook</a>
            <a href="#instagram">Instagram</a>
            <a href="#youtube">YouTube</a>
            <a href="#spotify">Spotify</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Envoyez un message</h2>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Sujet</label>
            <input type="text" id="subject" name="subject" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required></textarea>
          </div>

          <button type="submit" className="btn">Envoyer</button>
        </form>
      </div>
    </div>
  )
}
