import { ArrowLeft, ArrowUpRight, CircleDot, Code2, Layers3, Orbit, RadioTower } from 'lucide-react'



function localizedValue(field, language, fallback = '') {
  if (!field || typeof field !== 'object') return fallback
  return field[language] ?? field.tr ?? field.en ?? fallback
}

function localizedList(field, language) {
  if (!field || typeof field !== 'object') return []
  const items = field[language] ?? field.tr ?? field.en ?? []
  return Array.isArray(items) ? items.filter(Boolean) : []
}

export function ProjectDetailPage({ project, language, ui, onBack }) {
  if (!project) {
    return (
      <main id="main" className="project-detail-page">
        <section className="project-detail-empty">
          <button className="detail-back" type="button" onClick={onBack}>
            <ArrowLeft size={17} />
            {ui.projectBack}
          </button>
          <h1>{ui.projectNotFoundTitle}</h1>
          <p>{ui.projectNotFoundBody}</p>
        </section>
      </main>
    )
  }

  const title = project.title?.[language] ?? project.title?.tr ?? project.title?.en
  const summary = project.summary?.[language] ?? project.summary?.tr ?? project.summary?.en
  const description = project.description?.[language] ?? project.description?.tr ?? project.description?.en ?? summary
  const detail = project.detail ?? {}
  const stack = Array.isArray(project.stack) ? project.stack.filter(Boolean) : []
  const paragraphs = description.split(/\n+/).map((item) => item.trim()).filter(Boolean)
  const primaryParagraphs = paragraphs.length ? paragraphs : [description]

  const labels = language === 'tr'
    ? {
        status: 'Durum',
        statusReady: 'Erisilebilir',
        statusPrivate: 'Yakinda',
        links: 'Baglantilar',
        source: 'Kaynak kod',
        live: 'Canli yayin',
        stackCount: 'Stack kalemi',
        overview: 'Proje genel bakis',
        overviewTitle: 'Ne insa edildi, neden onemli ve hangi problemi hedefliyor?',
        stackLabel: 'Teknoloji katmani',
        stackTitle: 'Kullanilan teknolojiler',
        stackFallback: 'Bu proje icin teknoloji detaylari daha sonra genisletilecek.',
        features: 'One cikanlar',
        featuresTitle: 'Kullanılan Teknolojiler',
        architecture: 'Akış',
        architectureTitle: 'Basit teknik akis',
        results: 'Sonuc',
        resultsTitle: 'Projenin Kazanımları',
        panelTitle: 'Proje ozeti',
        panelDuration: 'Sure',
        panelRole: 'Rol',
        panelVersion: 'Surum',
        panelUpdated: 'Guncellik',
        durationValue: 'Aktif gelistirme akisi',
        roleValue: 'Tasarim + gelistirme',
        versionValue: 'v1.0 yaklasimi',
        updatedValue: 'Portfoy yayini icin hazir',
      }
    : {
        status: 'Status',
        statusReady: 'Available',
        statusPrivate: 'Soon',
        links: 'Links',
        source: 'Source code',
        live: 'Live release',
        stackCount: 'Stack items',
        overview: 'Project overview',
        overviewTitle: 'What was built, why it matters, and which problem it targets?',
        challengeTitle: 'Constraints and decision space',
        challengeBody: 'The goal was not only to ship something that works. Readable data flow, sustainable structure, and clear user direction all needed to hold together.',
        challengeBody: 'The goal was not only to ship something that works. Readable data flow, sustainable structure, and clear user direction all needed to hold together.',
        stackLabel: 'Technology layer',
        stackTitle: 'Technologies used',
        stackFallback: 'Technology details for this project will be expanded later.',
        features: 'Highlights',
        featuresTitle: 'Capabilities prioritised in delivery',
        architecture: 'Flow',
        architectureTitle: 'Simple technical flow',
        results: 'Outcome',
        resultsTitle: 'Practical outputs of this structure',
        panelTitle: 'Project summary',
        panelDuration: 'Duration',
        panelRole: 'Role',
        panelVersion: 'Version',
        panelUpdated: 'Update',
        durationValue: 'Active delivery cycle',
        roleValue: 'Design + development',
        versionValue: 'v1.0 direction',
        updatedValue: 'Ready for portfolio release',
      }

  const metaItems = [
    {
      label: labels.stackCount,
      value: stack.length ? String(stack.length).padStart(2, '0') : '00',
      icon: Layers3,
    },
    {
      label: labels.status,
      value: project.live_url || project.github_url ? labels.statusReady : labels.statusPrivate,
      icon: Orbit,
    },
    {
      label: labels.links,
      value: [project.github_url && labels.source, project.live_url && labels.live].filter(Boolean).join(' / ') || labels.statusPrivate,
      icon: RadioTower,
    },
  ]

  const panelItems = [
    { label: labels.panelDuration, value: localizedValue(detail.panel?.duration, language, labels.durationValue) },
    { label: labels.panelRole, value: localizedValue(detail.panel?.role, language, labels.roleValue) },
    { label: labels.panelVersion, value: localizedValue(detail.panel?.version, language, labels.versionValue) },
    { label: labels.panelUpdated, value: localizedValue(detail.panel?.updated, language, labels.updatedValue) },
  ]




  const resultItems = localizedList(detail.results, language).length
    ? localizedList(detail.results, language)
    : language === 'tr'
      ? [
        'Okunabilir bir proje anlatimi saglar.',
        'Teknik kararlarin nedenini daha gorunur hale getirir.',
        'Kaynak kod, canli yayin ve stack bilgisini tek akis uzerinde toplar.',
      ]
      : [
        'Creates a more readable project narrative.',
        'Makes the reasoning behind technical decisions easier to understand.',
        'Brings source, live release, and stack context into one flow.',
      ]

  return (
    <main id="main" className="project-detail-page">
      <section className="project-detail-hero">
        <div className="project-detail-copy">
          <div className="project-detail-topline">
            
            <span className="detail-eyebrow">{ui.projectDetailEyebrow}</span>
          </div>
          <h1 style={{ fontSize: '75px' }}>{title}</h1>
          <p>{summary}</p>
          <div className="project-detail-actions">
            <button className="detail-back" type="button" onClick={onBack}>
              <ArrowLeft size={17} />
              {ui.projectBack}
            </button>
            {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer">{ui.projectSource}<ArrowUpRight size={16} /></a>}
            {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer">{ui.projectLive}<ArrowUpRight size={16} /></a>}
            
          </div>
        </div>

        <div className="project-detail-cover">
          {project.image ? <img src={project.image} alt={title} /> : <Code2 size={72} aria-hidden="true" />}
        </div>
      </section>

      <section className="project-detail-body">
        <article className="project-detail-section">
          <span className="project-detail-label">{labels.overview}</span>
          <h2>{localizedValue(detail.overview_title, language, labels.overviewTitle)}</h2>
          <div className="project-detail-prose">
            {primaryParagraphs.map((paragraph, index) => (
              <p key={`${title}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="project-detail-sidepanel">
          <section style={{borderRadius:"10px"}} className="project-detail-panel">
            <div>
              <CircleDot size={18} />
              <h2>{labels.panelTitle}</h2>
            </div>
            <dl className="project-detail-facts">
              {panelItems.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </section>
      
      <section className="project-detail-stack-section">
        <div className="project-detail-heading">
          <span className="project-detail-label">{labels.stackLabel}</span>
          <h2>{labels.stackTitle}</h2>
        </div>

        {stack.length ? (
          <div className="project-detail-stack-grid">
            {stack.map((item, idx) => (
              <article key={idx} className="project-detail-stack-card">
                {item.icon && <div className="tech-icon"><img src={item.icon} alt={item.name} style={{width:'100%', height:'100%', objectFit:'contain'}} /></div>}
                <div className="tech-info">
                  <h3>{item.name || item}</h3>
                  {item.subtitle && <p>{item.subtitle}</p>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="project-detail-fallback">{labels.stackFallback}</p>
        )}
      </section>

      {detail.architecture_image && (
        <section className="project-detail-architecture-image-section" style={{ marginTop: 'clamp(2rem, 5vw, 4rem)' }}>
          <div className="project-detail-heading">
            <span className="project-detail-label">{labels.architecture}</span>
            <h2>{language === 'tr' ? 'Sistemin çalışma akışı' : 'System workflow'}</h2>
          </div>
          <div className="architecture-image-wrapper" style={{ marginTop: '2rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line)' }}>
            <img src={detail.architecture_image} alt="Architecture" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </section>
      )}

      <section className="project-detail-results">
        <div className="project-detail-heading">
          <span className="project-detail-label">{labels.results}</span>
          <h2>{labels.resultsTitle}</h2>
        </div>
        <ul className="project-detail-result-list">
          {resultItems.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </main>
  )
}
