import { useEffect, useMemo, useState } from "react";
import type { M2Issue } from "../data/m2Data";

type M2LitePromptGeneratorProps = {
  issue?: M2Issue;
};

const checkItems = [
  "우리 팀 상황이 반영되어 있습니다.",
  "실제 고객명, 병원명, 의료진명, 제품명, 내부자료 등 민감정보가 포함되어 있지 않습니다.",
  "AI에게 원하는 출력 형식이 분명합니다.",
];

function M2LitePromptGenerator({ issue }: M2LitePromptGeneratorProps) {
  const defaultPrompt = useMemo(
    () => `당신은 영업팀장의 성과관리 코치입니다.

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
4. 피해야 할 표현 2개`,
    [issue]
  );

  const [editablePrompt, setEditablePrompt] = useState(defaultPrompt);
  const [checks, setChecks] = useState<boolean[]>(checkItems.map(() => false));

  useEffect(() => {
    setEditablePrompt(defaultPrompt);
    setChecks(checkItems.map(() => false));
  }, [defaultPrompt]);

  const allChecked = checks.every(Boolean);

  const copyPrompt = async () => {
    if (!allChecked) {
      alert("보완 체크 3개를 모두 확인한 뒤 복사해주세요.");
      return;
    }

    try {
      await navigator.clipboard.writeText(editablePrompt);
      alert("M2 Lite Lab 프롬프트가 복사되었습니다.");
    } catch {
      alert("복사가 되지 않았습니다. 프롬프트를 직접 선택해서 복사해주세요.");
    }
  };

  return (
    <>
      <h2>Lite Lab AI 프롬프트 생성</h2>
      <p className="subtitle">
        Lite Lab에서도 AI를 사용합니다. 자동 생성된 프롬프트를 그대로 복사하지 말고, 우리 팀 상황에 맞게 짧게 수정한 뒤 사용합니다.
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
        <span>필요하면 상황, 요청, 조건, 출력 형식을 짧게 보완하세요.</span>
      </div>

      <label className="field-group">
        수정 가능한 Lite Lab 프롬프트
        <textarea
          value={editablePrompt}
          onChange={(event) => setEditablePrompt(event.target.value)}
        />
      </label>

      <div className="checklist">
        {checkItems.map((item, index) => (
          <label className="check-row" key={item}>
            <input
              type="checkbox"
              checked={checks[index]}
              onChange={(event) => {
                const next = [...checks];
                next[index] = event.target.checked;
                setChecks(next);
              }}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <button className="primary-button standalone" onClick={copyPrompt} type="button">
        수정한 Lite 프롬프트 복사
      </button>

      <div className="status-box compact-status">
        <strong>복사 기준</strong>
        <span>{allChecked ? "보완 체크가 완료되었습니다. 프롬프트를 복사해 사용할 수 있습니다." : "보완 체크 3개를 모두 확인하면 복사할 수 있습니다."}</span>
        <span>외부 AI 도구에서 받은 답변을 참고해 질문 3개, 행동 약속 1개, 팀장 지원 문장 1개를 직접 작성합니다.</span>
      </div>
    </>
  );
}

export default M2LitePromptGenerator;
