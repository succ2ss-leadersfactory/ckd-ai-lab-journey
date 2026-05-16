import "./m2AnswerReview.css";

type M2AnswerReviewProps = {
  selectedRiskIds: string[];
  onToggleRisk: (riskId: string) => void;
};

export const m2AnswerRisks = [
  {
    id: "specificity-gap",
    title: "구체성",
    description: "누가, 무엇을, 언제, 어떻게 할지가 충분히 보이나요?",
  },
  {
    id: "context-gap",
    title: "맥락 반영",
    description: "우리 팀 상황과 팀원의 반응이 충분히 반영되어 있나요?",
  },
  {
    id: "actionability-gap",
    title: "실행 가능성",
    description: "다음 1~2주 안에 실제로 해볼 수 있는 수준인가요?",
  },
  {
    id: "leader-language-gap",
    title: "리더 언어",
    description: "내가 팀장으로서 실제로 말할 수 있는 표현인가요?",
  },
  {
    id: "fact-check-gap",
    title: "사실 검증 가능성",
    description: "확인할 수 없는 단정이나 추측이 들어 있나요?",
  },
];

function M2AnswerReview({ selectedRiskIds, onToggleRisk }: M2AnswerReviewProps) {
  return (
    <>
      <h2>AI 답변 5가지 기준 체크</h2>
      <p className="subtitle">
        AI 답변을 그대로 사용하지 않고, 우리 팀에서 실제로 쓸 수 있는지 5가지 기준으로 확인합니다. 보완이 필요한 지점을 선택하세요.
      </p>

      <div className="status-box">
        <strong>체크 기준</strong>
        <span>중요한 것은 AI 답변의 완벽함이 아니라, 내 장면에 맞는가입니다.</span>
        <span>보안 기준은 별도로 유지하고, 여기서는 현업 적합성을 확인합니다.</span>
      </div>

      <div className="scan-list">
        {m2AnswerRisks.map((risk) => {
          const selected = selectedRiskIds.includes(risk.id);
          return (
            <button
              key={risk.id}
              className={selected ? "choice-button answer-review-card selected" : "choice-button answer-review-card"}
              onClick={() => onToggleRisk(risk.id)}
              type="button"
            >
              <strong>{risk.title}</strong>
              <span>{risk.description}</span>
            </button>
          );
        })}
      </div>

      <div className="status-box compact-status">
        <strong>체크 진행률</strong>
        <span>{selectedRiskIds.length}개 보완할 지점 선택</span>
        {selectedRiskIds.length === 0 && <span>보완할 지점을 1개 이상 선택해주세요.</span>}
        {selectedRiskIds.length > 0 && <span>다음 단계에서는 선택한 보완 지점을 바탕으로 현장 표현으로 다듬습니다.</span>}
      </div>
    </>
  );
}

export default M2AnswerReview;
