export type M2ActionCommitmentValue = {
  memberAction: string;
  leaderSupport: string;
  checkInTiming: string;
};

type M2ActionCommitmentProps = {
  value: M2ActionCommitmentValue;
  onChange: (value: M2ActionCommitmentValue) => void;
};

function M2ActionCommitment({ value, onChange }: M2ActionCommitmentProps) {
  const updateField = (key: keyof M2ActionCommitmentValue, nextValue: string) => {
    onChange({ ...value, [key]: nextValue });
  };

  const requiredComplete = Boolean(
    value.memberAction.trim() &&
      value.leaderSupport.trim() &&
      value.checkInTiming.trim()
  );

  return (
    <>
      <h2>2주 실행 계획</h2>
      <p className="subtitle">
        성과 코칭이 말로 끝나지 않도록, 팀원의 실행 행동·팀장의 지원·중간 체크 시점을 구체화합니다.
      </p>

      <div className="status-box">
        <strong>작성 기준</strong>
        <span>“열심히 하자”가 아니라 다음 2주 안에 관찰 가능한 실행 행동으로 작성합니다.</span>
        <span>팀원이 혼자 책임지는 구조가 아니라 팀장의 지원을 함께 적습니다.</span>
        <span>중간 체크 시점을 정해 실행 리듬을 만듭니다.</span>
      </div>

      <label className="field-group">
        1. 팀원의 2주 실행 행동 <span className="required-mark">필수</span>
        <textarea
          value={value.memberAction}
          onChange={(event) => updateField("memberAction", event.target.value)}
          placeholder="예: 우선순위 고객군을 다시 정리하고, 각 접점 이후 후속조치 계획을 기록합니다."
        />
      </label>

      <label className="field-group">
        2. 팀장의 지원 <span className="required-mark">필수</span>
        <textarea
          value={value.leaderSupport}
          onChange={(event) => updateField("leaderSupport", event.target.value)}
          placeholder="예: 첫 주에는 활동 우선순위 기준을 함께 정리하고, 중간에 막히는 지점을 함께 점검합니다."
        />
      </label>

      <label className="field-group">
        3. 중간 체크 시점 <span className="required-mark">필수</span>
        <textarea
          value={value.checkInTiming}
          onChange={(event) => updateField("checkInTiming", event.target.value)}
          placeholder="예: 다음 주 수요일 오전 1 on 1에서 15분간 중간 체크합니다."
        />
      </label>

      <div className="status-box compact-status">
        <strong>작성 진행률</strong>
        <span>{requiredComplete ? "2주 실행 계획 입력 완료" : "필수 3개 항목을 입력하면 다음 단계로 이동할 수 있습니다."}</span>
      </div>
    </>
  );
}

export default M2ActionCommitment;
