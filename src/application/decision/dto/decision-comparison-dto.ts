export type DecisionComparisonAxisDto = {
  id: string;
  name: string;
};

export type DecisionComparisonOptionAxisScoreDto = {
  axisId: string;
  axisName: string;
  value: number;
};

export type DecisionComparisonOptionDto = {
  id: string;
  name: string;
  totalScore: number;
  isBest: boolean;
  pros: string[];
  cons: string[];
  axisScores: DecisionComparisonOptionAxisScoreDto[];
};

export type DecisionComparisonDto = {
  axes: DecisionComparisonAxisDto[];
  options: DecisionComparisonOptionDto[];
};
