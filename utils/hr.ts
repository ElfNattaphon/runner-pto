export type HrZones = { Z1:[number,number], Z2:[number,number], Z3:[number,number], Z4:[number,number], Z5:[number,number] }
export type HrBasis = 'max' | 'threshold'

export function computeHrZones(opts: { method?: HrBasis|null, maxHR?: number|null, thresholdHR?: number|null, ageYears?: number|null }): HrZones|null {
  const method = (opts.method || 'max') as HrBasis
  let maxHR = opts.maxHR || null
  const t = opts.thresholdHR || null

  if (method === 'max') {
    if (!maxHR && opts.ageYears && opts.ageYears > 0) {
      maxHR = 220 - Math.round(opts.ageYears)
    }
    if (!maxHR) return null
    const m = maxHR
    const z1:[number,number] = [Math.round(m*0.50), Math.round(m*0.60)]
    const z2:[number,number] = [Math.round(m*0.60), Math.round(m*0.70)]
    const z3:[number,number] = [Math.round(m*0.70), Math.round(m*0.80)]
    const z4:[number,number] = [Math.round(m*0.80), Math.round(m*0.90)]
    const z5:[number,number] = [Math.round(m*0.90), Math.round(m*1.00)]
    return { Z1:z1, Z2:z2, Z3:z3, Z4:z4, Z5:z5 }
  } else {
    if (!t) return null
    const z1:[number,number] = [0, Math.round(t * 0.85)]
    const z2:[number,number] = [Math.round(t * 0.85), Math.round(t * 0.89)]
    const z3:[number,number] = [Math.round(t * 0.90), Math.round(t * 0.94)]
    const z4:[number,number] = [Math.round(t * 0.95), Math.round(t * 0.99)]
    const z5:[number,number] = [Math.round(t * 1.00), Math.round(t * 1.05)]
    return { Z1:z1, Z2:z2, Z3:z3, Z4:z4, Z5:z5 }
  }
}

export function renderDetailsWithHR(details: string, type: string, zones: HrZones | null): string {
  const base = (details || '').split(' — HR')[0]
  if (!zones) return base
  const range = (t: string): [number,number] | null => {
    switch (t) {
      case 'E': return zones.Z2
      case 'LR': return zones.Z2
      case 'M': return zones.Z3
      case 'T': return [zones.Z3[0], zones.Z4[1]] // Z3–Z4 span
      case 'I': return zones.Z4
      case 'R': return zones.Z5
      default: return null
    }
  }
  const r = range(type)
  if (!r) return base
  return `${base} — HR ${r[0]}–${r[1]} bpm ${type==='T' ? '(Z3–Z4)' : `(${mapTypeToZone(type)})`}`
}

export function mapTypeToZone(t: string): string {
  switch (t) {
    case 'E': return 'Z2'
    case 'LR': return 'Z2'
    case 'M': return 'Z3'
    case 'T': return 'Z3–Z4'
    case 'I': return 'Z4'
    case 'R': return 'Z5'
    default: return '—'
  }
}
