import { ArrowLeft, ArrowRight, Bookmark, CalendarDays, Check, ChevronRight, Clock3, Code2, Copy, Eye, UserRound } from 'lucide-react'
import { useState } from 'react'

const FALLBACK_CODE_SAMPLE = `function AiTaskSuggestion({ projectContext }) {
  const [suggestion, setSuggestion] = useState(null)

  async function generateSuggestion() {
    const response = await fetch('/api/ai/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: projectContext }),
    })

    const data = await response.json()
    setSuggestion(data.suggestion)
  }

  return (
    <button type="button" onClick={generateSuggestion}>
      AI onerisi olustur
    </button>
  )
}`

const fallbackDetail = {
  category: { tr: 'Projeler', en: 'Projects' },
  author: { tr: 'Samet TOPCU / Full Stack Developer', en: 'Samet TOPCU / Full Stack Developer' },
  date: { tr: '24 Haziran 2026', en: 'June 24, 2026' },
  read_time: { tr: '8 dk okuma', en: '8 min read' },
  views: { tr: '1.245 goruntulenme', en: '1,245 views' },
  lead: {
    tr: 'Takim gorevlerini, sprint ilerlemesini ve riskli isleri yapay zeka onerileriyle daha okunabilir hale getiren bir proje yonetim paneli tasarladim.',
    en: 'I designed a project management dashboard that makes team tasks, sprint progress, and risky work easier to read with AI-assisted suggestions.',
  },
  tech_tags: ['React', 'Laravel', 'Inertia.js', 'Docker', 'MySQL', 'OpenAI API'],
  sections: [
    {
      title: { tr: 'Proje Hakkinda', en: 'About the Project' },
      body: {
        tr: 'Bu proje, proje yonetim sureclerinde dagilan gorevleri, ekip yogunlugunu ve geciken isleri daha gorunur hale getirmek icin gelistirildi.',
        en: 'This project was built to make scattered tasks, team load, and delayed work more visible in project management workflows.',
      },
    },
    {
      title: { tr: 'Teknik Yaklasim', en: 'Technical Approach' },
      body: {
        tr: 'React arayuzu gorev kartlari, metrik alanlari ve AI oneri paneli olarak ayrildi. Laravel tarafinda veri akisi okunabilir kalacak sekilde modellendi.',
        en: 'The React interface was separated into task cards, metric areas, and an AI suggestion panel. The Laravel side was modelled to keep data flow readable.',
      },
    },
    {
      title: { tr: 'Sonuc', en: 'Result' },
      body: {
        tr: 'Ortaya cikan yapi, klasik proje yonetim panelini AI destekli karar akisi ile birlestiren gelistirilebilir bir temel sundu.',
        en: 'The result is an extensible base that combines a classic project management dashboard with an AI-assisted decision flow.',
      },
    },
  ],
  info_cards: [
    {
      title: { tr: 'Teknik Not', en: 'Technical Note' },
      body: { tr: 'AI yanitlari dogrudan karar olarak degil, kullaniciya destek veren oneriler olarak tasarlandi.', en: 'AI responses were designed as user-supporting suggestions, not direct decisions.' },
    },
    {
      title: { tr: 'Performans Notu', en: 'Performance Note' },
      body: { tr: 'Dashboard verileri kucuk parcalara ayrilarak kartlarin bagimsiz guncellenebilmesi hedeflendi.', en: 'Dashboard data was split into smaller pieces so cards can update independently.' },
    },
    {
      title: { tr: 'Ogrendigim Ders', en: 'Lesson Learned' },
      body: { tr: 'AI ozelliklerinde en kritik konu modelden cok, dogru baglami temiz bir sekilde hazirlamak.', en: 'For AI features, preparing clean context matters more than the model choice alone.' },
    },
  ],
  code: {
    title: 'components/AiTaskSuggestion.jsx',
    sample: FALLBACK_CODE_SAMPLE,
  },
}

function localizedValue(value, language, fallback = '') {
  if (!value) return fallback
  if (typeof value === 'string') return value
  return value[language] || value.tr || value.en || fallback
}

function localizedItems(items, language) {
  return (Array.isArray(items) ? items : [])
    .map((item) => ({
      title: localizedValue(item.title, language),
      body: localizedValue(item.body, language),
    }))
    .filter((item) => item.title || item.body)
}

function FakeDashboardPreview() {
  return (
    <div className="blog-project-preview" aria-label="Blog proje onizlemesi">
      <div className="preview-sidebar">
        <span className="preview-logo">AI</span>
        {['Panel', 'Projeler', 'Gorevler', 'Takim', 'Raporlar'].map((item, index) => (
          <span className={index === 0 ? 'is-active' : ''} key={item}>{item}</span>
        ))}
      </div>

      <div className="preview-main">
        <div className="preview-topbar">
          <div>
            <small>Project Command Center</small>
            <strong>AI Sprint Yonetimi</strong>
          </div>
          <span>Canli analiz</span>
        </div>

        <div className="preview-stat-grid">
          {[
            ['Tamamlanan', '42'],
            ['Riskli gorev', '08'],
            ['AI onerisi', '16'],
          ].map(([label, value]) => (
            <div className="preview-stat" key={label}>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="preview-content-grid">
          <section className="preview-ai-card">
            <small>AI onerileri</small>
            <p>Backend gorevlerinde darboğaz oluşmadan once iki sprint maddesini yeniden onceliklendir.</p>
            <div className="preview-ai-lines">
              <span />
              <span />
              <span />
            </div>
          </section>

          <section className="preview-chart-card">
            <small>Ilerleme grafigi</small>
            <div className="preview-chart">
              <i style={{ height: '42%' }} />
              <i style={{ height: '68%' }} />
              <i style={{ height: '51%' }} />
              <i style={{ height: '78%' }} />
              <i style={{ height: '63%' }} />
            </div>
          </section>

          <section className="preview-task-card">
            <small>Son gorevler</small>
            {['API metrikleri', 'Rol izinleri', 'Bildirim akisi'].map((item) => (
              <div className="preview-task" key={item}>
                <span />
                <strong>{item}</strong>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}

export function BlogDetailPage({ post, posts = [], slug, language = 'tr', loading = false, onBack }) {
  const [copied, setCopied] = useState(false)
  const fallbackPost = slug === 'ai-destekli-proje-yonetim-paneli'
    ? {
        id: 'fallback-blog-detail',
        slug,
        title: { tr: 'AI Destekli Proje Yonetim Paneli', en: 'AI-Powered Project Management Dashboard' },
        excerpt: fallbackDetail.lead,
        body: { tr: '', en: '' },
        detail: fallbackDetail,
      }
    : null
  const activePost = post ?? fallbackPost

  if (loading && !activePost) {
    return (
      <main id="main" className="blog-detail-page">
        <section className="project-detail-empty">
          <h1>Yazi yukleniyor</h1>
          <p>Blog verileri panelden aliniyor.</p>
        </section>
      </main>
    )
  }

  if (!activePost) {
    return (
      <main id="main" className="blog-detail-page">
        <section className="project-detail-empty">
          <button className="detail-back" type="button" onClick={onBack}>
            <ArrowLeft size={16} />
            Bloga don
          </button>
          <h1>Yazi bulunamadi</h1>
          <p>Bu blog yazisi yayindan kaldirilmis veya henuz yayinlanmamis olabilir.</p>
        </section>
      </main>
    )
  }

  const detail = { ...fallbackDetail, ...(activePost.detail ?? {}) }
  const title = localizedValue(activePost.title, language)
  const category = localizedValue(detail.category, language, fallbackDetail.category[language])
  const lead = localizedValue(detail.lead, language, localizedValue(activePost.excerpt, language))
  const body = localizedValue(activePost.body, language)
  const sections = localizedItems(detail.sections, language)
  const infoCards = localizedItems(detail.info_cards, language)
  const codeSample = detail.code?.sample || ''
  const sidebarPosts = posts.filter((item) => item.id !== activePost.id).slice(0, 6)
  const tags = Array.isArray(detail.tech_tags) && detail.tech_tags.length ? detail.tech_tags : fallbackDetail.tech_tags

  const copyCode = async () => {
    await navigator.clipboard?.writeText(codeSample)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <main id="main" className="blog-detail-page">
      <nav className="blog-breadcrumb" aria-label="Breadcrumb">
        <button type="button" onClick={onBack}>Ana Sayfa</button>
        <ChevronRight size={14} />
        <span>Blog</span>
        <ChevronRight size={14} />
        <span>{category}</span>
        <ChevronRight size={14} />
        <strong>{title}</strong>
      </nav>

      <div className="blog-detail-layout">
        <article className="blog-article">
          <header className="blog-article-header">
            <div className="blog-title-row">
              <div>
                <span className="blog-category-pill">{category}</span>
                <h1>{title}</h1>
              </div>
              <button className="blog-bookmark-button" type="button" aria-label="Yaziyi kaydet">
                <Bookmark size={19} />
              </button>
            </div>

            <p className="blog-article-lead">{lead}</p>

            <div className="blog-article-meta">
              <span><UserRound size={15} /> {localizedValue(detail.author, language, fallbackDetail.author[language])}</span>
              <span><CalendarDays size={15} /> {localizedValue(detail.date, language, fallbackDetail.date[language])}</span>
              <span><Clock3 size={15} /> {localizedValue(detail.read_time, language, fallbackDetail.read_time[language])}</span>
              <span><Eye size={15} /> {localizedValue(detail.views, language, fallbackDetail.views[language])}</span>
            </div>
          </header>

          {activePost.cover_image ? (
            <div className="blog-project-preview blog-cover-preview">
              <img src={activePost.cover_image} alt="" />
            </div>
          ) : (
            <FakeDashboardPreview />
          )}

          {body && (
            <section className="blog-content-section">
              <h2>{language === 'tr' ? 'Icerik' : 'Content'}</h2>
              <p>{body}</p>
            </section>
          )}

          {sections.map((section) => (
            <section className="blog-content-section" key={`${section.title}-${section.body}`}>
              {section.title && <h2>{section.title}</h2>}
              {section.body && <p>{section.body}</p>}
            </section>
          ))}

          <section className="blog-content-section">
            <h2>{language === 'tr' ? 'Kullanilan Teknolojiler' : 'Technologies Used'}</h2>
            <div className="blog-tech-tags">
              {tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </section>

          {codeSample && (
            <section className="blog-content-section">
              <h2>{language === 'tr' ? 'Teknik Yaklasim' : 'Technical Approach'}</h2>
              <div className="blog-code-block">
                <div className="blog-code-head">
                  <span>{detail.code?.title || fallbackDetail.code.title}</span>
                  <button type="button" onClick={copyCode}>
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? 'Kopyalandi' : 'Kopyala'}
                  </button>
                </div>
                <pre><code>{codeSample}</code></pre>
              </div>
            </section>
          )}

          {infoCards.length > 0 && (
            <div className="blog-info-grid">
              {infoCards.map((card) => (
                <aside key={`${card.title}-${card.body}`}>
                  <strong>{card.title}</strong>
                  <p>{card.body}</p>
                </aside>
              ))}
            </div>
          )}

          <nav className="blog-post-nav" aria-label="Yazi gecisleri">
            <a href="#blog"><ArrowLeft size={16} /> Onceki Yazi</a>
            <a href="#blog">Sonraki Yazi <ArrowRight size={16} /></a>
          </nav>
        </article>

        <aside className="blog-detail-sidebar">
          <section className="blog-sidebar-card">
            <div className="blog-sidebar-head">
              <h2>{language === 'tr' ? 'Diger Yazilarim' : 'Other Articles'}</h2>
              <Code2 size={16} />
            </div>

            <div className="blog-sidebar-list">
              {sidebarPosts.map((sidebarPost, index) => (
                <a className="blog-sidebar-post" href={`/blog/${sidebarPost.slug}`} key={sidebarPost.id}>
                  <span className="blog-sidebar-thumb">{String(index + 1).padStart(2, '0')}</span>
                  <span>
                    <strong>{localizedValue(sidebarPost.title, language)}</strong>
                    <small>{localizedValue(sidebarPost.detail?.date, language, '')}</small>
                  </span>
                </a>
              ))}
            </div>

            <a className="blog-sidebar-all" href="#blog">{language === 'tr' ? 'Tum Yazilarimi Gor' : 'View All Articles'} <ArrowRight size={15} /></a>
          </section>

          <section className="blog-sidebar-card">
            <h2>{language === 'tr' ? 'Ilgili Kategoriler' : 'Related Categories'}</h2>
            <div className="blog-sidebar-tags">
              {tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </section>
        </aside>
      </div>
    </main>
  )
}
