import type { M2Issue } from "../data/m2Data";
import { m2Reasons } from "./M2ReasonHypothesis";

type M2PromptGeneratorProps = {
  issue?: M2Issue;
  selectedReasonIds: string[];
  anonymizedContext: string;
};

function M2PromptGenerator({ issue, selectedReasonIds, anonymizedContext }: M2PromptGeneratorProps) {
  const selectedReasons = m2Reasons.filter((reason) => selectedReasonIds.includes(reason.id));

  const prompt = `당신은 영업팀장의 성과관리 코치입니다.

[상황]
${issue ? `${issue.code}. ${issue.title}\n${issue.situation}\n판단 초점: ${issue.focus}` : "성과관리 상황이 선택되지 않았습니다."}

[익명화된 추가 맥락]
${anonymizedContext || "추가 맥락이 입력되지 않았습니다."}

[원인 가설]
현재 성과 이슈는 다음 가능성과 관련이 있을 수 있습니다.
${selectedReasons.length > 0 ? selectedReasons.map((reason) => `- ${reason.title}: ${reason.question}`).join("\n") : "- 선택된 원인 가설 없음"}

[요청]
팀장이 이 상황을 단정하지 않고 팀원과 성과 코칭 대화를 나눌 수 있도록 대화 흐름과 질문을 작성해주세요.

[조건]
1. 팀원의 노력을 인정하되 성과 책임이 흐려지지 않게 해주세요.
2. 원인을 단정하지 말고 선택한 원인 가설을 확인하는 방식으로 질문을 구성해주세요.
3. 실제 고객명, 병원명, 의료진명, 제품명, 내부자료는 포함하지 마세요.
4. 팀원이 방어적으로 듣지 않도록 표현을 부드럽게 하되, 2주 실행 계획은 분명하게 해주세요.
5. 팀원에게만 책임을 넘기지 말고 팀장의 지원도 포함해주세요.

[출력 형식]
1. 대화 오프닝
2. 성과 코칭 질문 6개
3. 주의할 표현 3개
4. 2주 실행 계획
5. 팀장의 지원
6. 중간 체크 질문`;

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      alert("M2 성과관리 프롬프트가 복사되었습니다.");
    } catch {
      alert("복사가 되지 않았습니다. 프롬프트를 직접 선택해서 복사해주세요.");
    }
  };

  return (
    <>
      <h2>AI 프롬프트 생성</h2>
      <p className="subtitle">
        선택한 상황, 원인 가설, 익명화된 상황 설명을 바탕으로 성과 코칭 대화 준비용 프롬프트를 생성합니다.
      </p>

      <div className="status-box">
        <strong>보안 기준</strong>
        <span>실제 고객명, 병원명, 의료진명, 제품명, 실제 매출자료, 처방 관련 정보, 팀원 실명은 포함하지 않습니다.</span>
      </div>

      <pre className="prompt-preview">{prompt}</pre>

      <button className="primary-button standalone" onClick={copyPrompt} type="button">
        프롬프트 복사
      </button>

      <div className="status-box compact-status">
        <strong>다음 단계</strong>
        <span>외부 AI 도구에 프롬프트를 붙여넣고, 생성된 답변을 다음 화면에 붙여넣습니다.</span>
      </div>
    </>
  );
}

export default M2PromptGenerator;
