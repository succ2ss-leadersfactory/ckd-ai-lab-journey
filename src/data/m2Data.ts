export type M2Issue = {
  code: string;
  title: string;
  situation: string;
  focus: string;
  helpOptions: string[];
};

export const m2Issues: M2Issue[] = [
  {
    code: "A",
    title: "목표 상향에 대한 반발",
    situation: "팀 목표가 상향되었지만 팀원들이 ‘현장 상황을 모른다’고 반응한다.",
    focus: "목표 수용성, 메시지, 상향 정렬",
    helpOptions: ["목표 설명 멘트", "팀원 반응 예상 질문", "팀장 전달 메시지", "주의할 표현"],
  },
  {
    code: "B",
    title: "활동량은 많지만 성과 전환이 낮음",
    situation: "한 팀원은 활동량은 많지만 실제 성과 전환이 낮다.",
    focus: "활동 품질, 우선순위, 후속조치",
    helpOptions: ["가능한 원인 정리", "활동량·활동 품질 확인 질문", "1 on 1 대화 흐름", "2주 실행 계획"],
  },
  {
    code: "C",
    title: "고성과자의 정보 공유 부족",
    situation: "고성과 팀원은 개인 성과는 좋지만 팀 내 정보 공유가 부족하다.",
    focus: "인정, 팀 기여, 협업 요청",
    helpOptions: ["성과 인정 멘트", "팀 기여 요청 멘트", "공유 실행 계획", "방어감 낮추는 표현"],
  },
  {
    code: "D",
    title: "목표 미달 팀원의 방어 반응",
    situation: "목표 미달 팀원이 ‘저는 누구보다 열심히 하고 있다’고 방어한다.",
    focus: "노력 인정, 성과 기준, 공동 원인 탐색",
    helpOptions: ["노력 인정 멘트", "성과 기준 다시 맞추는 질문", "함께 원인 확인하는 질문", "압박으로 들릴 표현 확인"],
  },
  {
    code: "E",
    title: "팀 전체의 목표 압박과 피로감",
    situation: "팀 전체가 목표 압박으로 피로감을 보이고 실행 리듬이 무너진다.",
    focus: "우선순위 재정리, 실행 리듬, 팀장 메시지",
    helpOptions: ["우선순위 다시 정리하는 질문", "팀장 전달 메시지", "실행 리듬 회복 방안", "2주 중간 체크 기준"],
  },
];
