type M2LiteAiResponsePasteProps = {
  value: string;
  onChange: (value: string) => void;
};

function M2LiteAiResponsePaste({ value, onChange }: M2LiteAiResponsePasteProps) {
  return (
    <>
      <h2>Lite Lab AI 생성결과 붙여넣기</h2>
      <p className="subtitle">
        Lite Lab 프롬프트를 외부 AI 도구에 입력한 뒤, 생성된 답변을 아래에 붙여넣습니다.
      </p>

      <div className="status-box">
        <strong>운영 안내</strong>
        <span>AI 답변은 초안입니다. 다음 화면에서 선택한 산출물별로 분리하고 직접 수정합니다.</span>
        <span>실제 고객명, 병원명, 의료진명, 제품명, 내부자료는 포함하지 않아야 합니다.</span>
      </div>

      <label className="field-group">
        AI 생성결과
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="외부 AI 도구에서 생성된 Lite Lab 답변을 여기에 붙여넣어 주세요."
        />
      </label>

      <div className="status-box compact-status">
        <strong>입력 상태</strong>
        <span>{value.trim() ? "AI 생성결과가 입력되었습니다. 다음 화면에서 산출물별로 정리합니다." : "AI 생성결과를 붙여넣으면 다음 단계로 이동할 수 있습니다."}</span>
      </div>
    </>
  );
}

export default M2LiteAiResponsePaste;
