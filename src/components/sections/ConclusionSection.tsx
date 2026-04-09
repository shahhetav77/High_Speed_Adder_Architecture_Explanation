import { Cpu, Layers2, Zap } from 'lucide-react'

import { SectionCard } from '@/components/shared/SectionCard'

export function ConclusionSection() {
  return (
    <SectionCard
      id="conclusion"
      eyebrow="F. Why it matters"
      title="High-Speed Adders in Real Processors"
      description="A faster adder reduces arithmetic latency, shortens critical paths, and helps processors reach better performance targets."
    >
      <div className="conclusion-grid">
        <div className="conclusion-tile">
          <Zap size={20} />
          <h3>Higher throughput</h3>
          <p>Fast adders let ALUs complete arithmetic sooner, so instructions move through the pipeline with less waiting.</p>
        </div>
        <div className="conclusion-tile">
          <Cpu size={20} />
          <h3>CPU and GPU usage</h3>
          <p>Modern CPUs, GPUs, DSPs, and AI accelerators all depend on optimized adder structures inside arithmetic units.</p>
        </div>
        <div className="conclusion-tile">
          <Layers2 size={20} />
          <h3>Architecture tradeoffs</h3>
          <p>Designers balance speed, area, and power. Ripple Carry is smaller, while CLA and Carry Select trade hardware for speed.</p>
        </div>
      </div>
    </SectionCard>
  )
}
