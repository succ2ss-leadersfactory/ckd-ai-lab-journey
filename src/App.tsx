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

const securityCards = [
  {
    text: "우리 팀 주간 회의 안건을 성과관리 중심으로 정리해줘.",
    answer: "입력 가능",
    feedback: "민감정보가 없고 일반적인 회의 준비 목적입니다.",
  },
  {
    text: "목표 미달 팀원과 면담할 질문을 만들어줘. 실제 이름은 제외하고 상황만 설명할게.",
    answer: "익명화 후 가능",
    feedback: "팀원 실명과 민감정보를 제거하면 리더십 대화 준비에 활용할 수 있습니다.",
  },
  {
    text: "A병원 김OO 교수의 최근 처방 감소 원인을 분석해줘.",
    answer: "입력 금지",
    feedback: "고객명, 의료진명, 처방 관련 민감정보가 포함되어 있습니다.",
  },
  {
    text: "지난달 우리 팀 실제 매출자료를 보고 팀원별 문제점을 분석해줘.",
    answer: "입력 금지",
    feedback: "내부 영업자료와 개인 평가 정보가 포함될 수 있습니다.",
  },
  {
    text: "활동량은 많지만 성과 전환이 낮은 팀원과 나눌 1 on 1 질문을 만들어줘.",
    answer: "입력 가능",
    feedback: "일반화된 상황이며 팀장 대화 준비 목적입니다.",
  },
];

const cardOptions = ["입력 가능", "익명화 후 가능", "입력 금지", "내부 기준 확인 필요"];

function App() {
  const [step, setStep] = useState(0);
  const [sessionCode, setSessionCode] = useState("");
  const [teamName, setTeamName] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [checked, setChecked] = useState<boolean[]>(
    securityItems.map(() => false)
  );
  const [cardIndex, setCardIndex] = useState(0);
  const [cardAnswers, setCardAnswers] = useState<string[]>(
    securityCards.map(() => "")
  );

  const allChecked = checked.every(Boolean);
  const currentCard = securityCards[cardIndex];

  const canNext =
    step === 0 ||
    (step === 1 && sessionCode.trim()) ||
    (step === 2 && teamName.trim() && participantName.trim()) ||
    (step === 3 && selectedRole) ||
    (step === 4 && allChecked) ||
    step === 5 ||
    step === 6;

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
              기본 입장 정보가 확인되었습니다. 다음 화면부터 M1
              AI 활용 보안 기준 & 질문 설계 Lab을 진행합니다.
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

        {step === 6 && (
          <>
            <h2>M1. AI 활용 보안 기준 & 질문 설계 Lab</h2>
            <p className="subtitle">
              AI에게 무엇을, 어떻게, 어느 선까지 물을 것인지 연습합니다.
              먼저 AI에 입력 가능한 정보와 입력하면 안 되는 정보를 구분합니다.
            </p>
            <div className="status-box">
              <strong>M1 산출물</strong>
              <span>보안 기준을 반영한 AI 질문문 1개</span>
            </div>
          </>
        )}

        {step === 7 && (
          <>
            <h2>AI 보안 기준 카드 분류</h2>
            <p className="subtitle">
              아래 문장을 AI에 입력해도 되는지 판단해주세요.
            </p>
            <div className="quiz-card">
              <strong>카드 {cardIndex + 1} / {securityCards.length}</strong>
              <p>{currentCard.text}</p>
            </div>
            <div className="choice-grid">
              {cardOptions.map((option) => (
                <button
                  key={option}
                  className={
                    cardAnswers[cardIndex] === option
                      ? "choice-button selected"
                      : "choice-button"
                  }
                  onClick={() => {
                    const next = [...cardAnswers];
                    next[cardIndex] = option;
                    setCardAnswers(next);
                  }}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
            {cardAnswers[cardIndex] && (
              <div className="feedback-box">
                <strong>권장 판단: {currentCard.answer}</strong>
                <span>{currentCard.feedback}</span>
              </div>
            )}
            <div className="nav-row inner-nav">
              <button
                className="secondary-button"
                disabled={cardIndex === 0}
                onClick={() => setCardIndex((prev) => Math.max(0, prev - 1))}
                type="button"
              >
                이전 카드
              </button>
              <button
                className="secondary-button"
                disabled={cardIndex === securityCards.length - 1}
                onClick={() => setCardIndex((prev) => Math.min(securityCards.length - 1, prev + 1))}
                type="button"
              >
                다음 카드
              </button>
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
            disabled={!canNext || step === 7}
            onClick={() => setStep((prev) => Math.min(7, prev + 1))}
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
