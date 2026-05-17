import type { M2Issue } from "../data/m2Data";

type M2IssueSelectionProps = {
  issues: M2Issue[];
  selectedIssueCodes: string[];
  onToggleIssue: (code: string) => void;
};

function getSelectionLabel(code: string, selectedIssueCodes: string[]) {
  const index = selectedIssueCodes.indexOf(code);
  if (index === 0) return "Full Lab";
  if (index === 1) return "Lite Lab";
  return null;
}

function M2IssueSelection({ issues, selectedIssueCodes, onToggleIssue }: M2IssueSelectionProps) {
  return (
    <>
      <h2>핵심 상황 2개 선택</h2>
      <p className="subtitle">
        살펴본 성과관리 이슈 중 이번 실습에서 다룰 핵심 상황 2개를 선택해주세요.
        선택 순서가 중요합니다.
      </p>

      <div className="status-box compact-status">
        <strong>선택 순서 안내</strong>
        <span>1번째 선택 = Full Lab으로 깊게 다룹니다.</span>
        <span>2번째 선택 = Lite Lab으로 빠르게 적용합니다.</span>
      </div>

      <div className="scan-list">
        {issues.map((issue) => {
          const selected = selectedIssueCodes.includes(issue.code);
          const selectionLabel = getSelectionLabel(issue.code, selectedIssueCodes);

          return (
            <button
              key={issue.code}
              className={selected ? "choice-button issue-selection-card selected" : "choice-button issue-selection-card"}
              onClick={() => onToggleIssue(issue.code)}
              type="button"
            >
              <span className="issue-selection-topline">
                <strong>
                  {issue.code}. {issue.title}
                </strong>
                {selectionLabel && <span className="inline-badge">{selectionLabel}</span>}
              </span>
              <span>{issue.situation}</span>
            </button>
          );
        })}
      </div>

      <div className="status-box compact-status">
        <strong>선택 진행률</strong>
        <span>{selectedIssueCodes.length} / 2개 선택</span>
        {selectedIssueCodes.length < 2 && <span>핵심 상황을 2개 선택해야 다음 단계로 이동할 수 있습니다.</span>}
        {selectedIssueCodes.length === 2 && <span>핵심 상황 2개 선택이 완료되었습니다.</span>}
      </div>
    </>
  );
}

export default M2IssueSelection;
