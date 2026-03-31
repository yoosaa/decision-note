import { describe, expect, it } from "vitest";
import { toDecisionComparisonDto } from "./to-decision-comparison-dto";
import type { Decision } from "@/src/domain/decision/model/decision";

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
        pros: ["穏やか"],
        cons: ["年収は少し低め"],
        scores: [
          { axisId: "axis-1", value: 5 },
          { axisId: "axis-2", value: 3 },
          { axisId: "axis-3", value: 4 },
        ],
      },
      {
        id: "option-2",
        name: "B社",
        pros: ["年収が高い"],
        cons: ["忙しそう"],
        scores: [
          { axisId: "axis-1", value: 3 },
          { axisId: "axis-2", value: 5 },
          { axisId: "axis-3", value: 3 },
        ],
      },
    ],
  };
}

describe("toDecisionComparisonDto", () => {
  it("decision を比較表示用 DTO に変換できる", () => {
    const result = toDecisionComparisonDto(createDecision());

    expect(result.axes).toHaveLength(3);
    expect(result.axes[0]).toEqual({
      id: "axis-1",
      name: "働きやすさ",
    });

    expect(result.options).toHaveLength(2);
    expect(result.options[0]).toEqual(
      expect.objectContaining({
        id: "option-1",
        name: "A社",
        totalScore: 12,
        isBest: true,
        pros: ["穏やか"],
        cons: ["年収は少し低め"],
      })
    );

    expect(result.options[0].axisScores).toEqual([
      { axisId: "axis-1", axisName: "働きやすさ", value: 5 },
      { axisId: "axis-2", axisName: "年収", value: 3 },
      { axisId: "axis-3", axisName: "成長機会", value: 4 },
    ]);
  });

  it("最上位でない選択肢には isBest=false が入る", () => {
    const result = toDecisionComparisonDto(createDecision());

    const second = result.options.find((option) => option.id === "option-2");

    expect(second?.isBest).toBe(false);
    expect(second?.totalScore).toBe(11);
  });
});
