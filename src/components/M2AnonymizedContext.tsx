import type { M2Issue } from "../data/m2Data";

type M2AnonymizedContextProps = {
  issue?: M2Issue;
  value: string;
  onChange: (value: string) => void;
};

const forbiddenItems = [
  "실제 고객명",
  "병원명",
  "의료진명",
  "제품명",
  "실제 매출자료",
  "처방 관련 정보",
  "팀원 실명",
  "민감한 평가 정보",
];

function M2AnonymizedContext({ issue, value, onChange }: M2AnonymizedContextProps) {
  return (
    <>
      <h2>익명화 상황 입력</h2>
      <p className="subtitle">
        선택한 Full Lab 상황을 우리 팀 맥락에 맞게 일반화해서 작성합니다. 실제 고객명·제품명·팀원 실명은 입력하지 않습니다.
      </p>

      {issue && (
        <article className="scan-card">
          <div className="scan-card-header">
            <b>Full</b>
            <div>
              <strong>
                {issue.code}. {issue.title}
              </strong>
              <p>{issue.situation}</p>
              <span>판단 초점: {issue.focus}</span>
            </div>
          </div>
        </article>
      )}

      <div className="status-box">
        <strong>입력하지 말아야 할 정보</strong>
        {forbiddenItems.map((item) => (
          <span key={item}>• {item}</span>
        ))}
      </div>

      <label className="field-group">
        익명화된 상황 설명
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="예: 최근 한 팀원이 활동은 꾸준히 하고 있지만 성과 전환이 낮아지고 있습니다. 본인은 노력하고 있다고 느끼며, 팀장은 활동 방식과 우선순위를 함께 점검하려고 합니다."
        />
      </label>

      <div className="status-box compact-status">
        <strong>작성 기준</strong>
        <span>고유명사는 빼고, 상황의 구조와 팀장 고민이 드러나게 작성합니다.</span>
        <span>다음 단계에서는 이 내용을 바탕으로 AI 프롬프트를 생성합니다.</span>
      </div>
    </>
  );
}

export default M2AnonymizedContext;
