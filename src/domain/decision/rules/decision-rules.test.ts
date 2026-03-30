import { describe, expect, it } from "vitest";
import { validateDecisionDraft } from "./decision-rules";
import type { DecisionDraft } from "../model/decision-draft";

function createValidDraft(): DecisionDraft {
  return {
    title: "転職先を比較する",
    description: "働きやすさと年収で比較したい",
    note: "落ち着いた環境を重視したい",
    evaluationAxes: [
      { id: "axis-1", name: "働きやすさ" },
      { id: "axis-2", name: "年収" },
    ],
    options: [
      {
        id: "option-1",
        name: "A社",
        pros: ["落ち着いている"],
        cons: ["年収はやや低い"],
        scores: [
          { axisId: "axis-1", value: 5 },
          { axisId: "axis-2", value: 3 },
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
        ],
      },
    ],
  };
}

describe("validateDecisionDraft", () => {
  it("妥当な draft なら valid=true を返す", () => {
    const draft = createValidDraft();

    const result = validateDecisionDraft(draft);

    expect(result.valid).toBe(true);
    expect(result.issues).toEqual([]);
  });

  it("タイトルが空ならエラーを返す", () => {
    const draft = {
      ...createValidDraft(),
      title: "   ",
    };

    const result = validateDecisionDraft(draft);

    expect(result.valid).toBe(false);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "title",
        }),
      ])
    );
  });

  it("選択肢が1件しかない場合はエラーを返す", () => {
    const draft = {
      ...createValidDraft(),
      options: [createValidDraft().options[0]],
    };

    const result = validateDecisionDraft(draft);

    expect(result.valid).toBe(false);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "options",
        }),
      ])
    );
  });

  it("評価軸に対応する score が欠けている場合はエラーを返す", () => {
    const draft = createValidDraft();

    draft.options[0] = {
      ...draft.options[0],
      scores: [{ axisId: "axis-1", value: 5 }],
    };

    const result = validateDecisionDraft(draft);

    expect(result.valid).toBe(false);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "options[0].scores",
        }),
      ])
    );
  });
});
