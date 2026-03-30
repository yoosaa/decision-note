import { runGetDecision } from "./run-get-decision";
import { decisionToDraft } from "@/src/presentation/src/widgets/decision-editor/model/decision-to-draft";

export async function runGetDecisionDraft(decisionId: string) {
  const result = await runGetDecision(decisionId);

  if (!result.success) {
    return result;
  }

  return {
    success: true as const,
    data: {
      decision: result.data,
      draft: decisionToDraft(result.data),
    },
  };
}
