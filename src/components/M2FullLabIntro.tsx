import type { M2Issue } from "../data/m2Data";

type M2FullLabIntroProps = {
  issue?: M2Issue;
};

function M2FullLabIntro({ issue }: M2FullLabIntroProps) {
  return (
    <>
      <h2>M2 Full Lab 시작</h2>
      <p className="subtitle">
        첫 번째 선택 상황을 중심으로 성과 문제를 단정하지 않고, 원인 가설과
        성과대화, 2주 행동 약속까지 깊게 설계합니다.
      </p>

      {issue ? (
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
      ) : (
        <div className="status-box">
          <strong>선택된 상황 없음</strong>
          <span>앞 단계에서 Full Lab으로 다룰 첫 번째 상황을 선택해주세요.</span>
        </div>
      )}

      <div className="status-box">
        <strong>Full Lab 진행 흐름</strong>
        <span>
          원인 가설 선택 → 익명화 상황 입력 → AI 프롬프트 생성 → AI 답변 감별 →
          현장 언어 수정 → 2주 행동 약속
        </span>
      </div>

      <div className="status-box">
        <strong>다음 개발 단계</strong>
        <span>M2-4B. 원인 가설 선택 화면</span>
      </div>
    </>
  );
}

export default M2FullLabIntro;
