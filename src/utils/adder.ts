export type RippleStep = {
  bitIndex: number
  aBit: number
  bBit: number
  carryIn: number
  sumBit: number
  carryOut: number
}

export type ClaStep = {
  bitIndex: number
  aBit: number
  bBit: number
  generate: number
  propagate: number
  carryIn: number
  carryOut: number
  sumBit: number
}

export type AddResult = {
  a: string
  b: string
  sum: string
  decimalA: number
  decimalB: number
  decimalSum: number
  rippleSteps: RippleStep[]
  claSteps: ClaStep[]
}

function sanitizeBinary(input: string) {
  const cleaned = input.replace(/[^01]/g, '')
  return cleaned.length > 0 ? cleaned : '0'
}

function padBinary(a: string, b: string) {
  const width = Math.max(a.length, b.length)
  return {
    a: a.padStart(width, '0'),
    b: b.padStart(width, '0'),
  }
}

export function normalizeBinaryInput(input: string, maxBits = 8) {
  return sanitizeBinary(input).slice(-maxBits)
}

export function addBinaryNumbers(rawA: string, rawB: string): AddResult {
  const cleanA = sanitizeBinary(rawA)
  const cleanB = sanitizeBinary(rawB)
  const { a, b } = padBinary(cleanA, cleanB)

  let carry = 0
  const rippleSteps: RippleStep[] = []
  const sumBits: number[] = []

  for (let index = a.length - 1; index >= 0; index -= 1) {
    const aBit = Number(a[index])
    const bBit = Number(b[index])
    const carryIn = carry
    const sumBit = aBit ^ bBit ^ carryIn
    carry = (aBit & bBit) | (carryIn & (aBit ^ bBit))

    rippleSteps.unshift({
      bitIndex: a.length - 1 - index,
      aBit,
      bBit,
      carryIn,
      sumBit,
      carryOut: carry,
    })
    sumBits.unshift(sumBit)
  }

  const claSteps: ClaStep[] = []
  const claCarries: number[] = new Array(a.length + 1).fill(0)

  for (let index = a.length - 1; index >= 0; index -= 1) {
    const displayIndex = a.length - 1 - index
    const aBit = Number(a[index])
    const bBit = Number(b[index])
    const generate = aBit & bBit
    const propagate = aBit ^ bBit
    const carryIn = claCarries[displayIndex]
    const carryOut = generate | (propagate & carryIn)
    claCarries[displayIndex + 1] = carryOut

    claSteps.unshift({
      bitIndex: displayIndex,
      aBit,
      bBit,
      generate,
      propagate,
      carryIn,
      carryOut,
      sumBit: propagate ^ carryIn,
    })
  }

  const sum = `${carry ? '1' : ''}${sumBits.join('')}`.replace(/^0+(?=\d)/, '')

  return {
    a,
    b,
    sum,
    decimalA: parseInt(a, 2),
    decimalB: parseInt(b, 2),
    decimalSum: parseInt(sum, 2),
    rippleSteps,
    claSteps,
  }
}
