import type { DecisionRepository } from "../ports/decision-repository";
import type { UseCaseResult } from "./types/use-case-result";

type DeleteDecisionDeps = {
  decisionRepository: DecisionRepository;
};

export async function deleteDecision(
  decisionId: string,
  deps: DeleteDecisionDeps
): Promise<UseCaseResult<{ id: string }>> {
  try {
    const current = await deps.decisionRepository.findById(decisionId);

    if (!current) {
      return {
        success: false,
        error: {
          type: "not_found",
          message: "削除対象の意思決定が見つかりません。",
        },
      };
    }

    await deps.decisionRepository.delete(decisionId);

    return {
      success: true,
      data: { id: decisionId },
    };
  } catch {
    return {
      success: false,
      error: {
        type: "unexpected",
        message: "意思決定の削除に失敗しました。",
      },
    };
  }
}
