type M2AiResponsePasteProps = {
  value: string;
  onChange: (value: string) => void;
};

function M2AiResponsePaste({ value, onChange }: M2AiResponsePasteProps) {
  return (
    <>
      <h2>AI 답변 붙여넣기</h2>
      <p className="subtitle">
        앞 단계에서 복사한 프롬프트를 외부 AI 도구에 입력한 뒤, 생성된 답변을 아래에 붙여넣습니다.
      </p>

      <div className="status-box">
        <strong>운영 안내</strong>
        <span>AI 답변은 정답이 아니라 초안입니다.</span>
        <span>다음 단계에서 보안성, 현장성, 성과 책임, 실행 가능성 관점으로 감별합니다.</span>
      </div>

      <label className="field-group">
        AI가 생성한 답변
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="외부 AI 도구에서 생성된 답변을 여기에 붙여넣어 주세요."
        />
      </label>

      <div className="status-box compact-status">
        <strong>붙여넣기 기준</strong>
        <span>답변 전체를 붙여넣어도 됩니다.</span>
        <span>실제 고객명, 제품명, 팀원 실명 등이 포함되어 있으면 다음 단계에서 반드시 제거·수정합니다.</span>
        <span>{value.trim() ? "AI 답변이 입력되었습니다." : "AI 답변을 붙여넣으면 다음 단계로 이동할 수 있습니다."}</span>
      </div>
    </>
  );
}

export default M2AiResponsePaste;
