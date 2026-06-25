import { ArrowDownToLine, ArrowRight } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { FlowNode } from './FlowNode.jsx'
import { LinkedInMark } from './LinkedInMark.jsx'

export function HeroSection({ t, ui, profile }) {
  const [firstName, ...lastName] = profile.name.split(' ')

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid grid-container">
        <div className="hero-copy reveal is-visible">
          <h1 id="hero-title"><span>{firstName}</span><span>{lastName.join(' ')}</span></h1>
          <p className="hero-role">{t.hero.role}<br />{t.hero.degree}</p>
          <p className="hero-intro">{t.hero.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">{ui.heroProjects}<ArrowRight size={18} /></a>
            <a className="button button-secondary" href={profile.cv} download>{ui.heroCv}<ArrowDownToLine size={18} /></a>
          </div>
          <div className="social-row">
            <a href={profile.github} target="_blank" rel="noreferrer"><SiGithub size={18} />GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedInMark />LinkedIn</a>
          </div>
        </div>
        <div className="hero-portrait reveal is-visible">
          <div className="portrait-grid" aria-hidden="true" />
          <img src={profile.photo} alt={profile.name} />
        </div>
        <div className="hero-trace" aria-hidden="true"><FlowNode label="request" /></div>
      </div>
    </section>
  )
}
