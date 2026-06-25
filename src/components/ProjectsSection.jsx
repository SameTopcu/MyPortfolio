import { ArrowUpRight, BriefcaseBusiness, ExternalLink } from 'lucide-react'
import { FlowNode } from './FlowNode.jsx'
import { SectionHeading } from './SectionHeading.jsx'

export function ProjectsSection({ t, ui, projects, language, profile, onOpenProject }) {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="grid-container">
        <SectionHeading id="projects" index={2} title={t.nav.projects}/>
        {projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className={project.featured ? 'project-card featured reveal' : 'project-card reveal'} key={project.id}>
                <div className="project-card-top"><span>{String(index + 1).padStart(2, '0')}</span>{project.featured && <small>featured</small>}</div>
                <h3>{project.title[language]}</h3><p>{project.summary[language]}</p>
                <ul>{project.stack?.map((item, i) => <li key={i}>{item.name || item}</li>)}</ul>
                <div className="project-links">
                  <a
                    href={`/projects/${project.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      onOpenProject(project)
                    }}
                  >
                    {ui.projectDetails}<ArrowUpRight size={15} />
                  </a>
                  {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer">{ui.projectSource}<ArrowUpRight size={15} /></a>}
                  {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer">{ui.projectLive}<ArrowUpRight size={15} /></a>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-feature reveal">
            <div className="empty-icon"><BriefcaseBusiness /></div>
            <div><h3>{ui.projectsEmptyTitle}</h3><p>{ui.projectsEmptyBody}</p></div>
            <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">{ui.projectsEmptyAction}<ExternalLink size={17} /></a>
          </div>
        )}
        <div className="section-trace trace-projects" aria-hidden="true"><FlowNode label="database" /></div>
      </div>
    </section>
  )
}
