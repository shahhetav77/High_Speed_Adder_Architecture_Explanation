import { Binary, Gauge, TimerReset } from 'lucide-react'

import { SectionCard } from '@/components/shared/SectionCard'
import type { AddResult } from '@/utils/adder'

type SimulatorState = {
  rippleProgress: number
  claProgress: number
  rippleDone: boolean
  claDone: boolean
}

type InteractiveSimulatorProps = {
  inputA: string
  inputB: string
  result: AddResult
  state: SimulatorState
  onInputAChange: (value: string) => void
  onInputBChange: (value: string) => void
  onRun: () => void
}

export function InteractiveSimulator({
  inputA,
  inputB,
  result,
  state,
  onInputAChange,
  onInputBChange,
  onRun,
}: InteractiveSimulatorProps) {
  const rippleLead = Math.max(0, state.rippleProgress - state.claProgress)
  const claLead = Math.max(0, state.claProgress - state.rippleProgress)

  return (
    <SectionCard
      id="simulator"
      eyebrow="E. Interactive lab"
      title="Adder Simulator"
      description="Enter two binary numbers and compare a slow carry ripple against a faster lookahead-style carry path."
      aside={
        <div className="status-chip status-chip--accent">
          <Binary size={16} />
          Try 4-bit to 8-bit examples
        </div>
      }
    >
      <div className="simulator">
        <div className="simulator__controls">
          <label className="field">
            <span>Binary A</span>
            <input value={inputA} onChange={(event) => onInputAChange(event.target.value)} />
          </label>
          <label className="field">
            <span>Binary B</span>
            <input value={inputB} onChange={(event) => onInputBChange(event.target.value)} />
          </label>
          <button className="primary-button" onClick={onRun}>
            <TimerReset size={18} />
            Run simulation
          </button>
        </div>

        <div className="simulator__results">
          <article className={`sim-card ${state.rippleDone && !state.claDone ? 'sim-card--lagging' : ''}`}>
            <div className="sim-card__header">
              <h3>Ripple Carry</h3>
              <Gauge size={18} />
            </div>
            <div className="progress-track">
              <div className="progress-track__fill" style={{ width: `${state.rippleProgress}%` }} />
            </div>
            <p className="sim-card__meta">Progress: {Math.round(state.rippleProgress)}%</p>
            <p className="sim-card__sum">{state.rippleDone ? result.sum : 'Waiting for carries...'}</p>
          </article>

          <article className={`sim-card ${state.claDone ? 'sim-card--winner' : ''}`}>
            <div className="sim-card__header">
              <h3>Carry Lookahead</h3>
              <Gauge size={18} />
            </div>
            <div className="progress-track">
              <div className="progress-track__fill progress-track__fill--fast" style={{ width: `${state.claProgress}%` }} />
            </div>
            <p className="sim-card__meta">Progress: {Math.round(state.claProgress)}%</p>
            <p className="sim-card__sum">{state.claDone ? result.sum : 'Computing carries in parallel...'}</p>
          </article>
        </div>

        <div className="simulator__footer">
          <div className="simulator__stats">
            <span>A = {result.a} ({result.decimalA})</span>
            <span>B = {result.b} ({result.decimalB})</span>
            <span>Sum = {result.sum} ({result.decimalSum})</span>
          </div>
          <p className="simulator__verdict">
            {claLead > rippleLead
              ? 'CLA finishes first because it avoids waiting for every carry transition.'
              : 'Ripple Carry catches up eventually, but its carry chain is the bottleneck.'}
          </p>
        </div>
      </div>
    </SectionCard>
  )
}
