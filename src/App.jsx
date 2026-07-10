import { useEffect, useState } from 'react'
import { AboutSection } from './components/AboutSection.jsx'
import { BlogDetailPage } from './components/BlogDetailPage.jsx'
import { BlogSection } from './components/BlogSection.jsx'
import { ContactSection } from './components/ContactSection.jsx'
import { ExperienceSection } from './components/ExperienceSection.jsx'
import { HeroSection } from './components/HeroSection.jsx'
import { MouseFollower } from './components/MouseFollower.jsx'
import { ProjectDetailPage } from './components/ProjectDetailPage.jsx'
import { ProjectsSection } from './components/ProjectsSection.jsx'
import { SiteFooter } from './components/SiteFooter.jsx'
import { SiteHeader } from './components/SiteHeader.jsx'
import { SkillsSection } from './components/SkillsSection.jsx'
import { uiCopy } from './data/portfolio.js'
import { usePortfolioData } from './hooks/usePortfolioData.js'
import { usePersistentPreference } from './hooks/usePersistentPreference.js'
import { useRevealOnScroll } from './hooks/useRevealOnScroll.js'

function App() {
  const defaultTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  const [theme, setTheme] = usePersistentPreference('portfolio-theme', defaultTheme)
  const [language, setLanguage] = usePersistentPreference('portfolio-language', 'tr')
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const portfolio = usePortfolioData()
  const t = portfolio.translations[language]
  const ui = uiCopy[language]
  const experiences = portfolio.experiences.map((item) => ({ ...item, period: item.period[language], title: item.title[language], description: item.description[language] }))
  const skills = portfolio.skillGroups.map((group) => ({ ...group, title: typeof group.title === 'string' ? group.title : group.title[language] }))
  const projectMatch = currentPath.match(/^\/projects\/([^/]+)$/)
  const blogMatch = currentPath.match(/^\/blog\/([^/]+)$/)
  const selectedProject = projectMatch ? portfolio.projects.find((project) => String(project.id) === projectMatch[1]) : null
  const selectedPost = blogMatch ? portfolio.posts.find((post) => post.slug === blogMatch[1]) : null

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.lang = language
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#070b14' : '#f4f7fa')
  }, [theme, language])

  useRevealOnScroll(`${language}-${portfolio.source}`)

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const openProject = (project) => {
    const path = `/projects/${project.id}`
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goHome = () => {
    window.history.pushState({}, '', '/')
    setCurrentPath('/')
    window.requestAnimationFrame(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }))
  }

  const goBlog = () => {
    window.history.pushState({}, '', '/')
    setCurrentPath('/')
    window.requestAnimationFrame(() => document.querySelector('#blog')?.scrollIntoView({ behavior: 'smooth' }))
  }

  return (
    <>
      <MouseFollower />
      <a className="skip-link" href="#main">{ui.skip}</a>
      <SiteHeader
        t={t}
        ui={ui}
        profile={portfolio.profile}
        language={language}
        theme={theme}
        menuOpen={menuOpen}
        onCloseMenu={() => setMenuOpen(false)}
        onToggleLanguage={() => setLanguage((current) => current === 'tr' ? 'en' : 'tr')}
        onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
        onToggleMenu={() => setMenuOpen((open) => !open)}
      />

      {blogMatch ? (
        <BlogDetailPage post={selectedPost} posts={portfolio.posts} slug={blogMatch[1]} language={language} loading={portfolio.source === 'loading'} onBack={goBlog} />
      ) : projectMatch ? (
        <ProjectDetailPage project={selectedProject} language={language} ui={ui} onBack={goHome} />
      ) : (
        <main id="main">
          <HeroSection t={t} ui={ui} profile={portfolio.profile} />
          <AboutSection t={t} profile={portfolio.profile} />
          <ProjectsSection t={t} ui={ui} projects={portfolio.projects} language={language} profile={portfolio.profile} onOpenProject={openProject} />
          <ExperienceSection t={t} experience={experiences} />
          <SkillsSection t={t} skillGroups={skills} />
          <BlogSection t={t} ui={ui} posts={portfolio.posts} language={language} />
          <ContactSection t={t} ui={ui} />
        </main>
      )}

      <SiteFooter t={t} ui={ui} profile={portfolio.profile} />
    </>
  )
}

export default App
