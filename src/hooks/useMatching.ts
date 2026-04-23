import { useCallback } from "react";
import { atom, useAtom } from "jotai";
import type { ButtonType } from "../components/types/buttonType";
import {
  generateRandomConcept,
  generateEntries,
  type ConceptEntry,
} from "../utils/generateConcept";

const wholeConceptsPatternAtom = atom<ButtonType>("pending");
const entriesAtom = atom<ConceptEntry[]>([]);

const BATCH_SIZE = 20;

export const useMatching = () => {
  const [wholeConceptsPattern, setWholeConceptsPatternAtom] = useAtom(
    wholeConceptsPatternAtom,
  );
  const [entries, setEntries] = useAtom(entriesAtom);

  const onClickConceptCheck = (check: ButtonType) => {
    setWholeConceptsPatternAtom(check);
    if (check === "yes") {
      const codepoints = generateRandomConcept();
      setEntries(generateEntries(codepoints, 1, BATCH_SIZE));
    } else if (check === "pending") {
      setEntries([]);
    }
  };

  const loadMore = useCallback(() => {
    setEntries((prev) => {
      if (prev.length === 0) return prev;
      const lastEntry = prev[prev.length - 1];
      const nextCodepoints = [...lastEntry.codepoints];
      // increment last codepoint for next entry
      nextCodepoints[nextCodepoints.length - 1]++;
      return [
        ...prev,
        ...generateEntries(nextCodepoints, lastEntry.index + 1, BATCH_SIZE),
      ];
    });
  }, [setEntries]);

  const getQuestionText = () => {
    switch (wholeConceptsPattern) {
      case "pending":
        return "あなたは概念ですか？";
      case "yes":
        return "概念とマッチングしました。";
      default:
        return "概念以外は利用することができません。";
    }
  };

  return {
    wholeConceptsPattern,
    onClickConceptCheck,
    getQuestionText,
    entries,
    loadMore,
  };
};
