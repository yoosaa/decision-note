import type { Decision } from "@/src/domain/decision/model/decision";
import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";
import { validateDecisionDraft } from "@/src/domain/decision/rules/decision-rules";
import { updateDecisionFromDraft } from "@/src/domain/decision/services/decision-factory";
import type { DecisionRepository } from "../ports/decision-repository";
import type { UseCaseResult } from "./types/use-case-result";

type UpdateDecisionDeps = {
  decisionRepository: DecisionRepository;
  getNow: () => string;
};

export async function updateDecision(
  decisionId: string,
  draft: DecisionDraft,
  deps: UpdateDecisionDeps
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
    const current = await deps.decisionRepository.findById(decisionId);

    if (!current) {
      return {
        success: false,
        error: {
          type: "not_found",
          message: "対象の意思決定が見つかりません。",
        },
      };
    }

    const updated = updateDecisionFromDraft({
      current,
      now: deps.getNow(),
      draft,
    });

    await deps.decisionRepository.save(updated);

    return {
      success: true,
      data: updated,
    };
  } catch {
    return {
      success: false,
      error: {
        type: "unexpected",
        message: "意思決定の更新に失敗しました。",
      },
    };
  }
}
