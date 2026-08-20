import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n/config'
import '../styles/Header.css'

export default function Header() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <header className="header">
      <nav className="navbar">
        <a href="/#accueil" className="logo">
          <img src="/logo.png" alt="Mouhamed VJ" />
        </a>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className="nav-menu">
          <li><a href="/#accueil" onClick={closeMenu}>{t('header.home')}</a></li>
          <li><a href="/#biographie" onClick={closeMenu}>{t('header.bio')}</a></li>
          <li><a href="/#musique" onClick={closeMenu}>{t('header.music')}</a></li>
          <li><a href="/#clips" onClick={closeMenu}>{t('header.clips')}</a></li>
          <li><a href="/#exclusive" onClick={closeMenu}>{t('header.exclusive')}</a></li>
          <li><a href="/#actualites" onClick={closeMenu}>{t('header.news')}</a></li>
          <li><a href="/#galerie" onClick={closeMenu}>{t('header.gallery')}</a></li>
          <li><a href="/#concerts" onClick={closeMenu}>{t('header.concerts')}</a></li>
          <li><a href="/#contact" onClick={closeMenu}>{t('header.contact')}</a></li>
        </ul>

        {menuOpen && (
          <ul className="nav-menu-mobile">
            <li><a href="/#accueil" onClick={closeMenu}>{t('header.home')}</a></li>
            <li><a href="/#biographie" onClick={closeMenu}>{t('header.bio')}</a></li>
            <li><a href="/#musique" onClick={closeMenu}>{t('header.music')}</a></li>
            <li><a href="/#clips" onClick={closeMenu}>{t('header.clips')}</a></li>
            <li><a href="/#exclusive" onClick={closeMenu}>{t('header.exclusive')}</a></li>
            <li><a href="/#actualites" onClick={closeMenu}>{t('header.news')}</a></li>
            <li><a href="/#galerie" onClick={closeMenu}>{t('header.gallery')}</a></li>
            <li><a href="/#concerts" onClick={closeMenu}>{t('header.concerts')}</a></li>
            <li><a href="/#contact" onClick={closeMenu}>{t('header.contact')}</a></li>
          </ul>
        )}

        <select
          value={i18n.language}
          onChange={handleLanguageChange}
          className="language-select"
        >
          <option value="fr">FR</option>
          <option value="en">EN</option>
          <option value="wo">WO</option>
        </select>
      </nav>
    </header>
  )
}
