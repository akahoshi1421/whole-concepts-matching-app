const MAX_CODEPOINT = 0x10ffff;
const BASE = MAX_CODEPOINT + 1;
const BATCH_SIZE = 20;

export type ConceptEntry = {
  index: number;
  unicodeString: string;
  id: number;
};

function generateRandomConcept(): { unicodeString: string; id: number } {
  const length = Math.floor(Math.random() * 200) + 1;
  const codepoints: number[] = [];
  let sum = 0;
  for (let i = 0; i < length; i++) {
    let cp = Math.floor(Math.random() * BASE);
    if (cp >= 0xd800 && cp <= 0xdfff) {
      cp = 0xe000;
    }
    codepoints.push(cp);
    sum += cp;
  }
  return {
    unicodeString: String.fromCodePoint(...codepoints),
    id: sum + (length - 1) * BASE,
  };
}

export function generateEntries(
  startIndex: number,
  count: number = BATCH_SIZE,
): ConceptEntry[] {
  const entries: ConceptEntry[] = [];
  for (let i = 0; i < count; i++) {
    const { unicodeString, id } = generateRandomConcept();
    entries.push({
      index: startIndex + i,
      unicodeString,
      id,
    });
  }
  return entries;
}
