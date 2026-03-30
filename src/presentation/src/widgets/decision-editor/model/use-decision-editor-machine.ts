import { useMemo, useReducer } from "react";
import {
  decisionEditorMachineReducer,
  initialDecisionEditorMachineState,
} from "./decision-editor-machine";

export function useDecisionEditorMachine(initialSavedId?: string | null) {
  const [state, dispatch] = useReducer(decisionEditorMachineReducer, {
    ...initialDecisionEditorMachineState,
    savedId: initialSavedId ?? null,
  });

  const actions = useMemo(
    () => ({
      submit() {
        dispatch({ type: "SUBMIT" });
      },
      success(savedId: string, savedMessage: string) {
        dispatch({
          type: "SUCCESS",
          savedId,
          savedMessage,
        });
      },
      validationError(
        issues: {
          field: string;
          message: string;
        }[]
      ) {
        dispatch({
          type: "VALIDATION_ERROR",
          issues,
        });
      },
      unexpectedError(message: string) {
        dispatch({
          type: "UNEXPECTED_ERROR",
          message,
        });
      },
      resetFeedback() {
        dispatch({ type: "RESET_FEEDBACK" });
      },
    }),
    []
  );

  return {
    state,
    actions,
  };
}
