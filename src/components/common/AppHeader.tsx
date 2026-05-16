type AppHeaderProps = {
  courseTitle?: string;
  moduleTitle: string;
  moduleLabel?: string;
  visualType?: "security" | "performance" | "work" | "people" | "wrapup";
};

const visualMap = {
  security: "🔒",
  performance: "📈",
  work: "✅",
  people: "💬",
  wrapup: "🧭",
};

function AppHeader({
  courseTitle = "AI 활용 영업팀장 리더십 Lab Journey",
  moduleTitle,
  moduleLabel,
  visualType = "performance",
}: AppHeaderProps) {
  return (
    <header className="app-header-mobile">
      <div className="app-header-visual" aria-hidden="true">
        {visualMap[visualType]}
      </div>
      <div className="app-header-text">
        <p>{courseTitle}</p>
        <h1>{moduleTitle}</h1>
        {moduleLabel && <span>{moduleLabel}</span>}
      </div>
    </header>
  );
}

export default AppHeader;
