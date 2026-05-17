export type M2LiteOutputKey =
  | "opening"
  | "coachingQuestions"
  | "cautionExpressions"
  | "executionPlan"
  | "leaderSupport"
  | "checkQuestions";

export type M2LiteOutputOption = {
  key: M2LiteOutputKey;
  title: string;
  description: string;
};

export const m2LiteOutputOptions: M2LiteOutputOption[] = [
  {
    key: "opening",
    title: "대화 오프닝",
    description: "팀원이 방어적으로 듣지 않도록 대화를 여는 첫 문장",
  },
  {
    key: "coachingQuestions",
    title: "성과 코칭 질문",
    description: "성과 문제를 단정하지 않고 함께 확인하기 위한 질문",
  },
  {
    key: "cautionExpressions",
    title: "주의할 표현",
    description: "팀원의 방어감이나 오해를 키울 수 있어 조심해야 할 표현",
  },
  {
    key: "executionPlan",
    title: "2주 실행 계획",
    description: "다음 2주 동안 실제로 실행할 구체 행동",
  },
  {
    key: "leaderSupport",
    title: "팀장의 지원",
    description: "팀원이 혼자 책임지지 않도록 팀장이 제공할 지원",
  },
  {
    key: "checkQuestions",
    title: "중간 체크 질문",
    description: "실행 중간에 막힘과 지원 필요를 확인하기 위한 질문",
  },
];

type M2LiteOutputSelectorProps = {
  selectedOutputKeys: M2LiteOutputKey[];
  onToggleOutput: (key: M2LiteOutputKey) => void;
};

function M2LiteOutputSelector({ selectedOutputKeys, onToggleOutput }: M2LiteOutputSelectorProps) {
  const selectedCount = selectedOutputKeys.length;
  const minimumMet = selectedCount >= 2;
  const maximumReached = selectedCount >= 4;

  return (
    <>
      <h2>Lite Lab 산출물 선택</h2>
      <p className="subtitle">
        이 상황에서 지금 가장 필요한 산출물을 선택하세요. 모든 것을 다 만들기보다, 실제로 바로 쓸 결과물을 고르는 것이 중요합니다.
      </p>

      <div className="status-box compact-status">
        <strong>선택 기준</strong>
        <span>최소 2개, 최대 4개까지 선택할 수 있습니다.</span>
        <span>선택한 산출물에 맞춰 Lite Lab 프롬프트가 생성됩니다.</span>
      </div>

      <div className="scan-list">
        {m2LiteOutputOptions.map((option) => {
          const selected = selectedOutputKeys.includes(option.key);
          const disabled = !selected && maximumReached;

          return (
            <button
              key={option.key}
              className={selected ? "choice-button reason-card selected" : "choice-button reason-card"}
              disabled={disabled}
              onClick={() => onToggleOutput(option.key)}
              type="button"
            >
              <strong className="reason-title">{option.title}</strong>
              <span className="reason-question">{option.description}</span>
            </button>
          );
        })}
      </div>

      <div className="status-box compact-status">
        <strong>선택 진행률</strong>
        <span>{selectedCount} / 4개 선택</span>
        {!minimumMet && <span>최소 2개 산출물을 선택해야 다음 단계로 이동할 수 있습니다.</span>}
        {minimumMet && !maximumReached && <span>선택한 산출물을 기준으로 Lite 프롬프트를 만들 수 있습니다.</span>}
        {maximumReached && <span>최대 4개까지 선택했습니다. 필요하면 선택을 해제한 뒤 다시 고를 수 있습니다.</span>}
      </div>
    </>
  );
}

export default M2LiteOutputSelector;
