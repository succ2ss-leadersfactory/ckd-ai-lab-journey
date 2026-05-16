import "./securityBadge.css";

type SecurityBadgeProps = {
  compact?: boolean;
};

function SecurityBadge({ compact = false }: SecurityBadgeProps) {
  return (
    <aside className={compact ? "security-badge compact" : "security-badge"}>
      <div className="security-badge-icon" aria-hidden="true">🔒</div>
      <div className="security-badge-text">
        <strong>AI 보안 기준 적용 중</strong>
        <span>
          고객명 · 병원명 · 의료진명 · 제품명 · 실제 매출/처방 정보 입력 금지
        </span>
      </div>
    </aside>
  );
}

export default SecurityBadge;
