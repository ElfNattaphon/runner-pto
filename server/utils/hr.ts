export type HrZones = { Z1:[number,number], Z2:[number,number], Z3:[number,number], Z4:[number,number], Z5:[number,number] }

export function computeHrZones(maxHR?: number|null, thresholdHR?: number|null): HrZones|null {
  const m = maxHR || null; const t = thresholdHR || null
  if (t) {
    // Using LTHR-based zones (common for running)
    const z1:[number,number] = [0, Math.round(t * 0.85)]
    const z2:[number,number] = [Math.round(t * 0.85), Math.round(t * 0.89)]
    const z3:[number,number] = [Math.round(t * 0.90), Math.round(t * 0.94)]
    const z4:[number,number] = [Math.round(t * 0.95), Math.round(t * 0.99)]
    const z5:[number,number] = [Math.round(t * 1.00), Math.round(t * 1.05)]
    return { Z1:z1, Z2:z2, Z3:z3, Z4:z4, Z5:z5 }
  } else if (m) {
    // Fallback to % Max HR
    const z1:[number,number] = [Math.round(m*0.50), Math.round(m*0.60)]
    const z2:[number,number] = [Math.round(m*0.60), Math.round(m*0.70)]
    const z3:[number,number] = [Math.round(m*0.70), Math.round(m*0.80)]
    const z4:[number,number] = [Math.round(m*0.80), Math.round(m*0.90)]
    const z5:[number,number] = [Math.round(m*0.90), Math.round(m*1.00)]
    return { Z1:z1, Z2:z2, Z3:z3, Z4:z4, Z5:z5 }
  }
  return null
}

export function hrText(range:[number,number]){
  return `${range[0]}–${range[1]} bpm`
}
