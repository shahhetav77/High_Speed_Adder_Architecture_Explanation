import { useEffect, useMemo, useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

import './App.css'
import { CarryLookaheadSection } from '@/components/sections/CarryLookaheadSection'
import { CarrySelectSection } from '@/components/sections/CarrySelectSection'
import { ComparisonSection } from '@/components/sections/ComparisonSection'
import { ConclusionSection } from '@/components/sections/ConclusionSection'
import { InteractiveSimulator } from '@/components/sections/InteractiveSimulator'
import { LandingSection } from '@/components/sections/LandingSection'
import { RippleCarrySection } from '@/components/sections/RippleCarrySection'
import { WebGLShader } from '@/components/ui/web-gl-shader'
import { addBinaryNumbers, normalizeBinaryInput } from '@/utils/adder'

type Theme = 'light' | 'dark'

const sampleA = '1011'
const sampleB = '1101'

function App() {
  const sampleResult = useMemo(() => addBinaryNumbers(sampleA, sampleB), [])
  const [theme, setTheme] = useState<Theme>(
    () =>
      (document.documentElement.dataset.theme as Theme | undefined) ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  )
  const [landingBit, setLandingBit] = useState(0)
  const [rippleStep, setRippleStep] = useState(0)
  const [claStep, setClaStep] = useState(0)
  const [selectedCarry, setSelectedCarry] = useState<0 | 1>(1)
  const [inputA, setInputA] = useState('101101')
  const [inputB, setInputB] = useState('011011')
  const [simState, setSimState] = useState({
    rippleProgress: 0,
    claProgress: 0,
    rippleDone: false,
    claDone: false,
  })
  const timersRef = useRef<number[]>([])

  const simulatorResult = useMemo(
    () => addBinaryNumbers(inputA, inputB),
    [inputA, inputB],
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('adder-theme', theme)
  }, [theme])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLandingBit((current) => (current + 1) % 4)
    }, 1200)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRippleStep((current) => (current + 1) % sampleResult.rippleSteps.length)
    }, 1100)

    return () => window.clearInterval(interval)
  }, [sampleResult.rippleSteps.length])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClaStep((current) => (current + 1) % sampleResult.claSteps.length)
    }, 850)

    return () => window.clearInterval(interval)
  }, [sampleResult.claSteps.length])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSelectedCarry((current) => (current === 0 ? 1 : 0))
    }, 1800)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer))
    },
    [],
  )

  const handleStartDemo = () => {
    document.getElementById('ripple-carry')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const runSimulation = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []

    setSimState({
      rippleProgress: 0,
      claProgress: 0,
      rippleDone: false,
      claDone: false,
    })

    const bitCount = Math.max(inputA.length, inputB.length)
    const rippleTicks = bitCount * 5
    const claTicks = Math.max(4, bitCount * 2)

    for (let index = 1; index <= rippleTicks; index += 1) {
      timersRef.current.push(
        window.setTimeout(() => {
          setSimState((current) => ({
            ...current,
            rippleProgress: (index / rippleTicks) * 100,
            rippleDone: index === rippleTicks ? true : current.rippleDone,
          }))
        }, index * 180),
      )
    }

    for (let index = 1; index <= claTicks; index += 1) {
      timersRef.current.push(
        window.setTimeout(() => {
          setSimState((current) => ({
            ...current,
            claProgress: (index / claTicks) * 100,
            claDone: index === claTicks ? true : current.claDone,
          }))
        }, index * 120),
      )
    }
  }

  return (
    <div className="app-shell">
      <div className="shader-shell" aria-hidden="true">
        <WebGLShader />
      </div>

      <div className="app-frame">
        <header className="topbar">
          <div>
            <span className="topbar__label">Architecture Explorer</span>
            <p className="topbar__title">Interactive addition pathways</p>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <main className="page-content">
          <LandingSection activeBit={landingBit} onStartDemo={handleStartDemo} />
          <RippleCarrySection
            steps={sampleResult.rippleSteps}
            activeStep={rippleStep}
          />
          <CarryLookaheadSection
            steps={sampleResult.claSteps}
            activeStep={claStep}
          />
          <CarrySelectSection selectedCarry={selectedCarry} />
          <ComparisonSection />
          <InteractiveSimulator
            inputA={inputA}
            inputB={inputB}
            result={simulatorResult}
            state={simState}
            onInputAChange={(value) => setInputA(normalizeBinaryInput(value))}
            onInputBChange={(value) => setInputB(normalizeBinaryInput(value))}
            onRun={runSimulation}
          />
          <ConclusionSection />
        </main>
      </div>
    </div>
  )
}

export default App
