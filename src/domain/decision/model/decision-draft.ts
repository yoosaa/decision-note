import { ScoreValue } from "./decision";

export type DecisionDraftAxis = {
  id: string;
  name: string;
};

export type DecisionDraftScore = {
  axisId: string;
  value: ScoreValue;
};

export type DecisionDraftOption = {
  id: string;
  name: string;
  pros: string[];
  cons: string[];
  scores: DecisionDraftScore[];
};

export type DecisionDraft = {
  title: string;
  description: string;
  evaluationAxes: DecisionDraftAxis[];
  options: DecisionDraftOption[];
  note: string;
};
