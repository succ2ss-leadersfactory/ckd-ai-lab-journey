import { useEffect, useMemo, useState } from "react";
import type { M2Issue } from "../data/m2Data";

export type M2LiteOutput = {
  id: string;
  title: string;
  promptLabel: string;
};

export const m2LiteOutputOptions: M2LiteOutput[] = [
  {
    id: "opening",
    title: "대화 오프닝",
    promptLabel: "대화 오프닝",
  },
  {
    id: "coaching-questions",
    title: "성과 코칭 질문",
    promptLabel: "성과 코칭 질문 3개",
  },
  {
    id: "caution-expressions",
    title: "주의할 표현",
    promptLabel: "주의할 표현 2개",
  },
  {
    id: "execution-plan",
    title: "2주 실행 계획",
    promptLabel: "2주 실행 계획 1개",
  },
  {
    id: "leader-support",
    title: "팀장의 지원",
    promptLabel: "팀장의 지원 문장 1개",
  },
  {
    id: "check-questions",
    title: "중간 체크 질문",
    promptLabel: "중간 체크 질문 2개",
  },
];

type M2LitePromptGeneratorProps = {
  issue?: M2Issue;
  selectedOutputIds?: string[];
};

const checkItems = [
  "C(맥락): 우리 팀 상황과 선택한 이슈가 반영되어 있습니다.",
  "R(역할): AI에게 영업팀장 성과관리 코치 역할을 부여했습니다.",
  "T(과제): AI에게 무엇을 만들어야 하는지 명확히 요청했습니다.",
  "F(형식): 선택한 산출물 형식이 분명히 들어가 있습니다.",
  "C(조건): 민감정보 금지와 현장 표현 조건이 포함되어 있습니다.",
];

const defaultOutputIds = ["coaching-questions", "execution-plan", "leader-support"];

function M2LitePromptGenerator({ issue, selectedOutputIds = defaultOutputIds }: M2LitePromptGeneratorProps) {
  const selectedOutputs = useMemo(() => {
    const targetIds = selectedOutputIds.length > 0 ? selectedOutputIds : defaultOutputIds;
    return targetIds
      .map((id) => m2LiteOutputOptions.find((option) => option.id === id))
      .filter((option): option is M2LiteOutput => Boolean(option));
  }, [selectedOutputIds]);

  const outputFormatText = selectedOutputs
    .map((output, index) => `${index + 1}. ${output.promptLabel}`)
    .join("\n");

  const outputRequestText = selectedOutputs.map((output) => output.promptLabel).join(", ");

  const defaultPrompt = useMemo(
    () => `당신은 영업팀장의 성과관리 코치입니다.

[상황]
${issue ? `${issue.code}. ${issue.title}\n${issue.situation}\n판단 초점: ${issue.focus}` : "성과관리 상황이 선택되지 않았습니다."}

[요청]
이 상황에서 팀장이 팀원과 짧게 나눌 수 있도록 다음 산출물을 작성해주세요.
${outputRequestText}

[조건]
1. 팀원의 노력이나 강점은 먼저 인정해주세요.
2. 사람 평가가 아니라 행동과 실행 방식 중심으로 작성해주세요.
3. 원인을 단정하지 말고 함께 확인하는 질문으로 작성해주세요.
4. 실제 고객명, 병원명, 의료진명, 제품명, 내부자료는 포함하지 마세요.
5. AI 답변은 초안이므로 실제 팀장이 말할 수 있는 현장 표현으로 다듬기 쉽게 작성해주세요.

[출력 형식]
${outputFormatText}`,
    [issue, outputRequestText, outputFormatText]
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
      alert("C-R-T-F-C 보완 체크 5개를 모두 확인한 뒤 복사해주세요.");
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
        Lite Lab에서도 AI를 사용합니다. 선택한 산출물에 맞춰 자동 생성된 프롬프트를 우리 팀 상황에 맞게 수정한 뒤 사용합니다.
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
        <strong>선택한 산출물</strong>
        <span>{selectedOutputs.map((output) => output.title).join(" / ")}</span>
      </div>

      <div className="status-box">
        <strong>활용 방식</strong>
        <span>AI로 빠르게 초안을 받은 뒤, 그대로 옮기지 말고 우리 팀장이 실제로 말할 수 있는 표현으로 줄이고 고칩니다.</span>
        <span>필요하면 맥락, 역할, 과제, 형식, 조건을 짧게 보완하세요.</span>
      </div>

      <label className="field-group">
        수정 가능한 Lite Lab 프롬프트
        <textarea
          className="large-textarea"
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
        <span>{allChecked ? "C-R-T-F-C 보완 체크가 완료되었습니다. 프롬프트를 복사해 사용할 수 있습니다." : "C-R-T-F-C 보완 체크 5개를 모두 확인하면 복사할 수 있습니다."}</span>
        <span>외부 AI 도구에서 받은 답변을 참고해 선택한 산출물을 직접 정리합니다.</span>
      </div>
    </>
  );
}

export default M2LitePromptGenerator;
