type ValidationIssue = {
  field: string;
  message: string;
};

export type DecisionEditorStatus =
  | "idle"
  | "submitting"
  | "success"
  | "failure";

export type DecisionEditorMachineState = {
  status: DecisionEditorStatus;
  savedId: string | null;
  savedMessage: string | null;
  issues: ValidationIssue[];
  unexpectedError: string | null;
};

export type DecisionEditorMachineEvent =
  | { type: "SUBMIT" }
  | {
      type: "SUCCESS";
      savedId: string;
      savedMessage: string;
    }
  | {
      type: "VALIDATION_ERROR";
      issues: ValidationIssue[];
    }
  | {
      type: "UNEXPECTED_ERROR";
      message: string;
    }
  | { type: "RESET_FEEDBACK" };

export const initialDecisionEditorMachineState: DecisionEditorMachineState = {
  status: "idle",
  savedId: null,
  savedMessage: null,
  issues: [],
  unexpectedError: null,
};

export function decisionEditorMachineReducer(
  state: DecisionEditorMachineState,
  event: DecisionEditorMachineEvent
): DecisionEditorMachineState {
  switch (event.type) {
    case "SUBMIT":
      return {
        ...state,
        status: "submitting",
        issues: [],
        unexpectedError: null,
        savedMessage: null,
      };

    case "SUCCESS":
      return {
        ...state,
        status: "success",
        savedId: event.savedId,
        savedMessage: event.savedMessage,
        issues: [],
        unexpectedError: null,
      };

    case "VALIDATION_ERROR":
      return {
        ...state,
        status: "failure",
        issues: event.issues,
        unexpectedError: null,
        savedMessage: null,
      };

    case "UNEXPECTED_ERROR":
      return {
        ...state,
        status: "failure",
        issues: [],
        unexpectedError: event.message,
        savedMessage: null,
      };

    case "RESET_FEEDBACK":
      return {
        ...state,
        status: "idle",
        issues: [],
        unexpectedError: null,
        savedMessage: null,
      };

    default:
      return state;
  }
}
