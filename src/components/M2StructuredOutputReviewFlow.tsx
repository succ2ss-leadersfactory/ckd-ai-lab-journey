import { useState } from "react";
import M2StructuredOutputReview, {
  structuredOutputSections,
  type StructuredOutputChecks,
} from "./M2StructuredOutputReview";

type M2StructuredOutputReviewFlowProps = {
  aiResponse: string;
};

const initialStructuredChecks: StructuredOutputChecks = {
  opening: [],
  coachingQuestions: [],
  cautionExpressions: [],
  executionPlan: [],
  leaderSupport: [],
  checkQuestions: [],
};

function M2StructuredOutputReviewFlow({ aiResponse }: M2StructuredOutputReviewFlowProps) {
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
      <M2StructuredOutputReview
        aiResponse={aiResponse}
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

      {isLastSection && currentSectionComplete && (
        <div className="status-box compact-status">
          <strong>결과물 정리 완료</strong>
          <span>6개 결과물의 5가지 기준 체크가 완료되었습니다. 다음 단계에서 현장 표현으로 다듬습니다.</span>
        </div>
      )}
    </>
  );
}

export default M2StructuredOutputReviewFlow;
