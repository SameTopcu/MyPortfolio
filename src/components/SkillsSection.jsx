import { CodeXml, Database, Network, Server } from 'lucide-react'
import { SectionHeading } from './SectionHeading.jsx'

const skillIcons = { server: Server, database: Database, code: CodeXml, network: Network }


export function SkillsSection({ t, skillGroups }) {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="grid-container">
        <SectionHeading id="skills" index={4} title={t.nav.skills}/>
        <div className="skills-grid">
          {skillGroups.map(({ icon, title, items }) => {
            const Icon = skillIcons[icon]
            return (
              <article className="skill-card reveal" key={title}>
                <div className="skill-card-heading"><Icon size={22} /><h3>{title}</h3></div>
                <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
