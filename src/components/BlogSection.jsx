import { ArrowRight, Bell, BrainCircuit, Boxes, Code2, Database, FileText, Flame, MonitorSmartphone, ServerCog } from 'lucide-react'
import { FlowNode } from './FlowNode.jsx'
import { SectionHeading } from './SectionHeading.jsx'

function getTopicMeta(post, language) {
  const source = `${post.slug ?? ''} ${post.title?.[language] ?? ''} ${post.excerpt?.[language] ?? ''}`.toLowerCase()

  if (source.includes('front') || source.includes('react') || source.includes('ui') || source.includes('css')) {
    return {
      icon: MonitorSmartphone,
      tag: language === 'tr' ? 'Frontend' : 'Frontend',
    }
  }

  if (source.includes('back') || source.includes('api') || source.includes('laravel') || source.includes('node')) {
    return {
      icon: ServerCog,
      tag: language === 'tr' ? 'Backend' : 'Backend',
    }
  }

  if (source.includes('sql') || source.includes('data') || source.includes('db') || source.includes('mysql')) {
    return {
      icon: Database,
      tag: language === 'tr' ? 'Veri' : 'Data',
    }
  }

  if (source.includes('ai') || source.includes('ml') || source.includes('yapay') || source.includes('tensor')) {
    return {
      icon: BrainCircuit,
      tag: language === 'tr' ? 'Yapay zeka' : 'AI',
    }
  }

  if (source.includes('devops') || source.includes('docker') || source.includes('deploy')) {
    return {
      icon: Boxes,
      tag: language === 'tr' ? 'DevOps' : 'DevOps',
    }
  }

  return {
    icon: Code2,
    tag: language === 'tr' ? 'Yazılım' : 'Engineering',
  }
}

function getFallbackTopics(language, ui) {
  const suffix = ui.blogTopicCountSuffix

  return [
    {
      icon: Code2,
      title: language === 'tr' ? 'Yazılım Geliştirme' : 'Software Engineering',
      body: language === 'tr'
        ? 'Programlama dilleri, framework yapıları ve sürdürülebilir mimari kararları.'
        : 'Programming languages, framework structures, and sustainable architecture decisions.',
      count: `24 ${suffix}`,
    },
    {
      icon: MonitorSmartphone,
      title: 'Frontend',
      body: language === 'tr'
        ? 'React, modern arayüz akışları ve okunabilir component sistemleri.'
        : 'React, modern interface flows, and readable component systems.',
      count: `18 ${suffix}`,
    },
    {
      icon: ServerCog,
      title: 'Backend',
      body: language === 'tr'
        ? 'API tasarımı, veri akışı, güvenilir servis yapıları ve uygulama mantığı.'
        : 'API design, data flow, reliable service structures, and application logic.',
      count: `22 ${suffix}`,
    },
    {
      icon: BrainCircuit,
      title: language === 'tr' ? 'Yapay Zeka' : 'Artificial Intelligence',
      body: language === 'tr'
        ? 'Makine öğrenmesi, görüntü işleme ve üretken yapay zeka notları.'
        : 'Machine learning, computer vision, and generative AI notes.',
      count: `15 ${suffix}`,
      href: '/blog/ai-destekli-proje-yonetim-paneli',
    },
    {
      icon: Flame,
      title: language === 'tr' ? 'Güncel Teknolojiler' : 'Emerging Tech',
      body: language === 'tr'
        ? 'Yeni çıkan araçlar, teknik trendler ve güncel değerlendirmeler.'
        : 'New tools, technical trends, and current evaluations.',
      count: `17 ${suffix}`,
    },
    {
      icon: Boxes,
      title: 'DevOps & Docker',
      body: language === 'tr'
        ? 'Container tabanlı çalışma, dağıtım akışı ve ortam yönetimi.'
        : 'Container-based workflows, delivery pipelines, and environment management.',
      count: `13 ${suffix}`,
    },
    {
      icon: Database,
      title: language === 'tr' ? 'Veritabanı' : 'Database',
      body: language === 'tr'
        ? 'SQL, modelleme, performans ipuçları ve veri düzeni kararları.'
        : 'SQL, modelling, performance notes, and data structure decisions.',
      count: `11 ${suffix}`,
    },
    {
      icon: FileText,
      title: language === 'tr' ? 'Araçlar & Kaynaklar' : 'Tools & Resources',
      body: language === 'tr'
        ? 'Geliştirici araçları, verimlilik akışları ve yararlı kaynak önerileri.'
        : 'Developer tooling, productivity workflows, and useful resource picks.',
      count: `10 ${suffix}`,
    },
  ]
}

export function BlogSection({ t, ui, posts, language }) {
  const fallbackTopics = getFallbackTopics(language, ui)
  const cards = posts.length > 0
    ? posts.map((post) => {
      const meta = getTopicMeta(post, language)
      return {
        id: post.id,
        icon: meta.icon,
        iconImage: post.card_icon,
        title: post.title[language],
        body: post.excerpt[language],
        action: ui.blogRead,
        detail: meta.tag,
        href: `/blog/${post.slug}`,
      }
    })
    : fallbackTopics.map((item, index) => ({
      id: `fallback-topic-${index}`,
      ...item,
      action: ui.blogTopicExplore,
      detail: ui.blogTopicsTitle,
    }))

  return (
    <section className="section" id="blog" aria-labelledby="blog-title">
      <div className="grid-container">
        <SectionHeading id="blog" index={5} title={t.nav.blog} body={ui.blogTopicsBody} />

        <div className="blog-panel reveal">
          <div className="blog-panel-head">
            <h3>{posts.length > 0 ? t.nav.blog : ui.blogTopicsTitle}</h3>
            <span>{posts.length > 0 ? ui.blogBrowseAll : ui.blogEmptyTitle}</span>
          </div>

          <div className="blog-categories-grid">
            {cards.map((card) => {
              const Icon = card.icon

              return (
                <article className="blog-category-card" key={card.id}>
                  <div className="blog-category-icon">
                    {card.iconImage ? <img src={card.iconImage} alt="" /> : <Icon size={22} />}
                  </div>

                  <div className="blog-category-copy">
                    <div className="blog-category-topline">
                      <small>{card.detail}</small>
                      <h4>{card.title}</h4>
                    </div>

                    <p>{card.body}</p>

                  </div>

                  <div className="blog-category-footer">
                    {card.href ? (
                      <a href={card.href}>
                        {card.action}
                        <ArrowRight size={15} />
                      </a>
                    ) : (
                      <strong>
                        {card.action}
                        <ArrowRight size={15} />
                      </strong>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          <div className="blog-subscribe-strip">
            <div className="blog-subscribe-copy">
              <span className="blog-subscribe-icon">
                <Bell size={18} />
              </span>
              <div>
                <h4>{ui.blogNewsletterTitle}</h4>
                <p>{ui.blogNewsletterBody}</p>
              </div>
            </div>

            <a className="blog-subscribe-action" href="#contact">
              {ui.blogNewsletterAction}
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

        <div className="section-trace trace-blog" aria-hidden="true"><FlowNode label="response" /></div>
      </div>
    </section>
  )
}
