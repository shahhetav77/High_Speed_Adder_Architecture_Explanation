import type { PropsWithChildren } from 'react'

type TooltipProps = PropsWithChildren<{
  content: string
}>

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <span className="tooltip">
      <span className="tooltip__trigger" tabIndex={0}>
        {children}
      </span>
      <span className="tooltip__bubble" role="tooltip">
        {content}
      </span>
    </span>
  )
}
