import { useTranslation } from 'react-i18next'
import '../styles/LanguageSwitcher.css'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'wo', label: 'WO' }
  ]

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${i18n.language === lang.code ? 'active' : ''}`}
          onClick={() => handleLanguageChange(lang.code)}
          title={`Switch to ${lang.label}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
