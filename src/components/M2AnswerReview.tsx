type M2AnswerReviewProps = {
  selectedRiskIds: string[];
  onToggleRisk: (riskId: string) => void;
};

export const m2AnswerRisks = [
  {
    id: "security-risk",
    title: "보안 위험",
    description: "고객명, 병원명, 의료진명, 제품명, 실제 매출자료, 팀원 실명 등이 포함될 가능성이 있습니다.",
  },
  {
    id: "compliance-risk",
    title: "준법·윤리 위험",
    description: "처방 유도, 부적절한 고객 설득, 내부 기준 위반으로 오해될 표현이 있습니다.",
  },
  {
    id: "field-language-gap",
    title: "현장 언어 부족",
    description: "표현이 문서적이거나 기계적이어서 실제 영업팀장이 말하기 어색합니다.",
  },
  {
    id: "over-comfort",
    title: "위로 과잉",
    description: "공감은 많지만 성과 기준과 개선 요구가 흐려질 수 있습니다.",
  },
  {
    id: "over-pressure",
    title: "압박 과잉",
    description: "성과 요구는 분명하지만 팀원의 방어감을 키울 가능성이 있습니다.",
  },
  {
    id: "premature-judgment",
    title: "원인 단정",
    description: "성과 문제를 의지, 태도, 역량 부족으로 성급하게 단정합니다.",
  },
  {
    id: "weak-action",
    title: "실행 약속 부족",
    description: "다음 1~2주 안에 무엇을 바꿀지 구체적인 행동, 기준, 점검 시점이 부족합니다.",
  },
  {
    id: "leader-support-missing",
    title: "팀장 지원 누락",
    description: "팀원에게만 책임을 넘기고 팀장이 제공할 지원, 기준, 코칭이 빠져 있습니다.",
  },
];

function M2AnswerReview({ selectedRiskIds, onToggleRisk }: M2AnswerReviewProps) {
  return (
    <>
      <h2>AI 답변 감별</h2>
      <p className="subtitle">
        AI 답변을 그대로 사용하지 않고, 보안성·현장성·성과 책임·실행 가능성 관점에서 위험 요소를 감별합니다. 복수 선택할 수 있습니다.
      </p>

      <div className="status-box">
        <strong>감별 원칙</strong>
        <span>AI 답변은 정답이 아니라 초안입니다.</span>
        <span>팀장 판단과 우리 조직 언어에 맞는 수정이 필요합니다.</span>
      </div>

      <div className="scan-list">
        {m2AnswerRisks.map((risk) => {
          const selected = selectedRiskIds.includes(risk.id);
          return (
            <button
              key={risk.id}
              className={selected ? "choice-button selected" : "choice-button"}
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
        <strong>감별 진행률</strong>
        <span>{selectedRiskIds.length}개 위험 요소 선택</span>
        {selectedRiskIds.length === 0 && <span>AI 답변에서 확인해야 할 위험 요소를 1개 이상 선택해주세요.</span>}
        {selectedRiskIds.length > 0 && <span>다음 단계에서는 선택한 위험 요소를 바탕으로 현장 언어로 수정합니다.</span>}
      </div>
    </>
  );
}

export default M2AnswerReview;
