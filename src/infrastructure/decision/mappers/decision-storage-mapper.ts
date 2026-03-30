import type { Decision } from "@/src/domain/decision/model/decision";
import type { DecisionStorageRecord } from "../storage/decision-storage";

export function toDecisionStorageRecord(
  decision: Decision
): DecisionStorageRecord {
  return {
    id: decision.id,
    title: decision.title,
    description: decision.description,
    evaluationAxes: decision.evaluationAxes.map((axis) => ({
      id: axis.id,
      name: axis.name,
    })),
    options: decision.options.map((option) => ({
      id: option.id,
      name: option.name,
      pros: [...option.pros],
      cons: [...option.cons],
      scores: option.scores.map((score) => ({
        axisId: score.axisId,
        value: score.value,
      })),
    })),
    note: decision.note,
    createdAt: decision.createdAt,
    updatedAt: decision.updatedAt,
  };
}

export function toDecisionDomain(record: DecisionStorageRecord): Decision {
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    evaluationAxes: record.evaluationAxes.map((axis) => ({
      id: axis.id,
      name: axis.name,
    })),
    options: record.options.map((option) => ({
      id: option.id,
      name: option.name,
      pros: [...option.pros],
      cons: [...option.cons],
      scores: option.scores.map((score) => ({
        axisId: score.axisId,
        value: score.value,
      })),
    })),
    note: record.note,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}
