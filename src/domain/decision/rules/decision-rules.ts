import { DecisionDraft } from "../model/decision-draft";

export type ValidationIssue = {
  field: string;
  message: string;
};

export type ValidationResult = {
  valid: boolean;
  issues: ValidationIssue[];
};

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 4;
const MIN_AXES = 1;
const MAX_AXES = 3;

export function validateDecisionDraft(draft: DecisionDraft): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (draft.title.trim().length === 0) {
    issues.push({
      field: "title",
      message: "テーマは必須です。",
    });
  }

  if (
    draft.evaluationAxes.length < MIN_AXES ||
    draft.evaluationAxes.length > MAX_AXES
  ) {
    issues.push({
      field: "evaluationAxes",
      message: `評価軸は${MIN_AXES}〜${MAX_AXES}件で入力してください。`,
    });
  }

  if (
    draft.options.length < MIN_OPTIONS ||
    draft.options.length > MAX_OPTIONS
  ) {
    issues.push({
      field: "options",
      message: `選択肢は${MIN_OPTIONS}〜${MAX_OPTIONS}件で入力してください。`,
    });
  }

  draft.evaluationAxes.forEach((axis, index) => {
    if (axis.name.trim().length === 0) {
      issues.push({
        field: `evaluationAxes[${index}].name`,
        message: "評価軸名は必須です。",
      });
    }
  });

  draft.options.forEach((option, optionIndex) => {
    if (option.name.trim().length === 0) {
      issues.push({
        field: `options[${optionIndex}].name`,
        message: "選択肢名は必須です。",
      });
    }

    const scoreAxisIds = new Set(option.scores.map((score) => score.axisId));

    draft.evaluationAxes.forEach((axis) => {
      if (!scoreAxisIds.has(axis.id)) {
        issues.push({
          field: `options[${optionIndex}].scores`,
          message: `選択肢「${
            option.name || `#${optionIndex + 1}`
          }」に評価軸「${axis.name}」のスコアがありません。`,
        });
      }
    });

    option.scores.forEach((score, scoreIndex) => {
      if (score.value < 1 || score.value > 5) {
        issues.push({
          field: `options[${optionIndex}].scores[${scoreIndex}].value`,
          message: "スコアは1〜5で入力してください。",
        });
      }
    });
  });

  return {
    valid: issues.length === 0,
    issues,
  };
}
