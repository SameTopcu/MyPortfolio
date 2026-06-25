import { SectionHeading } from './SectionHeading.jsx'

export function ExperienceSection({ t, experience }) {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="grid-container">
        <SectionHeading id="experience" index={3} title={t.nav.experience} />
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item reveal" key={item.title}>
              <p className="timeline-period">{item.period}</p>
              <div className="timeline-marker" aria-hidden="true" />
              <div><p className="timeline-company">{item.company}</p><h3>{item.title}</h3><p>{item.description}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
