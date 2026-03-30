export type DecisionId = string;
export type DecisionOptionId = string;
export type EvaluationAxisId = string;

export type ScoreValue = 1 | 2 | 3 | 4 | 5;

export type EvaluationAxis = {
  id: EvaluationAxisId;
  name: string;
};

export type OptionScore = {
  axisId: EvaluationAxisId;
  value: ScoreValue;
};

export type DecisionOption = {
  id: DecisionOptionId;
  name: string;
  pros: string[];
  cons: string[];
  scores: OptionScore[];
};

export type Decision = {
  id: DecisionId;
  title: string;
  description: string;
  evaluationAxes: EvaluationAxis[];
  options: DecisionOption[];
  note: string;
  createdAt: string;
  updatedAt: string;
};
