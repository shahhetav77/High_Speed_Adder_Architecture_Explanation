import type { PropsWithChildren, ReactNode } from 'react'

type SectionCardProps = PropsWithChildren<{
  eyebrow?: string
  title: string
  description?: string
  aside?: ReactNode
  id?: string
  className?: string
}>

export function SectionCard({
  eyebrow,
  title,
  description,
  aside,
  children,
  id,
  className = '',
}: SectionCardProps) {
  return (
    <section id={id} className={`section-card ${className}`.trim()}>
      <div className="section-card__header">
        <div>
          {eyebrow ? <span className="section-card__eyebrow">{eyebrow}</span> : null}
          <h2>{title}</h2>
          {description ? <p className="section-card__description">{description}</p> : null}
        </div>
        {aside ? <div className="section-card__aside">{aside}</div> : null}
      </div>
      {children}
    </section>
  )
}
