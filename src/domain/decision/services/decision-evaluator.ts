import type {
  Decision,
  DecisionOption,
  EvaluationAxis,
} from "../model/decision";

export type OptionScoreSummary = {
  optionId: string;
  optionName: string;
  totalScore: number;
  axisScores: {
    axisId: string;
    axisName: string;
    value: number;
  }[];
};

export function calculateOptionTotalScore(option: DecisionOption): number {
  return option.scores.reduce((sum, score) => sum + score.value, 0);
}

export function summarizeOptionScores(
  option: DecisionOption,
  axes: EvaluationAxis[]
): OptionScoreSummary {
  return {
    optionId: option.id,
    optionName: option.name,
    totalScore: calculateOptionTotalScore(option),
    axisScores: axes.map((axis) => {
      const score = option.scores.find((score) => score.axisId === axis.id);

      return {
        axisId: axis.id,
        axisName: axis.name,
        value: score?.value ?? 0,
      };
    }),
  };
}

export function summarizeDecision(decision: Decision): OptionScoreSummary[] {
  return decision.options.map((option) =>
    summarizeOptionScores(option, decision.evaluationAxes)
  );
}

export function findBestOption(decision: Decision): OptionScoreSummary | null {
  const summaries = summarizeDecision(decision);

  if (summaries.length === 0) return null;

  return summaries.reduce((best, current) =>
    current.totalScore > best.totalScore ? current : best
  );
}
