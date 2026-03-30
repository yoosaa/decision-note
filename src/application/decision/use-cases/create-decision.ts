import type { Decision } from "@/src/domain/decision/model/decision";
import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";
import { validateDecisionDraft } from "@/src/domain/decision/rules/decision-rules";
import { createDecision as buildDecision } from "@/src/domain/decision/services/decision-factory";
import type { DecisionRepository } from "../ports/decision-repository";
import type { UseCaseResult } from "./types/use-case-result";

type CreateDecisionDeps = {
  decisionRepository: DecisionRepository;
  createId: () => string;
  getNow: () => string;
};

export async function createDecision(
  draft: DecisionDraft,
  deps: CreateDecisionDeps
): Promise<UseCaseResult<Decision>> {
  const validation = validateDecisionDraft(draft);

  if (!validation.valid) {
    return {
      success: false,
      error: {
        type: "validation",
        issues: validation.issues,
      },
    };
  }

  try {
    const decision = buildDecision({
      id: deps.createId(),
      now: deps.getNow(),
      draft,
    });

    await deps.decisionRepository.save(decision);

    return {
      success: true,
      data: decision,
    };
  } catch {
    return {
      success: false,
      error: {
        type: "unexpected",
        message: "意思決定の保存に失敗しました。",
      },
    };
  }
}
