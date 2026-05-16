type StepNoticeProps = {
  message: string;
  status?: "info" | "warning" | "success";
};

function StepNotice({ message, status = "info" }: StepNoticeProps) {
  return (
    <div className={`step-notice ${status}`} role="status">
      <span className="step-notice-icon" aria-hidden="true">
        {status === "success" ? "✓" : status === "warning" ? "!" : "i"}
      </span>
      <span className="step-notice-message">{message}</span>
    </div>
  );
}

export default StepNotice;
