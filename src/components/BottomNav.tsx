import { FaHome, FaMusic, FaUser, FaCalendar, FaEnvelope } from 'react-icons/fa'
import '../styles/BottomNav.css'

export default function BottomNav() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="bottom-nav">
      <button
        className="bottom-nav-item"
        onClick={() => scrollToSection('accueil')}
        title="Accueil"
      >
        <FaHome />
        <span>Accueil</span>
      </button>
      <button
        className="bottom-nav-item"
        onClick={() => scrollToSection('musique')}
        title="Albums"
      >
        <FaMusic />
        <span>Albums</span>
      </button>
      <button
        className="bottom-nav-item"
        onClick={() => scrollToSection('biographie')}
        title="Biographie"
      >
        <FaUser />
        <span>Bio</span>
      </button>
      <button
        className="bottom-nav-item"
        onClick={() => scrollToSection('concerts')}
        title="Concerts"
      >
        <FaCalendar />
        <span>Concerts</span>
      </button>
      <button
        className="bottom-nav-item"
        onClick={() => scrollToSection('contact')}
        title="Contact"
      >
        <FaEnvelope />
        <span>Contact</span>
      </button>
    </nav>
  )
}
