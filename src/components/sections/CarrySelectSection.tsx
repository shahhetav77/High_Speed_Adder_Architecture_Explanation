import { GitCompareArrows } from 'lucide-react'

import { SectionCard } from '@/components/shared/SectionCard'

type CarrySelectSectionProps = {
  selectedCarry: 0 | 1
}

export function CarrySelectSection({ selectedCarry }: CarrySelectSectionProps) {
  return (
    <SectionCard
      id="carry-select"
      eyebrow="C. Parallel speculation"
      title="Carry Select Adder"
      description="Two sums are prepared in parallel: one assumes carry-in is 0 and the other assumes carry-in is 1. A multiplexer chooses the correct result."
      aside={
        <div className="status-chip status-chip--fast">
          <GitCompareArrows size={16} />
          Parallel sums + final select
        </div>
      }
    >
      <div className="select-layout">
        <div className={`select-lane ${selectedCarry === 0 ? 'select-lane--chosen' : ''}`}>
          <span className="select-lane__title">Assume carry = 0</span>
          <span className="select-lane__value">Partial sum: 1000</span>
          <span className="select-lane__value">Carry out: 1</span>
        </div>
        <div className="select-mux">
          <span>MUX</span>
          <p>Select line reads the actual carry from the lower block.</p>
        </div>
        <div className={`select-lane ${selectedCarry === 1 ? 'select-lane--chosen' : ''}`}>
          <span className="select-lane__title">Assume carry = 1</span>
          <span className="select-lane__value">Partial sum: 1001</span>
          <span className="select-lane__value">Carry out: 1</span>
        </div>
      </div>
      <div className="select-summary">
        <span className="select-summary__chip">Actual carry from previous stage: {selectedCarry}</span>
        <p>
          Because both answers are prepared ahead of time, the circuit mostly waits for a
          quick final selection instead of recomputing the upper bits.
        </p>
      </div>
    </SectionCard>
  )
}
