import { useCallback } from "react";
import { atom, useAtom } from "jotai";
import type { ButtonType } from "../components/types/buttonType";
import { generateEntries, type ConceptEntry } from "../utils/generateConcept";

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
      setEntries(generateEntries(1, BATCH_SIZE));
    } else if (check === "pending") {
      setEntries([]);
    }
  };

  const loadMore = useCallback(() => {
    setEntries((prev) => {
      if (prev.length === 0) return prev;
      return [
        ...prev,
        ...generateEntries(prev.length + 1, BATCH_SIZE),
      ];
    });
  }, [setEntries]);

  const getQuestionText = () => {
    switch (wholeConceptsPattern) {
      case "pending":
        return "あなたは概念ですか？";
      case "yes":
        return "∞件の概念とマッチングしました。";
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
