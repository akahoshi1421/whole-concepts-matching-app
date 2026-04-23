import { useMatching } from "../hooks/useMatching";
import { Result } from "./buttons/Result";

export function Buttons() {
  const { wholeConceptsPattern, onClickConceptCheck, getQuestionText } =
    useMatching();

  return (
    <>
      <p>{getQuestionText()}</p>
      {wholeConceptsPattern === "yes" && <Result />}
      {wholeConceptsPattern === "pending" ? (
        <div>
          <button onClick={() => onClickConceptCheck("yes")}>はい</button>
          <button onClick={() => onClickConceptCheck("no")}>いいえ</button>
        </div>
      ) : (
        <div>
          <button onClick={() => onClickConceptCheck("pending")}>
            最初に戻る
          </button>
        </div>
      )}
    </>
  );
}
