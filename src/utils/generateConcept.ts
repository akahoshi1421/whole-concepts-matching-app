const MAX_CODEPOINT = 0x10ffff;
const BASE = MAX_CODEPOINT + 1;
const BATCH_SIZE = 20;

export type ConceptEntry = {
  index: number;
  codepoints: number[];
  unicodeString: string;
  id: number;
};

function computeId(codepoints: number[]): number {
  const sum = codepoints.reduce((a, b) => a + b, 0);
  return sum + (codepoints.length - 1) * BASE;
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
  const length = Math.floor(Math.random() * 1000) + 1;
  const codepoints: number[] = [];
  for (let i = 0; i < length; i++) {
    let cp = Math.floor(Math.random() * BASE);
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
