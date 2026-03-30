import { listDecisions } from "@/src/application/decision/use-cases/list-decisions";
import { getDecisionDeps } from "./decision-deps";

export async function runListDecisions() {
  return listDecisions(getDecisionDeps());
}
