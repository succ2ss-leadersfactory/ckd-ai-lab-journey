import type { M2Issue } from "../data/m2Data";

type M2LitePromptGeneratorProps = {
  issue?: M2Issue;
};

function M2LitePromptGenerator({ issue }: M2LitePromptGeneratorProps) {
  const prompt = `당신은 영업팀장의 성과관리 코치입니다.

[상황]
${issue ? `${issue.code}. ${issue.title}\n${issue.situation}\n판단 초점: ${issue.focus}` : "성과관리 상황이 선택되지 않았습니다."}

[요청]
이 상황에서 팀장이 팀원과 짧게 나눌 1 on 1 질문 3개, 다음 2주 행동 약속 1개, 팀장 지원 문장 1개를 작성해주세요.

[조건]
1. 팀원의 노력이나 강점은 먼저 인정해주세요.
2. 사람 평가가 아니라 행동과 실행 방식 중심으로 작성해주세요.
3. 원인을 단정하지 말고 함께 확인하는 질문으로 작성해주세요.
4. 실제 고객명, 병원명, 의료진명, 제품명, 내부자료는 포함하지 마세요.
5. AI 답변은 초안이므로 실제 팀장이 말할 수 있는 현장 언어로 수정하기 쉽게 작성해주세요.

[출력 형식]
1. 팀원에게 물어볼 질문 3개
2. 다음 2주 행동 약속 1개
3. 팀장 지원 문장 1개
4. 피해야 할 표현 2개`;

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      alert("M2 Lite Lab 프롬프트가 복사되었습니다.");
    } catch {
      alert("복사가 되지 않았습니다. 프롬프트를 직접 선택해서 복사해주세요.");
    }
  };

  return (
    <>
      <h2>Lite Lab AI 프롬프트 생성</h2>
      <p className="subtitle">
        Lite Lab에서도 AI를 사용합니다. 다만 Full Lab처럼 길게 분석하지 않고, 질문 3개와 짧은 행동 약속을 빠르게 만드는 데 활용합니다.
      </p>

      {issue && (
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
      )}

      <div className="status-box">
        <strong>활용 방식</strong>
        <span>AI로 빠르게 초안을 받은 뒤, 그대로 옮기지 말고 우리 팀장이 실제로 말할 수 있는 표현으로 줄이고 고칩니다.</span>
      </div>

      <pre className="prompt-preview">{prompt}</pre>

      <button className="primary-button standalone" onClick={copyPrompt} type="button">
        Lite 프롬프트 복사
      </button>

      <div className="status-box compact-status">
        <strong>다음 단계</strong>
        <span>외부 AI 도구에서 받은 답변을 참고해 질문 3개, 행동 약속 1개, 팀장 지원 문장 1개를 직접 작성합니다.</span>
      </div>
    </>
  );
}

export default M2LitePromptGenerator;
