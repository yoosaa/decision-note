import { updateDecision } from "@/src/application/decision/use-cases/update-decision";
import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";
import { getDecisionDeps } from "./decision-deps";

export async function runUpdateDecision(
  decisionId: string,
  draft: DecisionDraft
) {
  return updateDecision(decisionId, draft, getDecisionDeps());
}
