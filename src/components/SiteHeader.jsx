import { Menu, Moon, Sun, X } from 'lucide-react'

export function SiteHeader({ t, ui, profile, language, theme, menuOpen, onCloseMenu, onToggleLanguage, onToggleTheme, onToggleMenu }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={profile.name}><span>AT</span><strong>{profile.name}</strong></a>
      <nav className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Primary navigation">
        {Object.entries(t.nav).map(([key, label]) => <a key={key} href={`#${key}`} onClick={onCloseMenu}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button className="text-switch" type="button" onClick={onToggleLanguage} aria-label={ui.language}><strong>{language.toUpperCase()}</strong><span>/</span><span>{language === 'tr' ? 'EN' : 'TR'}</span></button>
        <button className="icon-button" type="button" onClick={onToggleTheme} aria-label={ui.theme}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
        <button className="menu-button" type="button" onClick={onToggleMenu} aria-label={menuOpen ? ui.close : ui.menu}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>
  )
}
