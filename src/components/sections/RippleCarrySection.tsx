import { Clock3 } from 'lucide-react'

import { SectionCard } from '@/components/shared/SectionCard'
import { Tooltip } from '@/components/shared/Tooltip'
import type { RippleStep } from '@/utils/adder'

type RippleCarrySectionProps = {
  steps: RippleStep[]
  activeStep: number
}

export function RippleCarrySection({ steps, activeStep }: RippleCarrySectionProps) {
  return (
    <SectionCard
      id="ripple-carry"
      eyebrow="A. Sequential baseline"
      title="Ripple Carry Adder"
      description="Each full adder waits for the carry from the previous bit. That creates a ripple effect across the word."
      aside={
        <div className="status-chip">
          <Clock3 size={16} />
          Carry waits bit-by-bit
        </div>
      }
    >
      <div className="concept-grid">
        <div className="concept-copy">
          <p>
            This is easy to build, but it is slow because the carry must travel
            through every stage. In a 32-bit or 64-bit processor, that waiting time adds up.
          </p>
          <p>
            The highlighted block below shows the delayed{' '}
            <Tooltip content="Carry propagation is the movement of carry information from one bit position to the next.">
              carry propagation
            </Tooltip>{' '}
            path.
          </p>
        </div>
        <div className="ripple-track">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`ripple-cell ${
                index === activeStep ? 'ripple-cell--active' : ''
              } ${index < activeStep ? 'ripple-cell--complete' : ''}`}
            >
              <span className="ripple-cell__title">Bit {steps.length - index - 1}</span>
              <span>{step.aBit} + {step.bBit}</span>
              <span>Carry in: {step.carryIn}</span>
              <span>Sum: {step.sumBit}</span>
              <span>Carry out: {step.carryOut}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}
