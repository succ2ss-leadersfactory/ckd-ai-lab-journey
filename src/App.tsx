import { useMemo, useState } from "react";
import M2FullLabIntro from "./components/M2FullLabIntro";
import M2ReasonHypothesis from "./components/M2ReasonHypothesis";
import M2AnonymizedContext from "./components/M2AnonymizedContext";
import { m2Issues } from "./data/m2Data";

const roles = ["상황 정리자", "AI 질문자", "답변 검토자", "현장 언어 수정자", "공유자"];
const securityItems = [
  "실제 고객명, 병원명, 의료진명을 입력하지 않겠습니다.",
  "제품명과 내부 영업전략을 입력하지 않겠습니다.",
  "실제 매출자료와 처방 관련 정보를 입력하지 않겠습니다.",
  "팀원 실명과 민감한 평가 정보를 입력하지 않겠습니다.",
  "상황은 일반화·익명화해서 입력하겠습니다.",
  "AI 답변은 참고자료이며 최종 판단은 팀장이 하겠습니다.",
];
const securityCards = [
  { text: "우리 팀 주간 회의 안건을 성과관리 중심으로 정리해줘.", answer: "입력 가능", feedback: "민감정보가 없고 일반적인 회의 준비 목적입니다." },
  { text: "목표 미달 팀원과 면담할 질문을 만들어줘. 실제 이름은 제외하고 상황만 설명할게.", answer: "익명화 후 가능", feedback: "팀원 실명과 민감정보를 제거하면 리더십 대화 준비에 활용할 수 있습니다." },
  { text: "A병원 김OO 교수의 최근 처방 감소 원인을 분석해줘.", answer: "입력 금지", feedback: "고객명, 의료진명, 처방 관련 민감정보가 포함되어 있습니다." },
  { text: "지난달 우리 팀 실제 매출자료를 보고 팀원별 문제점을 분석해줘.", answer: "입력 금지", feedback: "내부 영업자료와 개인 평가 정보가 포함될 수 있습니다." },
  { text: "활동량은 많지만 성과 전환이 낮은 팀원과 나눌 1 on 1 질문을 만들어줘.", answer: "입력 가능", feedback: "일반화된 상황이며 팀장 대화 준비 목적입니다." },
];
const cardOptions = ["입력 가능", "익명화 후 가능", "입력 금지", "내부 기준 확인 필요"];
const scanLevels = ["낮음", "중간", "높음"];

type M2ScanItem = { relevance: string; difficulty: string; helpAreas: string[] };

function App() {
  const [step, setStep] = useState(0);
  const [sessionCode, setSessionCode] = useState("");
  const [teamName, setTeamName] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [checked, setChecked] = useState<boolean[]>(securityItems.map(() => false));
  const [cardIndex, setCardIndex] = useState(0);
  const [cardAnswers, setCardAnswers] = useState<string[]>(securityCards.map(() => ""));
  const [promptRole, setPromptRole] = useState("당신은 영업팀장 리더십 코치입니다.");
  const [promptSituation, setPromptSituation] = useState("활동량은 많지만 성과 전환이 낮은 팀원과 1 on 1을 준비하려고 합니다.");
  const [promptRequest, setPromptRequest] = useState("팀장이 이 팀원과 나눌 대화 흐름과 질문을 작성해주세요.");
  const [promptCondition, setPromptCondition] = useState("팀원을 단정하지 말고, 노력을 인정하되 성과 책임이 흐려지지 않게 작성해주세요. 실제 고객명, 병원명, 의료진명, 제품명, 내부자료는 사용하지 않습니다.");
  const [promptFormat, setPromptFormat] = useState("대화 시작 문장 / 질문 5개 / 피해야 할 표현 3개 / 다음 1주 행동 약속 / 팀장 지원으로 정리해주세요.");
  const [m2Scan, setM2Scan] = useState<M2ScanItem[]>(m2Issues.map(() => ({ relevance: "", difficulty: "", helpAreas: [] })));
  const [selectedM2IssueCodes, setSelectedM2IssueCodes] = useState<string[]>([]);
  const [selectedM2ReasonIds, setSelectedM2ReasonIds] = useState<string[]>([]);
  const [m2AnonymizedContext, setM2AnonymizedContext] = useState("");

  const allChecked = checked.every(Boolean);
  const currentCard = securityCards[cardIndex];
  const answeredCount = cardAnswers.filter(Boolean).length;
  const allCardsAnswered = answeredCount === securityCards.length;
  const m2ScanCompleteCount = m2Scan.filter((item) => item.relevance && item.difficulty && item.helpAreas.length > 0).length;
  const allM2ScanComplete = m2ScanCompleteCount === m2Issues.length;
  const selectedM2Issues = m2Issues.filter((issue) => selectedM2IssueCodes.includes(issue.code));
  const fullLabIssue = selectedM2Issues[0];
  const promptReady = Boolean(promptRole.trim() && promptSituation.trim() && promptRequest.trim() && promptCondition.trim() && promptFormat.trim());
  const finalPrompt = useMemo(() => `${promptRole}\n\n[상황]\n${promptSituation}\n\n[요청]\n${promptRequest}\n\n[조건]\n${promptCondition}\n\n[출력 형식]\n${promptFormat}`, [promptRole, promptSituation, promptRequest, promptCondition, promptFormat]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(finalPrompt);
      alert("프롬프트가 복사되었습니다.");
    } catch {
      alert("복사가 되지 않았습니다. 프롬프트를 직접 선택해서 복사해주세요.");
    }
  };
  const updateM2Scan = (index: number, key: "relevance" | "difficulty", value: string) => {
    const next = [...m2Scan];
    next[index] = { ...next[index], [key]: value };
    setM2Scan(next);
  };
  const toggleM2HelpArea = (index: number, value: string) => {
    const next = [...m2Scan];
    const current = next[index].helpAreas;
    next[index] = { ...next[index], helpAreas: current.includes(value) ? current.filter((item) => item !== value) : [...current, value] };
    setM2Scan(next);
  };
  const toggleM2IssueSelection = (code: string) => {
    setSelectedM2IssueCodes((current) => {
      if (current.includes(code)) return current.filter((item) => item !== code);
      if (current.length >= 2) {
        alert("핵심 상황은 2개까지만 선택할 수 있습니다.");
        return current;
      }
      return [...current, code];
    });
  };
  const toggleM2Reason = (reasonId: string) => {
    setSelectedM2ReasonIds((current) => current.includes(reasonId) ? current.filter((item) => item !== reasonId) : [...current, reasonId]);
  };

  const canNext = Boolean(
    step === 0 ||
    (step === 1 && sessionCode.trim()) ||
    (step === 2 && teamName.trim() && participantName.trim()) ||
    (step === 3 && selectedRole) ||
    (step === 4 && allChecked) ||
    step === 5 ||
    step === 6 ||
    (step === 7 && allCardsAnswered) ||
    step === 8 ||
    (step === 9 && promptReady) ||
    step === 10 ||
    step === 11 ||
    (step === 12 && allM2ScanComplete) ||
    (step === 13 && selectedM2IssueCodes.length === 2) ||
    step === 14 ||
    step === 15 ||
    (step === 16 && selectedM2ReasonIds.length > 0) ||
    step === 17 ||
    (step === 18 && m2AnonymizedContext.trim().length > 0)
  );

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">CKD AI Sales Leadership Lab</p>
        <h1>AI 활용 영업팀장 리더십 Lab Journey</h1>
        {step === 0 && (<><p className="subtitle">성과를 읽고, 일을 정렬하고, 사람을 움직이는 AI 활용 실습형 웹앱 MVP입니다.</p><div className="status-box"><strong>오늘의 흐름</strong><span>세션 입력 → 팀 정보 입력 → 역할 선택 → AI 보안 서약 → Lab Journey 안내</span></div></>)}
        {step === 1 && (<><h2>세션코드 입력</h2><p className="subtitle">강사가 안내한 세션코드를 입력해주세요.</p><input className="text-input" value={sessionCode} onChange={(e) => setSessionCode(e.target.value)} placeholder="예: CKD-AI-001" /></>)}
        {step === 2 && (<><h2>팀 정보 입력</h2><p className="subtitle">팀명과 이름 또는 닉네임을 입력해주세요.</p><input className="text-input" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="팀명 예: 1팀" /><input className="text-input" value={participantName} onChange={(e) => setParticipantName(e.target.value)} placeholder="이름 또는 닉네임 예: 김팀장" /></>)}
        {step === 3 && (<><h2>팀 내 역할 선택</h2><p className="subtitle">오늘 Development Lab에서 맡을 역할을 선택해주세요.</p><div className="choice-grid">{roles.map((role) => (<button key={role} className={selectedRole === role ? "choice-button selected" : "choice-button"} onClick={() => setSelectedRole(role)} type="button">{role}</button>))}</div></>)}
        {step === 4 && (<><h2>AI 보안 서약</h2><p className="subtitle">실습에서는 고객명, 의료진명, 병원명, 제품명, 실제 매출자료, 처방 관련 정보, 팀원 실명과 민감 평가 정보를 입력하지 않습니다.</p><div className="checklist">{securityItems.map((item, index) => (<label className="check-row" key={item}><input type="checkbox" checked={checked[index]} onChange={(e) => { const next = [...checked]; next[index] = e.target.checked; setChecked(next); }} /><span>{item}</span></label>))}</div></>)}
        {step === 5 && (<><h2>Lab Journey 안내</h2><p className="subtitle">기본 입장 정보가 확인되었습니다. 다음 화면부터 M1 AI 활용 보안 기준 & 질문 설계 Lab을 진행합니다.</p><div className="status-box"><strong>입장 정보</strong><span>세션: {sessionCode}</span><span>팀명: {teamName}</span><span>참여자: {participantName}</span><span>역할: {selectedRole}</span></div></>)}
        {step === 6 && (<><h2>M1. AI 활용 보안 기준 & 질문 설계 Lab</h2><p className="subtitle">AI에게 무엇을, 어떻게, 어느 선까지 물을 것인지 연습합니다. 먼저 AI에 입력 가능한 정보와 입력하면 안 되는 정보를 구분합니다.</p><div className="status-box"><strong>M1 산출물</strong><span>보안 기준을 반영한 AI 질문문 1개</span></div></>)}
        {step === 7 && (<><h2>AI 보안 기준 카드 분류</h2><p className="subtitle">아래 문장을 AI에 입력해도 되는지 판단해주세요. 5개 카드를 모두 분류해야 다음 단계로 이동할 수 있습니다.</p><div className="quiz-card"><strong>카드 {cardIndex + 1} / {securityCards.length}</strong><p>{currentCard.text}</p></div><div className="choice-grid">{cardOptions.map((option) => (<button key={option} className={cardAnswers[cardIndex] === option ? "choice-button selected" : "choice-button"} onClick={() => { const next = [...cardAnswers]; next[cardIndex] = option; setCardAnswers(next); }} type="button">{option}</button>))}</div>{cardAnswers[cardIndex] && <div className="feedback-box"><strong>권장 판단: {currentCard.answer}</strong><span>{currentCard.feedback}</span></div>}<div className="status-box compact-status"><strong>분류 진행률</strong><span>{answeredCount} / {securityCards.length}개 완료</span>{!allCardsAnswered && <span>아직 분류하지 않은 카드가 있습니다.</span>}{allCardsAnswered && <span>AI 보안 기준 카드 분류를 완료했습니다.</span>}</div><div className="nav-row inner-nav"><button className="secondary-button" disabled={cardIndex === 0} onClick={() => setCardIndex((prev) => Math.max(0, prev - 1))} type="button">이전 카드</button><button className="secondary-button" disabled={cardIndex === securityCards.length - 1} onClick={() => setCardIndex((prev) => Math.min(securityCards.length - 1, prev + 1))} type="button">다음 카드</button></div></>)}
        {step === 8 && (<><h2>AI 보안 기준 분류 완료</h2><p className="subtitle">이제 다음 단계에서는 역할, 상황, 요청, 조건, 출력 형식을 갖춘 좋은 AI 질문문을 작성합니다.</p><div className="status-box"><strong>다음 산출물</strong><span>보안 기준을 반영한 AI 질문문 초안</span></div></>)}
        {step === 9 && (<><h2>좋은 AI 질문문 작성</h2><p className="subtitle">역할, 상황, 요청, 조건, 출력 형식을 채우면 다음 단계에서 하나의 프롬프트로 조합합니다.</p><label className="field-group">역할<textarea value={promptRole} onChange={(e) => setPromptRole(e.target.value)} /></label><label className="field-group">상황<textarea value={promptSituation} onChange={(e) => setPromptSituation(e.target.value)} /></label><label className="field-group">요청<textarea value={promptRequest} onChange={(e) => setPromptRequest(e.target.value)} /></label><label className="field-group">조건<textarea value={promptCondition} onChange={(e) => setPromptCondition(e.target.value)} /></label><label className="field-group">출력 형식<textarea value={promptFormat} onChange={(e) => setPromptFormat(e.target.value)} /></label></>)}
        {step === 10 && (<><h2>M1 최종 프롬프트</h2><p className="subtitle">보안 기준을 반영한 질문문입니다. 외부 AI 도구에 복사해 사용할 수 있습니다.</p><pre className="prompt-preview">{finalPrompt}</pre><button className="primary-button standalone" onClick={copyPrompt} type="button">프롬프트 복사</button><div className="status-box"><strong>M1 완료</strong><span>다음 개발 단계에서는 M2 성과관리 Decision Lab을 구현합니다.</span></div></>)}
        {step === 11 && (<><h2>M2. 성과관리 Decision Lab</h2><p className="subtitle">성과 문제를 단정하지 않고 원인 가설로 나누며, AI를 활용해 성과대화 질문과 다음 2주 행동 약속을 설계합니다.</p><div className="status-box"><strong>M2 핵심 질문</strong><span>성과 문제를 어떻게 원인 가설과 행동 약속으로 바꿀 것인가?</span></div><div className="status-box"><strong>M2 산출물</strong><span>성과 원인 가설 / 성과대화 질문 / 2주 행동 약속</span></div></>)}
        {step === 12 && (<><h2>성과관리 이슈 스캔</h2><p className="subtitle">5개 이슈를 빠르게 훑고, 우리 팀 관련도·리더 판단 난이도·AI 도움받고 싶은 지점을 체크합니다. AI 도움받고 싶은 지점은 복수 선택할 수 있습니다.</p><div className="scan-list">{m2Issues.map((issue, index) => (<article className="scan-card" key={issue.code}><div className="scan-card-header"><b>{issue.code}</b><div><strong>{issue.title}</strong><p>{issue.situation}</p><span>판단 초점: {issue.focus}</span></div></div><div className="pulse-row"><span>우리 팀 관련도</span><div className="chip-row">{scanLevels.map((level) => (<button key={level} className={m2Scan[index].relevance === level ? "chip-button selected" : "chip-button"} onClick={() => updateM2Scan(index, "relevance", level)} type="button">{level}</button>))}</div></div><div className="pulse-row"><span>리더 판단 난이도</span><div className="chip-row">{scanLevels.map((level) => (<button key={level} className={m2Scan[index].difficulty === level ? "chip-button selected" : "chip-button"} onClick={() => updateM2Scan(index, "difficulty", level)} type="button">{level}</button>))}</div></div><div className="pulse-row help-row"><span>AI 도움받고 싶은 지점 (복수 선택 가능)</span><div className="chip-row wrap-chip-row">{issue.helpOptions.map((option) => (<button key={option} className={m2Scan[index].helpAreas.includes(option) ? "chip-button selected" : "chip-button"} onClick={() => toggleM2HelpArea(index, option)} type="button">{option}</button>))}</div></div></article>))}</div><div className="status-box compact-status"><strong>스캔 진행률</strong><span>{m2ScanCompleteCount} / {m2Issues.length}개 이슈 체크 완료</span>{!allM2ScanComplete && <span>모든 이슈에서 관련도·난이도·AI 도움 지점을 선택하면 다음 단계로 이동할 수 있습니다.</span>}{allM2ScanComplete && <span>성과관리 이슈 스캔을 완료했습니다. 다음 단계에서는 핵심 상황 2개를 선택합니다.</span>}</div></>)}
        {step === 13 && (<><h2>핵심 상황 2개 선택</h2><p className="subtitle">스캔한 성과관리 이슈 중 이번 실습에서 다룰 핵심 상황 2개를 선택해주세요. 하나는 Full Lab으로 깊게 다루고, 하나는 Lite Lab으로 빠르게 적용합니다.</p><div className="scan-list">{m2Issues.map((issue) => { const selected = selectedM2IssueCodes.includes(issue.code); return (<button key={issue.code} className={selected ? "choice-button selected" : "choice-button"} onClick={() => toggleM2IssueSelection(issue.code)} type="button"><strong>{issue.code}. {issue.title}</strong><span>{issue.situation}</span></button>); })}</div><div className="status-box compact-status"><strong>선택 진행률</strong><span>{selectedM2IssueCodes.length} / 2개 선택</span>{selectedM2IssueCodes.length < 2 && <span>핵심 상황을 2개 선택해야 다음 단계로 이동할 수 있습니다.</span>}{selectedM2IssueCodes.length === 2 && <span>핵심 상황 2개 선택이 완료되었습니다.</span>}</div></>)}
        {step === 14 && (<><h2>핵심 상황 선택 완료</h2><p className="subtitle">선택한 2개 상황을 확인해주세요. 다음 단계에서는 첫 번째 상황을 Full Lab으로 깊게 다룹니다.</p><div className="scan-list">{selectedM2Issues.map((issue, index) => (<article className="scan-card" key={issue.code}><div className="scan-card-header"><b>{index === 0 ? "Full" : "Lite"}</b><div><strong>{issue.code}. {issue.title}</strong><p>{issue.situation}</p><span>판단 초점: {issue.focus}</span></div></div></article>))}</div><div className="status-box"><strong>다음 단계</strong><span>첫 번째 선택 상황을 Full Lab으로 깊게 다룹니다.</span></div></>)}
        {step === 15 && <M2FullLabIntro issue={fullLabIssue} />}
        {step === 16 && <M2ReasonHypothesis selectedReasonIds={selectedM2ReasonIds} onToggleReason={toggleM2Reason} />}
        {step === 17 && (<><h2>원인 가설 선택 완료</h2><p className="subtitle">선택한 원인 가설을 바탕으로 다음 단계에서는 실제 고객명·제품명·팀원 실명 없이 익명화된 상황 설명을 작성합니다.</p><div className="status-box"><strong>선택한 원인 가설 수</strong><span>{selectedM2ReasonIds.length}개</span></div><div className="status-box"><strong>다음 개발 단계</strong><span>M2-4C. 익명화 상황 입력 화면</span></div></>)}
        {step === 18 && <M2AnonymizedContext issue={fullLabIssue} value={m2AnonymizedContext} onChange={setM2AnonymizedContext} />}
        <div className="nav-row"><button className="secondary-button" disabled={step === 0} onClick={() => setStep((prev) => Math.max(0, prev - 1))} type="button">이전</button><button className="primary-button" disabled={!canNext || step === 18} onClick={() => setStep((prev) => Math.min(18, prev + 1))} type="button">{step === 0 ? "Lab Journey 시작하기" : "다음"}</button></div>
      </section>
    </main>
  );
}

export default App;
