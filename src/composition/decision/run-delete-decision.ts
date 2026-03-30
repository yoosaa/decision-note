import { deleteDecision } from "@/src/application/decision/use-cases/delete-decision";
import { getDecisionDeps } from "./decision-deps";

export async function runDeleteDecision(decisionId: string) {
  return deleteDecision(decisionId, getDecisionDeps());
}
