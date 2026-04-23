const MAX_CODEPOINT = 0x10ffff;
const BASE = BigInt(MAX_CODEPOINT + 1);
const BATCH_SIZE = 20;

export type ConceptEntry = {
  index: number;
  codepoints: number[];
  unicodeString: string;
  id: bigint;
};

function computeId(codepoints: number[]): bigint {
  const n = codepoints.length;
  // offset = B + B² + ... + B^(n-1)
  let offset = 0n;
  let power = BASE;
  for (let i = 1; i < n; i++) {
    offset += power;
    power *= BASE;
  }
  // positional = c₀ * B^(n-1) + c₁ * B^(n-2) + ... + cₙ₋₁
  let positional = 0n;
  for (const cp of codepoints) {
    positional = positional * BASE + BigInt(cp);
  }
  return offset + positional;
}

function incrementConcept(codepoints: number[]): number[] {
  const result = [...codepoints];
  for (let i = result.length - 1; i >= 0; i--) {
    result[i]++;
    if (result[i] >= 0xd800 && result[i] <= 0xdfff) {
      result[i] = 0xe000;
    }
    if (result[i] <= MAX_CODEPOINT) {
      return result;
    }
    result[i] = 0;
  }
  return [0, ...result];
}

export function generateRandomConcept(): number[] {
  const length = Math.floor(Math.random() * 100) + 1;
  const codepoints: number[] = [];
  for (let i = 0; i < length; i++) {
    let cp = Math.floor(Math.random() * (MAX_CODEPOINT + 1));
    if (cp >= 0xd800 && cp <= 0xdfff) {
      cp = 0xe000;
    }
    codepoints.push(cp);
  }
  return codepoints;
}

export function generateEntries(
  startCodepoints: number[],
  startIndex: number,
  count: number = BATCH_SIZE,
): ConceptEntry[] {
  const entries: ConceptEntry[] = [];
  let current = startCodepoints;
  for (let i = 0; i < count; i++) {
    entries.push({
      index: startIndex + i,
      codepoints: current,
      unicodeString: String.fromCodePoint(...current),
      id: computeId(current),
    });
    current = incrementConcept(current);
  }
  return entries;
}
