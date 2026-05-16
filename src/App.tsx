import { useState } from "react";

const roles = [
  "상황 정리자",
  "AI 질문자",
  "답변 검토자",
  "현장 언어 수정자",
  "공유자",
];

const securityItems = [
  "실제 고객명, 병원명, 의료진명을 입력하지 않겠습니다.",
  "제품명과 내부 영업전략을 입력하지 않겠습니다.",
  "실제 매출자료와 처방 관련 정보를 입력하지 않겠습니다.",
  "팀원 실명과 민감한 평가 정보를 입력하지 않겠습니다.",
  "상황은 일반화·익명화해서 입력하겠습니다.",
  "AI 답변은 참고자료이며 최종 판단은 팀장이 하겠습니다.",
];

function App() {
  const [step, setStep] = useState(0);
  const [sessionCode, setSessionCode] = useState("");
  const [teamName, setTeamName] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [checked, setChecked] = useState<boolean[]>(
    securityItems.map(() => false)
  );

  const allChecked = checked.every(Boolean);

  const canNext =
    step === 0 ||
    (step === 1 && sessionCode.trim()) ||
    (step === 2 && teamName.trim() && participantName.trim()) ||
    (step === 3 && selectedRole) ||
    (step === 4 && allChecked);

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">CKD AI Sales Leadership Lab</p>
        <h1>AI 활용 영업팀장 리더십 Lab Journey</h1>

        {step === 0 && (
          <>
            <p className="subtitle">
              성과를 읽고, 일을 정렬하고, 사람을 움직이는 AI 활용
              실습형 웹앱 MVP입니다.
            </p>
            <div className="status-box">
              <strong>오늘의 흐름</strong>
              <span>
                세션 입력 → 팀 정보 입력 → 역할 선택 → AI 보안 서약 →
                Lab Journey 안내
              </span>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2>세션코드 입력</h2>
            <p className="subtitle">강사가 안내한 세션코드를 입력해주세요.</p>
            <input
              className="text-input"
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value)}
              placeholder="예: CKD-AI-001"
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2>팀 정보 입력</h2>
            <p className="subtitle">
              팀명과 이름 또는 닉네임을 입력해주세요.
            </p>
            <input
              className="text-input"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="팀명 예: 1팀"
            />
            <input
              className="text-input"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="이름 또는 닉네임 예: 김팀장"
            />
          </>
        )}

        {step === 3 && (
          <>
            <h2>팀 내 역할 선택</h2>
            <p className="subtitle">
              오늘 Development Lab에서 맡을 역할을 선택해주세요.
            </p>
            <div className="choice-grid">
              {roles.map((role) => (
                <button
                  key={role}
                  className={
                    selectedRole === role
                      ? "choice-button selected"
                      : "choice-button"
                  }
                  onClick={() => setSelectedRole(role)}
                  type="button"
                >
                  {role}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2>AI 보안 서약</h2>
            <p className="subtitle">
              실습에서는 고객명, 의료진명, 병원명, 제품명, 실제
              매출자료, 처방 관련 정보, 팀원 실명과 민감 평가 정보를
              입력하지 않습니다.
            </p>
            <div className="checklist">
              {securityItems.map((item, index) => (
                <label className="check-row" key={item}>
                  <input
                    type="checkbox"
                    checked={checked[index]}
                    onChange={(e) => {
                      const next = [...checked];
                      next[index] = e.target.checked;
                      setChecked(next);
                    }}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2>Lab Journey 안내</h2>
            <p className="subtitle">
              기본 입장 정보가 확인되었습니다. 다음 개발 단계에서는 M1
              AI 활용 보안 기준 & 질문 설계 Lab을 구현합니다.
            </p>
            <div className="status-box">
              <strong>입장 정보</strong>
              <span>세션: {sessionCode}</span>
              <span>팀명: {teamName}</span>
              <span>참여자: {participantName}</span>
              <span>역할: {selectedRole}</span>
            </div>
          </>
        )}

        <div className="nav-row">
          <button
            className="secondary-button"
            disabled={step === 0}
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
            type="button"
          >
            이전
          </button>
          <button
            className="primary-button"
            disabled={!canNext || step === 5}
            onClick={() => setStep((prev) => Math.min(5, prev + 1))}
            type="button"
          >
            {step === 0 ? "Lab Journey 시작하기" : "다음"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
