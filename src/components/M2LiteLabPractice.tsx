export type M2LiteLabPracticeValue = {
  question1: string;
  question2: string;
  question3: string;
  actionPromise: string;
  leaderSupport: string;
};

type M2LiteLabPracticeProps = {
  value: M2LiteLabPracticeValue;
  onChange: (value: M2LiteLabPracticeValue) => void;
};

function M2LiteLabPractice({ value, onChange }: M2LiteLabPracticeProps) {
  const updateField = (key: keyof M2LiteLabPracticeValue, nextValue: string) => {
    onChange({ ...value, [key]: nextValue });
  };

  const requiredComplete = Boolean(
    value.question1.trim() &&
      value.question2.trim() &&
      value.question3.trim() &&
      value.actionPromise.trim() &&
      value.leaderSupport.trim()
  );

  return (
    <>
      <h2>M2 Lite Lab 질문·실행 계획</h2>
      <p className="subtitle">
        두 번째 선택 상황은 빠르게 적용합니다. 깊은 분석보다 바로 쓸 성과 코칭 질문과 짧은 실행 계획을 만드는 데 집중합니다.
      </p>

      <div className="status-box">
        <strong>Lite Lab 작성 기준</strong>
        <span>질문은 평가나 추궁이 아니라 함께 확인하는 방식으로 작성합니다.</span>
        <span>2주 실행 계획은 다음 1~2주 안에 실행 가능한 수준으로 작성합니다.</span>
        <span>팀장의 지원 문장은 팀원이 혼자 책임지는 구조가 되지 않도록 작성합니다.</span>
      </div>

      <label className="field-group">
        1. 성과 코칭 질문 1 <span className="required-mark">필수</span>
        <textarea
          value={value.question1}
          onChange={(event) => updateField("question1", event.target.value)}
          placeholder="예: 최근 활동 중 성과로 이어진 것과 그렇지 않은 것은 각각 무엇이라고 보나요?"
        />
      </label>

      <label className="field-group">
        2. 성과 코칭 질문 2 <span className="required-mark">필수</span>
        <textarea
          value={value.question2}
          onChange={(event) => updateField("question2", event.target.value)}
          placeholder="예: 지금 방식에서 우선순위를 다시 조정한다면 무엇을 먼저 바꿔보고 싶나요?"
        />
      </label>

      <label className="field-group">
        3. 성과 코칭 질문 3 <span className="required-mark">필수</span>
        <textarea
          value={value.question3}
          onChange={(event) => updateField("question3", event.target.value)}
          placeholder="예: 제가 팀장으로서 어떤 지원을 하면 다음 2주 실행에 도움이 될까요?"
        />
      </label>

      <label className="field-group">
        4. 2주 실행 계획 1개 <span className="required-mark">필수</span>
        <textarea
          value={value.actionPromise}
          onChange={(event) => updateField("actionPromise", event.target.value)}
          placeholder="예: 다음 2주 동안 우선순위 고객군을 다시 정리하고, 접점 이후 후속조치 내용을 기록합니다."
        />
      </label>

      <label className="field-group">
        5. 팀장의 지원 문장 1개 <span className="required-mark">필수</span>
        <textarea
          value={value.leaderSupport}
          onChange={(event) => updateField("leaderSupport", event.target.value)}
          placeholder="예: 제가 첫 주 중간에 함께 체크하면서 막히는 지점과 필요한 지원을 확인하겠습니다."
        />
      </label>

      <div className="status-box compact-status">
        <strong>작성 진행률</strong>
        <span>{requiredComplete ? "Lite Lab 입력 완료" : "필수 5개 항목을 입력하면 다음 단계로 이동할 수 있습니다."}</span>
      </div>
    </>
  );
}

export default M2LiteLabPractice;
