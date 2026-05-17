import { m2LiteOutputOptions } from "./M2LitePromptGenerator";

type M2LiteOutputSelectorProps = {
  selectedOutputIds: string[];
  onToggleOutput: (outputId: string) => void;
};

function M2LiteOutputSelector({ selectedOutputIds, onToggleOutput }: M2LiteOutputSelectorProps) {
  const selectedCount = selectedOutputIds.length;
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
          const selected = selectedOutputIds.includes(option.id);
          const disabled = !selected && maximumReached;

          return (
            <button
              key={option.id}
              className={selected ? "choice-button reason-card selected" : "choice-button reason-card"}
              disabled={disabled}
              onClick={() => onToggleOutput(option.id)}
              type="button"
            >
              <strong className="reason-title">{option.title}</strong>
              <span className="reason-question">{option.promptLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="status-box compact-status">
        <strong>선택 진행률</strong>
        <span>{selectedCount} / 4개 선택</span>
        {!minimumMet && <span>산출물을 최소 2개 이상 선택해야 합니다.</span>}
        {minimumMet && !maximumReached && <span>선택한 산출물을 기준으로 Lite 프롬프트를 만들 수 있습니다.</span>}
        {maximumReached && <span>최대 4개까지 선택했습니다. 필요하면 선택을 해제한 뒤 다시 고를 수 있습니다.</span>}
      </div>
    </>
  );
}

export default M2LiteOutputSelector;
