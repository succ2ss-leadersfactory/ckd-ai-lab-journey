import { useState } from "react";
import M2StructuredOutputReview, {
  structuredOutputSections,
  type StructuredOutputChecks,
} from "./M2StructuredOutputReview";

type M2AiResponsePasteProps = {
  value: string;
  onChange: (value: string) => void;
};

const initialStructuredChecks: StructuredOutputChecks = {
  opening: [],
  coachingQuestions: [],
  cautionExpressions: [],
  executionPlan: [],
  leaderSupport: [],
  checkQuestions: [],
};

function M2AiResponsePaste({ value, onChange }: M2AiResponsePasteProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [selectedChecks, setSelectedChecks] = useState<StructuredOutputChecks>(initialStructuredChecks);

  const currentSection = structuredOutputSections[currentSectionIndex];
  const currentChecks = selectedChecks[currentSection.key] || [];
  const currentSectionComplete = currentChecks.length === 5;
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === structuredOutputSections.length - 1;

  const handleToggleCheck = (sectionKey: keyof StructuredOutputChecks, checkId: string) => {
    setSelectedChecks((current) => {
      const currentChecksForSection = current[sectionKey] || [];
      const nextChecks = currentChecksForSection.includes(checkId)
        ? currentChecksForSection.filter((item) => item !== checkId)
        : [...currentChecksForSection, checkId];

      return {
        ...current,
        [sectionKey]: nextChecks,
      };
    });
  };

  const goPrevSection = () => {
    setCurrentSectionIndex((prev) => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNextSection = () => {
    if (!currentSectionComplete) {
      alert("현재 결과물의 5가지 기준을 모두 체크한 뒤 다음 결과물로 이동해주세요.");
      return;
    }
    setCurrentSectionIndex((prev) => Math.min(structuredOutputSections.length - 1, prev + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <h2>AI 답변 붙여넣기</h2>
      <p className="subtitle">
        앞 단계에서 복사한 프롬프트를 외부 AI 도구에 입력한 뒤, 생성된 답변을 아래에 붙여넣습니다.
      </p>

      <div className="status-box">
        <strong>운영 안내</strong>
        <span>AI 답변은 정답이 아니라 초안입니다.</span>
        <span>붙여넣은 뒤 결과물을 6개 항목으로 나누어 순서대로 확인합니다.</span>
      </div>

      <label className="field-group">
        AI가 생성한 답변
        <textarea
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setCurrentSectionIndex(0);
            setSelectedChecks(initialStructuredChecks);
          }}
          placeholder="외부 AI 도구에서 생성된 답변을 여기에 붙여넣어 주세요."
        />
      </label>

      <div className="status-box compact-status">
        <strong>붙여넣기 기준</strong>
        <span>답변 전체를 붙여넣어도 됩니다.</span>
        <span>실제 고객명, 제품명, 팀원 실명 등이 포함되어 있으면 다음 단계에서 반드시 제거·수정합니다.</span>
        <span>{value.trim() ? "AI 답변이 입력되었습니다. 아래에서 결과물별로 확인하세요." : "AI 답변을 붙여넣으면 결과물 정리 보드가 표시됩니다."}</span>
      </div>

      {value.trim() && (
        <>
          <M2StructuredOutputReview
            aiResponse={value}
            currentSectionIndex={currentSectionIndex}
            selectedChecks={selectedChecks}
            onToggleCheck={handleToggleCheck}
          />

          <div className="nav-row inner-nav">
            <button
              className="secondary-button"
              disabled={isFirstSection}
              onClick={goPrevSection}
              type="button"
            >
              이전 결과물
            </button>
            <button
              className="secondary-button"
              disabled={isLastSection}
              onClick={goNextSection}
              type="button"
            >
              다음 결과물
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default M2AiResponsePaste;
