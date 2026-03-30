import { getDecision } from "@/src/application/decision/use-cases/get-decision";
import { getDecisionDeps } from "./decision-deps";

export async function runGetDecision(decisionId: string) {
  return getDecision(decisionId, getDecisionDeps());
}
