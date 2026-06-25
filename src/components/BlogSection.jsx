import { FileText } from 'lucide-react'
import { FlowNode } from './FlowNode.jsx'
import { SectionHeading } from './SectionHeading.jsx'

export function BlogSection({ t, ui, posts, language }) {
  return (
    <section className="section" id="blog" aria-labelledby="blog-title">
      <div className="grid-container">
        <SectionHeading id="blog" index={5} title={t.nav.blog}/>
        {posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map((post) => <article className="post-card reveal" key={post.id}>
              <div><time>{new Date(post.published_at).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}</time><span>{post.slug}</span></div>
              <h3>{post.title[language]}</h3><p>{post.excerpt[language]}</p>
              {post.body?.[language] && <details><summary>{ui.blogRead}</summary><p>{post.body[language]}</p></details>}
            </article>)}
          </div>
        ) : (
          <div className="blog-coming reveal"><FileText size={30} /><div><h3>{ui.blogEmptyTitle}</h3><p>{ui.blogEmptyBody}</p></div><span className="typing-line" aria-hidden="true">_</span></div>
        )}
        <div className="section-trace trace-blog" aria-hidden="true"><FlowNode label="response" /></div>
      </div>
    </section>
  )
}
