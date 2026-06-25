import { Check } from 'lucide-react'
import { FlowNode } from './FlowNode.jsx'
import { SectionHeading } from './SectionHeading.jsx'

export function AboutSection({ t, profile }) {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="grid-container">
        <SectionHeading id="about" index={1} title={t.nav.about} />
        <div className="about-layout">
          <div className="terminal reveal">
            <div className="terminal-bar"><i /><i /><i /><span>identity.sh</span></div>
            <pre><span>$ whoami</span>{'\n'}{profile.name}{'\n'}<span>$ role</span>{'\n'}{t.hero.role}{'\n'}{t.hero.degree}{'\n'}<span>$ location</span>{'\n'}{t.about.location}</pre>
          </div>
          <div className="about-copy reveal">
            <p>{t.about.body}</p>
            <ul>{t.about.points.map((point) => <li key={point}><Check size={17} />{point}</li>)}</ul>
          </div>
        </div>
        <div className="section-trace trace-about" aria-hidden="true"><FlowNode label="service" /></div>
      </div>
    </section>
  )
}
