export type DecisionStorageRecord = {
  id: string;
  title: string;
  description: string;
  evaluationAxes: {
    id: string;
    name: string;
  }[];
  options: {
    id: string;
    name: string;
    pros: string[];
    cons: string[];
    scores: {
      axisId: string;
      value: 1 | 2 | 3 | 4 | 5;
    }[];
  }[];
  note: string;
  createdAt: string;
  updatedAt: string;
};

export type DecisionStorageData = {
  version: 1;
  decisions: DecisionStorageRecord[];
};
