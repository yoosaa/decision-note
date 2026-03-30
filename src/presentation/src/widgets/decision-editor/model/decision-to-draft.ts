import type { Decision } from "@/src/domain/decision/model/decision";
import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";

export function decisionToDraft(decision: Decision): DecisionDraft {
  return {
    title: decision.title,
    description: decision.description,
    note: decision.note,
    evaluationAxes: decision.evaluationAxes.map((axis) => ({
      id: axis.id,
      name: axis.name,
    })),
    options: decision.options.map((option) => ({
      id: option.id,
      name: option.name,
      pros: option.pros.length > 0 ? [...option.pros] : [""],
      cons: option.cons.length > 0 ? [...option.cons] : [""],
      scores: option.scores.map((score) => ({
        axisId: score.axisId,
        value: score.value,
      })),
    })),
  };
}
