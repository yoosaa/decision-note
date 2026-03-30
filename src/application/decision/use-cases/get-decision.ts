import type { Decision } from "@/src/domain/decision/model/decision";
import type { DecisionRepository } from "../ports/decision-repository";
import type { UseCaseResult } from "./types/use-case-result";

type GetDecisionDeps = {
  decisionRepository: DecisionRepository;
};

export async function getDecision(
  decisionId: string,
  deps: GetDecisionDeps
): Promise<UseCaseResult<Decision>> {
  try {
    const decision = await deps.decisionRepository.findById(decisionId);

    if (!decision) {
      return {
        success: false,
        error: {
          type: "not_found",
          message: "意思決定が見つかりません。",
        },
      };
    }

    return {
      success: true,
      data: decision,
    };
  } catch {
    return {
      success: false,
      error: {
        type: "unexpected",
        message: "意思決定の取得に失敗しました。",
      },
    };
  }
}
