function computeHrZones(opts) {
  const method = opts.method || "max";
  let maxHR = opts.maxHR || null;
  const t = opts.thresholdHR || null;
  if (method === "max") {
    if (!maxHR && opts.ageYears && opts.ageYears > 0) {
      maxHR = 220 - Math.round(opts.ageYears);
    }
    if (!maxHR) return null;
    const m = maxHR;
    const z1 = [Math.round(m * 0.5), Math.round(m * 0.6)];
    const z2 = [Math.round(m * 0.6), Math.round(m * 0.7)];
    const z3 = [Math.round(m * 0.7), Math.round(m * 0.8)];
    const z4 = [Math.round(m * 0.8), Math.round(m * 0.9)];
    const z5 = [Math.round(m * 0.9), Math.round(m * 1)];
    return { Z1: z1, Z2: z2, Z3: z3, Z4: z4, Z5: z5 };
  } else {
    if (!t) return null;
    const z1 = [0, Math.round(t * 0.85)];
    const z2 = [Math.round(t * 0.85), Math.round(t * 0.89)];
    const z3 = [Math.round(t * 0.9), Math.round(t * 0.94)];
    const z4 = [Math.round(t * 0.95), Math.round(t * 0.99)];
    const z5 = [Math.round(t * 1), Math.round(t * 1.05)];
    return { Z1: z1, Z2: z2, Z3: z3, Z4: z4, Z5: z5 };
  }
}
function renderDetailsWithHR(details, type, zones) {
  const base = (details || "").split(" \u2014 HR")[0];
  if (!zones) return base;
  const range = (t) => {
    switch (t) {
      case "E":
        return zones.Z2;
      case "LR":
        return zones.Z2;
      case "M":
        return zones.Z3;
      case "T":
        return [zones.Z3[0], zones.Z4[1]];
      // Z3–Z4 span
      case "I":
        return zones.Z4;
      case "R":
        return zones.Z5;
      default:
        return null;
    }
  };
  const r = range(type);
  if (!r) return base;
  return `${base} \u2014 HR ${r[0]}\u2013${r[1]} bpm ${type === "T" ? "(Z3\u2013Z4)" : `(${mapTypeToZone(type)})`}`;
}
function mapTypeToZone(t) {
  switch (t) {
    case "E":
      return "Z2";
    case "LR":
      return "Z2";
    case "M":
      return "Z3";
    case "T":
      return "Z3\u2013Z4";
    case "I":
      return "Z4";
    case "R":
      return "Z5";
    default:
      return "\u2014";
  }
}

export { computeHrZones as c, renderDetailsWithHR as r };
//# sourceMappingURL=hr-CPjq97H4.mjs.map
