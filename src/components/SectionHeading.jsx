export function SectionHeading({ id, index, title }) {
  return (
    <header className="section-heading reveal">
      <div className="section-title-row">
        <span className="section-index">{String(index).padStart(2, '0')}</span>
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
    </header>
  )
}
