import { describe, expect, it } from "vitest";
import {
  calculateOptionTotalScore,
  findBestOption,
  summarizeDecision,
} from "./decision-evaluator";
import type { Decision } from "../model/decision";

function createDecision(): Decision {
  return {
    id: "decision-1",
    title: "転職先を比較する",
    description: "",
    note: "",
    createdAt: "2026-03-30T00:00:00.000Z",
    updatedAt: "2026-03-30T00:00:00.000Z",
    evaluationAxes: [
      { id: "axis-1", name: "働きやすさ" },
      { id: "axis-2", name: "年収" },
      { id: "axis-3", name: "成長機会" },
    ],
    options: [
      {
        id: "option-1",
        name: "A社",
        pros: [],
        cons: [],
        scores: [
          { axisId: "axis-1", value: 5 },
          { axisId: "axis-2", value: 3 },
          { axisId: "axis-3", value: 4 },
        ],
      },
      {
        id: "option-2",
        name: "B社",
        pros: [],
        cons: [],
        scores: [
          { axisId: "axis-1", value: 3 },
          { axisId: "axis-2", value: 5 },
          { axisId: "axis-3", value: 3 },
        ],
      },
    ],
  };
}

describe("decision-evaluator", () => {
  it("選択肢の合計スコアを計算できる", () => {
    const decision = createDecision();

    const total = calculateOptionTotalScore(decision.options[0]);

    expect(total).toBe(12);
  });

  it("decision 全体の比較要約を作れる", () => {
    const decision = createDecision();

    const result = summarizeDecision(decision);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(
      expect.objectContaining({
        optionId: "option-1",
        optionName: "A社",
        totalScore: 12,
      })
    );
    expect(result[0].axisScores).toHaveLength(3);
  });

  it("最もスコアの高い選択肢を返す", () => {
    const decision = createDecision();

    const best = findBestOption(decision);

    expect(best).not.toBeNull();
    expect(best?.optionId).toBe("option-1");
    expect(best?.totalScore).toBe(12);
  });
});
