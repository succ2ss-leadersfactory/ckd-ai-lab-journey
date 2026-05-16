import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">CKD AI Sales Leadership Lab</p>
        <h1>AI 활용 영업팀장 리더십 Lab Journey</h1>
        <p className="subtitle">
          성과를 읽고, 일을 정렬하고, 사람을 움직이는 AI 활용 실습형 웹앱 MVP입니다.
        </p>

        <div className="status-box">
          <strong>현재 단계</strong>
          <span>Step 1: Vite + React 기본 앱 구성 중</span>
        </div>

        <button className="primary-button">
          Lab Journey 시작하기
        </button>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
