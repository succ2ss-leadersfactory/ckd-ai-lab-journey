import type { M2Issue } from "../data/m2Data";

type M2LiteLabIntroProps = {
  issue?: M2Issue;
};

function M2LiteLabIntro({ issue }: M2LiteLabIntroProps) {
  return (
    <>
      <h2>M2 Lite Lab 시작</h2>
      <p className="subtitle">
        두 번째 선택 상황은 빠르게 적용해봅니다. Full Lab처럼 모든 단계를 반복하지 않고,
        핵심 질문과 짧은 행동 약속 중심으로 전이 연습을 합니다.
      </p>

      {issue ? (
        <article className="scan-card">
          <div className="scan-card-header">
            <b>Lite</b>
            <div>
              <strong>
                {issue.code}. {issue.title}
              </strong>
              <p>{issue.situation}</p>
              <span>판단 초점: {issue.focus}</span>
            </div>
          </div>
        </article>
      ) : (
        <div className="status-box">
          <strong>선택된 상황 없음</strong>
          <span>앞 단계에서 Lite Lab으로 다룰 두 번째 상황을 선택해주세요.</span>
        </div>
      )}

      <div className="status-box">
        <strong>Lite Lab 진행 흐름</strong>
        <span>핵심 질문 3개 작성 → 짧은 행동 약속 1개 작성 → 팀장 지원 문장 작성</span>
      </div>

      <div className="status-box">
        <strong>진행 방식</strong>
        <span>깊은 분석보다 현업 전이와 응용력을 높이는 데 초점을 둡니다.</span>
      </div>

      <div className="status-box">
        <strong>다음 개발 단계</strong>
        <span>M2 Lite Lab 질문·행동 약속 작성 화면</span>
      </div>
    </>
  );
}

export default M2LiteLabIntro;
