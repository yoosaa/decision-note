import type { DecisionRepository } from "../ports/decision-repository";
import type { UseCaseResult } from "./types/use-case-result";
import type { DecisionListItemDto } from "../dto/decision-list-item-dto";

type ListDecisionsDeps = {
  decisionRepository: DecisionRepository;
};

export async function listDecisions(
  deps: ListDecisionsDeps
): Promise<UseCaseResult<DecisionListItemDto[]>> {
  try {
    const decisions = await deps.decisionRepository.findAll();

    const items: DecisionListItemDto[] = decisions
      .map((decision) => ({
        id: decision.id,
        title: decision.title,
        description: decision.description,
        optionCount: decision.options.length,
        updatedAt: decision.updatedAt,
      }))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

    return {
      success: true,
      data: items,
    };
  } catch {
    return {
      success: false,
      error: {
        type: "unexpected",
        message: "意思決定一覧の取得に失敗しました。",
      },
    };
  }
}
