type M2FieldRewriteProps = {
  value: string;
  onChange: (value: string) => void;
};

function M2FieldRewrite({ value, onChange }: M2FieldRewriteProps) {
  return (
    <>
      <h2>현장 표현으로 다듬기</h2>
      <p className="subtitle">
        AI 답변을 그대로 사용하지 않고, 실제 영업팀장이 팀원에게 말할 수 있는 표현으로 다듬습니다.
      </p>

      <div className="status-box">
        <strong>다듬기 기준</strong>
        <span>팀원의 노력을 인정하되 성과 책임이 흐려지지 않게 합니다.</span>
        <span>원인을 단정하지 않고 함께 확인하는 질문으로 바꿉니다.</span>
        <span>다음 1~2주 안에 실행할 행동이 드러나게 합니다.</span>
        <span>팀장의 지원도 함께 포함합니다.</span>
      </div>

      <label className="field-group">
        내가 실제로 말할 문장
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="예: 지금까지 꾸준히 활동해온 점은 분명히 인정합니다. 다만 성과 전환이 낮아진 지점은 함께 확인해볼 필요가 있습니다. 이번 2주 동안 활동 우선순위와 후속조치 방식을 같이 점검해봅시다."
        />
      </label>

      <div className="status-box compact-status">
        <strong>작성 진행률</strong>
        <span>{value.trim() ? "현장 표현으로 다듬은 문장이 입력되었습니다." : "내가 실제로 말할 문장을 1개 이상 작성해주세요."}</span>
      </div>
    </>
  );
}

export default M2FieldRewrite;
