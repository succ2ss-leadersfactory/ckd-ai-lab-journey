import StepNotice from "./StepNotice";

type BottomNavProps = {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev?: boolean;
  canGoNext: boolean;
  isLastStep?: boolean;
  nextLabel?: string;
  prevLabel?: string;
  helperText?: string;
  successText?: string;
};

function BottomNav({
  onPrev,
  onNext,
  canGoPrev = true,
  canGoNext,
  isLastStep = false,
  nextLabel = "다음",
  prevLabel = "이전",
  helperText = "필수 항목을 완료하면 다음으로 이동할 수 있습니다.",
  successText = "다음 단계로 이동할 수 있습니다.",
}: BottomNavProps) {
  return (
    <footer className="bottom-nav">
      <div className="bottom-nav-buttons">
        <button
          className="secondary-button"
          disabled={!canGoPrev}
          onClick={onPrev}
          type="button"
        >
          {prevLabel}
        </button>
        <button
          className="primary-button"
          disabled={!canGoNext || isLastStep}
          onClick={onNext}
          type="button"
        >
          {isLastStep ? "완료" : nextLabel}
        </button>
      </div>

      {!isLastStep && (
        <StepNotice
          status={canGoNext ? "success" : "warning"}
          message={canGoNext ? successText : helperText}
        />
      )}
    </footer>
  );
}

export default BottomNav;
