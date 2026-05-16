import type { ReactNode } from "react";

type MobileShellProps = {
  children: ReactNode;
};

function MobileShell({ children }: MobileShellProps) {
  return (
    <main className="mobile-shell">
      <section className="mobile-card">{children}</section>
    </main>
  );
}

export default MobileShell;
