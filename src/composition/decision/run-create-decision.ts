import { createDecision } from "@/src/application/decision/use-cases/create-decision";
import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";
import { getDecisionDeps } from "./decision-deps";

export async function runCreateDecision(draft: DecisionDraft) {
  return createDecision(draft, getDecisionDeps());
}
