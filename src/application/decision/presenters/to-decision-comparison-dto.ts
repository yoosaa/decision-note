import type { Decision } from "@/src/domain/decision/model/decision";
import {
  findBestOption,
  summarizeDecision,
} from "@/src/domain/decision/services/decision-evaluator";
import type { DecisionComparisonDto } from "../dto/decision-comparison-dto";

export function toDecisionComparisonDto(
  decision: Decision
): DecisionComparisonDto {
  const summaries = summarizeDecision(decision);
  const best = findBestOption(decision);

  return {
    axes: decision.evaluationAxes.map((axis) => ({
      id: axis.id,
      name: axis.name,
    })),
    options: decision.options.map((option) => {
      const summary = summaries.find((item) => item.optionId === option.id);

      return {
        id: option.id,
        name: option.name,
        totalScore: summary?.totalScore ?? 0,
        isBest: best?.optionId === option.id,
        pros: option.pros,
        cons: option.cons,
        axisScores: summary?.axisScores ?? [],
      };
    }),
  };
}
