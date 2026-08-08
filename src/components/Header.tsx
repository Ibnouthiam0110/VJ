import { Link } from 'react-router-dom'
import '../styles/Header.css'

export default function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Mouhamed VJ" style={{ height: '70px', objectFit: 'contain' }} />
        </Link>

        <ul className="nav-menu">
          <li><a href="/#accueil">Accueil</a></li>
          <li><a href="/#biographie">Biographie</a></li>
          <li><a href="/#musique">Musique</a></li>
          <li><a href="/#clips">Clips</a></li>
          <li><a href="/#exclusive">Exclusif</a></li>
          <li><a href="/#actualites">Actualités</a></li>
          <li><a href="/#galerie">Galerie</a></li>
          <li><a href="/#concerts">Concerts</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}
