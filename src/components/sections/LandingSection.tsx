import { ArrowDownRight, Cpu, Gauge, Sigma } from 'lucide-react'

import { Tooltip } from '@/components/shared/Tooltip'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

type LandingSectionProps = {
  activeBit: number
  onStartDemo: () => void
}

const exampleRows = [
  { label: 'A', bits: ['1', '0', '1', '1'] },
  { label: 'B', bits: ['1', '1', '0', '1'] },
  { label: 'Sum', bits: ['1', '1', '0', '0', '0'] },
]

export function LandingSection({ activeBit, onStartDemo }: LandingSectionProps) {
  return (
    <section className="hero">
      <div className="hero__copy">
        <span className="hero__eyebrow">Digital Electronics Visual Lab</span>
        <h1>High-Speed Adder Architecture</h1>
        <p className="hero__subtitle">Enhancing Processor Performance</p>
        <p className="hero__description">
          An adder is a circuit that combines binary numbers. In CPUs, every extra
          nanosecond spent waiting for a{' '}
          <Tooltip content="A carry is the extra 1 that must move into the next bit when 1 + 1 happens.">
            carry
          </Tooltip>{' '}
          slows arithmetic, address generation, and instruction execution.
        </p>

        <div className="hero__stats">
          <div className="metric-chip">
            <Cpu size={18} />
            <span>CPU datapaths rely on fast addition</span>
          </div>
          <div className="metric-chip">
            <Gauge size={18} />
            <span>Less carry delay means faster clock targets</span>
          </div>
          <div className="metric-chip">
            <Sigma size={18} />
            <span>Same math, smarter architecture</span>
          </div>
        </div>

        <div className="hero__actions">
          <LiquidButton
            className="hero__start-button rounded-full px-8 py-3 text-base"
            size="xl"
            onClick={onStartDemo}
          >
            Start Demo
            <ArrowDownRight size={18} />
          </LiquidButton>
          <p className="hero__hint">Follow the flow from Ripple Carry to CLA and Carry Select.</p>
        </div>
      </div>

      <div className="hero__visual">
        <div className="binary-panel">
          <div className="binary-panel__header">
            <span>Animated Binary Addition</span>
            <span>1011 + 1101</span>
          </div>
          <div className="binary-grid">
            {exampleRows.map((row, rowIndex) => (
              <div key={row.label} className="binary-grid__row">
                <span className="binary-grid__label">{row.label}</span>
                {row.bits.map((bit, index) => {
                  const isActive =
                    rowIndex < 2
                      ? row.bits.length - 1 - index === activeBit
                      : row.bits.length - 2 - index === activeBit

                  return (
                    <span
                      key={`${row.label}-${index}`}
                      className={`bit-pill ${isActive ? 'bit-pill--active' : ''}`}
                    >
                      {bit}
                    </span>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="binary-panel__footer">
            <span>Step {activeBit + 1}</span>
            <span>Watch the active column move from right to left.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
