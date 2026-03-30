import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";

function createAxis(id: string, name = "") {
  return {
    id,
    name,
  };
}

function createOption(
  id: string,
  axisIds: string[],
  name = ""
): DecisionDraft["options"][number] {
  return {
    id,
    name,
    pros: [""],
    cons: [""],
    scores: axisIds.map((axisId) => ({
      axisId,
      value: 3,
    })),
  };
}

export function createEmptyDecisionDraft(): DecisionDraft {
  const axis1 = createAxis(crypto.randomUUID(), "評価軸1");
  const axis2 = createAxis(crypto.randomUUID(), "評価軸2");

  return {
    title: "",
    description: "",
    note: "",
    evaluationAxes: [axis1, axis2],
    options: [
      createOption(crypto.randomUUID(), [axis1.id, axis2.id], "選択肢1"),
      createOption(crypto.randomUUID(), [axis1.id, axis2.id], "選択肢2"),
    ],
  };
}
