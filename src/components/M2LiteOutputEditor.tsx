import { useEffect, useMemo } from "react";
import { m2LiteOutputOptions } from "./M2LitePromptGenerator";

export type M2LiteFinalOutputs = Record<string, string>;

type M2LiteOutputEditorProps = {
  selectedOutputIds: string[];
  aiResponse: string;
  value: M2LiteFinalOutputs;
  onChange: (value: M2LiteFinalOutputs) => void;
};

function normalizeLine(value: string) {
  return value.replace(/[\[\]#*]/g, "").trim();
}

function extractLiteOutput(aiResponse: string, title: string, allTitles: string[]) {
  const lines = aiResponse.split("\n");
  const startIndex = lines.findIndex((line) => normalizeLine(line).includes(title));

  if (startIndex === -1) return "";

  const nextIndex = lines.findIndex((line, index) => {
    if (index <= startIndex) return false;
    const normalized = normalizeLine(line);
    return allTitles.some((nextTitle) => nextTitle !== title && normalized.includes(nextTitle));
  });

  return lines
    .slice(startIndex + 1, nextIndex === -1 ? undefined : nextIndex)
    .join("\n")
    .trim();
}

function M2LiteOutputEditor({ selectedOutputIds, aiResponse, value, onChange }: M2LiteOutputEditorProps) {
  const selectedOutputs = useMemo(() => {
    return selectedOutputIds
      .map((id) => m2LiteOutputOptions.find((option) => option.id === id))
      .filter((option): option is NonNullable<typeof option> => Boolean(option));
  }, [selectedOutputIds]);

  const outputTitles = useMemo(() => selectedOutputs.map((output) => output.title), [selectedOutputs]);

  const extractedOutputs = useMemo(() => {
    return selectedOutputs.reduce<M2LiteFinalOutputs>((acc, output) => {
      const byTitle = extractLiteOutput(aiResponse, output.title, outputTitles);
      const byPromptLabel = extractLiteOutput(aiResponse, output.promptLabel, outputTitles);
      acc[output.id] = byTitle || byPromptLabel || "";
      return acc;
    }, {});
  }, [aiResponse, outputTitles, selectedOutputs]);

  useEffect(() => {
    if (!aiResponse.trim() || selectedOutputs.length === 0) return;

    const nextValue = { ...value };
    let changed = false;

    selectedOutputs.forEach((output) => {
      if (!nextValue[output.id]?.trim() && extractedOutputs[output.id]) {
        nextValue[output.id] = extractedOutputs[output.id];
        changed = true;
      }
    });

    if (changed) onChange(nextValue);
  }, [aiResponse, extractedOutputs, onChange, selectedOutputs, value]);

  const updateOutput = (outputId: string, nextText: string) => {
    onChange({ ...value, [outputId]: nextText });
  };

  const completedCount = selectedOutputs.filter((output) => value[output.id]?.trim()).length;
  const allCompleted = selectedOutputs.length > 0 && completedCount === selectedOutputs.length;

  return (
    <>
      <h2>Lite Lab 산출물 정리</h2>
      <p className="subtitle">
        AI 생성결과를 참고해, 내가 선택한 산출물만 최종 정리합니다. 자동으로 분리된 초안을 그대로 쓰지 말고 현장 표현으로 다듬어주세요.
      </p>

      <div className="status-box">
        <strong>선택한 산출물</strong>
        <span>{selectedOutputs.map((output) => output.title).join(" / ") || "선택한 산출물이 없습니다."}</span>
      </div>

      <div className="status-box compact-status">
        <strong>정리 방식</strong>
        <span>AI 생성결과에서 선택한 산출물 제목을 찾아 초안을 자동으로 채웁니다.</span>
        <span>초안이 비어 있으면 AI 답변 원문을 참고해 직접 작성하세요.</span>
      </div>

      <div className="scan-list">
        {selectedOutputs.map((output) => (
          <label className="field-group" key={output.id}>
            {output.title} <span className="required-mark">필수</span>
            <textarea
              value={value[output.id] || ""}
              onChange={(event) => updateOutput(output.id, event.target.value)}
              placeholder={`${output.title} 최종 내용을 작성해주세요.`}
            />
          </label>
        ))}
      </div>

      <div className="status-box compact-status">
        <strong>정리 진행률</strong>
        <span>{completedCount} / {selectedOutputs.length}개 산출물 정리 완료</span>
        {allCompleted ? (
          <span>선택한 산출물 정리가 완료되었습니다.</span>
        ) : (
          <span>선택한 모든 산출물을 정리하면 다음 단계로 이동할 수 있습니다.</span>
        )}
      </div>
    </>
  );
}

export default M2LiteOutputEditor;
