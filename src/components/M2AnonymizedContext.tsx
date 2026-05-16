import { useEffect, useState } from "react";
import type { M2Issue } from "../data/m2Data";

type M2AnonymizedContextProps = {
  issue?: M2Issue;
  value: string;
  onChange: (value: string) => void;
};

const forbiddenItems = [
  "실제 고객명",
  "병원명",
  "의료진명",
  "제품명",
  "실제 매출자료",
  "처방 관련 정보",
  "팀원 실명",
  "민감한 평가 정보",
];

function buildContextText(fields: {
  symptom: string;
  memberReaction: string;
  leaderQuestion: string;
  conversationGoal: string;
  cautionPoint: string;
}) {
  return `[현재 보이는 현상]\n${fields.symptom}\n\n[팀원의 반응]\n${fields.memberReaction}\n\n[팀장이 확인하고 싶은 것]\n${fields.leaderQuestion}\n\n[이번 대화의 목표]\n${fields.conversationGoal || "아직 입력하지 않았습니다."}\n\n[특히 조심해야 할 점]\n${fields.cautionPoint || "아직 입력하지 않았습니다."}`;
}

function M2AnonymizedContext({ issue, value, onChange }: M2AnonymizedContextProps) {
  const [symptom, setSymptom] = useState("");
  const [memberReaction, setMemberReaction] = useState("");
  const [leaderQuestion, setLeaderQuestion] = useState("");
  const [conversationGoal, setConversationGoal] = useState("");
  const [cautionPoint, setCautionPoint] = useState("");

  const requiredComplete = Boolean(symptom.trim() && memberReaction.trim() && leaderQuestion.trim());

  useEffect(() => {
    if (!requiredComplete) {
      onChange("");
      return;
    }

    onChange(
      buildContextText({
        symptom: symptom.trim(),
        memberReaction: memberReaction.trim(),
        leaderQuestion: leaderQuestion.trim(),
        conversationGoal: conversationGoal.trim(),
        cautionPoint: cautionPoint.trim(),
      })
    );
  }, [symptom, memberReaction, leaderQuestion, conversationGoal, cautionPoint, requiredComplete, onChange]);

  return (
    <>
      <h2>익명화 상황 입력</h2>
      <p className="subtitle">
        긴 문장을 한 번에 쓰지 않고, 아래 질문에 짧게 답하면서 상황을 구조화합니다. 실제 고객명·제품명·팀원 실명은 입력하지 않습니다.
      </p>

      {issue && (
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
      )}

      <div className="status-box">
        <strong>입력하지 말아야 할 정보</strong>
        {forbiddenItems.map((item) => (
          <span key={item}>• {item}</span>
        ))}
      </div>

      <label className="field-group">
        1. 현재 보이는 현상은 무엇인가요? <span className="required-mark">필수</span>
        <textarea
          value={symptom}
          onChange={(event) => setSymptom(event.target.value)}
          placeholder="예: 활동은 꾸준히 하고 있지만 성과 전환이 낮아지고 있습니다."
        />
      </label>

      <label className="field-group">
        2. 팀원은 어떻게 반응하고 있나요? <span className="required-mark">필수</span>
        <textarea
          value={memberReaction}
          onChange={(event) => setMemberReaction(event.target.value)}
          placeholder="예: 본인은 누구보다 열심히 하고 있다고 느끼며, 결과가 안 나오는 것에 답답해합니다."
        />
      </label>

      <label className="field-group">
        3. 팀장이 확인하고 싶은 것은 무엇인가요? <span className="required-mark">필수</span>
        <textarea
          value={leaderQuestion}
          onChange={(event) => setLeaderQuestion(event.target.value)}
          placeholder="예: 활동 방식, 우선순위, 후속조치의 질을 함께 확인하고 싶습니다."
        />
      </label>

      <label className="field-group">
        4. 이번 대화의 목표는 무엇인가요? <span className="optional-mark">선택</span>
        <textarea
          value={conversationGoal}
          onChange={(event) => setConversationGoal(event.target.value)}
          placeholder="예: 다음 2주 동안 바꿔볼 행동을 합의하고 싶습니다."
        />
      </label>

      <label className="field-group">
        5. 특히 조심해야 할 점은 무엇인가요? <span className="optional-mark">선택</span>
        <textarea
          value={cautionPoint}
          onChange={(event) => setCautionPoint(event.target.value)}
          placeholder="예: 팀원이 방어적으로 느끼지 않도록 노력은 먼저 인정하고 싶습니다."
        />
      </label>

      <div className="status-box compact-status">
        <strong>작성 진행률</strong>
        <span>{requiredComplete ? "필수 항목 입력 완료" : "필수 3개 항목을 입력하면 다음 단계로 이동할 수 있습니다."}</span>
        <span>고유명사는 빼고, 상황의 구조와 팀장 고민이 드러나게 작성합니다.</span>
      </div>
    </>
  );
}

export default M2AnonymizedContext;
