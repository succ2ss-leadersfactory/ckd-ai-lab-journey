import type { M2Issue } from "../data/m2Data";

export type M2Reason = {
  id: string;
  title: string;
  question: string;
};

export const m2Reasons: M2Reason[] = [
  {
    id: "activity-volume",
    title: "활동량",
    question: "실행 빈도 자체가 부족한가?",
  },
  {
    id: "activity-quality",
    title: "활동 품질",
    question: "접점의 목적, 준비, 메시지, 후속조치가 약한가?",
  },
  {
    id: "priority",
    title: "우선순위",
    question: "중요한 고객군과 활동보다 익숙한 일에 시간을 쓰고 있는가?",
  },
  {
    id: "capability",
    title: "역량",
    question: "필요한 대화, 설명, 관계관리, 후속관리 역량이 부족한가?",
  },
  {
    id: "motivation-emotion",
    title: "동기·감정",
    question: "방어감, 피로감, 억울함, 무력감이 작동하는가?",
  },
  {
    id: "leader-support",
    title: "팀장의 지원",
    question: "팀장이 기준, 정보, 코칭, 자원을 충분히 제공했는가?",
  },
];

type M2ReasonHypothesisProps = {
  issue?: M2Issue;
  selectedReasonIds: string[];
  onToggleReason: (reasonId: string) => void;
};

function M2ReasonHypothesis({ issue, selectedReasonIds, onToggleReason }: M2ReasonHypothesisProps) {
  return (
    <>
      <h2>성과 원인 가설 선택</h2>
      <p className="subtitle">
        선택한 상황을 기준으로 가능한 원인 가설을 넓게 선택합니다. 복수 선택할 수 있습니다.
      </p>

      {issue && (
        <article className="scan-card">
          <div className="scan-card-header">
            <b>Full</b>
            <div>
              <strong>{issue.code}. {issue.title}</strong>
              <p>{issue.situation}</p>
              <span>판단 초점: {issue.focus}</span>
            </div>
          </div>
        </article>
      )}

      <div className="scan-list">
        {m2Reasons.map((reason) => {
          const selected = selectedReasonIds.includes(reason.id);
          return (
            <button
              key={reason.id}
              className={selected ? "choice-button selected" : "choice-button"}
              onClick={() => onToggleReason(reason.id)}
              type="button"
            >
              <strong>{reason.title}</strong>
              <span>{reason.question}</span>
            </button>
          );
        })}
      </div>

      <div className="status-box compact-status">
        <strong>선택 진행률</strong>
        <span>{selectedReasonIds.length}개 원인 가설 선택</span>
        {selectedReasonIds.length === 0 && <span>가능성이 있는 원인 가설을 1개 이상 선택해주세요.</span>}
        {selectedReasonIds.length > 0 && <span>선택한 가설을 바탕으로 다음 단계에서 상황을 일반화해 입력합니다.</span>}
      </div>
    </>
  );
}

export default M2ReasonHypothesis;
