type StructuredOutputKey =
  | "opening"
  | "coachingQuestions"
  | "cautionExpressions"
  | "executionPlan"
  | "leaderSupport"
  | "checkQuestions";

export type StructuredOutputChecks = Record<StructuredOutputKey, string[]>;

export const structuredOutputSections: {
  key: StructuredOutputKey;
  title: string;
  guide: string;
}[] = [
  {
    key: "opening",
    title: "대화 오프닝",
    guide: "팀원이 방어적으로 듣지 않도록 대화를 여는 첫 문장입니다.",
  },
  {
    key: "coachingQuestions",
    title: "성과 코칭 질문 6개",
    guide: "성과 문제를 단정하지 않고 함께 확인하기 위한 질문입니다.",
  },
  {
    key: "cautionExpressions",
    title: "주의할 표현 3개",
    guide: "팀원의 방어감, 오해, 압박감을 키울 수 있어 조심해야 할 표현입니다.",
  },
  {
    key: "executionPlan",
    title: "2주 실행 계획",
    guide: "대화 이후 다음 2주 동안 실행할 구체 행동입니다.",
  },
  {
    key: "leaderSupport",
    title: "팀장의 지원",
    guide: "팀원이 혼자 책임지지 않도록 팀장이 제공할 지원입니다.",
  },
  {
    key: "checkQuestions",
    title: "중간 체크 질문",
    guide: "실행 중간에 막힘과 지원 필요를 확인하기 위한 질문입니다.",
  },
];

const reviewCriteria = [
  {
    id: "specificity",
    title: "구체성",
    question: "누가, 무엇을, 언제, 어떻게 할지가 충분히 보이나요?",
  },
  {
    id: "context",
    title: "맥락 반영",
    question: "선택한 상황과 팀원의 반응이 충분히 반영되어 있나요?",
  },
  {
    id: "actionability",
    title: "실행 가능성",
    question: "다음 1~2주 안에 실제로 해볼 수 있는 수준인가요?",
  },
  {
    id: "leader-language",
    title: "리더 언어",
    question: "내가 팀장으로서 실제로 말하거나 쓸 수 있는 표현인가요?",
  },
  {
    id: "fact-check",
    title: "사실 검증 가능성",
    question: "확인할 수 없는 단정이나 추측이 들어 있지는 않나요?",
  },
];

function extractSection(source: string, title: string, nextTitles: string[]) {
  const normalize = (value: string) => value.replace(/[\[\]#*]/g, "").trim();
  const sourceLines = source.split("\n");
  const startIndex = sourceLines.findIndex((line) => normalize(line).includes(title));

  if (startIndex === -1) return "";

  const nextIndex = sourceLines.findIndex((line, index) => {
    if (index <= startIndex) return false;
    const normalizedLine = normalize(line);
    return nextTitles.some((nextTitle) => normalizedLine.includes(nextTitle));
  });

  return sourceLines
    .slice(startIndex + 1, nextIndex === -1 ? undefined : nextIndex)
    .join("\n")
    .trim();
}

export function structureM2AiResponse(aiResponse: string): Record<StructuredOutputKey, string> {
  const titles = structuredOutputSections.map((section) => section.title);

  return structuredOutputSections.reduce((acc, section) => {
    const otherTitles = titles.filter((title) => title !== section.title);
    const extracted = extractSection(aiResponse, section.title, otherTitles);
    acc[section.key] = extracted || "AI 답변에서 이 항목을 명확히 찾지 못했습니다. 원문을 참고해 직접 정리해 주세요.";
    return acc;
  }, {} as Record<StructuredOutputKey, string>);
}

type M2StructuredOutputReviewProps = {
  aiResponse: string;
  currentSectionIndex: number;
  selectedChecks: StructuredOutputChecks;
  onToggleCheck: (sectionKey: StructuredOutputKey, checkId: string) => void;
  onPrevSection: () => void;
  onNextSection: () => void;
};

function M2StructuredOutputReview({
  aiResponse,
  currentSectionIndex,
  selectedChecks,
  onToggleCheck,
  onPrevSection,
  onNextSection,
}: M2StructuredOutputReviewProps) {
  const structured = structureM2AiResponse(aiResponse);
  const section = structuredOutputSections[currentSectionIndex];
  const sectionChecks = selectedChecks[section.key] || [];
  const isFirst = currentSectionIndex === 0;
  const isLast = currentSectionIndex === structuredOutputSections.length - 1;

  return (
    <>
      <h2>AI 답변 결과물 정리</h2>
      <p className="subtitle">
        붙여넣은 AI 답변을 6개 결과물로 나누어 확인합니다. 각 결과물이 현업에서 바로 쓸 수 있는지 5가지 기준으로 체크합니다.
      </p>

      <div className="status-box compact-status">
        <strong>결과물 {currentSectionIndex + 1} / {structuredOutputSections.length}</strong>
        <span>{section.title}</span>
        <span>{section.guide}</span>
      </div>

      <div className="prompt-preview">{structured[section.key]}</div>

      <div className="scan-list">
        {reviewCriteria.map((criteria) => {
          const checked = sectionChecks.includes(criteria.id);
          return (
            <button
              key={criteria.id}
              className={checked ? "choice-button answer-review-card selected" : "choice-button answer-review-card"}
              onClick={() => onToggleCheck(section.key, criteria.id)}
              type="button"
            >
              <strong>{criteria.title}</strong>
              <span>{criteria.question}</span>
            </button>
          );
        })}
      </div>

      <div className="status-box compact-status">
        <strong>체크 진행률</strong>
        <span>{sectionChecks.length} / 5개 기준 체크</span>
        <span>부족한 기준이 있으면 다음 현장 표현 수정 단계에서 보완합니다.</span>
      </div>

      <div className="nav-row inner-nav">
        <button className="secondary-button" disabled={isFirst} onClick={onPrevSection} type="button">
          이전 결과물
        </button>
        <button className="secondary-button" disabled={isLast} onClick={onNextSection} type="button">
          다음 결과물
        </button>
      </div>
    </>
  );
}

export default M2StructuredOutputReview;
