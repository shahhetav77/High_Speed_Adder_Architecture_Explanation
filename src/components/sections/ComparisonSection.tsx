import { Activity } from 'lucide-react'

import { SectionCard } from '@/components/shared/SectionCard'

const comparisonRows = [
  {
    name: 'Ripple Carry',
    speed: 35,
    area: 'Low',
    idea: 'Simple chain of full adders',
    bestFor: 'Small, low-cost designs',
  },
  {
    name: 'Carry Lookahead',
    speed: 84,
    area: 'Medium',
    idea: 'Generate and propagate logic',
    bestFor: 'Performance-focused ALUs',
  },
  {
    name: 'Carry Select',
    speed: 72,
    area: 'Higher',
    idea: 'Parallel sums plus mux',
    bestFor: 'Balanced speed with modular design',
  },
]

export function ComparisonSection() {
  return (
    <SectionCard
      id="comparison"
      eyebrow="D. Side-by-side view"
      title="Adder Comparison"
      description="All three adders compute the same answer. The difference is how much waiting happens before the final carry becomes known."
      aside={
        <div className="status-chip">
          <Activity size={16} />
          Relative speed indicator
        </div>
      }
    >
      <div className="comparison-table">
        <div className="comparison-table__head">
          <span>Architecture</span>
          <span>Concept</span>
          <span>Area</span>
          <span>Best use</span>
          <span>Speed</span>
        </div>
        {comparisonRows.map((row) => (
          <div key={row.name} className="comparison-table__row">
            <strong>{row.name}</strong>
            <span>{row.idea}</span>
            <span>{row.area}</span>
            <span>{row.bestFor}</span>
            <div className="speed-bar">
              <div className="speed-bar__fill" style={{ width: `${row.speed}%` }} />
              <span>{row.speed}%</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
