import { describe, expect, it } from "vitest";
import { createDecision, updateDecisionFromDraft } from "./decision-factory";
import type { Decision } from "../model/decision";
import type { DecisionDraft } from "../model/decision-draft";

function createDraft(): DecisionDraft {
  return {
    title: "  転職先を比較する  ",
    description: "  働きやすさを重視したい  ",
    note: "  落ち着いた会社がよさそう  ",
    evaluationAxes: [
      { id: "axis-1", name: "  働きやすさ  " },
      { id: "axis-2", name: "  年収  " },
    ],
    options: [
      {
        id: "option-1",
        name: "  A社  ",
        pros: ["  穏やか  ", "   "],
        cons: ["  年収は少し低め  ", ""],
        scores: [
          { axisId: "axis-1", value: 5 },
          { axisId: "axis-2", value: 3 },
        ],
      },
      {
        id: "option-2",
        name: "  B社  ",
        pros: ["  年収が高い  "],
        cons: ["  忙しそう  "],
        scores: [
          { axisId: "axis-1", value: 3 },
          { axisId: "axis-2", value: 5 },
        ],
      },
    ],
  };
}

function createCurrentDecision(): Decision {
  return {
    id: "decision-1",
    title: "旧タイトル",
    description: "旧説明",
    note: "旧メモ",
    createdAt: "2026-03-30T00:00:00.000Z",
    updatedAt: "2026-03-30T00:00:00.000Z",
    evaluationAxes: [
      { id: "axis-1", name: "旧軸1" },
      { id: "axis-2", name: "旧軸2" },
    ],
    options: [
      {
        id: "option-1",
        name: "旧選択肢",
        pros: [],
        cons: [],
        scores: [
          { axisId: "axis-1", value: 1 },
          { axisId: "axis-2", value: 1 },
        ],
      },
      {
        id: "option-2",
        name: "旧選択肢2",
        pros: [],
        cons: [],
        scores: [
          { axisId: "axis-1", value: 1 },
          { axisId: "axis-2", value: 1 },
        ],
      },
    ],
  };
}

describe("decision-factory", () => {
  it("draft から新しい decision を生成できる", () => {
    const result = createDecision({
      id: "decision-1",
      now: "2026-03-31T00:00:00.000Z",
      draft: createDraft(),
    });

    expect(result.id).toBe("decision-1");
    expect(result.title).toBe("転職先を比較する");
    expect(result.description).toBe("働きやすさを重視したい");
    expect(result.note).toBe("落ち着いた会社がよさそう");
    expect(result.createdAt).toBe("2026-03-31T00:00:00.000Z");
    expect(result.updatedAt).toBe("2026-03-31T00:00:00.000Z");

    expect(result.evaluationAxes[0].name).toBe("働きやすさ");
    expect(result.options[0].name).toBe("A社");
    expect(result.options[0].pros).toEqual(["穏やか"]);
    expect(result.options[0].cons).toEqual(["年収は少し低め"]);
  });

  it("既存 decision を draft で更新できる", () => {
    const current = createCurrentDecision();

    const result = updateDecisionFromDraft({
      current,
      now: "2026-03-31T00:00:00.000Z",
      draft: createDraft(),
    });

    expect(result.id).toBe("decision-1");
    expect(result.createdAt).toBe("2026-03-30T00:00:00.000Z");
    expect(result.updatedAt).toBe("2026-03-31T00:00:00.000Z");
    expect(result.title).toBe("転職先を比較する");
    expect(result.options[1].name).toBe("B社");
  });
});
