import "./progressMap.css";
export type ProgressStep = {
  label: string;
  status: "done" | "current" | "upcoming";
};

type ProgressMapProps = {
  title?: string;
  steps: ProgressStep[];
};

function ProgressMap({ title = "진행 단계", steps }: ProgressMapProps) {
  return (
    <nav className="progress-map" aria-label={title}>
      <div className="progress-map-title">{title}</div>
      <div className="progress-map-list">
        {steps.map((step, index) => (
          <div className={`progress-map-item ${step.status}`} key={`${step.label}-${index}`}>
            <span className="progress-dot">
              {step.status === "done" ? "✓" : index + 1}
            </span>
            <span className="progress-label">{step.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default ProgressMap;
