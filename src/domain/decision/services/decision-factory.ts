import { Decision } from "../model/decision";
import { DecisionDraft } from "../model/decision-draft";

type CreateDecisionParams = {
  id: string;
  now: string;
  draft: DecisionDraft;
};

export function createDecision({
  id,
  now,
  draft,
}: CreateDecisionParams): Decision {
  return {
    id,
    title: draft.title.trim(),
    description: draft.description.trim(),
    evaluationAxes: draft.evaluationAxes.map((axis) => ({
      id: axis.id,
      name: axis.name.trim(),
    })),
    options: draft.options.map((option) => ({
      id: option.id,
      name: option.name.trim(),
      pros: option.pros.map((item) => item.trim()).filter(Boolean),
      cons: option.cons.map((item) => item.trim()).filter(Boolean),
      scores: option.scores,
    })),
    note: draft.note.trim(),
    createdAt: now,
    updatedAt: now,
  };
}

type UpdateDecisionParams = {
  current: Decision;
  now: string;
  draft: DecisionDraft;
};

export function updateDecisionFromDraft({
  current,
  now,
  draft,
}: UpdateDecisionParams): Decision {
  return {
    ...current,
    title: draft.title.trim(),
    description: draft.description.trim(),
    evaluationAxes: draft.evaluationAxes.map((axis) => ({
      id: axis.id,
      name: axis.name.trim(),
    })),
    options: draft.options.map((option) => ({
      id: option.id,
      name: option.name.trim(),
      pros: option.pros.map((item) => item.trim()).filter(Boolean),
      cons: option.cons.map((item) => item.trim()).filter(Boolean),
      scores: option.scores,
    })),
    note: draft.note.trim(),
    updatedAt: now,
  };
}
