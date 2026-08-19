import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import '../styles/Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo.png" alt="Mouhamed VJ" style={{ height: '70px', objectFit: 'contain' }} />
        </Link>

        {/* Desktop Menu */}
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

        {/* Hamburger Menu Button */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="nav-menu-mobile">
            <li><a href="/#accueil" onClick={closeMenu}>Accueil</a></li>
            <li><a href="/#biographie" onClick={closeMenu}>Biographie</a></li>
            <li><a href="/#musique" onClick={closeMenu}>Musique</a></li>
            <li><a href="/#clips" onClick={closeMenu}>Clips</a></li>
            <li><a href="/#exclusive" onClick={closeMenu}>Exclusif</a></li>
            <li><a href="/#actualites" onClick={closeMenu}>Actualités</a></li>
            <li><a href="/#galerie" onClick={closeMenu}>Galerie</a></li>
            <li><a href="/#concerts" onClick={closeMenu}>Concerts</a></li>
            <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>
          </ul>
        )}
      </nav>
    </header>
  )
}
