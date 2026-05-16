import AppHeader from "../common/AppHeader";
import ProgressMap from "../common/ProgressMap";
import SecurityBadge from "../common/SecurityBadge";

type M2IntroMobileProps = {
  onPrev?: () => void;
  onNext?: () => void;
  canGoPrev?: boolean;
};

const m2ProgressSteps = [
  { label: "이슈 스캔", status: "current" as const },
  { label: "2개 선택", status: "upcoming" as const },
  { label: "Full Lab", status: "upcoming" as const },
  { label: "Lite Lab", status: "upcoming" as const },
  { label: "완료", status: "upcoming" as const },
];

function M2IntroMobile(_props: M2IntroMobileProps) {
  return (
    <>
      <AppHeader
        moduleTitle="M2 성과관리 Decision Lab"
        moduleLabel="성과를 행동과 대화로 전환"
        visualType="performance"
      />

      <ProgressMap title="M2 진행 단계" steps={m2ProgressSteps} />

      <SecurityBadge compact />

      <section className="status-box">
        <strong>M2 핵심 질문</strong>
        <span>성과 문제의 원인을 찾고 가설을 설정한 뒤, 최종 실행 계획으로 어떻게 만들 것인가?</span>
      </section>

      <section className="status-box">
        <strong>M2 산출물</strong>
        <span>성과 문제 원인 및 가설 / 성과 코칭 질문 / 2주 실행 계획</span>
      </section>

      <section className="scan-card">
        <div className="scan-card-header">
          <b>📈</b>
          <div>
            <strong>성과 문제를 단정하지 않습니다</strong>
            <p>
              숫자를 바로 평가로 연결하지 않고, 활동량·활동 품질·우선순위·역량·동기·팀장 지원의 관점으로 넓게 봅니다.
            </p>
            <span>Full Lab + Lite Lab 방식으로 진행</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default M2IntroMobile;
