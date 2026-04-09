import { Layers3 } from 'lucide-react'

import { SectionCard } from '@/components/shared/SectionCard'
import { Tooltip } from '@/components/shared/Tooltip'
import type { ClaStep } from '@/utils/adder'

type CarryLookaheadSectionProps = {
  steps: ClaStep[]
  activeStep: number
}

export function CarryLookaheadSection({
  steps,
  activeStep,
}: CarryLookaheadSectionProps) {
  return (
    <SectionCard
      id="cla"
      eyebrow="B. Parallel carry logic"
      title="Carry Lookahead Adder (CLA)"
      description="CLA predicts carries using generate and propagate signals so multiple carries can be resolved at once."
      aside={
        <div className="status-chip status-chip--fast">
          <Layers3 size={16} />
          Carries computed in parallel
        </div>
      }
    >
      <div className="cla-layout">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`cla-block ${index <= activeStep ? 'cla-block--active' : ''}`}
          >
            <div className="cla-block__header">
              <span>Bit {steps.length - index - 1}</span>
              <span>{step.aBit}{step.bBit}</span>
            </div>
            <div className="cla-metrics">
              <span>
                G = {step.generate}{' '}
                <Tooltip content="Generate means this bit pair definitely creates a carry because both inputs are 1.">
                  generate
                </Tooltip>
              </span>
              <span>
                P = {step.propagate}{' '}
                <Tooltip content="Propagate means this bit pair will pass an incoming carry forward because exactly one input is 1.">
                  propagate
                </Tooltip>
              </span>
            </div>
            <div className="cla-carry">
              <span>Cin {step.carryIn}</span>
              <span className="cla-carry__arrow" />
              <span>Cout {step.carryOut}</span>
            </div>
            <span className="cla-block__sum">Sum {step.sumBit}</span>
          </div>
        ))}
        <div className="cla-formula">
          <strong>Parallel idea</strong>
          <p>C1 = G0 + P0C0</p>
          <p>C2 = G1 + P1G0 + P1P0C0</p>
          <p>C3 = G2 + P2G1 + P2P1G0 + P2P1P0C0</p>
        </div>
      </div>
    </SectionCard>
  )
}
